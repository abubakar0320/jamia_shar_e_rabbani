const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  applicationNo: { type: String, required: true },
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  dob: { type: String },
  cnic: { type: String },
  mobile: { type: String },
  whatsapp: { type: String },
  gender: { type: String },
  email: { type: String },
  address: { type: String },
  city: { type: String },
  sectionType: { type: String },
  classProgram: { type: String },
  takhassusType: { type: String },
  challanNo: { type: String },
  date: { type: String },
  fees: { type: Object },
  status: { type: String, default: 'Pending' },
  rejectionReason: { type: String },
  documents: { type: Object, default: {} },
  customFields: { type: Object, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('Admission', AdmissionSchema);
