const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  courseId: { type: String },
  title: { type: String, required: true },
  level: { type: String },
  duration: { type: String },
  desc: { type: String },
  fullDescription: { type: String },
  eligibility: { type: String },
  learningOutcomes: [{ type: String }],
  status: { type: String, default: 'Active' },
  featured: { type: Boolean, default: false },
  image: { type: String },
  programDetailsImage: { type: String },
  gallery: [{ type: String }],
  syllabus: [{
    title: { type: String },
    file: { type: String }
  }],
  playlists: [{
    id: { type: String },
    title: { type: String },
    category: { type: String },
    listId: { type: String },
    videoId: { type: String },
    badge: { type: String },
    description: { type: String },
    icon: { type: String }
  }],
  playlistTitle: { type: String },
  playlistUrl: { type: String },
  playlistId: { type: String },
  videoId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
