const express = require('express');
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Database Setup
const fs = require('fs');
let dbPath = path.join(__dirname, 'db.json');
if (process.env.VERCEL) {
  const tmpPath = path.join('/tmp', 'db.json');
  if (!fs.existsSync(tmpPath) && fs.existsSync(dbPath)) {
    fs.copyFileSync(dbPath, tmpPath);
  }
  dbPath = tmpPath;
}
const adapter = new FileSync(dbPath);
const db = low(adapter);

// Set default data
db.defaults({ 
  courses: [
    { 
      id: 1, 
      title: "Hifz-ul-Quran", 
      duration: "3-4 Years", 
      level: "Primary", 
      desc: "Complete memorization of the Holy Quran with Tajweed rules.",
      programDetailsImage: "/images/h.jpeg",
      playlists: [
        {
          id: "hifz-urdu",
          title: "Quran Recitation with Urdu Translation",
          category: "Quranic Studies",
          listId: "PLfty3tvJoMC3aAIYP7AfF2tiZXS5VIS6i",
          videoId: "dXxh8tmUimc",
          badge: "Urdu",
          description: "Complete Quran recitation with authentic Urdu translation for better understanding of the Holy Book.",
          icon: "video"
        },
        {
          id: "hifz-arabic",
          title: "Quran Recitation (Arabic Only)",
          category: "Quranic Studies",
          listId: "PL7pGH6oFXtc5aldXNh7MicDh20dG5PGJG",
          videoId: "6XyuiBAKf5s",
          badge: "Arabic",
          description: "Beautiful recitation of the Holy Quran in Arabic, focusing on Tajweed and proper pronunciation.",
          icon: "award"
        },
        {
          id: "hifz-english",
          title: "Quran Recitation with English Translation",
          category: "Quranic Studies",
          listId: "PL95kNBEuhY4a4LU7ph8RXDYdh2MvUvVYr",
          videoId: "yjdqH0T7SUU",
          badge: "English",
          description: "Quran recitation paired with English translation for students and researchers worldwide.",
          icon: "book"
        }
      ]
    },
    { 
      id: 2, 
      title: "Dars-e-Nizami", 
      duration: "8 Years", 
      level: "Advanced", 
      desc: "Comprehensive Islamic scholarship program covering Fiqh, Hadith, Tafseer, and Arabic Literature.",
      image: "/hadith.jpg",
      gallery: [
        "/images/1.jpeg",
        "/images/2.jpeg",
        "/images/3.jpeg",
        "/images/4.jpeg"
      ],
      syllabus: [
        { title: "Nisab Baraye Dars-e-Nizami (Tulba)", file: "/syllabus/nisab-dars-e-nizami-tulba.pdf" },
        { title: "Nisab Baraye Dars-e-Nizami (Talibat)", file: "/syllabus/nisab-dars-e-nizami-talibat.pdf" }
      ]
    },
    { 
      id: 3, 
      title: "Tajweed-o-Qira'at", 
      duration: "1 Year", 
      level: "Intermediate", 
      desc: "Specialized course in the art of Quranic recitation.", 
      image: "/tajweed-o-qirat.jpg",
      programDetailsImage: "/images/t.jpeg",
      playlists: [
        {
          id: "tajweed-lessons",
          title: "Advanced Tajweed-o-Qira'at Video Lessons",
          category: "Quranic Studies",
          listId: "PLz_oGF0kwgM4GVAdWdD7KavI3PDAtEc28",
          videoId: "GrwrpA2H97A",
          badge: "Specialized",
          description: "A comprehensive collection of Tajweed and Qira'at lessons designed to help students improve Quran recitation, pronunciation, Makharij, and practical Tajweed rules.",
          icon: "award"
        }
      ]
    },
    { 
      id: 4, 
      title: "Arabic Language", 
      duration: "2 Years", 
      level: "Beginner/Intermediate", 
      desc: "Intensive course focusing on classical and modern Arabic grammar and conversation.",
      image: "/arabic-language.jpg",
      playlistTitle: "Arabic Language Video Lessons",
      playlistUrl: "https://www.youtube.com/watch?v=i0lQZHnvAUc&list=PL7ryrm4bCxy8Hkdco9fRz3LGffuQqeMD4",
      playlistId: "PL7ryrm4bCxy8Hkdco9fRz3LGffuQqeMD4",
      videoId: "i0lQZHnvAUc",
      playlists: [
        {
          id: "arabic-lessons",
          title: "Arabic Language Video Lessons",
          category: "Education",
          listId: "PL7ryrm4bCxy8Hkdco9fRz3LGffuQqeMD4",
          videoId: "i0lQZHnvAUc",
          badge: "Full Course",
          description: "A comprehensive Arabic language learning series designed to help students develop Arabic reading, writing, speaking, grammar, and comprehension skills.",
          icon: "book"
        }
      ]
    },
    { 
      id: 5, 
      title: "Takhassus", 
      duration: "2 Years", 
      level: "Specialized", 
      desc: "Advanced specialization course in specific branches of Islamic Jurisprudence (Fiqh) or Hadith.",
      image: "/takhasus.jpeg",
      gallery: [
        "/images/a.jpeg",
        "/images/b.jpeg",
        "/images/c.jpeg"
      ],
      syllabus: [
        { title: "Nisab Baraye Takhassus", file: "/syllabus/nisab-Takhassus.pdf" }
      ]
    },
    { 
      id: 6, 
      title: "Khasusi Dars-e-Nizami", 
      duration: "Variable", 
      level: "Advanced", 
      desc: "An advanced and specialized Dars-e-Nizami program designed for students seeking deeper understanding of classical Islamic sciences, Fiqh, Hadith, Tafsir, Arabic language, and scholarly research.",
      image: "/hadith.jpg",
      gallery: [
        "/images/1.jpeg",
        "/images/2.jpeg",
        "/images/3.jpeg",
        "/images/4.jpeg"
      ],
      syllabus: [
        { title: "Nisab Baraye Almiya Khasusi", file: "/syllabus/nisab-almiya-khasusi.pdf" },
        { title: "Nisab Baraye Amma wa Khasa Khasusi", file: "/syllabus/nisab-amma-khasa-khasusi.pdf" }
      ]
    }
  ], 
  faculty: [], 
  news: [], 
  contacts: [], 
  admissions: [], 
  students: [],
  results: [],
  feeStructures: [],
  feeCategories: [],
  admissionRequirements: [    { id: 1, text: 'Completed application form' },    { id: 2, text: 'Previous academic records and certificates' },    { id: 3, text: 'Recent passport size photographs (4 copies)' },    { id: 4, text: 'Copy of B-Form / CNIC' },    { id: 5, text: 'Character certificate from previous institution' }  ],
  challans: [],
  feeConfig: {
    admissionFee: 2000,
    registrationFee: 1000,
    session: "2026-27"
  },
  admissionSchedule: {
    enabled: true,
    dailyLateFee: 170,
    phases: [
      { id: 1, startDate: "2026-06-01", endDate: "2026-06-30", admissionFee: 3000 },
      { id: 2, startDate: "2026-07-01", endDate: "2026-07-31", admissionFee: 4000 },
      { id: 3, startDate: "2026-08-01", endDate: "2026-08-31", admissionFee: 5000 }
    ]
  },
  bankConfig: {
    bankName: "Meezan Bank",
    accountTitle: "Muhammad Ahmad (Asaan Account)",
    accountNumber: "98690112101313"
  }
});

