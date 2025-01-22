import React from "react";

const SiteInfoModal = ({ onClose }) => {
  // Prevent closing modal when clicking inside it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-left"
      onClick={onClose} // Close modal on outside click
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-3/4 max-w-md text-gray-800"
        onClick={handleModalClick}
      >
        <h2 className="text-xl font-bold mb-4">Site Information</h2>
        <p>
        I developed this portfolio website using React, Node.js, Express, Axios, JSX, MongoDB, and Mongoose.<br/> 
        For styling, I utilized Tailwind CSS and custom CSS to create a visually appealing and responsive design.<br/>

        © 2025 Anowar Uddin. All rights reserved.
        </p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SiteInfoModal;
