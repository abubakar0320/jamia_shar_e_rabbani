const fs = require('fs');
let c = fs.readFileSync('backend/server.js', 'utf8');

c = c.replace(
  "const newReq = { id: Date.now() + Math.floor(Math.random() * 1000), text: req.body.text };",
  "const newReq = { id: Date.now() + Math.floor(Math.random() * 1000), title: req.body.title, text: req.body.text };"
);

c = c.replace(
  "db.get('admissionRequirements').find({ id }).assign({ text: req.body.text }).write();",
  "db.get('admissionRequirements').find({ id }).assign({ title: req.body.title, text: req.body.text }).write();"
);

fs.writeFileSync('backend/server.js', c, 'utf8');
console.log('Patched server endpoints to handle title');
