const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const courses = db.get('courses').value();
let updated = false;

courses.forEach(course => {
  if (course.title === 'Hifz-ul-Quran' || course.title === "Tajweed-o-Qira'at") {
    if (course.programDetailsImage) {
      delete course.programDetailsImage;
      updated = true;
    }
  }
});

if (updated) {
  db.get('courses').assign(courses).write();
  console.log('Images removed successfully');
} else {
  console.log('No images found to remove');
}
