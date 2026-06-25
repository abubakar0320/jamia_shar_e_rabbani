const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const courses = db.get('courses').value();
let updated = false;

courses.forEach(course => {
  if (course.title === 'Hifz-ul-Quran') {
    course.programDetailsImage = '/images/hifaz.jpeg';
    updated = true;
  } else if (course.title === "Tajweed-o-Qira'at") {
    course.programDetailsImage = '/images/tajweed.jpeg';
    updated = true;
  }
});

if (updated) {
  db.get('courses').assign(courses).write();
  console.log('Courses updated successfully');
} else {
  console.log('Courses not found or not updated');
}
