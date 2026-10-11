const mongoose = require('mongoose');

const InternshipCertificateSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  slug: { type: String, required: true },
  studentName: { type: String, required: true },
  fatherName: { type: String },
  rollNo: { type: String },
  cnic: { type: String },
  programTitle: { type: String },
  duration: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  issueDate: { type: String },
  grade: { type: String },
  status: { type: String, default: 'Issued' },
  verificationCode: { type: String },
  qrCodeUrl: { type: String },
  certificatePdfUrl: { type: String },
  details: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('InternshipCertificate', InternshipCertificateSchema);
