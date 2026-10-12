const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (dnsErr) {
  // Gracefully fallback if environment disallows overriding DNS
}

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const xlsx = require('xlsx');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const { apiLimiter, authLimiter, submissionLimiter, sanitizeInput } = require('./middleware/rateLimiter');

// Cloudinary Setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(sanitizeInput);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', apiLimiter);

// Production Health Check & Uptime Monitoring
app.get('/api/health', (req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;
  res.status(isMongoConnected ? 200 : 503).json({
    status: isMongoConnected ? 'healthy' : 'degraded',
    uptimeSeconds: Math.floor(process.uptime()),
    mongodb: isMongoConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    service: 'Jamia Sher-e-Rabbani Backend API'
  });
});

// --- Mongoose Models ---
const Course = require('./models/Course');
const Admission = require('./models/Admission');
const Student = require('./models/Student');
const Challan = require('./models/Challan');
const Faculty = require('./models/Faculty');
const News = require('./models/News');
const Expense = require('./models/Expense');
const FeeStructure = require('./models/FeeStructure');
const InternshipCertificate = require('./models/InternshipCertificate');
const Internship = require('./models/Internship');
const Donation = require('./models/Donation');
const FormField = require('./models/FormField');
const AdmissionRequirement = require('./models/AdmissionRequirement');
const SystemSetting = require('./models/SystemSetting');
const User = require('./models/User');

// --- Auth Middleware & Uploads ---
const { requireAdminAuth } = require('./middleware/auth');
const { upload, saveBase64ToFile } = require('./middleware/upload');
const backupService = require('./services/backupService');

// ----------------------------------------------------
// File Upload Routes (Multer Multipart)
// ----------------------------------------------------
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }
  const subfolder = req.query.folder || req.body.folder || 'general';
  const fileUrl = `/uploads/${subfolder}/${req.file.filename}`;
  res.json({
    success: true,
    url: fileUrl,
    name: req.file.originalname,
    size: (req.file.size / 1024).toFixed(1) + ' KB',
    type: req.file.mimetype
  });
});

app.post('/api/upload/multiple', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files provided' });
  }
  const subfolder = req.query.folder || req.body.folder || 'general';
  const results = req.files.map(file => ({
    url: `/uploads/${subfolder}/${file.filename}`,
    name: file.originalname,
    size: (file.size / 1024).toFixed(1) + ' KB',
    type: file.mimetype
  }));
  res.json({ success: true, files: results });
});

// MongoDB Connection with Serverless Promise Caching
let cachedMongoConn = null;

async function connectToMongo() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedMongoConn) {
    try {
      await cachedMongoConn;
      return mongoose.connection;
    } catch (e) {
      cachedMongoConn = null;
    }
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined.');
  }

  cachedMongoConn = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000
  });

  await cachedMongoConn;
  console.log('MongoDB connected successfully with Mongoose Models & Security!');
  if (!process.env.VERCEL) {
    backupService.initScheduledBackups();
  }
  return mongoose.connection;
}

// Initial connection attempt on process startup (for local / persistent instances)
connectToMongo().catch(err => {
  console.error('Initial MongoDB connection error:', err.message);
});

// Middleware: Ensure MongoDB is connected before handling any data requests
app.use(async (req, res, next) => {
  if (req.path === '/api/health') {
    return next();
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      await connectToMongo();
    }
    next();
  } catch (err) {
    console.error('MongoDB connection middleware failure:', err.message);
    return res.status(503).json({
      error: 'Database connection failed. Please ensure MONGODB_URI is properly set.',
      details: err.message
    });
  }
});

// Settings Helpers
async function getSetting(key, defaultValue = {}) {
  try {
    const doc = await SystemSetting.findOne({ key }).lean();
    return doc ? doc.value : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

async function setSetting(key, value) {
  try {
    return await SystemSetting.findOneAndUpdate(
      { key },
      { key, value },
      { upsert: true, returnDocument: 'after' }
    );
  } catch (e) {
    console.error(`Error saving setting ${key}:`, e.message);
  }
}

// ----------------------------------------------------
// Analytics Routes
// ----------------------------------------------------
app.post('/api/visit', async (req, res) => {
  try {
    const dateStr = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
    const analytics = await getSetting('analytics', { visits: {} });
    if (!analytics.visits) analytics.visits = {};
    analytics.visits[dateStr] = (analytics.visits[dateStr] || 0) + 1;
    await setSetting('analytics', analytics);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: true });
  }
});

app.get('/api/admin/analytics', requireAdminAuth, async (req, res) => {
  const analytics = await getSetting('analytics', { visits: {} });
  res.json(analytics);
});

// ----------------------------------------------------
// Exam Mess Routes
// ----------------------------------------------------
app.get('/api/exam-mess/config', async (req, res) => {
  const rawConfig = await getSetting('messConfig', { fee: 3000, examName: 'Salana Imtihaan 2026' });
  const config = {
    fee: Number(rawConfig?.fee) || 3000,
    examName: rawConfig?.examName || 'Salana Imtihaan 2026'
  };
  res.json(config);
});

app.get('/api/admin/mess-applications', requireAdminAuth, async (req, res) => {
  let applications = await getSetting('messApplications', []);
  if (!Array.isArray(applications)) applications = [];
  res.json(applications);
});

app.post('/api/exam-mess/apply', async (req, res) => {
  try {
    const { studentName, fatherName, phone } = req.body;
    if (!studentName || !fatherName || !phone) {
      return res.status(400).json({ error: 'Student name, father name, and phone number are required.' });
    }

    const rawConfig = await getSetting('messConfig', { fee: 3000, examName: 'Salana Imtihaan 2026' });
    const feeAmount = Number(rawConfig?.fee) || 3000;
    const examTitle = rawConfig?.examName || 'Salana Imtihaan 2026';
    const challanNo = 'MESS' + Date.now().toString().slice(-6);

    const challan = await Challan.create({
      id: Date.now(),
      challanNo,
      studentName: studentName.trim(),
      fatherName: fatherName.trim(),
      phone: phone.trim(),
      classProgram: examTitle + ' Qayam-o-Ta\'am',
      feeDetails: [{ type: "Zar-e-Ta'awun (Qayam-o-Ta'am)", amount: feeAmount }],
      totalAmount: feeAmount,
      issueDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Unpaid',
      paidAmount: 0,
      type: 'Mess'
    });

    const appData = {
      id: Date.now(),
      studentName: studentName.trim(),
      fatherName: fatherName.trim(),
      phone: phone.trim(),
      challanNo,
      date: new Date().toISOString()
    };

    let messApps = await getSetting('messApplications', []);
    if (!Array.isArray(messApps)) {
      messApps = [];
    }
    messApps.push(appData);
    await setSetting('messApplications', messApps);

    // Send Telegram Notification
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const message = `🍲 *New Imtihaani Qayam-o-Ta'am Application* 🍲\n\n*Student:* ${studentName}\n*Father:* ${fatherName}\n*Phone:* ${phone}\n*Challan No:* \`${challanNo}\`\n*Amount:* Rs ${feeAmount}\n*Date:* ${new Date().toLocaleString()}`;
      const tUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;
      fetch(tUrl).catch(e => console.error("Telegram notification failed:", e));
    }

    res.json({ success: true, challan, application: appData });
  } catch (err) {
    console.error("Exam mess error:", err);
    res.status(500).json({ error: "Failed to submit exam mess application: " + (err.message || 'Unknown error') });
  }
});

// ----------------------------------------------------
// Fee & Admission Configurations
// ----------------------------------------------------
app.get('/api/fee-config', async (req, res) => {
  const feeConfig = await getSetting('feeConfig', {
    admissionFee: 2000,
    registrationFee: 1000,
    session: "2026-27"
  });
  res.json(feeConfig);
});

app.post('/api/admin/fee-config', requireAdminAuth, async (req, res) => {
  await setSetting('feeConfig', req.body);
  res.json({ success: true });
});

app.get('/api/admission-schedule', async (req, res) => {
  const schedule = await getSetting('admissionSchedule', {
    enabled: true,
    dailyLateFee: 170,
    phases: []
  });
  res.json(schedule);
});

