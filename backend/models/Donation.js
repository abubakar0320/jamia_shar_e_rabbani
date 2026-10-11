const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  refNo: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  fatherName: { type: String },
  mobileNumber: { type: String },
  email: { type: String },
  city: { type: String },
  amount: { type: Number, required: true },
  purpose: { type: String },
  category: { type: String },
  remarks: { type: String },
  receiptImage: { type: String },
  submissionDate: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Donation', DonationSchema);
