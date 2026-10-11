const mongoose = require('mongoose');

const FormFieldSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  required: { type: Boolean, default: false },
  options: { type: String, default: '' },
  isCore: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('FormField', FormFieldSchema);
