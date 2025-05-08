"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../components/Navbar";
import TeamAuthForm from "../../components/TeamAuthForm";
import TeamInfoHeader from "../../components/TeamInfoHeader";
import PlayerGrid from "../../components/PlayerGrid";

const TeamCustomization = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTeamData = async (teamName) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/by-name/${encodeURIComponent(teamName)}`);
      const data = await res.json();

      if (data.success) {
        setTeamData(data.data);
      } else {
        toast.error('Failed to fetch team data');
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
      toast.error('An error occurred while fetching team data');
    } finally {
      setIsLoading(false);
    }
  };

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
        await fetchTeamData(teamName);
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

  const handleLogoUpload = (logoUrl) => {
    setTeamData(prev => ({
      ...prev,
      logo: logoUrl
    }));
    toast.success('Team logo updated successfully!');
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Team Info Header */}
        <TeamInfoHeader 
          teamData={teamData} 
          onLogoUpload={handleLogoUpload}
        />

        {/* Players Grid */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Players</h2>
            <PlayerGrid players={teamData?.players || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCustomization;