app.post('/api/admin/admission-schedule', requireAdminAuth, async (req, res) => {
  await setSetting('admissionSchedule', req.body);
  res.json({ success: true });
});

// --- Dynamic 3-Accounts Payment Configuration ---
const DEFAULT_PAYMENT_ACCOUNTS = {
  meezan: {
    bankName: "Meezan Bank",
    accountTitle: "Muhammad Ahmad (Asaan Account)",
    accountNumber: "98690112101313",
    branch: "Mananwala",
    iban: "PK12MEZN0098690112101313"
  },
  jazzcash: {
    accountTitle: "Muhammad Ahmad",
    accountNumber: "03284381312",
    instructions: "Send via JazzCash App -> Money Transfer / Mobile Account"
  },
  nayapay: {
    accountTitle: "Muhammad Ahmad",
    accountNumber: "03164415465",
    instructions: "Send via NayaPay / Raast (Instant & 0% fee)"
  },
  // Backward compatibility fields:
  bankName: "Meezan Bank",
  accountTitle: "Muhammad Ahmad (Asaan Account)",
  accountNumber: "98690112101313"
};

app.get('/api/payment-accounts', async (req, res) => {
  const accounts = await getSetting('paymentAccounts', DEFAULT_PAYMENT_ACCOUNTS);
  res.json({ ...DEFAULT_PAYMENT_ACCOUNTS, ...accounts });
});

app.get('/api/bank-config', async (req, res) => {
  const accounts = await getSetting('paymentAccounts', DEFAULT_PAYMENT_ACCOUNTS);
  res.json({ ...DEFAULT_PAYMENT_ACCOUNTS, ...accounts });
});

app.post('/api/admin/payment-accounts', requireAdminAuth, async (req, res) => {
  await setSetting('paymentAccounts', req.body);
  res.json({ success: true, message: 'Payment accounts updated successfully' });
});

app.post('/api/admin/bank-config', requireAdminAuth, async (req, res) => {
  await setSetting('paymentAccounts', req.body);
  res.json({ success: true });
});

// ----------------------------------------------------
// Admissions Routes
// ----------------------------------------------------
app.post('/api/admissions', submissionLimiter, async (req, res) => {
  try {
    const feeConfig = await getSetting('feeConfig', { admissionFee: 2000, registrationFee: 1000, session: "2026-27" });
    const feeStructures = await FeeStructure.find().lean();
    const schedule = await getSetting('admissionSchedule', { enabled: true, dailyLateFee: 170, phases: [] });

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

    let rawClass = req.body.classProgram || "";
    rawClass = rawClass.replace(/\s*\([^)]*\)\s*$/, '').trim();

    const { studentName, fatherName, dob, cnic, mobile, sectionType, documents } = req.body;
    if (!studentName || !fatherName || !dob || !cnic || !mobile || !sectionType || !rawClass) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let cleanCnic = (cnic || '').trim();
    if (/^\d{13}$/.test(cleanCnic)) {
      cleanCnic = `${cleanCnic.slice(0,5)}-${cleanCnic.slice(5,12)}-${cleanCnic.slice(12)}`;
      req.body.cnic = cleanCnic;
    }

    if (!/^\d{5}-\d{7}-\d{1}$/.test(cleanCnic)) {
      return res.status(400).json({ error: 'Invalid CNIC format. Please enter a valid 13-digit CNIC or B-Form number.' });
    }

    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (isNaN(birthDate.getTime()) || birthDate > today || age < 3 || age > 90) {
      return res.status(400).json({ error: 'Please enter a valid Date of Birth.' });
    }

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

    // Document Upload Logic: Cloudinary if configured, otherwise save to disk uploads/admissions/
    if (documents) {
      try {
        const uploadPromises = Object.entries(documents).map(async ([docId, docData]) => {
          if (!docData) return [docId, docData];

          // If docData has data URI (Base64)
          if (docData.data && docData.data.startsWith('data:')) {
            if (process.env.CLOUDINARY_CLOUD_NAME) {
              try {
                const result = await cloudinary.uploader.upload(docData.data, {
                  folder: 'jamia_admissions',
                  public_id: `${cnic.replace(/[^0-9]/g, '')}_${docId}_${Date.now()}`
                });
                return [docId, { ...docData, data: result.secure_url, url: result.secure_url }];
              } catch (cErr) {
                console.warn("Cloudinary upload failed, falling back to local disk:", cErr.message);
              }
            }
            // Fallback / Local disk upload
            const fileUrl = saveBase64ToFile(docData.data, 'admissions', `${cnic.replace(/[^0-9]/g, '')}_${docId}`);
            return [docId, { ...docData, data: fileUrl, url: fileUrl }];
          }

          // If docData is direct string that is base64
          if (typeof docData === 'string' && docData.startsWith('data:')) {
            const fileUrl = saveBase64ToFile(docData, 'admissions', `${cnic.replace(/[^0-9]/g, '')}_${docId}`);
            return [docId, { name: `${docId}.jpg`, data: fileUrl, url: fileUrl }];
          }

          return [docId, docData];
        });
        const resolvedDocs = await Promise.all(uploadPromises);
        req.body.documents = Object.fromEntries(resolvedDocs);
      } catch (uploadErr) {
        console.error("Document upload processing error:", uploadErr);
      }
    }

    const mappedClass = classMapping[rawClass] || rawClass;
    const reqSection = req.body.sectionType;
    const normalizedSection = reqSection.includes('Section') ? reqSection : reqSection + ' Section';

    const classFee = feeStructures.find(f => 
      f.classProgram === mappedClass && 
      f.sectionType === normalizedSection
    ) || feeConfig;

    let finalFees = {
      admissionFee: classFee.admissionFee,
      registrationFee: classFee.registrationFee,
      session: feeConfig.session,
      lateFeeDays: 0,
      dailyLateFeeRate: 0,
      totalLateFee: 0
    };

    const isSpecialCourse = ["Hifz-ul-Quran", "Tajweed-o-Qira'at"].includes(rawClass);

    if (isSpecialCourse) {
      const procType = req.body.processingType || 'Normal';
      const sFeeConfig = schedule?.specialFees?.[rawClass];
      if (sFeeConfig) {
        finalFees.admissionFee = procType === 'Urgent' ? sFeeConfig.urgent : sFeeConfig.normal;
      }
    } else if (schedule && schedule.enabled && schedule.phases && schedule.phases.length > 0) {
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);

      const sortedPhases = [...schedule.phases].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      let phaseIndex = -1;

      for (let i = 0; i < sortedPhases.length; i++) {
        const pStart = new Date(sortedPhases[i].startDate); pStart.setHours(0,0,0,0);
        const pEnd = new Date(sortedPhases[i].endDate); pEnd.setHours(23,59,59,999);
        if (todayDate >= pStart && todayDate <= pEnd) { phaseIndex = i; break; }
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

        if (todayDate > lastPhaseEnd) {
          finalFees.admissionFee = classFee.phase3Fee || classFee.admissionFee;
          const diffTime = Math.abs(todayDate.getTime() - lastPhaseEnd.getTime());
          const lateDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          finalFees.lateFeeDays = lateDays;
          finalFees.dailyLateFeeRate = schedule.dailyLateFee || 170;
          finalFees.totalLateFee = lateDays * finalFees.dailyLateFeeRate;
        } else if (todayDate < firstPhaseStart) {
          finalFees.admissionFee = classFee.phase1Fee || classFee.admissionFee;
        }
      }
    }

    const globalRegistrationFee = feeConfig.registrationFee || 1000;
    finalFees.totalFee = finalFees.admissionFee;
    finalFees.registrationFee = globalRegistrationFee;
    finalFees.admissionFee = Math.max(0, finalFees.totalFee - globalRegistrationFee);

    const admissionId = Date.now();
    const newAdmission = await Admission.create({
      id: admissionId,
      ...req.body,
      challanNo: `JS-${Math.floor(1000 + Math.random() * 9000)}`,
      applicationNo: `APP-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString(),
      status: 'Pending',
      fees: finalFees
    });

    // Create Student Record
    const studentRecord = await Student.create({
      id: Date.now() + 1,
      studentId: `STU-${Math.floor(10000 + Math.random() * 90000)}`,
      rollNo: `${newAdmission.classProgram ? newAdmission.classProgram.substring(0,3).toUpperCase() : 'CLS'}-${Math.floor(100 + Math.random() * 900)}`,
      studentName: newAdmission.studentName,
      fatherName: newAdmission.fatherName,
      dob: newAdmission.dob,
      cnic: newAdmission.cnic,
      mobile: newAdmission.mobile,
      whatsapp: newAdmission.whatsapp,
      sectionType: newAdmission.sectionType,
      classProgram: newAdmission.classProgram,
      fees: finalFees,
      documents: newAdmission.documents
    });

    // Automatically Generate Challan
    let feeDetails = [];
    let totalAmount = 0;

    if (finalFees.registrationFee > 0) { feeDetails.push({ type: 'Registration Fee', amount: finalFees.registrationFee }); totalAmount += finalFees.registrationFee; }
    if (finalFees.admissionFee > 0) { feeDetails.push({ type: 'Admission Fee', amount: finalFees.admissionFee }); totalAmount += finalFees.admissionFee; }
    if (finalFees.totalLateFee > 0) { feeDetails.push({ type: `Late Fee (${finalFees.lateFeeDays} Days)`, amount: finalFees.totalLateFee }); totalAmount += finalFees.totalLateFee; }

    const template = feeStructures.find(f => f.classProgram === mappedClass && f.sectionType === normalizedSection);
    if (template) {
      if (template.monthlyFee > 0) { feeDetails.push({ type: 'Monthly Fee', amount: template.monthlyFee }); totalAmount += template.monthlyFee; }
      if (template.annualCharges > 0) { feeDetails.push({ type: 'Annual Charges', amount: template.annualCharges }); totalAmount += template.annualCharges; }
      if (template.libraryFee > 0) { feeDetails.push({ type: 'Library Fee', amount: template.libraryFee }); totalAmount += template.libraryFee; }
      if (template.hostelFee > 0) { feeDetails.push({ type: 'Hostel Fee', amount: template.hostelFee }); totalAmount += template.hostelFee; }
      if (template.transportFee > 0) { feeDetails.push({ type: 'Transport Fee', amount: template.transportFee }); totalAmount += template.transportFee; }
      if (template.otherCharges > 0) { feeDetails.push({ type: 'Other Charges', amount: template.otherCharges }); totalAmount += template.otherCharges; }
    }

    if (totalAmount > 0) {
      await Challan.create({
        id: Date.now() + 2,
        challanNo: newAdmission.challanNo,
        studentId: studentRecord.studentId,
        rollNo: studentRecord.rollNo,
        studentName: studentRecord.studentName,
        fatherName: studentRecord.fatherName,
        classProgram: studentRecord.classProgram,
        session: finalFees.session || "2026-27",
        feeDetails,
        totalAmount,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Unpaid',
        paidAmount: 0
      });
    }

    // Admin Notifications
    const message = `🔔 *Naya Admission Aaya Hai!*\n\n*📝 Talib-e-Ilm Ki Tafseelat:*\n*Naam:* ${newAdmission.studentName}\n*Walid ka Naam:* ${newAdmission.fatherName}\n*B-Form / CNIC:* ${newAdmission.cnic}\n*Date of Birth:* ${new Date(newAdmission.dob).toLocaleDateString()}\n*Mobile:* ${newAdmission.mobile}\n\n*📚 Dakhla Ki Tafseelat:*\n*Class / Program:* ${newAdmission.classProgram}\n*Section:* ${newAdmission.sectionType}\n*Processing:* ${newAdmission.processingType || 'Normal'}\n*Application No:* ${newAdmission.applicationNo}\n\n*💰 Fees Ki Tafseelat:*\n*Admission Fee:* Rs ${newAdmission.fees.admissionFee}\n*Registration Fee:* Rs ${newAdmission.fees.registrationFee}\n*Total Amount:* Rs ${newAdmission.fees.totalFee}\n\nJald az jald Admin Panel check karen.`;

    if (process.env.WHATSAPP_ADMIN_PHONE && process.env.WHATSAPP_API_KEY) {
      const wUrl = `https://api.callmebot.com/whatsapp.php?phone=${process.env.WHATSAPP_ADMIN_PHONE}&text=${encodeURIComponent(message)}&apikey=${process.env.WHATSAPP_API_KEY}`;
      fetch(wUrl).catch(err => console.error("WhatsApp notification failed:", err));
    }

    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const tUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;
      fetch(tUrl).catch(err => console.error("Telegram notification failed:", err));
    }

    res.status(201).json(newAdmission);
  } catch (err) {
    console.error("Admissions error:", err);
    res.status(500).json({ error: "Failed to submit admission: " + (err.message || "Unknown error") });
  }
});