// Fee Config Routes
app.get('/api/fee-config', (req, res) => {
  res.json(db.get('feeConfig').value());
});

app.post('/api/admin/fee-config', (req, res) => {
  db.set('feeConfig', req.body).write();
  res.json({ success: true });
});

// Admission Schedule Routes
app.get('/api/admission-schedule', (req, res) => {
  res.json(db.get('admissionSchedule').value());
});

app.post('/api/admin/admission-schedule', (req, res) => {
  db.set('admissionSchedule', req.body).write();
  res.json({ success: true });
});

// Bank Config Routes
app.get('/api/bank-config', (req, res) => {
  const bankConfig = db.get('bankConfig').value();
  res.json(bankConfig || {
    bankName: "Meezan Bank",
    accountTitle: "Muhammad Ahmad (Asaan Account)",
    accountNumber: "98690112101313"
  });
});

app.post('/api/admin/bank-config', (req, res) => {
  db.set('bankConfig', req.body).write();
  res.json({ success: true });
});

// Admissions with Challan generation
app.post('/api/admissions', (req, res) => {
  const feeConfig = db.get('feeConfig').value();
  const feeStructures = db.get('feeStructures').value() || [];
  const schedule = db.get('admissionSchedule').value();
  const classMapping = {
    "Amma Part One": "Mutawassitah",
    "Amma Part Two": "Mutawassitah",
    "Khasa Part One": "Sanawiya Aamma Awal",
    "Khasa Part Two": "Sanawiya Aamma Dom",
    "Aliya Part One": "Sanawiya Khasa Awal",
    "Aliya Part Two": "Sanawiya Khasa Dom",
    "Almiya Part One": "Aliya Awal",
    "Almiya Part Two": "Aliya Dom",
    "Takhassus": "Takhassus Awal",
    "Amma Khasusi": "Amma Khasusi",
    "Khasa Khasusi": "Khasa Khasusi",
    "Almiya Khasusi Part One": "Almiya Khasusi Part One",
    "Almiya Khasusi Part Two": "Almiya Khasusi Part Two",
    // Base classes for fallback
    "Mutawassitah": "Mutawassitah",
    "Hifz-ul-Quran": "Hifz-ul-Quran",
    "Tajweed-o-Qira'at": "Tajweed-o-Qira'at",
    "Sanawiya Aamma Awal": "Sanawiya Aamma Awal",
    "Sanawiya Aamma Dom": "Sanawiya Aamma Dom",
    "Sanawiya Khasa Awal": "Sanawiya Khasa Awal",
    "Sanawiya Khasa Dom": "Sanawiya Khasa Dom",
    "Aliya Awal": "Aliya Awal",
    "Aliya Dom": "Aliya Dom",
    "Alamiya Awal": "Alamiya Awal",
    "Alamiya Dom": "Alamiya Dom",
    "Takhassus Awal": "Takhassus Awal",
    "Takhassus Dom": "Takhassus Dom"
  };

  // Clean the class name (remove " (Tulba)" or " (Talibat)" if appended by frontend)
  let rawClass = req.body.classProgram || "";
  rawClass = rawClass.replace(/\s*\([^)]*\)\s*$/, '').trim();

  // --- Backend Validation ---
  const { studentName, fatherName, dob, cnic, mobile, sectionType, documents } = req.body;
  
  if (!studentName || !fatherName || !dob || !cnic || !mobile || !sectionType || !rawClass) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // CNIC Validation
  if (!/^\d{5}-\d{7}-\d{1}$/.test(cnic)) {
    return res.status(400).json({ error: 'Invalid CNIC format' });
  }

  // DOB Validation (Age 5-80)
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  if (isNaN(birthDate.getTime()) || birthDate > today || age < 5 || age > 80) {
    return res.status(400).json({ error: 'Invalid Date of Birth or Age' });
  }

  // Dynamic Document Validation
  const KHASUSI_DOCS_REQ = {
    "Amma Khasusi": ['student_cnic', 'father_cnic', 'photo', 'matric_result'],
    "Khasa Khasusi": ['student_cnic', 'father_cnic', 'photo', 'matric_result', 'inter_result'],
    "Almiya Khasusi Part One": ['student_cnic', 'father_cnic', 'photo', 'matric_result', 'inter_result', 'grad_result'],
    "Almiya Khasusi Part Two": ['student_cnic', 'father_cnic', 'photo', 'almiya_p1_result']
  };
  const DEFAULT_DOCS_REQ = ['photo', 'student_cnic', 'father_cnic', 'result_card'];
  const requiredDocs = KHASUSI_DOCS_REQ[rawClass] || DEFAULT_DOCS_REQ;

  const missingDocs = requiredDocs.filter(docId => !documents || !documents[docId]);
  if (missingDocs.length > 0) {
    return res.status(400).json({ error: `Missing required documents: ${missingDocs.join(', ')}` });
  }

  const mappedClass = classMapping[rawClass] || rawClass;
  
  // Normalize section type to match feeStructures (e.g. 'Tulba' -> 'Tulba Section')
  const reqSection = req.body.sectionType;
  const normalizedSection = reqSection.includes('Section') ? reqSection : reqSection + ' Section';
  
  // Find specific fee structure for this class if exists
  const classFee = feeStructures.find(f => 
    f.classProgram === mappedClass && 
    f.sectionType === normalizedSection
  ) || feeConfig;
  
  // Base fees from class-specific structure or global config
  let finalFees = {
    admissionFee: classFee.admissionFee,
    registrationFee: classFee.registrationFee,
    session: feeConfig.session,
    lateFeeDays: 0,
    dailyLateFeeRate: 0,
    totalLateFee: 0
  };

  // Determine Dynamic Admission Fee & Late Fee
  const isSpecialCourse = ["Hifz-ul-Quran", "Tajweed-o-Qira'at"].includes(rawClass);

  if (isSpecialCourse) {
    const procType = req.body.processingType || 'Normal';
    const sFeeConfig = schedule?.specialFees?.[rawClass];
    if (sFeeConfig) {
      finalFees.admissionFee = procType === 'Urgent' ? sFeeConfig.urgent : sFeeConfig.normal;
    }
  } else if (schedule && schedule.enabled && schedule.phases && schedule.phases.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    const sortedPhases = [...schedule.phases].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    let phaseIndex = -1;

    for (let i = 0; i < sortedPhases.length; i++) {
      const pStart = new Date(sortedPhases[i].startDate); pStart.setHours(0,0,0,0);
      const pEnd = new Date(sortedPhases[i].endDate); pEnd.setHours(23,59,59,999);
      if (today >= pStart && today <= pEnd) { phaseIndex = i; break; }
    }

    if (phaseIndex !== -1) {
      if (phaseIndex === 0) finalFees.admissionFee = classFee.phase1Fee || classFee.admissionFee;
      else if (phaseIndex === 1) finalFees.admissionFee = classFee.phase2Fee || classFee.admissionFee;
      else finalFees.admissionFee = classFee.phase3Fee || classFee.admissionFee;
    } else {
      const lastPhaseEnd = new Date(sortedPhases[sortedPhases.length - 1].endDate);
      lastPhaseEnd.setHours(23,59,59,999);
      const firstPhaseStart = new Date(sortedPhases[0].startDate);
      firstPhaseStart.setHours(0,0,0,0);

      if (today > lastPhaseEnd) {
        finalFees.admissionFee = classFee.phase3Fee || classFee.admissionFee;
        const diffTime = Math.abs(today.getTime() - lastPhaseEnd.getTime());
        const lateDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        finalFees.lateFeeDays = lateDays;
        finalFees.dailyLateFeeRate = schedule.dailyLateFee || 170;
        finalFees.totalLateFee = lateDays * finalFees.dailyLateFeeRate;
      } else if (today < firstPhaseStart) {
        finalFees.admissionFee = classFee.phase1Fee || classFee.admissionFee;
      }
    }
  }

  // Automatic Division Rule
  const globalRegistrationFee = feeConfig.registrationFee || 1000;
  finalFees.totalFee = finalFees.admissionFee;
  finalFees.registrationFee = globalRegistrationFee;
  finalFees.admissionFee = Math.max(0, finalFees.totalFee - globalRegistrationFee);

  const newAdmission = { 
    id: Date.now(), 
    ...req.body, 
    challanNo: `JS-${Math.floor(1000 + Math.random() * 9000)}`,
    applicationNo: `APP-${Math.floor(10000 + Math.random() * 90000)}`,
    date: new Date().toISOString(),
    status: 'Pending',
    fees: finalFees
  };
  db.get('admissions').push(newAdmission).write();
  res.status(201).json(newAdmission);
});

