const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

['admissions', 'students', 'challans'].forEach(collection => {
  const records = db.get(collection).value() || [];
  let updated = false;

  records.forEach(record => {
    if (record.fees && record.fees.registrationFee > 0 && record.fees.totalFee === undefined) {
      // This record was generated during the buggy period.
      // Wait, was the admissionFee ACTUALLY correct but they just didn't like the missing totalFee?
      // Or was the admissionFee picking up the wrong value?
      // Let's recompute totalFee from the feeStructures.
      
      let rawClass = record.classProgram || "";
      rawClass = rawClass.replace(" (Tulba)", "").replace(" (Talibat)", "").trim();

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
        "Khasa Khasusi": "Khasa Khasusi",
        "Amma Khasusi": "Amma Khasusi",
        "Almiya Khasusi Part One": "Almiya Khasusi Part One",
        "Almiya Khasusi Part Two": "Almiya Khasusi Part Two",
        "Mutawassitah": "Mutawassitah",
        "Hifz-ul-Quran": "Hifz-ul-Quran",
        "Tajweed-o-Qira'at": "Tajweed-o-Qira'at",
        "Takhassus": "Takhassus Awal"
      };

      const mappedClass = classMapping[rawClass] || rawClass;
      const feeStructures = db.get('feeStructures').value() || [];
      const feeConfig = db.get('feeConfig').value() || { admissionFee: 2000, registrationFee: 1000 };
      
      const classFee = feeStructures.find(f => 
        f.classProgram === mappedClass && 
        f.sectionType === record.sectionType
      ) || feeConfig;

      let originalTotalFee = classFee.admissionFee;
      
      const schedule = db.get('admissionSchedule').value();
      const isSpecialCourse = ["Hifz-ul-Quran", "Tajweed-o-Qira'at"].includes(rawClass);

      if (isSpecialCourse) {
        const procType = record.processingType || 'Normal';
        const sFeeConfig = schedule?.specialFees?.[rawClass];
        if (sFeeConfig) {
          originalTotalFee = procType === 'Urgent' ? sFeeConfig.urgent : sFeeConfig.normal;
        }
      } else if (schedule && schedule.enabled && schedule.phases && schedule.phases.length > 0) {
        const sortedPhases = [...schedule.phases].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        const recordDate = new Date(record.date || Date.now());
        recordDate.setHours(0,0,0,0);
        let phaseIndex = -1;
        for (let i = 0; i < sortedPhases.length; i++) {
          const pStart = new Date(sortedPhases[i].startDate); pStart.setHours(0,0,0,0);
          const pEnd = new Date(sortedPhases[i].endDate); pEnd.setHours(23,59,59,999);
          if (recordDate >= pStart && recordDate <= pEnd) { phaseIndex = i; break; }
        }
        if (phaseIndex !== -1) {
          if (phaseIndex === 0) originalTotalFee = classFee.phase1Fee || classFee.admissionFee;
          else if (phaseIndex === 1) originalTotalFee = classFee.phase2Fee || classFee.admissionFee;
          else originalTotalFee = classFee.phase3Fee || classFee.admissionFee;
        } else {
          const lastPhaseEnd = new Date(sortedPhases[sortedPhases.length - 1].endDate);
          const firstPhaseStart = new Date(sortedPhases[0].startDate);
          if (recordDate > lastPhaseEnd) originalTotalFee = classFee.phase3Fee || classFee.admissionFee;
          else if (recordDate < firstPhaseStart) originalTotalFee = classFee.phase1Fee || classFee.admissionFee;
        }
      }

      record.fees.totalFee = originalTotalFee;
      record.fees.admissionFee = Math.max(0, originalTotalFee - record.fees.registrationFee);
      updated = true;
    } else if (record.fees && record.fees.totalFee === undefined && record.fees.registrationFee === 0) {
      // old records
      record.fees.totalFee = record.fees.admissionFee;
      record.fees.admissionFee = Math.max(0, record.fees.totalFee - 0);
      updated = true;
    }
  });

  if (updated) {
    db.get(collection).assign(records).write();
  }
});
console.log('Database records fixed.');