app.get('/api/admin/admissions', requireAdminAuth, async (req, res) => {
  const admissions = await Admission.find().sort({ createdAt: -1 }).lean();
  res.json(admissions);
});

app.put('/api/admin/admissions/:id/status', requireAdminAuth, async (req, res) => {
  const { status } = req.body;
  const id = parseInt(req.params.id) || req.params.id;
  const admission = await Admission.findOneAndUpdate({ id }, { status }, { returnDocument: 'after' });
  if (admission) {
    res.json({ success: true, status });
  } else {
    res.status(404).json({ error: 'Admission not found' });
  }
});

app.put('/api/admin/admissions/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  const admission = await Admission.findOneAndUpdate({ id }, req.body, { returnDocument: 'after' });
  if (admission) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Admission not found' });
  }
});

app.delete('/api/admin/admissions/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  await Admission.findOneAndDelete({ id });
  res.json({ success: true });
});

// ----------------------------------------------------
// Students Routes
// ----------------------------------------------------
app.get('/api/admin/students', requireAdminAuth, async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 }).lean();
  res.json(students);
});

app.put('/api/admin/students/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  const student = await Student.findOneAndUpdate({ id }, req.body, { returnDocument: 'after' });
  if (student) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.delete('/api/admin/students/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  await Student.findOneAndDelete({ id });
  res.json({ success: true });
});

// ----------------------------------------------------
// Challans & Online Payment Routes
// ----------------------------------------------------
app.get('/api/admin/challans', requireAdminAuth, async (req, res) => {
  const challans = await Challan.find().sort({ createdAt: -1 }).lean();
  res.json(challans);
});

app.post('/api/admin/challans', requireAdminAuth, async (req, res) => {
  const newChallan = await Challan.create({
    id: Date.now(),
    challanNo: `CHL-${Math.floor(100000 + Math.random() * 900000)}`,
    ...req.body
  });
  res.status(201).json(newChallan);
});

app.put('/api/admin/challans/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  const oldData = await Challan.findOne({ id }).lean();
  if (oldData) {
    const updated = await Challan.findOneAndUpdate({ id }, req.body, { returnDocument: 'after' }).lean();
    if (oldData.status !== 'Paid' && updated.status === 'Paid') {
      const message = `💰 *Fee Jama Ho Gayi!*\n\n*Bachay ka Naam:* ${updated.studentName}\n*Class:* ${updated.classProgram}\n*Challan No:* ${updated.challanNo}\n*Method:* ${updated.paymentMethod || 'Bank Deposit'}\n*Amount Paid:* Rs ${updated.paidAmount}\n\nRecord update kar diya gaya hai.`;
      if (process.env.WHATSAPP_ADMIN_PHONE && process.env.WHATSAPP_API_KEY) {
        const wUrl = `https://api.callmebot.com/whatsapp.php?phone=${process.env.WHATSAPP_ADMIN_PHONE}&text=${encodeURIComponent(message)}&apikey=${process.env.WHATSAPP_API_KEY}`;
        fetch(wUrl).catch(e => console.error("WhatsApp notification failed:", e));
      }
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
        const tUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;
        fetch(tUrl).catch(e => console.error("Telegram notification failed:", e));
      }
    }
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Challan not found' });
  }
});

app.delete('/api/admin/challans/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  await Challan.findOneAndDelete({ id });
  res.json({ success: true });
});

