const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Models
const Course = require('./models/Course');
const Admission = require('./models/Admission');
const Student = require('./models/Student');
const Challan = require('./models/Challan');
const Faculty = require('./models/Faculty');
const News = require('./models/News');
const Expense = require('./models/Expense');
const FeeStructure = require('./models/FeeStructure');
const InternshipCertificate = require('./models/InternshipCertificate');
const Donation = require('./models/Donation');
const FormField = require('./models/FormField');
const AdmissionRequirement = require('./models/AdmissionRequirement');
const SystemSetting = require('./models/SystemSetting');

async function runMigration() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB successfully!');

  // Drop slug index on internshipcertificates if exists to avoid duplicate key error
  try {
    await InternshipCertificate.collection.dropIndex('slug_1');
    console.log('Dropped old unique index slug_1 on InternshipCertificate');
  } catch (e) {
    // index may not exist, ignore
  }

  // 1. Load Local Data
  let localData = {};
  const localDbPath = path.join(__dirname, 'db.json');
  if (fs.existsSync(localDbPath)) {
    try {
      localData = JSON.parse(fs.readFileSync(localDbPath, 'utf8'));
    } catch (e) {
      console.warn('Error reading local db.json:', e.message);
    }
  }

  // 2. Load CloudDB Data (if exists)
  let cloudData = {};
  try {
    const CloudDB = mongoose.model('CloudDB', new mongoose.Schema({ data: Object }, { strict: false }));
    const doc = await CloudDB.findOne();
    if (doc && doc.data) {
      cloudData = doc.data;
    }
  } catch (e) {
    console.warn('Could not read CloudDB:', e.message);
  }

  // Merge helper
  function getMergedArray(key, idField = 'id') {
    const arr1 = Array.isArray(localData[key]) ? localData[key] : [];
    const arr2 = Array.isArray(cloudData[key]) ? cloudData[key] : [];
    const map = new Map();
    arr1.forEach(item => {
      const id = item[idField] !== undefined ? item[idField] : JSON.stringify(item);
      map.set(id, item);
    });
    arr2.forEach(item => {
      const id = item[idField] !== undefined ? item[idField] : JSON.stringify(item);
      map.set(id, { ...map.get(id), ...item });
    });
    return Array.from(map.values());
  }

  function getMergedObject(key) {
    return cloudData[key] || localData[key] || {};
  }

  const opt = { upsert: true, returnDocument: 'after' };

  // 3. Migrate Courses
  const courses = getMergedArray('courses');
  console.log(`Migrating ${courses.length} courses...`);
  for (const c of courses) {
    await Course.findOneAndUpdate({ id: c.id }, c, opt);
  }

  // 4. Migrate Admissions
  const admissions = getMergedArray('admissions');
  console.log(`Migrating ${admissions.length} admissions...`);
  for (const a of admissions) {
    await Admission.findOneAndUpdate({ id: a.id }, a, opt);
  }

  // 5. Migrate Students
  const students = getMergedArray('students');
  console.log(`Migrating ${students.length} students...`);
  for (const s of students) {
    await Student.findOneAndUpdate({ id: s.id }, s, opt);
  }

  // 6. Migrate Challans
  const challans = getMergedArray('challans');
  console.log(`Migrating ${challans.length} challans...`);
  for (const ch of challans) {
    await Challan.findOneAndUpdate({ id: ch.id }, ch, opt);
  }

  // 7. Migrate Faculty
  const faculty = getMergedArray('faculty');
  console.log(`Migrating ${faculty.length} faculty members...`);
  for (const f of faculty) {
    await Faculty.findOneAndUpdate({ id: f.id }, f, opt);
  }

  // 8. Migrate News
  const news = getMergedArray('news');
  console.log(`Migrating ${news.length} news articles...`);
  for (const n of news) {
    await News.findOneAndUpdate({ id: n.id }, n, opt);
  }

  // 9. Migrate Fee Structures
  const feeStructures = getMergedArray('feeStructures');
  console.log(`Migrating ${feeStructures.length} fee structures...`);
  for (const fsItem of feeStructures) {
    await FeeStructure.findOneAndUpdate({ id: fsItem.id }, fsItem, opt);
  }

  // 10. Migrate Expenses
  const expenses = getMergedArray('expenses');
  console.log(`Migrating ${expenses.length} expenses...`);
  for (const exp of expenses) {
    await Expense.findOneAndUpdate({ id: exp.id }, exp, opt);
  }

  // 11. Migrate Internship Certificates
  const certs = getMergedArray('internshipCertificates');
  console.log(`Migrating ${certs.length} internship certificates...`);
  for (const cert of certs) {
    await InternshipCertificate.findOneAndUpdate({ id: cert.id }, cert, opt);
  }

  // 12. Migrate Donations
  const donations = getMergedArray('donations');
  console.log(`Migrating ${donations.length} donations...`);
  for (const don of donations) {
    await Donation.findOneAndUpdate({ id: don.id }, don, opt);
  }

  // 13. Migrate Custom Form Fields
  const formFields = getMergedArray('customFormFields');
  console.log(`Migrating ${formFields.length} custom form fields...`);
  for (const ff of formFields) {
    await FormField.findOneAndUpdate({ id: ff.id }, ff, opt);
  }

  // 14. Migrate Admission Requirements
  const requirements = getMergedArray('admissionRequirements');
  console.log(`Migrating ${requirements.length} admission requirements...`);
  for (const req of requirements) {
    await AdmissionRequirement.findOneAndUpdate({ id: req.id }, req, opt);
  }

  // 15. Migrate System Settings
  const settingKeys = [
    'feeConfig',
    'admissionSchedule',
    'bankConfig',
    'messConfig',
    'popupAnnouncement',
    'donationPortals',
    'pageConfigs',
    'analytics',
    'messApplications'
  ];

  for (const key of settingKeys) {
    const val = getMergedObject(key);
    if (val !== undefined) {
      await SystemSetting.findOneAndUpdate(
        { key },
        { key, value: val },
        opt
      );
    }
  }

  console.log('\n========================================');
  console.log('--- Migration Verification Summary ---');
  console.log('Courses in DB:', await Course.countDocuments());
  console.log('Admissions in DB:', await Admission.countDocuments());
  console.log('Students in DB:', await Student.countDocuments());
  console.log('Challans in DB:', await Challan.countDocuments());
  console.log('Faculty in DB:', await Faculty.countDocuments());
  console.log('Fee Structures in DB:', await FeeStructure.countDocuments());
  console.log('Certificates in DB:', await InternshipCertificate.countDocuments());
  console.log('Form Fields in DB:', await FormField.countDocuments());
  console.log('Requirements in DB:', await AdmissionRequirement.countDocuments());
  console.log('System Settings in DB:', await SystemSetting.countDocuments());
  console.log('========================================\n');
  console.log('ALL DATA SAFELY MIGRATED TO MONGOOSE COLLECTIONS!');

  await mongoose.disconnect();
}

runMigration().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
