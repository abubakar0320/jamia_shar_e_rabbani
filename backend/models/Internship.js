const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  fullName: { type: String, required: true },
  fatherName: { type: String },
  phone: { type: String },
  email: { type: String },
  institution: { type: String },
  education: { type: String },
  fieldOfInterest: { type: String },
  applicationNo: { type: String },
  date: { type: String },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Internship', InternshipSchema);
