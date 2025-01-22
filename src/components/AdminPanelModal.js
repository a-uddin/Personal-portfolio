import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanelModal = ({
  onClose,
  addExperience,
  deleteExperience,
  experiences,
  addSkill,
  deleteSkill,
  skills,
}) => {
  const [activeTab, setActiveTab] = useState("Add Experience"); // Tab state
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [duration, setDuration] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [error, setError] = useState("");
  const [mainHeading, setMainHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [skillDetails, setSkillDetails] = useState("");
  const [aboutContent, setAboutContent] = useState(""); // State for About content

  // Project State
  const [projectTitle, setProjectTitle] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [outcome, setOutcome] = useState("");

  // Fetch About content on load
  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/about");
        setAboutContent(response.data.content || "");
      } catch (error) {
        console.error("Error fetching About content:", error.message);
      }
    };

    fetchAboutContent();
  }, []);

  // Handle saving About content
  const handleSaveAbout = async () => {
    try {
      await axios.put("http://localhost:5000/api/about", { content: aboutContent });
      alert("About content updated successfully!");
    } catch (error) {
      console.error("Error updating About content:", error.message);
      alert("Failed to update About content.");
    }
  };


  // Function to bold the selected text
  const handleTextFormat = () => {
    const selection = window.getSelection();
    
    if (!selection || selection.toString() === "") {
      alert("Please select some text to bold.");
      return;
    }
  
    const selectedText = selection.toString();
    const start = aboutContent.indexOf(selectedText);
    
    if (start === -1) {
      alert("Selected text is not found in the content.");
      return;
    }
  
    // Update content with <b> tag around the selected text
    const updatedContent = 
      aboutContent.substring(0, start) +
      `<b>${selectedText}</b>` +
      aboutContent.substring(start + selectedText.length);
  
    setAboutContent(updatedContent);
  };
  