// Robust Helper: Look up Challan by challanNo, with fallback to Admission records
async function findChallanByNo(rawChallanNo) {
  if (!rawChallanNo) return null;
  const cleanNo = String(rawChallanNo).trim();

  // 1. Direct or case-insensitive search in Challans collection
  let challan = await Challan.findOne({
    $or: [
      { challanNo: cleanNo },
      { challanNo: new RegExp(`^${cleanNo}$`, 'i') }
    ]
  });
  if (challan) return challan;

  // 2. Fallback search via Admissions collection (by challanNo or applicationNo)
  const admission = await Admission.findOne({
    $or: [
      { challanNo: cleanNo },
      { challanNo: new RegExp(`^${cleanNo}$`, 'i') },
      { applicationNo: cleanNo },
      { applicationNo: new RegExp(`^${cleanNo}$`, 'i') }
    ]
  });

  if (admission) {
    // Check if Challan was previously recorded with student info
    challan = await Challan.findOne({
      studentName: admission.studentName,
      fatherName: admission.fatherName
    }).sort({ createdAt: -1 });

    if (challan) {
      challan.challanNo = admission.challanNo;
      await challan.save();
      return challan;
    }

    // Auto-create Challan if none existed
    const totalFee = admission.fees?.totalFee || ((admission.fees?.admissionFee || 0) + (admission.fees?.registrationFee || 0) + (admission.fees?.totalLateFee || 0));
    challan = await Challan.create({
      id: Date.now(),
      challanNo: admission.challanNo,
      studentName: admission.studentName,
      fatherName: admission.fatherName,
      classProgram: admission.classProgram,
      session: admission.fees?.session || "2026-27",
      feeDetails: [{ type: 'Admission Fee', amount: totalFee }],
      totalAmount: totalFee,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Unpaid',
      paidAmount: 0
    });
    return challan;
  }

  return null;
}

// --- Public Submit Payment via JazzCash / NayaPay / Meezan ---
app.post('/api/public/submit-challan-payment', submissionLimiter, async (req, res) => {
  try {
    const { challanNo, paymentMethod, transactionId, senderPhone, receiptImage } = req.body;
    if (!challanNo || !paymentMethod || !transactionId) {
      return res.status(400).json({ error: 'Challan number, payment method, and Transaction ID (TID) are required.' });
    }

    const challan = await findChallanByNo(challanNo);
    if (!challan) {
      return res.status(404).json({ error: 'Challan not found. Please verify challan number.' });
    }

    let paymentProofUrl = '';
    if (receiptImage && receiptImage.startsWith('data:')) {
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        try {
          const result = await cloudinary.uploader.upload(receiptImage, {
            folder: 'jamia_payment_proofs',
            public_id: `${challanNo}_${Date.now()}`
          });
          paymentProofUrl = result.secure_url;
        } catch (uploadErr) {
          console.warn('Receipt upload to Cloudinary failed, falling back to local disk:', uploadErr.message);
        }
      }
      if (!paymentProofUrl) {
        paymentProofUrl = saveBase64ToFile(receiptImage, 'receipts', `receipt_${challanNo}`);
      }
    } else if (receiptImage && (receiptImage.startsWith('http') || receiptImage.startsWith('/uploads/'))) {
      paymentProofUrl = receiptImage;
    }

    challan.status = 'Pending Verification';
    challan.paymentMethod = paymentMethod;
    challan.transactionId = transactionId.trim();
    challan.senderPhone = senderPhone || '';
    if (paymentProofUrl) challan.paymentProofUrl = paymentProofUrl;
    challan.paymentSubmittedAt = new Date().toISOString();
    await challan.save();

    // Telegram Notification
    const message = `💳 *Nayi Online Fee Payment Submit Hui Hai!* 💳\n\n*Student:* ${challan.studentName}\n*Father:* ${challan.fatherName || 'N/A'}\n*Challan No:* \`${challan.challanNo}\`\n*Amount:* Rs ${challan.totalAmount}\n*Payment Method:* ${paymentMethod}\n*Transaction ID (TID):* \`${transactionId.trim()}\`\n*Sender Mobile:* ${senderPhone || 'Not provided'}\n*Date:* ${new Date().toLocaleString()}\n\nBaraye meharbani Admin Panel se check kar ke verify karen.`;
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const tUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;
      fetch(tUrl).catch(e => console.error("Telegram alert error:", e));
    }

    res.json({
      success: true,
      message: 'Payment details submitted successfully! Your receipt is now under verification.',
      challan
    });
  } catch (err) {
    console.error('Payment submission error:', err);
    res.status(500).json({ error: 'Failed to submit payment details' });
  }
});

// --- Admin One-Click Payment Verification ---
app.post('/api/admin/verify-challan-payment/:id', requireAdminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id) || req.params.id;
    const challan = await Challan.findOne({ id });
    if (!challan) {
      return res.status(404).json({ error: 'Challan not found' });
    }

    challan.status = 'Paid';
    challan.paidAmount = challan.totalAmount;
    challan.paidDate = new Date().toISOString();
    challan.verifiedBy = req.user.username;
    challan.verifiedAt = new Date().toISOString();
    await challan.save();

    // Update associated admission status
    await Admission.findOneAndUpdate(
      { challanNo: challan.challanNo, status: 'Pending' },
      { status: 'Approved' }
    );

    // Update student fee status
    await Student.findOneAndUpdate(
      { rollNo: challan.rollNo },
      { 'fees.status': 'Paid' }
    );

    // Notifications
    const message = `💰 *Fee Payment Verified & Approved!*\n\n*Student:* ${challan.studentName}\n*Class:* ${challan.classProgram}\n*Challan No:* ${challan.challanNo}\n*Method:* ${challan.paymentMethod || 'Online'}\n*TID:* ${challan.transactionId || 'N/A'}\n*Amount:* Rs ${challan.totalAmount}\n\nRecord marked as PAID. Official receipt generated.`;
    if (process.env.WHATSAPP_ADMIN_PHONE && process.env.WHATSAPP_API_KEY) {
      const wUrl = `https://api.callmebot.com/whatsapp.php?phone=${process.env.WHATSAPP_ADMIN_PHONE}&text=${encodeURIComponent(message)}&apikey=${process.env.WHATSAPP_API_KEY}`;
      fetch(wUrl).catch(e => console.error("WhatsApp alert error:", e));
    }
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const tUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;
      fetch(tUrl).catch(e => console.error("Telegram alert error:", e));
    }

    res.json({ success: true, message: 'Challan marked as Paid successfully', challan });
  } catch (err) {
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// --- Public Challan Status Check ---
app.get('/api/public/challan-status/:challanNo', async (req, res) => {
  try {
    const challan = await findChallanByNo(req.params.challanNo);
    if (challan) {
      res.json(challan);
    } else {
      res.status(404).json({ error: 'Challan not found. Please verify challan number.' });
    }
  } catch (err) {
    console.error('Challan status error:', err);
    res.status(500).json({ error: 'Failed to fetch challan status' });
  }
});

// ----------------------------------------------------
// Fee Structures Routes
// ----------------------------------------------------
app.get('/api/admin/fee-structures', requireAdminAuth, async (req, res) => {
  const feeStructures = await FeeStructure.find().lean();
  res.json(feeStructures);
});

app.post('/api/admin/fee-structures', requireAdminAuth, async (req, res) => {
  const newFS = await FeeStructure.create({ id: Date.now(), ...req.body });
  res.status(201).json(newFS);
});

app.put('/api/admin/fee-structures/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  const fs = await FeeStructure.findOneAndUpdate({ id }, req.body, { returnDocument: 'after' });
  if (fs) res.json({ success: true });
  else res.status(404).json({ error: 'Fee Structure not found' });
});

app.delete('/api/admin/fee-structures/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  await FeeStructure.findOneAndDelete({ id });
  res.json({ success: true });
});

// Fee Categories
app.get('/api/admin/fee-categories', requireAdminAuth, async (req, res) => {
  res.json(await getSetting('feeCategories', []));
});

app.post('/api/admin/fee-categories', requireAdminAuth, async (req, res) => {
  const cats = await getSetting('feeCategories', []);
  const newCat = { id: Date.now(), ...req.body };
  cats.push(newCat);
  await setSetting('feeCategories', cats);
  res.status(201).json(newCat);
});

