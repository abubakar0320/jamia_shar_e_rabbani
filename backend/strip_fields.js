const fs = require('fs');
const dbPath = './db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (db.admissions) {
  db.admissions = db.admissions.map(app => {
    delete app.address;
    delete app.prevEducation;
    return app;
  });
}

if (db.students) {
  db.students = db.students.map(std => {
    delete std.address;
    delete std.prevEducation;
    return std;
  });
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log('Fields stripped');
