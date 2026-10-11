const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  facultyId: { type: String },
  name: { type: String, required: true },
  designation: { type: String },
  department: { type: String },
  specialization: { type: String },
  qualification: { type: String },
  university: { type: String },
  researchAreas: { type: String },
  teachingExperience: { type: String },
  contactNumber: { type: String },
  whatsapp: { type: String },
  email: { type: String },
  address: { type: String },
  joinDate: { type: String },
  employmentStatus: { type: String },
  subjectsTaught: [{ type: String }],
  responsibilities: { type: String },
  status: { type: String, default: 'Active' },
  photo: { type: String },
  documents: { type: Object, default: {} },
  attendance: { type: Object },
  publications: [{ type: Object }],
  isLeadership: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Faculty', FacultySchema);
