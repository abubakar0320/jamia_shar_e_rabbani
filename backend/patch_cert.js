const fs = require('fs');
let file = 'server.js';
let content = fs.readFileSync(file, 'utf8');

// Ensure db defaults has internshipCertificates
if (!content.includes('internshipCertificates: []')) {
  content = content.replace('internships: [],', 'internships: [],\n  internshipCertificates: [],');
}

const certRoutes = `
// Internship Certificates (Public Profiles)
app.post('/api/admin/internship-certificates', async (req, res) => {
  try {
    const { name, slug, cnic, phone, university, domain, issueDate, documents } = req.body;
    
    // Ensure array exists
    if(!db.get('internshipCertificates').value()) {
       db.set('internshipCertificates', []).write();
    }
    
    // Upload documents to Cloudinary if they are base64
    let uploadedDocs = { ...documents };
    if (process.env.CLOUDINARY_CLOUD_NAME && documents) {
      const uploadPromises = Object.entries(documents).map(async ([docId, docData]) => {
        if (docData && typeof docData === 'string' && docData.startsWith('data:image')) {
          const result = await cloudinary.uploader.upload(docData, {
            folder: 'jamia_internships',
            public_id: \`\${slug}_\${docId}_\${Date.now()}\`
          });
          return [docId, result.secure_url];
        }
        return [docId, docData];
      });
      
      const resolvedDocs = await Promise.all(uploadPromises);
      uploadedDocs = Object.fromEntries(resolvedDocs);
    }
    
    const newCert = {
      id: Date.now(),
      name,
      slug: slug.toLowerCase().replace(/\\s+/g, '-'),
      cnic,
      phone,
      university,
      domain,
      issueDate,
      documents: uploadedDocs,
      createdAt: new Date().toISOString()
    };
    
    db.get('internshipCertificates').push(newCert).write();
    res.status(201).json(newCert);
  } catch (error) {
    console.error("Error creating certificate profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/api/admin/internship-certificates', (req, res) => {
  res.json(db.get('internshipCertificates').value() || []);
});

app.delete('/api/admin/internship-certificates/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('internshipCertificates').remove({ id }).write();
  res.json({ success: true });
});

app.get('/api/internship-certificates/:slug', (req, res) => {
  const cert = db.get('internshipCertificates').find({ slug: req.params.slug }).value();
  if (cert) res.json(cert);
  else res.status(404).json({ error: 'Not found' });
});
`;

if (!content.includes('/api/admin/internship-certificates')) {
  content = content.replace('// Other Routes', certRoutes + '\n\n// Other Routes');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Backend patched with internship certificates logic');
} else {
  console.log('Backend already has internship certificates logic');
}