// Other Routes
app.get('/api/courses', (req, res) => res.json(db.get('courses').value()));
app.get('/api/courses/:id', (req, res) => {
  const course = db.get('courses').find({ id: parseInt(req.params.id) }).value() || db.get('courses').find({ id: req.params.id }).value();
  if (course) res.json(course);
  else res.status(404).json({ error: 'Course not found' });
});

app.get('/api/admin/courses', (req, res) => res.json(db.get('courses').value()));

app.post('/api/admin/courses', (req, res) => {
  const newCourse = { id: Date.now(), courseId: `CRS-${Math.floor(1000 + Math.random() * 9000)}`, ...req.body };
  db.get('courses').push(newCourse).write();
  res.status(201).json(newCourse);
});

app.put('/api/admin/courses/:id', (req, res) => {
  const cid = parseInt(req.params.id) || req.params.id;
  const course = db.get('courses').find({ id: cid });
  if (course.value()) {
     course.assign(req.body).write();
     res.json({ success: true });
  } else {
     res.status(404).json({ error: 'Course not found' });
  }
});

app.delete('/api/admin/courses/:id', (req, res) => {
  const cid = parseInt(req.params.id) || req.params.id;
  db.get('courses').remove({ id: cid }).write();
  res.json({ success: true });
});

app.get('/api/faculty', (req, res) => res.json(db.get('faculty').value()));
app.get('/api/faculty/:id', (req, res) => {
  const member = db.get('faculty').find({ id: parseInt(req.params.id) }).value() || db.get('faculty').find({ id: req.params.id }).value();
  if (member) res.json(member);
  else res.status(404).json({ error: 'Faculty member not found' });
});

