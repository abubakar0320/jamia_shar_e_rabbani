const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const dbContent = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Clean up feeConfig
if (dbContent.feeConfig) {
  dbContent.feeConfig = {
    admissionFee: dbContent.feeConfig.admissionFee,
    registrationFee: dbContent.feeConfig.registrationFee,
    session: dbContent.feeConfig.session
  };
}

// Clean up feeStructures
if (dbContent.feeStructures) {
  dbContent.feeStructures = dbContent.feeStructures.map(f => ({
    id: f.id,
    sectionType: f.sectionType,
    classProgram: f.classProgram,
    admissionFee: f.admissionFee,
    registrationFee: f.registrationFee
  }));
}

// Clean up admissions
if (dbContent.admissions) {
  dbContent.admissions = dbContent.admissions.map(a => {
    if (a.fees) {
      a.fees = {
        admissionFee: a.fees.admissionFee,
        registrationFee: a.fees.registrationFee,
        session: a.fees.session,
        lateFeeDays: a.fees.lateFeeDays,
        dailyLateFeeRate: a.fees.dailyLateFeeRate,
        totalLateFee: a.fees.totalLateFee
      };
    }
    return a;
  });
}

fs.writeFileSync(dbPath, JSON.stringify(dbContent, null, 2));
console.log("DB Cleaned up!");