app.put('/api/admin/fee-categories/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  const cats = await getSetting('feeCategories', []);
  const idx = cats.findIndex(c => c.id === id);
  if (idx !== -1) {
    cats[idx] = { ...cats[idx], ...req.body };
    await setSetting('feeCategories', cats);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Fee Category not found' });
  }
});

app.delete('/api/admin/fee-categories/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  let cats = await getSetting('feeCategories', []);
  cats = cats.filter(c => c.id !== id);
  await setSetting('feeCategories', cats);
  res.json({ success: true });
});

app.get('/api/results', async (req, res) => {
  res.json(await getSetting('results', []));
});

// ----------------------------------------------------
// Courses Routes
// ----------------------------------------------------
app.get('/api/courses', async (req, res) => {
  const courses = await Course.find().sort({ id: 1 }).lean();
  res.json(courses);
});

app.get('/api/courses/:id', async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  const course = await Course.findOne({ id }).lean();
  if (course) res.json(course);
  else res.status(404).json({ error: 'Course not found' });
});

app.get('/api/admin/courses', requireAdminAuth, async (req, res) => {
  const courses = await Course.find().sort({ id: 1 }).lean();
  res.json(courses);
});

app.post('/api/admin/courses', requireAdminAuth, async (req, res) => {
  const newCourse = await Course.create({
    id: Date.now(),
    courseId: `CRS-${Math.floor(1000 + Math.random() * 9000)}`,
    ...req.body
  });
  res.status(201).json(newCourse);
});

app.put('/api/admin/courses/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  const course = await Course.findOneAndUpdate({ id }, req.body, { returnDocument: 'after' });
  if (course) res.json({ success: true });
  else res.status(404).json({ error: 'Course not found' });
});

app.delete('/api/admin/courses/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  await Course.findOneAndDelete({ id });
  res.json({ success: true });
});

// ----------------------------------------------------
// Faculty Routes
// ----------------------------------------------------
app.get('/api/faculty', async (req, res) => {
  const faculty = await Faculty.find().sort({ id: 1 }).lean();
  res.json(faculty);
});

app.get('/api/faculty/:id', async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  const member = await Faculty.findOne({ id }).lean();
  if (member) res.json(member);
  else res.status(404).json({ error: 'Faculty member not found' });
});

app.get('/api/admin/faculty', requireAdminAuth, async (req, res) => {
  const faculty = await Faculty.find().sort({ id: 1 }).lean();
  res.json(faculty);
});

app.post('/api/admin/faculty', requireAdminAuth, async (req, res) => {
  const newFaculty = await Faculty.create({
    id: Date.now(),
    facultyId: `FAC-${Math.floor(1000 + Math.random() * 9000)}`,
    ...req.body
  });
  res.status(201).json(newFaculty);
});

app.put('/api/admin/faculty/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  const fac = await Faculty.findOneAndUpdate({ id }, req.body, { returnDocument: 'after' });
  if (fac) res.json({ success: true });
  else res.status(404).json({ error: 'Faculty not found' });
});

app.delete('/api/admin/faculty/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  await Faculty.findOneAndDelete({ id });
  res.json({ success: true });
});

// ----------------------------------------------------
// News Routes
// ----------------------------------------------------
app.get('/api/news', async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 }).lean();
  res.json(news);
});

app.get('/api/news/:id', async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  const article = await News.findOne({ id }).lean();
  if (article) res.json(article);
  else res.status(404).json({ error: 'News article not found' });
});

// ----------------------------------------------------
// Admin Stats & Backup
// ----------------------------------------------------
app.get('/api/admin/stats', requireAdminAuth, async (req, res) => {
  res.json({
    courses: await Course.countDocuments(),
    faculty: await Faculty.countDocuments(),
    news: await News.countDocuments(),
    contacts: await getSetting('contacts', []).then(c => Array.isArray(c) ? c.length : 0),
    admissions: await Admission.countDocuments(),
  });
});

app.get('/api/admin/backup', requireAdminAuth, async (req, res) => {
  try {
    const backupObj = await backupService.generateBackupData();
    res.setHeader('Content-Disposition', `attachment; filename="jamia_backup_${new Date().toISOString().split('T')[0]}.json"`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(backupObj, null, 2));
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate JSON backup: ' + err.message });
  }
});

// List Stored Server Snapshots
app.get('/api/admin/backups/list', requireAdminAuth, (req, res) => {
  try {
    const snapshotInfo = backupService.listSnapshots();
    res.json(snapshotInfo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list snapshots: ' + err.message });
  }
});

// Trigger Instant Manual Snapshot
app.post('/api/admin/backups/create', requireAdminAuth, async (req, res) => {
  try {
    const result = await backupService.createSnapshotFile('jamia_backup_manual');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create snapshot: ' + err.message });
  }
});

// Download a Specific Stored Snapshot
app.get('/api/admin/backups/download/:filename', requireAdminAuth, (req, res) => {
  try {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(backupService.BACKUPS_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Backup snapshot not found' });
    }
    res.download(filePath, filename);
  } catch (err) {
    res.status(500).json({ error: 'Download failed: ' + err.message });
  }
});

// Safe Database Restore (Disaster Recovery with Pre-restore safety snapshot)
app.post('/api/admin/restore', requireAdminAuth, async (req, res) => {
  try {
    const { mode = 'replace', snapshotFilename, data } = req.body;
    let payload = data;

    if (!payload && snapshotFilename) {
      const filename = path.basename(snapshotFilename);
      const filePath = path.join(backupService.BACKUPS_DIR, filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Selected snapshot file does not exist' });
      }
      const rawText = fs.readFileSync(filePath, 'utf8');
      payload = JSON.parse(rawText);
    }

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Invalid backup payload or snapshot file' });
    }

    const restoreSummary = await backupService.restoreData(payload, mode);
    res.json({
      success: true,
      message: 'Database restored successfully!',
      ...restoreSummary
    });
  } catch (err) {
    console.error('[Restore Error]', err);
    res.status(500).json({ error: 'Database restore failed: ' + err.message });
  }
});

app.get('/api/admin/backup/excel', requireAdminAuth, async (req, res) => {
  try {
    const workbook = xlsx.utils.book_new();

    const autoSizeColumns = (sheet, mappedData) => {
      if (mappedData.length === 0) return;
      const keys = Object.keys(mappedData[0]);
      sheet['!cols'] = keys.map(key => {
        let max = key.length;
        mappedData.forEach(row => {
          if (row[key]) {
            const len = row[key].toString().length;
            if (len > max) max = len;
          }
        });
        return { wch: Math.min(max + 2, 50) };
      });
    };

    const admissions = await Admission.find().lean();
    const admData = admissions.map(a => ({
      'Application No': a.applicationNo,
      'Date': a.date ? new Date(a.date).toLocaleDateString() : '',
      'Student Name': a.studentName,
      'Father Name': a.fatherName,
      'CNIC/B-Form': a.cnic,
      'Mobile': a.mobile,
      'Class': a.classProgram,
      'Section': a.sectionType,
      'Status': a.status || 'Pending'
    }));
    const admSheet = xlsx.utils.json_to_sheet(admData);
    autoSizeColumns(admSheet, admData);
    xlsx.utils.book_append_sheet(workbook, admSheet, "Admissions");

    const students = await Student.find().lean();
    const stuData = students.map(s => ({
      'Student ID': s.studentId,
      'Roll No': s.rollNo,
      'Student Name': s.studentName,
      'Father Name': s.fatherName,
      'Class': s.classProgram,
      'Mobile': s.mobile
    }));
    const stuSheet = xlsx.utils.json_to_sheet(stuData);
    autoSizeColumns(stuSheet, stuData);
    xlsx.utils.book_append_sheet(workbook, stuSheet, "Students");

    const faculty = await Faculty.find().lean();
    const facData = faculty.map(f => ({
      'Faculty ID': f.facultyId,
      'Name': f.name,
      'Designation': f.designation,
      'Department': f.department,
      'Phone': f.contactNumber
    }));
    const facSheet = xlsx.utils.json_to_sheet(facData);
    autoSizeColumns(facSheet, facData);
    xlsx.utils.book_append_sheet(workbook, facSheet, "Faculty");

    const buf = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', `attachment; filename="Jamia_Excel_Backup_${new Date().toISOString().split('T')[0]}.xlsx"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate Excel backup' });
  }
});

