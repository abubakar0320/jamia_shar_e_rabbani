const fs = require('fs');
const path = require('path');

const serverFile = path.join(__dirname, 'server.js');
let code = fs.readFileSync(serverFile, 'utf8');

// 1. Increase JSON limit
code = code.replace('app.use(express.json());', 'app.use(express.json({ limit: "20mb" }));\napp.use(express.urlencoded({ limit: "20mb", extended: true }));');

// 2. Add donations database collection initialization if not present in db.json
const dbFile = path.join(__dirname, 'db.json');
let dbData = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
if (!dbData.donations) {
  dbData.donations = [];
  fs.writeFileSync(dbFile, JSON.stringify(dbData, null, 2), 'utf8');
}

// 3. Add Donation API routes
const apiRoutes = `
// --- DONATIONS API ---
app.post('/api/donations', (req, res) => {
  try {
    const data = req.body;
    const dbDonations = db.get('donations');
    
    // Generate reference number
    const year = new Date().getFullYear();
    const count = dbDonations.value().length + 1;
    const refNo = \`JSR-DON-\${year}-\${count.toString().padStart(4, '0')}\`;
    
    const newDonation = {
      id: Date.now().toString(),
      refNo: refNo,
      fullName: data.fullName,
      fatherName: data.fatherName,
      mobileNumber: data.mobileNumber,
      email: data.email || '',
      city: data.city,
      amount: data.amount,
      purpose: data.purpose,
      remarks: data.remarks || '',
      category: data.category,
      receiptImage: data.receiptImage, // base64 string
      submissionDate: new Date().toISOString()
    };
    
    dbDonations.push(newDonation).write();
    res.json({ success: true, refNo: refNo, message: 'Donation submitted successfully' });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ error: 'Failed to submit donation' });
  }
});

app.get('/api/donations', (req, res) => {
  const donations = db.get('donations').value() || [];
  // Sort by submission date desc
  const sorted = [...donations].sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
  res.json(sorted);
});
`;

if (!code.includes('/api/donations')) {
  // insert before app.listen
  code = code.replace(/app\.listen\(/g, apiRoutes + '\napp.listen(');
  fs.writeFileSync(serverFile, code, 'utf8');
  console.log("Backend patched with donations API");
} else {
  console.log("Backend already has donations API");
}
