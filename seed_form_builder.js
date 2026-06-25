const fs = require('fs');
const dbPath = './backend/db.json';
const db = require(dbPath);

db.admissionRequirements = [
  { id: 1, title: 'Student Full Name', type: 'text', required: true },
  { id: 2, title: 'Father Name', type: 'text', required: true },
  { id: 3, title: 'Date of Birth', type: 'date', required: true },
  { id: 4, title: 'CNIC / B-Form Number', type: 'text', required: true },
  { id: 5, title: 'Mobile Number', type: 'tel', required: true },
  { id: 6, title: 'WhatsApp Number', type: 'tel', required: false },
  { id: 7, title: 'Admission Section', type: 'select', required: true, options: 'Tulba Section, Talibat Section' },
  { id: 8, title: 'Student Photograph', type: 'file', required: true },
  { id: 9, title: 'Student CNIC Copy', type: 'file', required: true },
  { id: 10, title: 'Father CNIC Copy', type: 'file', required: true },
  { id: 11, title: 'Previous Result Card', type: 'file', required: true }
];

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Seeded database with Form Builder fields');
