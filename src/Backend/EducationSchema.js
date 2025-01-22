const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true }, // e.g., "MSc. Public Administration"
  institution: { type: String, required: true }, // e.g., "Roskilde University, Denmark"
  yearOfCompletion: { type: Number, required: true }, // e.g., 2010
});

module.exports = mongoose.model('Education', EducationSchema);