app.get('/api/admin/faculty', (req, res) => res.json(db.get('faculty').value()));

app.post('/api/admin/faculty', (req, res) => {
  const newFaculty = { id: Date.now(), facultyId: `FAC-${Math.floor(1000 + Math.random() * 9000)}`, ...req.body };
  db.get('faculty').push(newFaculty).write();
  res.status(201).json(newFaculty);
});

app.put('/api/admin/faculty/:id', (req, res) => {
  const fid = parseInt(req.params.id) || req.params.id;
  const fac = db.get('faculty').find({ id: fid });
  if (fac.value()) {
     fac.assign(req.body).write();
     res.json({ success: true });
  } else {
     res.status(404).json({ error: 'Faculty not found' });
  }
});

app.delete('/api/admin/faculty/:id', (req, res) => {
  const fid = parseInt(req.params.id) || req.params.id;
  db.get('faculty').remove({ id: fid }).write();
  res.json({ success: true });
});

app.get('/api/news', (req, res) => res.json(db.get('news').value()));
app.get('/api/news/:id', (req, res) => {
  const article = db.get('news').find({ id: parseInt(req.params.id) }).value() || db.get('news').find({ id: req.params.id }).value();
  if (article) res.json(article);
  else res.status(404).json({ error: 'News article not found' });
});

