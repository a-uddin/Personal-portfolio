import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import AdminPanelModal from "./components/AdminPanelModal";
import Project from "./components/Project";
import Education from "./components/Education";
import Skills from "./components/Skills";
import SiteInfoModal from "./components/SiteInfoModal";
import API_BASE_URL from "./components/ApiBaseURL"; // Localhost 5000 url



function App() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [experiences, setExperiences] = useState([]); // Global experiences state
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [skills, setSkills] = useState([]); // Global state for skills
  const [showSiteInfo, setShowSiteInfo] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  // ---------Scroll up Event START-----------

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };
  // Scroll to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ------------scroll up Event END--------------

  // For Skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/skills`);
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const addSkill = (newSkill) => {
    setSkills((prevSkills) => [newSkill, ...prevSkills]);
  };

  const deleteSkill = (subHeading) => {
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill.subHeading !== subHeading)
    );
  };

  // ---------Admin Access-------------

  const handleAdminAccess = () => {
    setShowPasswordModal(true);
  };

  const verifyPassword = () => {
    if (password === "admin123") {
      setShowPasswordModal(false);
      setShowAdminPanel(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect Password!");
    }
  };

  //-------- Click outside the Admin Panle Modal to close --------------
  const handleModalOutsideClick = (e) => {
    setShowPasswordModal(false);
  };

  const closeAdminPanel = () => {
    setShowAdminPanel(false);
    setShowExperienceForm(false);
    setShowProjectForm(false);
  };

  //-----------For Experience----------------------
  const addExperience = (newExperience) => {
    setExperiences((prevExperiences) => [newExperience, ...prevExperiences]);
  };

  const deleteExperience = (position, company) => {
    setExperiences((prevExperiences) =>
      prevExperiences.filter(
        (exp) => exp.position !== position || exp.company !== company
      )
    );
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content-container">
          <Routes>
            <Route
              path="/"
              element={
                <main className="h-screen text-white flex items-center justify-center animated-bg">
                  <div className="text-center">
                    <h1 className="text-5xl font-bold">
                      Welcome to My Portfolio
                    </h1>
                    <p className="text-xl mt-4">
                      Cloud Engineer | Full Stack Developer
                    </p>
                    <button
                      className="mt-6 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                      onClick={() => {
                        window.location.href = "/about";
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                </main>
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/experience"
              element={
                <Experience
                  isAuthenticated={showAdminPanel}
                  promptLogin={() => setShowPasswordModal(true)} // Pass the function here
                />
              }
            />
            <Route
              path="/projects"
              element={
                <Project
                  isAuthenticated={showAdminPanel}
                  promptLogin={() => setShowPasswordModal(true)}
                />
              }
            />
            <Route path="/education" element={<Education />} />
            <Route path="/skills" element={<Skills skills={skills} />} />
          </Routes>
        </div>

        {/* --------Scroll to Top Button------------ */}

        {/* Scroll to Top Button */}
        {showScroll && (
          <button
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "50px",
              right: "10px",
              zIndex: "1000",
              backgroundColor: "rgb(69, 44, 44)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(131, 7, 7, 0.3)",
            }}
          >
            ↑
          </button>
        )}

        {/* ---------Footer---------- */}
        <footer className="footer bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Part 1: Contact Information */}
            <div className="flex flex-col space-y-4 mt-3">
              {/* Email */}
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-green-400"></i>
                <a
                  href="mailto:smmanowar.uddin@gmail.com"
                  className="text-base text-gray-400 hover:text-green-400 transition"
                >
                  smmanowar.uddin@gmail.com
                </a>
              </div>

              {/* Phone Numbers */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-phone-alt text-green-400"></i>
                  <span className="text-base text-gray-400 hover:text-green-400 transition">
                    +44-74 0547 2890
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-phone-alt text-green-400"></i>
                  <span className="text-base text-gray-400 hover:text-green-400 transition">
                    +45 2877 4447
                  </span>
                </div>
              </div>
            </div>

            {/* Part 2: Social Media Icons */}
            <div className="flex justify-center">
              <div className="flex space-x-6 mt-3">
                <a
                  href="https://linkedin.com/in/sm-anowar-uddin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition"
                >
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
                <a
                  href="https://github.com/a-uddin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition"
                >
                  <i className="fab fa-github fa-2x"></i>
                </a>
              </div>
            </div>

            {/* Part 3: Admin Panel Button */}
            <div className="flex justify-end"></div>
          </div>

          {/* Part 4: Copyright Section */}
          <div className="text-center mt-8 border-t border-gray-700 pt-4">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()}{" "}
              <a href="/" className="no-underline">
                Anowar Uddin
              </a>{" "}
              | All Rights Reserved.
              <br />
              <button
                className="text-xs text-gray-400 no-underline hover:text-green-400 transition mt-2"
                onClick={() => setShowSiteInfo(true)}
              >
                Site Info
              </button>
              <br />
              <button
                className="text-xs text-gray-400 no-underline hover:text-green-400 transition mt-2"
                onClick={handleAdminAccess}
              >
                Admin Panel
              </button>
            </p>
          </div>

          {/* Site Info Modal */}
          {showSiteInfo && (
            <SiteInfoModal onClose={() => setShowSiteInfo(false)} />
          )}

          {/*---------After Admin Login -----------*/}

          {showAdminPanel && (
            <>
              <button
                className="bg-gray-700 text-sm text-white px-3 py-1 rounded shadow-md ml-2"
                onClick={() => {
                  setShowExperienceForm(true);
                  setShowProjectForm(false);
                }}
              >
                Experience Tab
              </button>
              <button
                className="bg-gray-700 text-sm text-white px-3 py-1 rounded shadow-md ml-2"
                onClick={() => {
                  setShowProjectForm(true);
                  setShowExperienceForm(false);
                }}
              >
                Project Tab
              </button>
              <button
                className="bg-gray-700 text-sm text-white px-3 py-1 rounded shadow-md ml-2"
                onClick={() => {
                  setShowExperienceForm(false);
                  setShowProjectForm(false);
                  setShowSkillForm(true); // New state for Skills Tab
                }}
              >
                Skills Tab
              </button>
              <button
                className="bg-red-500 text-sm text-white px-3 py-1 rounded shadow-md ml-2"
                onClick={closeAdminPanel}
              >
                Sign Out
              </button>
            </>
          )}

          {showSkillForm && (
            <AdminPanelModal
              onClose={() => setShowSkillForm(false)}
              addSkill={addSkill} // Pass add skill function
              deleteSkill={deleteSkill} // Pass delete skill function
              skills={skills} // Pass skills list
            />
          )}
        </footer>

        {/*--------------- Admin Password Modal ------------------ */}

        {showPasswordModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleModalOutsideClick} // Handle clicks outside the modal
          >
            <div
              className="bg-gray-800 text-white p-6 rounded shadow-lg w-96"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <h2 className="text-2xl font-bold mb-4">Enter Admin Password</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent default form submission
                  verifyPassword(); // Trigger password verification
                }}
              >
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
                  placeholder="Enter Password"
                />
                {passwordError && (
                  <p className="text-red-500 mt-2">{passwordError}</p>
                )}
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    className="bg-red-500 px-4 py-2 rounded"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit" // Allows pressing "Enter" key to trigger this button
                    className="bg-blue-500 px-4 py-2 rounded"
                  >
                    OK
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Admin Panel Modal for Experience or Project */}
        {showExperienceForm && (
          <AdminPanelModal
            onClose={() => setShowExperienceForm(false)}
            addExperience={addExperience}
            deleteExperience={deleteExperience}
            experiences={experiences}
          />
        )}

        {showProjectForm && (
          <AdminPanelModal
            onClose={() => setShowProjectForm(false)}
            addExperience={addExperience}
            deleteExperience={deleteExperience}
            experiences={experiences}
          />
        )}

        {showSkillForm && (
          <AdminPanelModal
            onClose={() => setShowSkillForm(false)}
            addSkill={addSkill} // Pass addSkill function
            deleteSkill={deleteSkill} // Pass deleteSkill function
            skills={skills} // Pass skills list
          />
        )}
      </div>
    </Router>
  );
}

export default App;
