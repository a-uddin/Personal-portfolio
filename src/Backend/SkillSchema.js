const mongoose = require("mongoose");

const SubSkillSchema = new mongoose.Schema({
  subHeading: { type: String, required: true },
  skillDetails: { type: [String], required: true }, // Array of strings
});

const SkillSchema = new mongoose.Schema({
  mainHeading: { type: String, required: true },
  subSkills: [SubSkillSchema], // Array of sub-skills
});

module.exports = mongoose.model("Skill", SkillSchema);
