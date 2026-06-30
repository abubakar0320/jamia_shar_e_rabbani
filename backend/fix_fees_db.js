const fs = require('fs');

const dbPath = './db.json';
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

let modified = false;

if (dbData.feeStructures) {
  dbData.feeStructures = dbData.feeStructures.map(f => {
    let changed = false;
    
    // Fix Registration Fee NaN issue
    if (typeof f.registrationFee !== 'number' || isNaN(f.registrationFee)) {
      f.registrationFee = 1000; // default registration fee
      changed = true;
    }
    if (typeof f.phase1Fee !== 'number' || isNaN(f.phase1Fee)) {
      f.phase1Fee = f.admissionFee || 0;
      changed = true;
    }
    if (typeof f.phase2Fee !== 'number' || isNaN(f.phase2Fee)) {
      f.phase2Fee = f.phase1Fee + 500;
      changed = true;
    }
    if (typeof f.phase3Fee !== 'number' || isNaN(f.phase3Fee)) {
      f.phase3Fee = f.phase2Fee + 500;
      changed = true;
    }
    
    if (changed) modified = true;
    return f;
  });
}

if (modified) {
  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
  console.log('Database fee structures patched successfully.');
} else {
  console.log('No changes needed in db.json fee structures.');
}
