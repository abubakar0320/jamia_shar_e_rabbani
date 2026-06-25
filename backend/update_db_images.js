const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const dbContent = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (dbContent.courses) {
  const hifz = dbContent.courses.find(c => c.id === 1);
  if (hifz) {
    hifz.altText = "Jamia Sher-e-Rabbani Hifz-ul-Quran Program";
  }
  
  const tajweed = dbContent.courses.find(c => c.id === 3);
  if (tajweed) {
    tajweed.altText = "Jamia Sher-e-Rabbani Tajweed-o-Qira'at Program";
  }
}

fs.writeFileSync(dbPath, JSON.stringify(dbContent, null, 2));
console.log("Alt text updated in DB!");
