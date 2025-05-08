"use client";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../components/Navbar";
import TeamAuthForm from "../../components/TeamAuthForm";

const TeamCustomization = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teamData, setTeamData] = useState(null);

  const handleAuthentication = async (teamName, secretKey) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/verify-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamName, secretKey })
      });

      const data = await res.json();

      if (data?.isValid) {
        setIsAuthenticated(true);
        setTeamData(data);
        toast.success('Team authentication successful!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(data.message || 'Failed to authenticate team', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error('An error occurred during authentication. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <ToastContainer />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-blue-600 mb-4">
              Team Customization Portal
            </h1>
            <p className="text-gray-600 mb-6">
              Please provide your team name and secret key to access team customization features.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-yellow-800">
                ⚠️ Security Notice: This page requires authentication to ensure only verified team members can access team customization features. Please keep your secret key secure and do not share it with anyone.
              </p>
            </div>
            <TeamAuthForm onAuthenticate={handleAuthentication} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">
            Team Customization Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome, {teamData?.teamName}! You can now customize your team information.
          </p>

          {/* Main customization content will go here */}
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Team Information</h2>
              <p className="text-gray-600">
                Update your team logo, name, and other details.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Player Management</h2>
              <p className="text-gray-600">
                Update player photos, positions, and other information.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Team Statistics</h2>
              <p className="text-gray-600">
                View and update your team's performance metrics and statistics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCustomization;
