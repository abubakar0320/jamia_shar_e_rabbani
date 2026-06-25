const fs = require('fs');
const dbPath = './backend/db.json';
const db = require(dbPath);

db.admissionRequirements = [
  { id: 1782040652801, title: 'Student Photograph', type: 'file', required: true },
  { id: 1782040652802, title: 'Student CNIC / B-Form Copy', type: 'file', required: true },
  { id: 1782040652803, title: 'Father\'s CNIC Copy', type: 'file', required: true },
  { id: 1782040652804, title: 'Previous Class Result Card / Marksheet', type: 'file', required: true }
];

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Cleaned up db requirements');