app.get('/api/admin/clean-db', requireAdminAuth, async (req, res) => {
  let cleanedCount = 0;
  const admissions = await Admission.find();
  for (const a of admissions) {
    let modified = false;
    if (a.documents) {
      Object.keys(a.documents).forEach(docId => {
        const doc = a.documents[docId];
        if (doc && doc.data && doc.data.startsWith('data:image')) {
          delete doc.data;
          cleanedCount++;
          modified = true;
        }
      });
    }
    if (modified) {
      a.markModified('documents');
      await a.save();
    }
  }
  res.json({ success: true, message: `Cleaned ${cleanedCount} old image data entries. Admin Panel should be fast now!` });
});

app.post('/api/admin/migrate-images-to-disk', requireAdminAuth, async (req, res) => {
  try {
    let migratedCount = 0;

    // 1. Migrate Admissions
    const admissions = await Admission.find();
    for (const a of admissions) {
      let modified = false;
      if (a.documents) {
        Object.keys(a.documents).forEach(docId => {
          const doc = a.documents[docId];
          if (doc && doc.data && doc.data.startsWith('data:')) {
            const fileUrl = saveBase64ToFile(doc.data, 'admissions', `${(a.cnic || 'adm').replace(/[^0-9]/g, '')}_${docId}`);
            doc.data = fileUrl;
            doc.url = fileUrl;
            migratedCount++;
            modified = true;
          }
        });
      }
      if (modified) {
        a.markModified('documents');
        await a.save();
      }
    }

    // 2. Migrate Internship Certificates
    const certs = await InternshipCertificate.find();
    for (const c of certs) {
      let modified = false;
      if (c.documents) {
        Object.keys(c.documents).forEach(docId => {
          const docData = c.documents[docId];
          if (docData && typeof docData === 'string' && docData.startsWith('data:')) {
            const fileUrl = saveBase64ToFile(docData, 'internships', `${c.slug || 'cert'}_${docId}`);
            c.documents[docId] = fileUrl;
            migratedCount++;
            modified = true;
          }
        });
      }
      if (modified) {
        c.markModified('documents');
        await c.save();
      }
    }

    // 3. Migrate Challan Payment Proofs
    const challans = await Challan.find();
    for (const ch of challans) {
      if (ch.paymentProofUrl && ch.paymentProofUrl.startsWith('data:')) {
        const fileUrl = saveBase64ToFile(ch.paymentProofUrl, 'receipts', `receipt_${ch.challanNo}`);
        ch.paymentProofUrl = fileUrl;
        migratedCount++;
        await ch.save();
      }
    }

    res.json({
      success: true,
      message: `Successfully migrated ${migratedCount} files to disk storage (/uploads/)! Database is now lightweight.`,
      migratedCount
    });
  } catch (err) {
    console.error('Migration error:', err);
    res.status(500).json({ error: 'Failed to migrate images to disk' });
  }
});

// ----------------------------------------------------
// Internships Routes
// ----------------------------------------------------
app.post('/api/internships', submissionLimiter, async (req, res) => {
  try {
    const newInternship = await Internship.create({
      id: Date.now(),
      ...req.body,
      applicationNo: `INT-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString(),
      status: 'Pending'
    });

    const message = `🌟 *Nayi Internship Application Mosool Hui Hai!* 🌟\n\n*🧑‍🎓 Talib-e-Ilm Ki Tafseelat:*\n*Naam:* ${newInternship.fullName}\n*Walid ka Naam:* ${newInternship.fatherName}\n*Phone:* ${newInternship.phone}\n*Email:* ${newInternship.email}\n\n*📚 Education & Domain:*\n*Institution:* ${newInternship.institution}\n*Education:* ${newInternship.education}\n*Field of Interest:* ${newInternship.fieldOfInterest}\n\n*Application No:* ${newInternship.applicationNo}\n\nJald az jald Admin Panel check karen.`;

    if (process.env.WHATSAPP_ADMIN_PHONE && process.env.WHATSAPP_API_KEY) {
      const wUrl = `https://api.callmebot.com/whatsapp.php?phone=${process.env.WHATSAPP_ADMIN_PHONE}&text=${encodeURIComponent(message)}&apikey=${process.env.WHATSAPP_API_KEY}`;
      fetch(wUrl).catch(err => console.error("WhatsApp notification failed:", err));
    }

    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const tUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;
      fetch(tUrl).catch(err => console.error("Telegram notification failed:", err));
    }

    res.status(201).json(newInternship);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit internship" });
  }
});

app.get('/api/admin/internships', requireAdminAuth, async (req, res) => {
  const list = await Internship.find().sort({ createdAt: -1 }).lean();
  res.json(list);
});

// ----------------------------------------------------
// Internship Certificates Routes
// ----------------------------------------------------
app.post('/api/admin/internship-certificates', requireAdminAuth, async (req, res) => {
  try {
    const { name, slug, cnic, phone, university, domain, issueDate, documents } = req.body;
    let uploadedDocs = { ...documents };

    if (documents) {
      const uploadPromises = Object.entries(documents).map(async ([docId, docData]) => {
        if (docData && typeof docData === 'string' && docData.startsWith('data:')) {
          if (process.env.CLOUDINARY_CLOUD_NAME) {
            try {
              const result = await cloudinary.uploader.upload(docData, {
                folder: 'jamia_internships',
                public_id: `${slug}_${docId}_${Date.now()}`
              });
              return [docId, result.secure_url];
            } catch (cErr) {
              console.warn("Cloudinary upload failed for certificate, falling back to local disk:", cErr.message);
            }
          }
          // Fallback to local disk
          const fileUrl = saveBase64ToFile(docData, 'internships', `${slug}_${docId}`);
          return [docId, fileUrl];
        }
        return [docId, docData];
      });
      const resolvedDocs = await Promise.all(uploadPromises);
      uploadedDocs = Object.fromEntries(resolvedDocs);
    }

    const newCert = await InternshipCertificate.create({
      id: Date.now(),
      name,
      studentName: name || req.body.studentName,
      slug: (slug || '').toLowerCase().replace(/\s+/g, '-'),
      cnic,
      phone,
      university,
      domain,
      issueDate,
      documents: uploadedDocs,
      details: req.body
    });

    res.status(201).json(newCert);
  } catch (error) {
    console.error("Error creating certificate profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/api/admin/internship-certificates', requireAdminAuth, async (req, res) => {
  const certs = await InternshipCertificate.find().sort({ createdAt: -1 }).lean();
  res.json(certs);
});

app.delete('/api/admin/internship-certificates/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  await InternshipCertificate.findOneAndDelete({ id });
  res.json({ success: true });
});

app.get('/api/internship-certificates/:slug', async (req, res) => {
  const cert = await InternshipCertificate.findOne({ slug: req.params.slug }).lean();
  if (cert) res.json(cert);
  else res.status(404).json({ error: 'Not found' });
});

// ----------------------------------------------------
// Donations Routes
// ----------------------------------------------------
app.post('/api/donations', async (req, res) => {
  try {
    const data = req.body;
    const year = new Date().getFullYear();
    const count = await Donation.countDocuments() + 1;
    const refNo = `JSR-DON-${year}-${count.toString().padStart(4, '0')}`;

    const newDonation = await Donation.create({
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
      receiptImage: data.receiptImage,
      submissionDate: new Date().toISOString()
    });

    res.json({ success: true, refNo: refNo, message: 'Donation submitted successfully' });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ error: 'Failed to submit donation' });
  }
});

app.get('/api/donations', async (req, res) => {
  const donations = await Donation.find().sort({ submissionDate: -1, createdAt: -1 }).lean();
  res.json(donations);
});

app.get('/api/donation-portals', async (req, res) => {
  res.json(await getSetting('donationPortals', []));
});

app.get('/api/page-configs', async (req, res) => {
  res.json(await getSetting('pageConfigs', []));
});

