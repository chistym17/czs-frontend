'use client';
import { useState } from 'react';
import { FaLock, FaUsers, FaExclamationTriangle } from 'react-icons/fa';

const TeamAuthForm = ({ onAuthenticate }) => {
  const [formData, setFormData] = useState({
    teamName: '',
    secretKey: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.teamName || !formData.secretKey) {
      alert('Please fill in both team name and secret key');
      return;
    }
    onAuthenticate(formData.teamName, formData.secretKey);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Team Authentication</h2>
        <p className="text-gray-500 mt-2">Enter your credentials to access team settings</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <FaUsers className="text-blue-600" />
            Team Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your team name"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <FaLock className="text-blue-600" />
            Secret Key
          </label>
          <div className="relative">
            <input
              type="password"
              name="secretKey"
              value={formData.secretKey}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your secret key"
              required
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium mt-4"
        >
          Verify & Access Team Settings
        </button>
      </div>
    </div>
  );
};

export default TeamAuthForm;