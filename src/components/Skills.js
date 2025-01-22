import React, { useEffect, useState } from "react";
import axios from "axios";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Technical Skills"); // Default visible category
  const [isTransitioning, setIsTransitioning] = useState(false); // To handle animations

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/skills");
        console.log("Fetched skills data:", response.data);

        if (Array.isArray(response.data)) {
          const groupedSkills = response.data.reduce((acc, skill) => {
            if (skill.mainHeading && Array.isArray(skill.subSkills)) {
              acc[skill.mainHeading] = skill.subSkills;
            } else {
              console.warn("Skipping invalid skill:", skill);
            }
            return acc;
          }, {});
          setSkills(groupedSkills);
        } else {
          console.error("API returned invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error.message);
      }
    };

    fetchSkills();
  }, []);

  const handleCategoryChange = (category) => {
    if (category !== selectedCategory) {
      setIsTransitioning(true); // Trigger animation
      setTimeout(() => {
        setSelectedCategory(category);
        setIsTransitioning(false); // End animation
      }, 300); // Match the duration of the animation
    }
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-r 
      from-blue-500 via-green-500 to-purple-500 
      animate-gradient 
      overflow-hidden"
      style={{ backgroundSize: "400% 400%" }}
    >
      <div className="relative z-10 py-10 px-5">
        <h1 className="text-4xl font-bold text-center mb-10 text-white">
          My Skills
        </h1>
        {/* Buttons to toggle between categories */}
        <div className="flex justify-center gap-4 mb-10">
          {Object.keys(skills).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-lg font-semibold ${
                selectedCategory === category
                  ? "bg-white text-blue-500 shadow-lg"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Display selected category with animation */}
        <div
          className={`transition-all duration-300 ${
            isTransitioning
              ? "opacity-0 transform scale-95"
              : "opacity-100 transform scale-100"
          }`}
        >
          {Object.entries(skills)
            .filter(([mainHeading]) => mainHeading === selectedCategory)
            .map(([mainHeading, subSkills]) => (
              <div key={mainHeading} className="space-y-4">
                <h2 className="text-3xl font-semibold text-white flex items-center">
                  <span className="border-l-4 border-white h-full mr-3"></span>
                  {mainHeading}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subSkills.map((skill, index) => (
                    <div
                      key={`${skill.subHeading}-${index}`}
                      className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300 hover:bg-purple-50"
                    >
                      <h3 className="text-xl font-bold text-gray-800">
                        {skill.subHeading}
                      </h3>
                      <div>
                        {skill.skillDetails.map((detail, index) => (
                          <p
                            key={index}
                            className="text-gray-600 mt-2 text-justify"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
