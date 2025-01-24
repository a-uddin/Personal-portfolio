const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db");
const Experience = require("./ExperienceSchema");
const Project = require("./ProjectSchema");
const About = require("./AboutSchema"); // Import the About schema
const Skill = require("./SkillSchema"); // Import the Skill schema

const app = express();

// cors configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://mern-portfolio-anowar-da4ee719074b.herokuapp.com"
      : "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

const path = require("path");

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../build")));

// Handle any requests that don't match the API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// ==========================
// About Routes
// ==========================

// GET About Content
app.get("/api/about", async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "About content not found." });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE About Content
app.put("/api/about", async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: "Content is required." });
  }

  try {
    let about = await About.findOne();
    if (!about) {
      about = new About({ content });
    } else {
      about.content = content;
    }
    await about.save();
    res.json({ message: "About content updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================
// Experience Routes
// ==========================

// GET All Experiences
app.get("/api/experiences", async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Experience
app.post("/api/experiences", async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    await newExperience.save();
    res.json(newExperience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Experience based on Position and Company
app.delete("/api/experiences", async (req, res) => {
  try {
    const { position, company } = req.body;

    if (!position || !company) {
      return res.status(400).json({
        message: "Position and Company are required to delete an experience.",
      });
    }

    const deletedExperience = await Experience.findOneAndDelete({
      position: { $regex: new RegExp(`^${position}$`, "i") },
      company: { $regex: new RegExp(`^${company}$`, "i") },
    });

    if (!deletedExperience) {
      return res.status(404).json({
        message: "No experience found with the provided Position and Company.",
      });
    }

    res.json({ message: "Experience deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Experience Order

app.put("/api/experiences/order", async (req, res) => {
  const { experiences } = req.body;

  if (!experiences || !Array.isArray(experiences)) {
    return res.status(400).json({ message: "Invalid experiences data." });
  }

  try {
    // Update each experience's order in the database (you may need an "order" field in your schema)
    for (let i = 0; i < experiences.length; i++) {
      await Experience.findByIdAndUpdate(experiences[i], { order: i });
    }

    // Retrieve the updated experiences from the database, sorted by the "order" field
    const updatedExperiences = await Experience.find().sort({ order: 1 });

    res.json(updatedExperiences); // Send the updated array back to the client
  } catch (error) {
    console.error("Error updating experiences order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// ==========================
// Project Routes
// ==========================

// GET All Projects (Sorted by Order)
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 }); // Sorted by order
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Project
app.post("/api/projects", async (req, res) => {
  try {
    const { title, technologies, details, outcome, githubLink } = req.body;

    if (!title || !technologies || !details) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const project = new Project({
      title,
      technologies: technologies.split(",").map((tech) => tech.trim()),
      details,
      outcome,
      githubLink: githubLink || "",
    });

    await project.save();
    res.status(201).json({ message: "Project added successfully!" });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// Delete Project based on Title
app.delete("/api/projects", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Project title is required to delete a project." });
    }

    const deletedProject = await Project.findOneAndDelete({
      title: { $regex: new RegExp(`^${title}$`, "i") },
    });

    if (!deletedProject) {
      return res
        .status(404)
        .json({ message: "No project found with the provided title." });
    }

    res.json({ message: "Project deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Project Order
app.put("/api/projects/order", async (req, res) => {
  const { projects } = req.body;

  if (!projects || !Array.isArray(projects)) {
    return res.status(400).json({ message: "Invalid projects data." });
  }

  try {
    // Update each project's order in the database
    for (let i = 0; i < projects.length; i++) {
      await Project.findByIdAndUpdate(projects[i], { order: i });
    }

    // Retrieve the updated projects from the database, sorted by the "order" field
    const updatedProjects = await Project.find().sort({ order: 1 });

    res.json(updatedProjects); // Send the updated array back to the client
  } catch (error) {
    console.error("Error updating project order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// ==========================
// Skills Routes
// ==========================

// GET All Skills
app.get("/api/skills", async (req, res) => {
  try {
    const skills = await Skill.find({ subSkills: { $exists: true, $ne: [] } });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add or Update Skill
app.post("/api/skills", async (req, res) => {
  try {
    const { mainHeading, subHeading, skillDetails } = req.body;

    if (!mainHeading || !subHeading || !skillDetails) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const skillDetailsArray = Array.isArray(skillDetails)
      ? skillDetails
      : skillDetails
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line);

    let skill = await Skill.findOne({
      mainHeading: { $regex: new RegExp(`^${mainHeading}$`, "i") },
    });

    if (skill) {
      skill.subSkills.push({ subHeading, skillDetails });
      await skill.save();
    } else {
      skill = new Skill({
        mainHeading,
        subSkills: [{ subHeading, skillDetails: skillDetailsArray }],
      });
      await skill.save();
    }

    res.status(201).json({ message: "Skill added successfully!" });
  } catch (error) {
    console.error("Error adding skill:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Delete Skill based on SubHeading
app.delete("/api/skills", async (req, res) => {
  try {
    const { subHeading } = req.body;

    if (!subHeading) {
      return res
        .status(400)
        .json({ message: "Sub heading is required to delete a skill." });
    }

    const updatedSkill = await Skill.findOneAndUpdate(
      { "subSkills.subHeading": subHeading },
      { $pull: { subSkills: { subHeading } } },
      { new: true }
    );

    if (!updatedSkill) {
      return res
        .status(404)
        .json({ message: "No skill found with the provided sub heading." });
    }

    res.json({
      message: `Skill with subHeading '${subHeading}' deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================
// Server Setup
// ==========================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
