const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const mongoose = require('mongoose');
const { saveBase64ToFile } = require('./middleware/upload');

const Admission = require('./models/Admission');
const InternshipCertificate = require('./models/InternshipCertificate');
const Challan = require('./models/Challan');

async function migrateImages() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000
  });
  console.log('Connected! Scanning for Base64 image data to migrate to disk (/uploads/)...');

  let migratedAdmissions = 0;
  let migratedCerts = 0;
  let migratedReceipts = 0;

  // 1. Admissions
  const admissions = await Admission.find();
  for (const a of admissions) {
    let modified = false;
    if (a.documents) {
      for (const docId of Object.keys(a.documents)) {
        const doc = a.documents[docId];
        if (doc && doc.data && typeof doc.data === 'string' && doc.data.startsWith('data:')) {
          const fileUrl = saveBase64ToFile(doc.data, 'admissions', `${(a.cnic || 'adm').replace(/[^0-9]/g, '')}_${docId}`);
          doc.data = fileUrl;
          doc.url = fileUrl;
          migratedAdmissions++;
          modified = true;
        }
      }
    }
    if (modified) {
      a.markModified('documents');
      await a.save();
    }
  }

  // 2. Internship Certificates
  const certs = await InternshipCertificate.find();
  for (const c of certs) {
    let modified = false;
    if (c.documents) {
      for (const docId of Object.keys(c.documents)) {
        const docData = c.documents[docId];
        if (docData && typeof docData === 'string' && docData.startsWith('data:')) {
          const fileUrl = saveBase64ToFile(docData, 'internships', `${c.slug || 'cert'}_${docId}`);
          c.documents[docId] = fileUrl;
          migratedCerts++;
          modified = true;
        }
      }
    }
    if (modified) {
      c.markModified('documents');
      await c.save();
    }
  }

  // 3. Challans Payment Receipts
  const challans = await Challan.find();
  for (const ch of challans) {
    if (ch.paymentProofUrl && ch.paymentProofUrl.startsWith('data:')) {
      const fileUrl = saveBase64ToFile(ch.paymentProofUrl, 'receipts', `receipt_${ch.challanNo}`);
      ch.paymentProofUrl = fileUrl;
      migratedReceipts++;
      await ch.save();
    }
  }

  console.log(`\n🎉 Image Migration Complete!`);
  console.log(`- Admissions documents migrated: ${migratedAdmissions}`);
  console.log(`- Internship documents migrated: ${migratedCerts}`);
  console.log(`- Payment receipts migrated: ${migratedReceipts}`);
  console.log(`- Total files moved to /uploads/: ${migratedAdmissions + migratedCerts + migratedReceipts}`);

  await mongoose.disconnect();
  console.log('MongoDB connection closed.');
  process.exit(0);
}

migrateImages().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
