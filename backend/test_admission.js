// No wait, I can't easily mock `new Date()` in server.js from outside without changing server code.
// Instead, I'll test Hifz-ul-Quran Urgent.
const data = {
  studentName: "Test 2",
  classProgram: "Hifz-ul-Quran",
  sectionType: "Tulba Section",
  processingType: "Urgent"
};

fetch('http://localhost:5000/api/admissions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
