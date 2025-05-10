'use client';

// this form is used to register players to the team

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaTshirt, FaFutbol } from 'react-icons/fa';

const PlayerForm = ({ onNext, onPrevious, playerNumber, totalPlayers }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    jerseyNumber: ''
  });

  const positions = [
    'GK', 'CB', 'RB', 'LB', 'CDM', 'CM', 'CAM',
    'RM', 'LM', 'RW', 'LW', 'CF', 'ST', 'SS'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name) return false;
    if (!formData.position) return false;

    if (formData.jerseyNumber && isNaN(formData.jerseyNumber)) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const currentData = { ...formData };
      await onNext(currentData);
      setFormData({
        name: '',
        position: '',
        jerseyNumber: ''
      });
    } else {
      alert("Please fill in all required fields correctly");
    }
  };


  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-1 flex items-center gap-2">
          <FaUser className="text-xl" /> Player {playerNumber}/{totalPlayers}
        </h2>
        <div className="h-1 w-20 bg-blue-500 rounded-full mb-2"></div>
        <p className="text-gray-500 text-xs">
          You must add 16 players to complete registration
        </p>
      </div>

      <div className="space-y-5">
        <div className="form-control">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FaUser className="text-blue-500 text-xs" /> Player Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
            placeholder="Enter player name"
            required
          />
        </div>

        <div className="form-control">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FaFutbol className="text-blue-500 text-xs" /> Position <span className="text-red-500">*</span>
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          >
            <option value="">Select Position</option>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FaTshirt className="text-blue-500 text-xs" /> Jersey Number <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            type="number"
            name="jerseyNumber"
            value={formData.jerseyNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
            placeholder="Enter jersey number"
          />
        </div>

        <div className="flex justify-between pt-2">
          <button
            onClick={onPrevious}
            disabled={playerNumber === 1}
            className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium"
          >
            {playerNumber < totalPlayers ? 'Next Player' : 'Complete'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerForm;