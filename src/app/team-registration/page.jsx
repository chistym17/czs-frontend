"use client";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    batchYear: "",
    captainName: "",
    viceCaptainName: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teamName) newErrors.teamName = "Team name is required";
    if (!formData.batchYear) newErrors.batchYear = "Batch year is required";
    else if (isNaN(formData.batchYear)) newErrors.batchYear = "Batch year must be a number";
    else if (formData.batchYear < 2000 || formData.batchYear > 2099) newErrors.batchYear = "Please enter a valid year between 2000 and 2099";
    if (!formData.captainName) newErrors.captainName = "Captain name is required";
    if (!formData.viceCaptainName) newErrors.viceCaptainName = "Vice-captain name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="bg-white">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto font-bold text-black min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">
          Team Registration
        </h1>
        <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text">Team Name</span>
            </label>
            <input
              type="text"
              name="teamName"
              placeholder="Enter your team name"
              className="input input-bordered w-full bg-gray-100"
              value={formData.teamName}
              onChange={handleChange}
            />
            {errors.teamName && (
              <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text">Batch Year</span>
            </label>
            <input
              type="text"
              name="batchYear"
              placeholder="Enter which ssc year your team was"
              className="input input-bordered w-full bg-blue-50"
              value={formData.batchYear}
              onChange={handleChange}
            />
            {errors.batchYear && (
              <p className="text-red-500 text-sm mt-1">{errors.batchYear}</p>
            )}
          </div>

          {/* Captain and Vice-Captain */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Captain Name</span>
              </label>
              <input
                type="text"
                name="captainName"
                placeholder="Enter captain's name"
                className="input input-bordered w-full bg-blue-50"
                value={formData.captainName}
                onChange={handleChange}
              />
              {errors.captainName && (
                <p className="text-red-500 text-sm mt-1">{errors.captainName}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">Vice-Captain Name</span>
              </label>
              <input
                type="text"
                name="viceCaptainName"
                placeholder="Enter vice-captain's name"
                className="input input-bordered w-full bg-blue-50"
                value={formData.viceCaptainName}
                onChange={handleChange}
              />
              {errors.viceCaptainName && (
                <p className="text-red-500 text-sm mt-1">{errors.viceCaptainName}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={() => {
              if (validateForm()) {
                // Create team object with empty players array
                const teamData = {
                  teamName: formData.teamName,
                  batchYear: formData.batchYear,
                  captainName: formData.captainName,
                  viceCaptainName: formData.viceCaptainName,
                  players: [] // Empty array for players
                };

                // Save to localStorage
                localStorage.setItem('teamData', JSON.stringify(teamData));
                
                // Navigate to players page
                window.location.href = "/team-registration/players";
              }
            }}
          >
            Continue to Players Registration
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default page;