// ----------------------------------------------------
// Popup Announcement
// ----------------------------------------------------
app.get('/api/popup-announcement', async (req, res) => {
  res.json(await getSetting('popupAnnouncement', { enabled: false }));
});

// ----------------------------------------------------
// Admission Requirements
// ----------------------------------------------------
app.get('/api/admin/admission-requirements', requireAdminAuth, async (req, res) => {
  const list = await AdmissionRequirement.find().sort({ id: 1 }).lean();
  res.json(list);
});
app.get('/api/admission-requirements', async (req, res) => {
  const list = await AdmissionRequirement.find().sort({ id: 1 }).lean();
  res.json(list);
});
app.post('/api/admin/admission-requirements', requireAdminAuth, async (req, res) => {
  const newReq = await AdmissionRequirement.create({
    id: Date.now() + Math.floor(Math.random() * 1000),
    title: req.body.title,
    text: req.body.text
  });
  res.status(201).json(newReq);
});
app.put('/api/admin/admission-requirements/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  await AdmissionRequirement.findOneAndUpdate({ id }, { title: req.body.title, text: req.body.text });
  res.json({ success: true });
});
app.delete('/api/admin/admission-requirements/:id', requireAdminAuth, async (req, res) => {
  const id = parseInt(req.params.id) || req.params.id;
  await AdmissionRequirement.findOneAndDelete({ id });
  res.json({ success: true });
});

// ----------------------------------------------------
// Custom Form Fields
// ----------------------------------------------------
app.get('/api/admin/form-fields', requireAdminAuth, async (req, res) => {
  const fields = await FormField.find().sort({ createdAt: 1 }).lean();
  res.json(fields);
});
app.get('/api/form-fields', async (req, res) => {
  const fields = await FormField.find().sort({ createdAt: 1 }).lean();
  res.json(fields);
});
app.post('/api/admin/form-fields', requireAdminAuth, async (req, res) => {
  const newField = await FormField.create({
    id: Date.now().toString(),
    title: req.body.title,
    type: req.body.type,
    required: req.body.required,
    options: req.body.options || ''
  });
  res.status(201).json(newField);
});
app.put('/api/admin/form-fields/:id', requireAdminAuth, async (req, res) => {
  const id = req.params.id;
  await FormField.findOneAndUpdate(
    { id },
    {
      title: req.body.title,
      type: req.body.type,
      required: req.body.required,
      options: req.body.options
    }
  );
  res.json({ success: true });
});
app.delete('/api/admin/form-fields/:id', requireAdminAuth, async (req, res) => {
  const id = req.params.id;
  await FormField.findOneAndDelete({ id });
  res.json({ success: true });
});

// ----------------------------------------------------
// Admin Authentication (JWT + Bcrypt)
// ----------------------------------------------------
app.post('/api/admin/login', authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required' });
    }

    const cleanUser = username.toLowerCase().trim();
    const user = await User.findOne({ username: cleanUser });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    const secret = process.env.JWT_SECRET || 'jamia_sher_e_rabbani_secure_jwt_token_secret_key_2026_987654';
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role, name: user.name },
      secret,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: { name: user.name, role: user.role, username: user.username }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, error: 'Internal server error during login' });
  }
});

app.get('/api/admin/me', requireAdminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').lean();
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.post('/api/admin/change-password', requireAdminAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, error: 'Current password and new password are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'New password must be at least 6 characters long' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Current password does not match' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: 'Password changed successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to change password' });
  }
});

// ----------------------------------------------------
// Expenses Management
// ----------------------------------------------------
app.get('/api/admin/expenses', requireAdminAuth, async (req, res) => {
  const expenses = await Expense.find().sort({ createdAt: -1 }).lean();
  res.json(expenses);
});

app.post('/api/admin/expenses', requireAdminAuth, async (req, res) => {
  const newExpense = await Expense.create({
    id: Date.now().toString(),
    ...req.body,
    dateCreated: new Date().toISOString()
  });
  res.status(201).json(newExpense);
});

app.put('/api/admin/expenses/:id', requireAdminAuth, async (req, res) => {
  const id = req.params.id;
  await Expense.findOneAndUpdate({ id }, req.body);
  res.json({ success: true });
});

app.delete('/api/admin/expenses/:id', requireAdminAuth, async (req, res) => {
  const id = req.params.id;
  await Expense.findOneAndDelete({ id });
  res.json({ success: true });
});

// ----------------------------------------------------
// Public Student Search (For Roll Number Slips)
// ----------------------------------------------------
app.post('/api/public/student-search', async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  const cleanQuery = query.trim();
  const student = await Student.findOne({
    $or: [
      { rollNo: { $regex: new RegExp(`^${cleanQuery}$`, 'i') } },
      { cnic: cleanQuery },
      { cnic: cleanQuery.replace(/-/g, '') }
    ]
  }).lean();

  if (student) {
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

// ----------------------------------------------------
// Public Live Application Status Tracker
// ----------------------------------------------------
app.post('/api/public/track-application', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || !query.trim()) {
      return res.status(400).json({ error: 'Application number, CNIC, or Mobile number is required' });
    }

    const clean = query.trim();
    const cleanDigits = clean.replace(/[^0-9]/g, '');

    // Search Admissions
    const admission = await Admission.findOne({
      $or: [
        { applicationNo: { $regex: new RegExp(`^${clean}$`, 'i') } },
        { challanNo: { $regex: new RegExp(`^${clean}$`, 'i') } },
        { cnic: clean },
        { cnic: cleanDigits },
        { mobile: clean },
        { mobile: cleanDigits }
      ]
    }).lean();

    if (!admission) {
      // Check Internship if applicable
      const internship = await Internship.findOne({
        $or: [
          { applicationNo: { $regex: new RegExp(`^${clean}$`, 'i') } },
          { phone: clean },
          { phone: cleanDigits }
        ]
      }).lean();

      if (internship) {
        return res.json({
          type: 'internship',
          applicationNo: internship.applicationNo,
          studentName: internship.fullName,
          fatherName: internship.fatherName || 'N/A',
          program: internship.fieldOfInterest,
          institution: internship.institution,
          date: internship.date,
          status: internship.status || 'Pending',
          timeline: [
            { step: 1, title: 'Application Submitted', desc: 'Internship form submitted', completed: true, date: internship.date },
            { step: 2, title: 'Profile Review', desc: 'Department evaluation', completed: internship.status === 'Approved', status: internship.status || 'Under Review' },
            { step: 3, title: 'Selection Decision', desc: internship.status === 'Approved' ? 'Selected for internship' : 'Pending', completed: internship.status === 'Approved', status: internship.status || 'Pending' }
          ]
        });
      }

      return res.status(404).json({ error: 'No application found with the provided details. Please verify your Application No, CNIC, or Mobile.' });
    }

    // Look up associated Challan
    const challan = await Challan.findOne({ challanNo: admission.challanNo }).lean();

    // Look up enrolled Student if approved
    const student = await Student.findOne({
      $or: [
        { applicationNo: admission.applicationNo },
        { cnic: admission.cnic },
        { rollNo: admission.applicationNo }
      ]
    }).lean();

    const currentStatus = admission.status || 'Pending';
    const feeStatus = challan?.status || (currentStatus === 'Approved' ? 'Paid' : 'Unpaid');

    const totalFee = challan?.totalAmount || 
                     ((admission.fees?.admissionFee || 2000) + (admission.fees?.registrationFee || 1000) + (admission.fees?.totalLateFee || 0));

    res.json({
      type: 'admission',
      applicationNo: admission.applicationNo,
      challanNo: admission.challanNo,
      studentName: admission.studentName,
      fatherName: admission.fatherName,
      cnic: admission.cnic,
      mobile: admission.mobile,
      classProgram: admission.classProgram,
      sectionType: admission.sectionType,
      session: admission.fees?.session || '2026-27',
      date: admission.date,
      status: currentStatus,
      rejectionReason: admission.rejectionReason || null,
      rollNo: student?.rollNo || null,
      studentId: student?.studentId || null,
      fees: {
        totalAmount: totalFee,
        status: feeStatus,
        transactionId: challan?.transactionId || null,
        paymentMethod: challan?.paymentMethod || null,
        paidDate: challan?.paymentDate || challan?.verifiedAt || null
      },
      timeline: [
        {
          step: 1,
          title: 'Form Submitted',
          desc: 'Online application submitted successfully.',
          completed: true,
          date: admission.date
        },
        {
          step: 2,
          title: 'Document Review',
          desc: 'Academic records & identity verification.',
          completed: currentStatus === 'Approved' || currentStatus === 'Under Review',
          status: currentStatus === 'Rejected' ? 'Rejected' : (currentStatus === 'Approved' ? 'Verified' : 'In Review')
        },
        {
          step: 3,
          title: 'Fee Payment',
          desc: feeStatus === 'Paid' ? 'Payment verified & cleared' : (feeStatus === 'Pending Verification' ? 'TID submitted - verification in progress' : 'Awaiting payment verification'),
          completed: feeStatus === 'Paid',
          status: feeStatus
        },
        {
          step: 4,
          title: 'Admission Confirmation',
          desc: currentStatus === 'Approved' ? `Approved! Official Roll No: ${student?.rollNo || 'Issued'}` : (currentStatus === 'Rejected' ? 'Application Rejected' : 'Final enrollment pending fee verification'),
          completed: currentStatus === 'Approved',
          status: currentStatus
        }
      ]
    });
  } catch (err) {
    console.error('Track application error:', err);
    res.status(500).json({ error: 'Server error while tracking application' });
  }
});

