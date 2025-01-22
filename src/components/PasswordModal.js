import React, { useState } from "react";
import { motion } from "framer-motion";

const PasswordModal = ({ onSubmit, onClose }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
    setPassword(""); // Clear the password field
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <motion.div className="bg-gray-800 text-white rounded-lg p-8 w-96 space-y-4 shadow-lg">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label className="block">
            Password:
            <input
              type="password"
              className="w-full mt-2 p-2 rounded bg-gray-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PasswordModal;
