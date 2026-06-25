const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, 'backend', 'server.js');
let c = fs.readFileSync(serverPath, 'utf8');

// 1. Add to defaults
if (!c.includes("admissionRequirements: []")) {
  c = c.replace(
    "feeCategories: [],",
    "feeCategories: [],\n  admissionRequirements: [" + 
    "    { id: 1, text: 'Completed application form' }," +
    "    { id: 2, text: 'Previous academic records and certificates' }," +
    "    { id: 3, text: 'Recent passport size photographs (4 copies)' }," +
    "    { id: 4, text: 'Copy of B-Form / CNIC' }," +
    "    { id: 5, text: 'Character certificate from previous institution' }" +
    "  ],"
  );
}

// 2. Add endpoints
if (!c.includes("app.get('/api/admin/admission-requirements'")) {
  const endpoints = `
// --- Admission Requirements ---
app.get('/api/admin/admission-requirements', (req, res) => {
  res.json(db.get('admissionRequirements').value() || []);
});
app.get('/api/admission-requirements', (req, res) => {
  res.json(db.get('admissionRequirements').value() || []);
});
app.post('/api/admin/admission-requirements', (req, res) => {
  const newReq = { id: Date.now() + Math.floor(Math.random() * 1000), text: req.body.text };
  db.get('admissionRequirements').push(newReq).write();
  res.status(201).json(newReq);
});
app.put('/api/admin/admission-requirements/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('admissionRequirements').find({ id }).assign({ text: req.body.text }).write();
  res.json({ success: true });
});
app.delete('/api/admin/admission-requirements/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('admissionRequirements').remove({ id }).write();
  res.json({ success: true });
});
`;
  // Insert before the error handling middleware
  c = c.replace(
    "app.use((err, req, res, next) => {",
    endpoints + "\napp.use((err, req, res, next) => {"
  );
}

fs.writeFileSync(serverPath, c, 'utf8');
console.log('Patched server.js with admission requirements endpoints');
