const mongoose = require('mongoose');

const ChallanSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  challanNo: { type: String, required: true },
  studentName: { type: String, required: true },
  fatherName: { type: String },
  phone: { type: String },
  classProgram: { type: String },
  feeDetails: [{
    type: { type: String },
    amount: { type: Number }
  }],
  totalAmount: { type: Number, required: true },
  issueDate: { type: String },
  dueDate: { type: String },
  status: { type: String, default: 'Unpaid' }, // Paid, Unpaid, Pending Verification
  paidAmount: { type: Number, default: 0 },
  type: { type: String, default: 'Admission' }, // Admission, Mess, Monthly
  paidDate: { type: String },
  paymentMethod: { type: String }, // JazzCash, NayaPay, Meezan Bank, Cash
  transactionId: { type: String }, // TID
  senderPhone: { type: String },
  paymentProofUrl: { type: String },
  paymentSubmittedAt: { type: String },
  verifiedBy: { type: String },
  verifiedAt: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Challan', ChallanSchema);
