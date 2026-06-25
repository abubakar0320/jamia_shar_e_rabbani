const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'backend', 'db.json');
const dbRaw = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(dbRaw);

let changed = false;
const seenIds = new Set();
let counter = 1;

if (db.feeStructures && Array.isArray(db.feeStructures)) {
  db.feeStructures = db.feeStructures.map(fee => {
    if (!fee.id || seenIds.has(fee.id)) {
      fee.id = Date.now() + counter++;
      changed = true;
    }
    seenIds.add(fee.id);
    return fee;
  });
}

if (changed) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Fixed duplicate IDs in feeStructures');
} else {
  console.log('No duplicate IDs found');
}
