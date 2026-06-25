const fs = require('fs');
let c = fs.readFileSync('backend/server.js', 'utf8');

const putEndpoint = `
app.put('/api/admin/admissions/:id', (req, res) => {
  const admissionId = req.params.id;
  const admission = db.get('admissions').find({ id: admissionId });
  if (admission.value()) {
     admission.assign(req.body).write();
     res.json({ success: true });
  } else {
     res.status(404).json({ error: 'Admission not found' });
  }
});
`;

if (!c.includes("app.put('/api/admin/admissions/:id'")) {
  c = c.replace(
    "app.delete('/api/admin/admissions/:id', (req, res) => {",
    putEndpoint + "\napp.delete('/api/admin/admissions/:id', (req, res) => {"
  );
  fs.writeFileSync('backend/server.js', c, 'utf8');
  console.log('Added PUT endpoint for admissions');
} else {
  console.log('PUT endpoint already exists');
}
