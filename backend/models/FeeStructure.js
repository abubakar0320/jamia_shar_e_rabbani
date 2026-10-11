const mongoose = require('mongoose');

const FeeStructureSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  classProgram: { type: String, required: true },
  sectionType: { type: String },
  admissionFee: { type: Number, default: 0 },
  registrationFee: { type: Number, default: 0 },
  monthlyFee: { type: Number, default: 0 },
  annualFee: { type: Number, default: 0 },
  examFee: { type: Number, default: 0 },
  session: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('FeeStructure', FeeStructureSchema);
