const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String },
  excerpt: { type: String },
  date: { type: String },
  image: { type: String },
  category: { type: String },
  author: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);
