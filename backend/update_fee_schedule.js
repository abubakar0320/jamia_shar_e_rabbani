const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const newFeeStructures = [
  // REGULAR DARS-E-NIZAMI
  { classProgram: "Mutawassitah", admissionFee: 2050, phase1Fee: 2050, phase2Fee: 2550, phase3Fee: 3550, sectionType: "Tulba Section" },
  { classProgram: "Mutawassitah", admissionFee: 2050, phase1Fee: 2050, phase2Fee: 2550, phase3Fee: 3550, sectionType: "Talibat Section" },
  
  { classProgram: "Sanawiya Aamma Awal", admissionFee: 3050, phase1Fee: 3050, phase2Fee: 3550, phase3Fee: 4550, sectionType: "Tulba Section" },
  { classProgram: "Sanawiya Aamma Awal", admissionFee: 3050, phase1Fee: 3050, phase2Fee: 3550, phase3Fee: 4550, sectionType: "Talibat Section" },
  
  { classProgram: "Sanawiya Aamma Dom", admissionFee: 3050, phase1Fee: 3050, phase2Fee: 3550, phase3Fee: 4550, sectionType: "Tulba Section" },
  { classProgram: "Sanawiya Aamma Dom", admissionFee: 3050, phase1Fee: 3050, phase2Fee: 3550, phase3Fee: 4550, sectionType: "Talibat Section" },

  { classProgram: "Sanawiya Khasa Awal", admissionFee: 3550, phase1Fee: 3550, phase2Fee: 4050, phase3Fee: 5050, sectionType: "Tulba Section" },
  { classProgram: "Sanawiya Khasa Awal", admissionFee: 3550, phase1Fee: 3550, phase2Fee: 4050, phase3Fee: 5050, sectionType: "Talibat Section" },

  { classProgram: "Sanawiya Khasa Dom", admissionFee: 3550, phase1Fee: 3550, phase2Fee: 4050, phase3Fee: 5050, sectionType: "Tulba Section" },
  { classProgram: "Sanawiya Khasa Dom", admissionFee: 3550, phase1Fee: 3550, phase2Fee: 4050, phase3Fee: 5050, sectionType: "Talibat Section" },

  { classProgram: "Aliya Awal", admissionFee: 4050, phase1Fee: 4050, phase2Fee: 5050, phase3Fee: 6050, sectionType: "Tulba Section" },
  { classProgram: "Aliya Awal", admissionFee: 4050, phase1Fee: 4050, phase2Fee: 5050, phase3Fee: 6050, sectionType: "Talibat Section" },

  { classProgram: "Aliya Dom", admissionFee: 4050, phase1Fee: 4050, phase2Fee: 5050, phase3Fee: 6050, sectionType: "Tulba Section" },
  { classProgram: "Aliya Dom", admissionFee: 4050, phase1Fee: 4050, phase2Fee: 5050, phase3Fee: 6050, sectionType: "Talibat Section" },

  { classProgram: "Alamiya Awal", admissionFee: 5550, phase1Fee: 5550, phase2Fee: 6550, phase3Fee: 7550, sectionType: "Tulba Section" },
  { classProgram: "Alamiya Awal", admissionFee: 5550, phase1Fee: 5550, phase2Fee: 6550, phase3Fee: 7550, sectionType: "Talibat Section" },

  { classProgram: "Alamiya Dom", admissionFee: 5550, phase1Fee: 5550, phase2Fee: 6550, phase3Fee: 7550, sectionType: "Tulba Section" },
  { classProgram: "Alamiya Dom", admissionFee: 5550, phase1Fee: 5550, phase2Fee: 6550, phase3Fee: 7550, sectionType: "Talibat Section" },

  { classProgram: "Takhassus Awal", admissionFee: 6050, phase1Fee: 6050, phase2Fee: 7050, phase3Fee: 8050, sectionType: "Tulba Section" },
  { classProgram: "Takhassus Awal", admissionFee: 6050, phase1Fee: 6050, phase2Fee: 7050, phase3Fee: 8050, sectionType: "Talibat Section" },

  { classProgram: "Takhassus Dom", admissionFee: 6050, phase1Fee: 6050, phase2Fee: 7050, phase3Fee: 8050, sectionType: "Tulba Section" },
  { classProgram: "Takhassus Dom", admissionFee: 6050, phase1Fee: 6050, phase2Fee: 7050, phase3Fee: 8050, sectionType: "Talibat Section" },

  // KHASUSI DARS-E-NIZAMI
  { classProgram: "Amma Khasusi", admissionFee: 5550, phase1Fee: 5550, phase2Fee: 6550, phase3Fee: 7550, sectionType: "Tulba Section" },
  { classProgram: "Amma Khasusi", admissionFee: 5550, phase1Fee: 5550, phase2Fee: 6550, phase3Fee: 7550, sectionType: "Talibat Section" },

  { classProgram: "Khasa Khasusi", admissionFee: 7050, phase1Fee: 7050, phase2Fee: 8050, phase3Fee: 9050, sectionType: "Tulba Section" },
  { classProgram: "Khasa Khasusi", admissionFee: 7050, phase1Fee: 7050, phase2Fee: 8050, phase3Fee: 9050, sectionType: "Talibat Section" },

  { classProgram: "Almiya Khasusi Part One", admissionFee: 13550, phase1Fee: 13550, phase2Fee: 17550, phase3Fee: 22550, sectionType: "Tulba Section" },
  { classProgram: "Almiya Khasusi Part One", admissionFee: 13550, phase1Fee: 13550, phase2Fee: 17550, phase3Fee: 22550, sectionType: "Talibat Section" },

  { classProgram: "Almiya Khasusi Part Two", admissionFee: 13550, phase1Fee: 13550, phase2Fee: 17550, phase3Fee: 22550, sectionType: "Tulba Section" },
  { classProgram: "Almiya Khasusi Part Two", admissionFee: 13550, phase1Fee: 13550, phase2Fee: 17550, phase3Fee: 22550, sectionType: "Talibat Section" }
];

const newAdmissionSchedule = {
  enabled: true,
  academicYear: "2026-27",
  phases: [
    {
      name: "Phase 1 (Single Fee)",
      startDate: "2026-06-25",
      endDate: "2026-07-24"
    },
    {
      name: "Phase 2 (Double Fee)",
      startDate: "2026-07-25",
      endDate: "2026-08-24"
    },
    {
      name: "Phase 3 (Triple Fee)",
      startDate: "2026-08-25",
      endDate: "2026-09-24"
    }
  ],
  lateFee: {
    enabled: true,
    amountPerDay: 170
  },
  specialFees: {
    "Hifz-ul-Quran": {
      normal: 3500,
      urgent: 5000
    },
    "Tajweed-o-Qira'at": {
      normal: 3500,
      urgent: 5000
    }
  }
};

db.set('feeStructures', newFeeStructures).write();
db.set('admissionSchedule', newAdmissionSchedule).write();
console.log('Fee schedule and structures updated successfully.');
