const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  studentId: { type: String, required: true },
  rollNo: { type: String, required: true },
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  dob: { type: String },
  cnic: { type: String },
  mobile: { type: String },
  whatsapp: { type: String },
  gender: { type: String },
  address: { type: String },
  city: { type: String },
  sectionType: { type: String },
  classProgram: { type: String },
  takhassusType: { type: String },
  studentStatus: { type: String, default: 'Active' }, // Active, Inactive, Graduated, Suspended
  fees: { type: Object },
  documents: { type: Object, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
