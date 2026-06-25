const fs = require('fs');
const dbPath = './backend/db.json';
const db = require(dbPath);

// Clear transactional data arrays
db.courses = [];
db.faculty = [];
db.news = [];
db.admissions = [];
db.results = [];
db.contacts = [];
db.donations = [];

// Reset popup
if(db.popupAnnouncement) {
  db.popupAnnouncement.enabled = false;
  db.popupAnnouncement.title = "";
  db.popupAnnouncement.message = "";
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Database reset to zero for transactional data');
