import React from "react";
import "./Education.css";

const Education = () => {
  const educationData = [
    {
      degree: "BSc (Hons) in Cloud Computing",
      institution: "University of East London",
      location: "London, UK",
      duration: "2023 - On-going",
      skills: [
        "Linux",
        "React",
        "NodeJS",
        "Express",
        "MongoDB",
        "SQL",
        "Python",
        "Data Communication",
      ],
    },
    {
      degree: "MSc. Public Administration",
      institution: "Roskilde University, Denmark",
      location: "Denmark",
      duration: "2008 – 2010",
      skills: ["Public Policy", "Research", "Administration", "English"],
    },
    {
      degree: "MSS in Public Administration",
      institution: "University Of Chittagong",
      location: "Bangladesh",
      duration: "2005 – 2006",
      skills: [
        "Administration",
        "Public Policy",
        "Rural development",
        "Good Governance",
      ],
    },
  ];
  
    // Define card styles outside the return block
    const getCardStyle = (index) => ({
        marginLeft: index % 2 === 0 ? "0px" : "0", // Add margin-left for 1st, 3rd...
        marginRight: index % 2 !== 0 ? "0px" : "0", // Add margin-right for 2nd, 4th...
      });

  return (
    <div className="education-page">
      <h1 className="education-title animate-fade-in">Education</h1>
      <div className="education-container">
        {educationData.map((education, index) => (
          <div
            className={`education-card ${
              index % 2 === 0 ? "left-card" : "right-card"
            } hover:shadow-lg hover:scale-105 transition-all duration-300`}
            key={index}
            style={getCardStyle(index)}
          >
            <div className="education-content">
              <h2 className="education-degree">{education.degree}</h2>
              <p className="education-institution">{education.institution}</p>
              <p className="education-location">{education.location}</p>
              <p className="education-duration">{education.duration}</p>
              <div className="education-skills">
                {education.skills.map((skill, skillIndex) => (
                  <span className="education-skill" key={skillIndex}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