// Handle Enter key for paragraphs
const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const textarea = e.target;
    const cursorPosition = textarea.selectionStart;

    // Split content into before and after the cursor
    const beforeText = textarea.value.substring(0, cursorPosition);
    const afterText = textarea.value.substring(cursorPosition);

    // Insert a line break
    const newContent = `${beforeText}<br>${afterText}`;
    setAboutContent(newContent);

    // Adjust the cursor position after the new line break
    setTimeout(() => {
      textarea.setSelectionRange(cursorPosition + 4, cursorPosition + 4); // "<br>" length
    }, 0);
  }
};


  // Handle Responsibilities Change
  const handleResponsibilitiesChange = (e) => {
    setResponsibilities(e.target.value);
  };

  // Add Experience
  const handleAddExperience = async () => {
    if (!position || !company || !duration || !description || !responsibilities.trim()) {
      alert("All fields must be filled, including responsibilities and description.");
      return;
    }

    const responsibilitiesArray = responsibilities
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line); // Split by new line and remove empty lines

    const newExperience = {
      position,
      company,
      duration,
      description,
      responsibilities: responsibilitiesArray, // Pass array of responsibilities
    };

    try {
      const response = await axios.post("http://localhost:5000/api/experiences", newExperience);
      alert("Experience added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding experience:", error.response ? error.response.data : error.message);
      alert("Failed to add experience.");
    }
  };

  // Delete Experience
  const handleDeleteExperience = async () => {
    if (!position || !company) {
      alert("Position and Company are required to delete an experience.");
      return;
    }

    try {
      const response = await axios.delete("http://localhost:5000/api/experiences", {
        data: {
          position: position.trim(),
          company: company.trim(),
        },
        headers: {
          "Content-Type": "application/json", // Ensure JSON is sent
        },
      });

      alert(response.data.message);
      resetForm();
    } catch (error) {
      console.error("Error deleting experience:", error.response ? error.response.data : error.message);
      alert("Failed to delete experience.");
    }
  };

  // Add Project
  const handleAddProject = async () => {
    if (!projectTitle || !technologies || !details || !outcome) {
      alert("All project fields must be filled.");
      return;
    }

    const newProject = {
      title: projectTitle,
      technologies,
      details,
      outcome,
      githubLink,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/projects", newProject);
      alert("Project added successfully!");
      resetProjectForm();
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project.");
    }
  };

  // Delete Project
  const handleDeleteProject = async () => {
    if (!projectTitle) {
      alert("Project title is required to delete a project.");
      return;
    }

    try {
      const response = await axios.delete("http://localhost:5000/api/projects", {
        data: { title: projectTitle },
      });

      alert(response.data.message);
      resetProjectForm();
    } catch (error) {
      console.error("Error deleting project:", error.response ? error.response.data : error.message);
      alert("Failed to delete project.");
    }
  };

  // Reset Experience From
  const resetForm = () => {
    setPosition("");
    setCompany("");
    setDuration("");
    setResponsibilities(""); // Reset responsibilities
    setDescription(""); // Reset description
  };

  // Reset Project Form
  const resetProjectForm = () => {
    setProjectTitle("");
    setTechnologies("");
    setDetails("");
    setOutcome("");
    setGithubLink("");
  };

  // Add Skills
  const handleAddSkill = async () => {
    const newSkill = {
      mainHeading,
      subHeading,
      skillDetails: skillDetails
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line), // Split by new line
    };

    try {
      const response = await axios.post("http://localhost:5000/api/skills", newSkill);
      alert("Skill added successfully!");
      addSkill(response.data); // Add the skill to the parent state
      resetSkillForm();
    } catch (error) {
      console.error("Error adding skill:", error.message);
      alert("Failed to add skill.");
    }
  };

  // Delete Skills
  const handleDeleteSkill = async () => {
    if (!subHeading) {
      alert("Sub heading is required to delete a skill.");
      return;
    }

    try {
      const response = await axios.delete("http://localhost:5000/api/skills", {
        data: { subHeading },
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert(response.data.message);
      deleteSkill(subHeading); // Update the state in the parent component
      resetSkillForm();
    } catch (error) {
      console.error("Error deleting skill:", error.response ? error.response.data : error.message);
      alert("Failed to delete skill.");
    }
  };

  // Reset Skills Form
  const resetSkillForm = () => {
    setMainHeading("");
    setSubHeading("");
    setSkillDetails(""); // Reset 'skillDetails'
  };

  // Reset About Form
  const resetAboutForm = () => {
    setAboutContent("");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose(); // Close modal if clicked outside
        }
      }}
    >
      <div
        className="bg-gray-800 text-white p-6 rounded shadow-lg w-99 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} >
      
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <div className="flex justify-around mb-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "Add Experience" ? "bg-blue-500" : "bg-gray-600"
            }`}
            onClick={() => setActiveTab("Add Experience")}
          >
            Experiences
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "Projects" ? "bg-blue-500" : "bg-gray-600"
            }`}
            onClick={() => setActiveTab("Projects")}
          >
            Projects
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "Skills" ? "bg-blue-500" : "bg-gray-600"
            }`}
            onClick={() => setActiveTab("Skills")}
          >
            Skills
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "About" ? "bg-blue-500" : "bg-gray-600"
            }`}
            onClick={() => setActiveTab("About")}
          >
            About
          </button>
        </div>

        {/* Add Experience Tab */}
        {activeTab === "Add Experience" && (
          <div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form>
              <label className="block mb-2">
                Position:
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                />
              </label>
              <label className="block mb-2">
                Company:
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                />
              </label>
              <label className="block mb-2">
                Duration:
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                />
              </label>
              <label className="block mb-2">
                Description:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                ></textarea>
              </label>
              <label className="block mb-2">
                Responsibilities (Press Enter for each item):
                <textarea
                  value={responsibilities}
                  onChange={handleResponsibilitiesChange}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                  rows="5"
                  placeholder="Enter responsibilities, each on a new line."
                ></textarea>
              </label>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="bg-red-500 px-4 py-2 rounded"
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 px-4 py-2 rounded"
                  onClick={handleAddExperience}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-yellow-500 px-4 py-2 rounded"
                  onClick={handleDeleteExperience}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "Projects" && (
          <div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form>
              <label className="block mb-2">
                Project Title:
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                />
              </label>
              <label className="block mb-2">
                Technologies:
                <input
                  type="text"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                />
              </label>
              <label className="block mb-2">
                Details:
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                ></textarea>
              </label>
              <label className="block mb-2">
                Outcome:
                <textarea
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                  placeholder="Enter each paragraph on a new line"
                  rows="5"
                ></textarea>
              </label>

              <label className="block mb-2">
                GitHub Link:
                <input
                  type="text"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                />
              </label>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="bg-red-500 px-4 py-2 rounded"
                  onClick={resetProjectForm}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 px-4 py-2 rounded"
                  onClick={handleAddProject}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-yellow-500 px-4 py-2 rounded"
                  onClick={handleDeleteProject}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "Skills" && (
          <div>
            <form>
              <label className="block mb-2">
                Main Heading:
                <input
                  type="text"
                  value={mainHeading}
                  onChange={(e) => setMainHeading(e.target.value)}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                />
              </label>
              <label className="block mb-2">
                Sub Heading:
                <input
                  type="text"
                  value={subHeading}
                  onChange={(e) => setSubHeading(e.target.value)}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                />
              </label>
              <label className="block mb-2">
                Skill Details:
                <textarea
                  value={skillDetails} // Updated to 'skillDetails'
                  onChange={(e) => setSkillDetails(e.target.value)} // Updated to 'skillDetails'
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                ></textarea>
              </label>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="bg-red-500 px-4 py-2 rounded"
                  onClick={resetSkillForm}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 px-4 py-2 rounded"
                  onClick={handleAddSkill}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-yellow-500 px-4 py-2 rounded"
                  onClick={handleDeleteSkill}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        )}

        {/* About Tab */}
        {activeTab === "About" && (
          <div>
            <form>
              <label className="block mb-2">
                About Me Content:
                <textarea
                  value={aboutContent}
                  onChange={(e) => setAboutContent(e.target.value)}
                  onKeyDown={handleKeyDown} // Add this handler for line breaks
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                  rows="10"
                  placeholder="Write your about me content here..."
                ></textarea>
              </label>
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  className="bg-yellow-500 px-4 py-2 rounded"
                  onClick={handleTextFormat} // Add this handler
                >
                  Bold Text
                </button>
                <button
                  type="button"
                  className="bg-red-500 px-4 py-2 rounded"
                  onClick={resetAboutForm}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 px-4 py-2 rounded"
                  onClick={handleSaveAbout}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanelModal;
