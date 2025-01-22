const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  position: String,
  company: String,
  description: String,
  duration: String,
  responsibilities: [String],
  order: { type: Number, default: 0 },
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
