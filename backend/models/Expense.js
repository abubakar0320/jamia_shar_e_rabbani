const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String },
  date: { type: String },
  remarks: { type: String },
  receiptImage: { type: String },
  dateCreated: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