// Admin Stats
app.get('/api/admin/stats', (req, res) => {
  res.json({
    courses: db.get('courses').size().value(),
    faculty: db.get('faculty').size().value(),
    news: db.get('news').size().value(),
    contacts: db.get('contacts').size().value(),
    admissions: db.get('admissions').size().value(),
  });
});

app.get('/api/admin/admissions', (req, res) => {
  res.json(db.get('admissions').value());
});

app.put('/api/admin/admissions/:id/status', (req, res) => {
  const { status } = req.body;
  const admissionId = parseInt(req.params.id) || req.params.id;
  const admission = db.get('admissions').find({ id: admissionId });
  if (admission.value()) {
     admission.assign({ status }).write();
     if (status === 'Approved') {
        const ad = admission.value();
        const studentRecord = {
           id: Date.now(),
           studentId: `STU-${Math.floor(10000 + Math.random() * 90000)}`,
           rollNo: `${ad.classProgram ? ad.classProgram.substring(0,3).toUpperCase() : 'CLS'}-${Math.floor(100 + Math.random() * 900)}`,
           ...ad
        };
        db.get('students').push(studentRecord).write();

        // Automatically Generate Challan using Fee Settings
        const feeStructs = db.get('feeStructures').value() || [];
        const template = feeStructs.find(f => f.classProgram === ad.classProgram && f.sectionType === ad.sectionType) || feeStructs.find(f => f.classProgram === ad.classProgram);
        
        let feeDetails = [];
        let totalAmount = 0;
        if (template) {
           if (template.admissionFee > 0) { feeDetails.push({ type: 'Admission Fee', amount: template.admissionFee }); totalAmount += template.admissionFee; }
           if (template.registrationFee > 0) { feeDetails.push({ type: 'Registration Fee', amount: template.registrationFee }); totalAmount += template.registrationFee; }
           if (template.monthlyFee > 0) { feeDetails.push({ type: 'Monthly Fee', amount: template.monthlyFee }); totalAmount += template.monthlyFee; }
           if (template.annualCharges > 0) { feeDetails.push({ type: 'Annual Charges', amount: template.annualCharges }); totalAmount += template.annualCharges; }
           if (template.libraryFee > 0) { feeDetails.push({ type: 'Library Fee', amount: template.libraryFee }); totalAmount += template.libraryFee; }
           if (template.hostelFee > 0) { feeDetails.push({ type: 'Hostel Fee', amount: template.hostelFee }); totalAmount += template.hostelFee; }
           if (template.transportFee > 0) { feeDetails.push({ type: 'Transport Fee', amount: template.transportFee }); totalAmount += template.transportFee; }
           if (template.otherCharges > 0) { feeDetails.push({ type: 'Other Charges', amount: template.otherCharges }); totalAmount += template.otherCharges; }
        }

        if (totalAmount > 0) {
           const newChallan = {
             id: Date.now() + 1,
             challanNo: `CHL-${Math.floor(100000 + Math.random() * 900000)}`,
             studentId: studentRecord.studentId,
             rollNo: studentRecord.rollNo,
             studentName: studentRecord.studentName,
             fatherName: studentRecord.fatherName,
             classProgram: studentRecord.classProgram,
             session: "2026-27",
             feeDetails,
             totalAmount,
             issueDate: new Date().toISOString().split('T')[0],
             dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
             status: 'Unpaid',
             paidAmount: 0
           };
           db.get('challans').push(newChallan).write();
        }
     }
     res.json({ success: true, status });
  } else {
     res.status(404).json({ error: 'Admission not found' });
  }
});


