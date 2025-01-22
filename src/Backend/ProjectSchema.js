const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  technologies: [String],
  details: { type: String, required: true },
  outcome: { type: String },
  githubLink: { type: String }, 
  order: { type: Number, default: 0 }, 
});

module.exports = mongoose.model("Project", ProjectSchema);
