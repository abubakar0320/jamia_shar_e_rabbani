const mongoose = require('mongoose');

const AdmissionRequirementSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, default: '' },
  text: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('AdmissionRequirement', AdmissionRequirementSchema);