app.put('/api/admin/admissions/:id', (req, res) => {
  const admissionId = req.params.id;
  const admission = db.get('admissions').find({ id: admissionId });
  if (admission.value()) {
     admission.assign(req.body).write();
     res.json({ success: true });
  } else {
     res.status(404).json({ error: 'Admission not found' });
  }
});

app.delete('/api/admin/admissions/:id', (req, res) => {
  const admissionId = parseInt(req.params.id) || req.params.id;
  db.get('admissions').remove({ id: admissionId }).write();
  res.json({ success: true });
});

app.get('/api/admin/students', (req, res) => {
  res.json(db.get('students').value() || []);
});

app.put('/api/admin/students/:id', (req, res) => {
  const sid = parseInt(req.params.id) || req.params.id;
  const student = db.get('students').find({ id: sid });
  if (student.value()) {
     student.assign(req.body).write();
     res.json({ success: true });
  } else {
     res.status(404).json({ error: 'Student not found' });
  }
});

// Results
app.get('/api/admin/results', (req, res) => res.json(db.get('results').value() || []));
app.post('/api/admin/results', (req, res) => {
  const newResult = { id: Date.now(), resultId: `RES-${Math.floor(1000 + Math.random() * 9000)}`, ...req.body };
  db.get('results').push(newResult).write();
  res.status(201).json(newResult);
});
app.put('/api/admin/results/:id', (req, res) => {
  const rid = parseInt(req.params.id) || req.params.id;
  const result = db.get('results').find({ id: rid });
  if (result.value()) {
     result.assign(req.body).write();
     res.json({ success: true });
  } else {
     res.status(404).json({ error: 'Result not found' });
  }
});
app.delete('/api/admin/results/:id', (req, res) => {
  const rid = parseInt(req.params.id) || req.params.id;
  db.get('results').remove({ id: rid }).write();
  res.json({ success: true });
});
// Challans
app.get('/api/admin/challans', (req, res) => res.json(db.get('challans').value() || []));
app.post('/api/admin/challans', (req, res) => {
  const newChallan = { id: Date.now(), challanNo: `CHL-${Math.floor(100000 + Math.random() * 900000)}`, ...req.body };
  db.get('challans').push(newChallan).write();
  res.status(201).json(newChallan);
});
app.put('/api/admin/challans/:id', (req, res) => {
  const cid = parseInt(req.params.id) || req.params.id;
  const challan = db.get('challans').find({ id: cid });
  if (challan.value()) {
     challan.assign(req.body).write();
     res.json({ success: true });
  } else {
     res.status(404).json({ error: 'Challan not found' });
  }
});
app.delete('/api/admin/challans/:id', (req, res) => {
  const cid = parseInt(req.params.id) || req.params.id;
  db.get('challans').remove({ id: cid }).write();
  res.json({ success: true });
});

