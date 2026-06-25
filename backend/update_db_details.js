const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const dbContent = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (dbContent.courses) {
  const hifz = dbContent.courses.find(c => c.id === 1);
  if (hifz) {
    hifz.programDetailsImage = "/images/h.jpeg";
  }
  
  const tajweed = dbContent.courses.find(c => c.id === 3);
  if (tajweed) {
    tajweed.programDetailsImage = "/images/t.jpeg";
  }
}

fs.writeFileSync(dbPath, JSON.stringify(dbContent, null, 2));
console.log("DB Updated with programDetailsImage!");
