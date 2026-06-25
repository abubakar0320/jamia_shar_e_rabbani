const FileSync = require('lowdb/adapters/FileSync');
const low = require('lowdb');
const adapter = new FileSync('db.json');
const db = low(adapter);

const classMapping = {
  "Amma Part One": "Sanawiya Aamma Awal",
  "Amma Part Two": "Sanawiya Aamma Dom",
  "Khasa Part One": "Sanawiya Khasa Awal",
  "Khasa Part Two": "Sanawiya Khasa Dom",
  "Aliya Part One": "Aliya Awal",
  "Aliya Part Two": "Aliya Dom",
  "Almiya Part One": "Alamiya Awal",
  "Almiya Part Two": "Alamiya Dom",
  "Takhassus Part One": "Takhassus Awal",
  "Takhassus Part Two": "Takhassus Dom",
  "Khasa Khasusi": "Alamiya Awal",
  "Almiya Khasusi Part One": "Alamiya Awal",
  "Almiya Khasusi Part Two": "Alamiya Dom",
  "Mutawassitah": "Mutawassitah",
  "Hifz-ul-Quran": "Hifz-ul-Quran",
  "Tajweed-o-Qira'at": "Tajweed-o-Qira'at",
  "Takhassus": "Takhassus Awal"
};

const feeStructures = db.get('feeStructures').value();

if (feeStructures && feeStructures.length > 0) {
  const updatedFeeStructures = feeStructures.map(f => {
     let cName = f.classProgram.replace(" (Tulba)", "").replace(" (Talibat)", "").trim();
     let mapped = classMapping[cName] || cName;
     return { ...f, classProgram: mapped };
  });
  db.set('feeStructures', updatedFeeStructures).write();
  console.log("Updated fee structures with new class names!");
} else {
  console.log("No fee structures found.");
}
