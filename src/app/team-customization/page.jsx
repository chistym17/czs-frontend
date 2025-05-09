"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';
import Navbar from "../../components/Navbar";
import TeamAuthForm from "../../components/TeamAuthForm";
import TeamInfoHeader from "../../components/TeamInfoHeader";
import PlayerGrid from "../../components/PlayerGrid";
import { useParams } from 'next/navigation';

const TeamCustomization = () => {
  const { teamId } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authenticatedTeamName, setAuthenticatedTeamName] = useState(null);

  const fetchTeamData = async (teamName) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/by-name/${encodeURIComponent(teamName)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch team data');
      }
      const data = await response.json();
      if (data.success) {
        setTeamData(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch team data');
      }
    } catch (error) {
      toast.error('Error loading team data');
      console.error('Error:', error);
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
        setAuthenticatedTeamName(teamName);
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

  const handleTeamUpdate = async (updatedTeam) => {
  
  };

  const handlePlayerUpdate = async (playerId, updatedPlayer) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/${teamId}/players/${playerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlayer),
      });

      if (!response.ok) {
        throw new Error('Failed to update player');
      }

      const data = await response.json();
      if (data.success) {
        setTeamData(prev => ({
          ...prev,
          players: prev.players.map(p => p._id === playerId ? data.data : p)
        }));
        toast.success('Player updated successfully');
      } else {
        throw new Error(data.message || 'Failed to update player');
      }
    } catch (error) {
      toast.error('Error updating player');
      console.error('Error:', error);
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

  if (!teamData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-800 text-2xl">Team not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
      <div className="max-w-7xl mx-auto space-y-8">
        <TeamInfoHeader 
          team={teamData} 
          onTeamUpdate={handleTeamUpdate}
          onLogoUpload={handleLogoUpload}
        />
        <PlayerGrid 
          players={teamData.players} 
          teamId={teamId}
          onPlayerUpdate={handlePlayerUpdate}
        />
      </div>
    </div>
  );
};

export default TeamCustomization;
