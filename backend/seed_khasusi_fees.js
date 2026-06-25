const FileSync = require('lowdb/adapters/FileSync');
const low = require('lowdb');
const adapter = new FileSync('db.json');
const db = low(adapter);

const khasusiFees = [
  { classProgram: "Amma Khasusi", admissionFee: 5550, phase1Fee: 5550, phase2Fee: 6550, phase3Fee: 7550 },
  { classProgram: "Khasa Khasusi", admissionFee: 7050, phase1Fee: 7050, phase2Fee: 8050, phase3Fee: 9050 },
  { classProgram: "Almiya Khasusi Part One", admissionFee: 13550, phase1Fee: 13550, phase2Fee: 17550, phase3Fee: 22550 },
  { classProgram: "Almiya Khasusi Part Two", admissionFee: 13550, phase1Fee: 13550, phase2Fee: 17550, phase3Fee: 22550 }
];

let feeStructures = db.get('feeStructures').value() || [];

khasusiFees.forEach(fee => {
  ["Tulba Section", "Talibat Section"].forEach(section => {
    const existingIndex = feeStructures.findIndex(f => f.classProgram === fee.classProgram && f.sectionType === section);
    if (existingIndex !== -1) {
      feeStructures[existingIndex] = { ...feeStructures[existingIndex], ...fee };
    } else {
      feeStructures.push({
        id: Date.now() + Math.floor(Math.random() * 1000),
        classProgram: fee.classProgram,
        sectionType: section,
        registrationFee: 0,
        ...fee
      });
    }
  });
});

db.set('feeStructures', feeStructures).write();
console.log("Khasusi fees updated successfully!");
