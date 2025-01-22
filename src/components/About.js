import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import photo from "./photo.png"; // Replace with the correct path
import axios from "axios";

function About() {
  const [content, setContent] = useState("");

  // Fetch the "About" content from the server
  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await axios.get("http://18.185.103.250:5000/api/about");
        setContent(response.data.content || "");
      } catch (error) {
        console.error("Error fetching About content:", error.message);
      }
    };

    fetchAboutContent();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between child animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-animated-gradient text-white flex items-center justify-center px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="container mx-auto flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:gap-6">
        {/* Text Section */}
        <motion.div
          className="md:text-left flex-1 space-y-6"
          variants={itemVariants}
        >
          <h4 className="text-xl md:text-4xl font-bold">About Me</h4>
          {/* Render the fetched content */}
          <div
            className="text-xl md:text-xl leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: content }} // Allow rendering of HTML content from the backend
          ></div>
        </motion.div>

        {/* Photo Section */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end"
          variants={itemVariants}
        >
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden">
            <img
              src={photo}
              alt="Profile"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default About;
