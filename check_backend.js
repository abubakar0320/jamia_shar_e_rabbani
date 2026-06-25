const fs = require('fs');
const c = fs.readFileSync('backend/server.js', 'utf8');

console.log('Has PUT admissions?', c.includes("app.put('/api/admin/admissions/:id'"));
console.log('Has DELETE admissions?', c.includes("app.delete('/api/admin/admissions/:id'"));
