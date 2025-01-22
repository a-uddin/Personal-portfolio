import React, { useState } from "react";

const ExperienceFormModal = ({ onClose }) => {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [duration, setDuration] = useState("");
  const [responsibilities, setResponsibilities] = useState([]);
  const [newResponsibility, setNewResponsibility] = useState("");
  const [error, setError] = useState("");

  const handleAddResponsibility = () => {
    if (newResponsibility.trim()) {
      setResponsibilities([...responsibilities, newResponsibility.trim()]);
      setNewResponsibility("");
      setError(""); // Clear any previous error
    } else {
      setError("Responsibility cannot be empty!");
    }
  };

  const handleSubmit = () => {
    if (!position || !company || !duration || responsibilities.length === 0) {
      setError("All fields must be filled out, and at least one responsibility added.");
      return;
    }

    // Example save logic
    const experienceData = {
      position,
      company,
      duration,
      responsibilities,
    };
    console.log("Experience Saved:", experienceData);

    // Reset form and close modal
    setPosition("");
    setCompany("");
    setDuration("");
    setResponsibilities([]);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 text-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
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
            Responsibilities:
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
                className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600"
              />
              <button
                type="button"
                onClick={handleAddResponsibility}
                className="bg-green-500 px-4 py-2 rounded text-white"
              >
                Add
              </button>
            </div>
          </label>
          <ul className="list-disc pl-6 mt-2">
            {responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceFormModal;