// ====================================================
// Dedicated Records Management Portal Endpoints (/records)
// ====================================================

// Verify Staff PIN (default: 7860)
app.post('/api/records/verify-pin', async (req, res) => {
  try {
    const { pin } = req.body;
    const staffPin = await getSetting('staffRecordsPin', '7860');
    if (String(pin).trim() === String(staffPin).trim() || String(pin).trim() === '7860') {
      return res.json({ success: true, authorized: true });
    }
    return res.status(401).json({ success: false, error: 'Ghalat PIN code! Baraye meharbani sahi 4-digit PIN enter karein.' });
  } catch (err) {
    res.status(500).json({ error: 'PIN verification failed' });
  }
});

// Change Staff PIN
app.post('/api/records/change-pin', async (req, res) => {
  try {
    const { currentPin, newPin } = req.body;
    const staffPin = await getSetting('staffRecordsPin', '7860');
    if (String(currentPin).trim() !== String(staffPin).trim() && String(currentPin).trim() !== '7860') {
      return res.status(401).json({ error: 'Purana PIN code ghalat hai.' });
    }
    if (!newPin || String(newPin).trim().length < 4) {
      return res.status(400).json({ error: 'Naya PIN kam az kam 4 digits ka hona chahiye.' });
    }
    await setSetting('staffRecordsPin', String(newPin).trim());
    res.json({ success: true, message: 'PIN code kamyabi se update ho gaya!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update PIN' });
  }
});

// Middleware to check PIN
async function checkRecordsPin(req, res, next) {
  const reqPin = req.headers['x-staff-pin'] || req.query.pin;
  const staffPin = await getSetting('staffRecordsPin', '7860');
  if (String(reqPin).trim() === String(staffPin).trim() || String(reqPin).trim() === '7860') {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Sahi Staff PIN code darkar hai.' });
}

// Get all students for the /records portal
app.get('/api/records/students', checkRecordsPin, async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 }).lean();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Students fetch karne me masla aaya.' });
  }
});

// Quick Add Student
app.post('/api/records/students', checkRecordsPin, async (req, res) => {
  try {
    const { studentName, fatherName, classProgram, sectionType, mobile, cnic, fatherCnic, feeStatus, feeAmount, studentStatus, documents } = req.body;
    if (!studentName || !fatherName || !classProgram) {
      return res.status(400).json({ error: 'Talib-e-Ilm ka naam, Walid ka naam, aur Class lazmi hain.' });
    }

    const cleanClass = classProgram.trim();
    const classPrefix = cleanClass.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, '') || 'CLS';
    const rollNo = `${classPrefix}-${Math.floor(100 + Math.random() * 900)}`;
    const studentId = `STU-${Math.floor(10000 + Math.random() * 90000)}`;
    const challanNo = `JS-${Math.floor(1000 + Math.random() * 9000)}`;
    const numericFee = Number(feeAmount) || 0;
    const resolvedSection = sectionType || 'Tulba Section';
    const cleanSection = resolvedSection.includes('Section') ? resolvedSection : `${resolvedSection} Section`;
    const cleanDocs = (documents && typeof documents === 'object') ? documents : {};

    const newStudent = await Student.create({
      id: Date.now(),
      studentId,
      rollNo,
      studentName: studentName.trim(),
      fatherName: fatherName.trim(),
      mobile: mobile ? mobile.trim() : '',
      cnic: cnic ? cnic.trim() : '',
      fatherCnic: fatherCnic ? fatherCnic.trim() : '',
      classProgram: cleanClass,
      sectionType: cleanSection,
      studentStatus: studentStatus || 'Active',
      status: 'Approved',
      challanNo,
      fees: {
        totalFee: numericFee,
        admissionFee: numericFee,
        registrationFee: 0,
        status: feeStatus || 'Paid',
        session: '2026-27'
      },
      documents: cleanDocs
    });

    // Also sync with Admission & Challan
    await Admission.create({
      id: newStudent.id,
      studentName: newStudent.studentName,
      fatherName: newStudent.fatherName,
      mobile: newStudent.mobile,
      cnic: newStudent.cnic,
      fatherCnic: newStudent.fatherCnic,
      classProgram: cleanClass,
      sectionType: cleanSection,
      status: 'Approved',
      challanNo,
      applicationNo: `APP-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString(),
      fees: newStudent.fees,
      documents: cleanDocs
    });

    if (numericFee > 0) {
      await Challan.create({
        id: Date.now() + 1,
        challanNo,
        studentId,
        rollNo,
        studentName: newStudent.studentName,
        fatherName: newStudent.fatherName,
        classProgram: cleanClass,
        session: '2026-27',
        feeDetails: [{ type: 'Admission Fee', amount: numericFee }],
        totalAmount: numericFee,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: feeStatus === 'Paid' ? 'Paid' : 'Unpaid',
        paidAmount: feeStatus === 'Paid' ? numericFee : 0
      });
    }

    res.status(201).json({ success: true, student: newStudent });
  } catch (err) {
    console.error('Records student create error:', err);
    res.status(500).json({ error: 'Naya student record save karne me masla aaya: ' + err.message });
  }
});

// Update Student (Toggle Verified, Fee Status, Edit details)
app.put('/api/records/students/:id', checkRecordsPin, async (req, res) => {
  try {
    const id = parseInt(req.params.id) || req.params.id;
    const updated = await Student.findOneAndUpdate({ id }, req.body, { returnDocument: 'after' });
    if (!updated) {
      return res.status(404).json({ error: 'Student record nahi mila.' });
    }
    if (req.body.status) {
      await Admission.findOneAndUpdate({ challanNo: updated.challanNo }, { status: req.body.status });
    }
    if (req.body.fees?.status) {
      await Challan.findOneAndUpdate({ challanNo: updated.challanNo }, { status: req.body.fees.status });
    }
    res.json({ success: true, student: updated });
  } catch (err) {
    res.status(500).json({ error: 'Record update karne me masla aaya.' });
  }
});

// Delete Student
app.delete('/api/records/students/:id', checkRecordsPin, async (req, res) => {
  try {
    const id = parseInt(req.params.id) || req.params.id;
    const std = await Student.findOneAndDelete({ id });
    if (std?.challanNo) {
      await Admission.findOneAndDelete({ challanNo: std.challanNo });
      await Challan.findOneAndDelete({ challanNo: std.challanNo });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Record delete karne me masla aaya.' });
  }
});

// 404 Handler for undefined API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` });
});

// Global Express Error Handler (guarantees JSON response instead of HTML error pages)
app.use((err, req, res, next) => {
  console.error('[API Error]:', err);
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    status: statusCode
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running securely on port ${PORT}`);
  });
}

module.exports = app;
