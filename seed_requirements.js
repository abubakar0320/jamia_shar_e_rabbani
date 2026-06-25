const fs = require('fs');
const dbPath = './backend/db.json';
const db = require(dbPath);

db.admissionRequirements = [
  { 
    id: Date.now() + 1, 
    title: 'Age Verification', 
    text: 'Applicants must be between 5 and 80 years old for various departments.' 
  },
  { 
    id: Date.now() + 2, 
    title: 'Authentic Documents', 
    text: 'Clear copies of NADRA ID/B-Form and previous marksheets are mandatory.' 
  },
  { 
    id: Date.now() + 3, 
    title: 'Interview Process', 
    text: 'All students must pass a basic Quran recitation and character assessment interview.' 
  }
];

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Seeded db.json with original requirements');
