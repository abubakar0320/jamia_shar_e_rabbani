const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const dbContent = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (dbContent.courses) {
  const hifz = dbContent.courses.find(c => c.id === 1);
  if (hifz) {
    delete hifz.image;
    delete hifz.altText;
  }
  
  const tajweed = dbContent.courses.find(c => c.id === 3);
  if (tajweed) {
    tajweed.image = "/tajweed-o-qirat.jpg";
    delete tajweed.altText;
  }
}

fs.writeFileSync(dbPath, JSON.stringify(dbContent, null, 2));
console.log("DB Reverted!");