// Fee Structures
app.get('/api/admin/fee-structures', (req, res) => res.json(db.get('feeStructures').value() || []));
app.post('/api/admin/fee-structures', (req, res) => {
  const newFS = { id: Date.now(), ...req.body };
  db.get('feeStructures').push(newFS).write();
  res.status(201).json(newFS);
});
app.put('/api/admin/fee-structures/:id', (req, res) => {
  const fsid = parseInt(req.params.id) || req.params.id;
  const fs = db.get('feeStructures').find({ id: fsid });
  if (fs.value()) {
     fs.assign(req.body).write();
     res.json({ success: true });
  } else {
     res.status(404).json({ error: 'Fee Structure not found' });
  }
});
app.delete('/api/admin/fee-structures/:id', (req, res) => {
  const fsid = parseInt(req.params.id) || req.params.id;
  db.get('feeStructures').remove({ id: fsid }).write();
  res.json({ success: true });
});

// Fee Categories
app.get('/api/admin/fee-categories', (req, res) => res.json(db.get('feeCategories').value() || []));
app.post('/api/admin/fee-categories', (req, res) => {
  const newCat = { id: Date.now(), ...req.body };
  db.get('feeCategories').push(newCat).write();
  res.status(201).json(newCat);
});
app.put('/api/admin/fee-categories/:id', (req, res) => {
  const cid = parseInt(req.params.id) || req.params.id;
  const cat = db.get('feeCategories').find({ id: cid });
  if (cat.value()) {
     cat.assign(req.body).write();
     res.json({ success: true });
  } else {
     res.status(404).json({ error: 'Fee Category not found' });
  }
});
app.delete('/api/admin/fee-categories/:id', (req, res) => {
  const cid = parseInt(req.params.id) || req.params.id;
  db.get('feeCategories').remove({ id: cid }).write();
  res.json({ success: true });
});

app.get('/api/results', (req, res) => res.json(db.get('results').value() || []));

app.delete('/api/admin/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id) || req.params.id;
  db.get('students').remove({ id: studentId }).write();
  res.json({ success: true });
});


// --- DONATIONS API ---
app.post('/api/donations', (req, res) => {
  try {
    const data = req.body;
    const dbDonations = db.get('donations');
    
    // Generate reference number
    const year = new Date().getFullYear();
    const count = dbDonations.value().length + 1;
    const refNo = `JSR-DON-${year}-${count.toString().padStart(4, '0')}`;
    
    const newDonation = {
      id: Date.now().toString(),
      refNo: refNo,
      fullName: data.fullName,
      fatherName: data.fatherName,
      mobileNumber: data.mobileNumber,
      email: data.email || '',
      city: data.city,
      amount: data.amount,
      purpose: data.purpose,
      remarks: data.remarks || '',
      category: data.category,
      receiptImage: data.receiptImage, // base64 string
      submissionDate: new Date().toISOString()
    };
    
    dbDonations.push(newDonation).write();
    res.json({ success: true, refNo: refNo, message: 'Donation submitted successfully' });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ error: 'Failed to submit donation' });
  }
});

app.get('/api/donations', (req, res) => {
  const donations = db.get('donations').value() || [];
  // Sort by submission date desc
  const sorted = [...donations].sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
  res.json(sorted);
});

app.get('/api/donation-portals', (req, res) => {
  res.json(db.get('donationPortals').value() || []);
});

app.get('/api/page-configs', (req, res) => {
  res.json(db.get('pageConfigs').value() || []);
});

