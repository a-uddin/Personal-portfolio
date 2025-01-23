import React, { useEffect, useState } from "react";
import axios from "axios";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import "./Experience.css";

const Experience = ({ isAuthenticated, promptLogin }) => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get(
          "https://anowar-uddin.com/api/experiences"
        );
        setExperiences(response.data);
      } catch (error) {
        console.error(
          "Error fetching experiences:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchExperiences();
  }, []);

  const handleDragEnd = async (event) => {
    if (!isAuthenticated) {
      return; // Prevent drag if not authenticated
    }

    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = experiences.findIndex((item) => item._id === active.id);
      const newIndex = experiences.findIndex((item) => item._id === over.id);

      const updatedOrder = arrayMove(experiences, oldIndex, newIndex);
      setExperiences(updatedOrder); // Optimistic update for immediate feedback

      try {
        const response = await axios.put(
          "https://anowar-uddin.com/api/experiences/order",
          {
            experiences: updatedOrder.map((exp) => exp._id),
          }
        );

        if (Array.isArray(response.data)) {
          setExperiences(response.data); // Replace state with updated data from server
          console.log("Order saved and updated from server.");
        } else {
          console.error("Server response is not an array:", response.data);
        }
      } catch (error) {
        console.error(
          "Error saving order:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  if (!experiences || experiences.length === 0) {
    return <p>No experiences to display.</p>;
  }

  return (
    <div
      className="experience-page bg-gradient-to-r from-cyan-300 via-green-400 to-cyan-300 
        bg-size-200 bg-pos-0 
        animate-gradient 
        min-h-screen py-12">
      <h2 className="experience-title text-white">Experience</h2>
      {isAuthenticated ? (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={experiences.map((experience) => experience._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="experience-container">
              {experiences.map((experience) => (
                <SortableItem key={experience._id} id={experience._id}>
                  <div className="experience-row">
                    {/* Left Section */}
                    <div className="experience-left">
                      <h3 className="experience-position">
                        {experience.position}
                      </h3>
                      <p className="experience-company">{experience.company}</p>
                      <p className="experience-duration">
                        {experience.duration}
                      </p>
                    </div>

                    {/* Right Section */}
                    <div className="experience-right">
                      <p className="experience-description">
                        {experience.description}
                      </p>
                      <ul className="experience-responsibilities">
                        {experience.responsibilities.map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="experience-container">
          {experiences.map((experience) => (
            <div key={experience._id} className="experience-row">
              {/* Left Section */}
              <div className="experience-left">
                <h3 className="experience-position">{experience.position}</h3>
                <p className="experience-company">{experience.company}</p>
                <p className="experience-duration">{experience.duration}</p>
              </div>

              {/* Right Section */}
              <div className="experience-right">
                <p className="experience-description">
                  {experience.description}
                </p>
                <ul className="experience-responsibilities">
                  {experience.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;
