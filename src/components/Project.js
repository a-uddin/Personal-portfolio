import React, { useState, useEffect } from "react";
import axios from "axios";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import "./Project.css"; // Importing the new CSS file

const Project = ({ isAuthenticated, promptLogin }) => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // Number of projects initially visible

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://18.185.103.250:5000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Handle drag end
 // Handle drag end
const handleDragEnd = async (event) => {
  if (!isAuthenticated) {
    return; // Prevent drag if not authenticated
  }

  const { active, over } = event;

  if (active.id !== over.id) {
    const reorderedProjects = [...projects];
    const oldIndex = projects.findIndex((project) => project._id === active.id);
    const newIndex = projects.findIndex((project) => project._id === over.id);

    const updatedOrder = arrayMove(reorderedProjects, oldIndex, newIndex);
    setProjects(updatedOrder); // Update local state

    // Save the updated order to the server
    try {
      await axios.put("http://18.185.103.250:5000/api/projects/order", {
        projects: updatedOrder.map((project) => project._id),
      });
      console.log("Project order saved successfully.");
    } catch (error) {
      console.error("Error saving project order:", error);
    }
  }
};


  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Load 3 more projects each time
  };

  if (projects.length === 0) {
    return <p>No projects to display.</p>;
  }

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <div className="project-page bg-gradient-to-r from-amber-300 via-sky-400 to-lime-300 
    bg-size-200 bg-pos-0 
    animate-gradient 
    min-h-screen py-12">
      <h2 className="text-2xl font-bold mb-4 text-white text-center project-heading-title">Projects</h2>
      {isAuthenticated ? (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={visibleProjects.map((project) => project._id)}
            strategy={verticalListSortingStrategy}
          >
            {visibleProjects.map((project) => (
              <SortableItem key={project._id} id={project._id}>
                <div className="project-card">
                  <h3 className="project-title">{project.title}</h3>
                  <p>
                    <strong>Technologies:</strong>{" "}
                    {project.technologies.join(", ")}
                  </p>
                  <p>
                    <strong>Details:</strong>
                  </p>
                  <ul className="list-disc pl-5">
                    {project.details.split("\n").map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Outcome:</strong>
                  </p>
                  <ul className="list-disc pl-5">
                    {project.outcome.split("\n").map((outline, index) => (
                      <li key={index}>{outline}</li>
                    ))}
                  </ul>
                  {project.githubLink && (
                    <p>
                      <strong>GitHub Link:</strong>{" "}
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.githubLink}
                      </a>
                    </p>
                  )}
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        visibleProjects.map((project) => (
          <div key={project._id} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p>
              <strong>Technologies:</strong>{" "}
              {project.technologies.join(", ")}
            </p>
            <p>
              <strong>Details:</strong>
            </p>
            <ul className="list-disc pl-5">
              {project.details.split("\n").map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
            <p>
              <strong>Outcome:</strong>
            </p>
            <ul className="list-disc pl-5">
              {project.outcome.split("\n").map((outline, index) => (
                <li key={index}>{outline}</li>
              ))}
            </ul>
            {project.githubLink && (
              <p>
                <strong>GitHub Link:</strong>{" "}
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.githubLink}
                </a>
              </p>
            )}
          </div>
        ))
      )}
      {visibleCount < projects.length && (
        <div className="text-center mt-5">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Project;
