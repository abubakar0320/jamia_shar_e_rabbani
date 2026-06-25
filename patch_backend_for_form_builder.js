const fs = require('fs');
let c = fs.readFileSync('backend/server.js', 'utf8');

// Patch POST
c = c.replace(
  "const newReq = { id: Date.now() + Math.floor(Math.random() * 1000), title: req.body.title, text: req.body.text };",
  "const newReq = { id: Date.now() + Math.floor(Math.random() * 1000), title: req.body.title, type: req.body.type, required: req.body.required, options: req.body.options };"
);

// Patch PUT
c = c.replace(
  "db.get('admissionRequirements').find({ id }).assign({ title: req.body.title, text: req.body.text }).write();",
  "db.get('admissionRequirements').find({ id }).assign({ title: req.body.title, type: req.body.type, required: req.body.required, options: req.body.options }).write();"
);

fs.writeFileSync('backend/server.js', c, 'utf8');
console.log('Patched backend to support full form field schema');