// --- POPUP ANNOUNCEMENT API ---
app.get('/api/popup-announcement', (req, res) => {
  res.json(db.get('popupAnnouncement').value() || { enabled: false });
});

// --- Admission Requirements ---
app.get('/api/admin/admission-requirements', (req, res) => {
  res.json(db.get('admissionRequirements').value() || []);
});
app.get('/api/admission-requirements', (req, res) => {
  res.json(db.get('admissionRequirements').value() || []);
});
app.post('/api/admin/admission-requirements', (req, res) => {
  const newReq = { id: Date.now() + Math.floor(Math.random() * 1000), title: req.body.title, text: req.body.text };
  db.get('admissionRequirements').push(newReq).write();
  res.status(201).json(newReq);
});
app.put('/api/admin/admission-requirements/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('admissionRequirements').find({ id }).assign({ title: req.body.title, text: req.body.text }).write();
  res.json({ success: true });
});
app.delete('/api/admin/admission-requirements/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('admissionRequirements').remove({ id }).write();
  res.json({ success: true });
});


// --- Custom Form Fields API ---
app.get('/api/admin/form-fields', (req, res) => {
  res.json(db.get('customFormFields').value() || []);
});
app.get('/api/form-fields', (req, res) => {
  res.json(db.get('customFormFields').value() || []);
});
app.post('/api/admin/form-fields', (req, res) => {
  const newField = { 
    id: Date.now().toString(), 
    title: req.body.title, 
    type: req.body.type, 
    required: req.body.required, 
    options: req.body.options || '' 
  };
  db.get('customFormFields').push(newField).write();
  res.status(201).json(newField);
});
app.put('/api/admin/form-fields/:id', (req, res) => {
  const id = req.params.id;
  db.get('customFormFields').find({ id }).assign({ 
    title: req.body.title, 
    type: req.body.type, 
    required: req.body.required, 
    options: req.body.options 
  }).write();
  res.json({ success: true });
});
app.delete('/api/admin/form-fields/:id', (req, res) => {
  const id = req.params.id;
  db.get('customFormFields').remove({ id }).write();
  res.json({ success: true });
});


// --- Admin Authentication ---
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Hardcoded default admin for now (Can be moved to DB later)
  if (username === 'ahmad' && password === '2004@2003@') {
    // Generate a simple token (In production, use JWT)
    const token = 'admin_auth_token_' + Date.now();
    res.json({ success: true, token, user: { name: 'Admin', role: 'Principal' } });
  } else {
    res.status(401).json({ success: false, error: 'Invalid username or password' });
  }
});


// --- Expenses Management ---
app.get('/api/admin/expenses', (req, res) => {
  res.json(db.get('expenses').value() || []);
});
app.post('/api/admin/expenses', (req, res) => {
  const newExpense = { 
    id: Date.now().toString(), 
    ...req.body,
    dateCreated: new Date().toISOString()
  };
  if (!db.get('expenses').value()) db.set('expenses', []).write();
  db.get('expenses').push(newExpense).write();
  res.status(201).json(newExpense);
});
app.put('/api/admin/expenses/:id', (req, res) => {
  const id = req.params.id;
  db.get('expenses').find({ id }).assign({ ...req.body }).write();
  res.json({ success: true });
});
app.delete('/api/admin/expenses/:id', (req, res) => {
  const id = req.params.id;
  db.get('expenses').remove({ id }).write();
  res.json({ success: true });
});


// --- Public Student Search (For Roll Number Slips) ---
app.post('/api/public/student-search', (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required' });
  
  const students = db.get('students').value() || [];
  const student = students.find(s => 
    (s.rollNo && s.rollNo.toLowerCase() === query.toLowerCase()) || 
    (s.cnic && s.cnic.replace(/-/g, '') === query.replace(/-/g, ''))
  );
  
  if (student) {
    // Only return safe public info for slip
    res.json({
      rollNo: student.rollNo,
      studentName: student.studentName,
      fatherName: student.fatherName,
      classProgram: student.classProgram,
      sectionType: student.sectionType,
      session: student.fees?.session || '2026-27'
    });
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
