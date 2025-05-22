"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';
import Navbar from "../../components/Navbar";
import TeamAuthForm from "../../components/TeamAuthForm";
import TeamInfoHeader from "../../components/TeamInfoHeader";
import PlayerGrid from "../../components/PlayerGrid";

const AUTH_EXPIRY_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

const TeamCustomization = () => {
  const [teamId, setTeamId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authenticatedTeamName, setAuthenticatedTeamName] = useState(null);

  const checkAuthExpiry = () => {
    const authTimestamp = localStorage.getItem('authTimestamp');
    if (!authTimestamp) return false;

    const now = Date.now();
    const expiryTime = parseInt(authTimestamp) + AUTH_EXPIRY_TIME;
    
    if (now > expiryTime) {
      // Clear expired auth data
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authenticatedTeamName');
      localStorage.removeItem('authTimestamp');
      return false;
    }
    return true;
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedTeamName = localStorage.getItem('authenticatedTeamName');
    
    if (storedAuth === 'true' && storedTeamName && checkAuthExpiry()) {
      setIsAuthenticated(true);
      setAuthenticatedTeamName(storedTeamName);
      fetchTeamData(storedTeamName);
    } else {
      // Clear any expired or invalid auth data
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authenticatedTeamName');
      localStorage.removeItem('authTimestamp');
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  const fetchTeamData = async (teamName) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/by-name/${encodeURIComponent(teamName)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch team data');
      }
      const data = await response.json();
      if (data.success) {
        setTeamData(data.data);
        setTeamId(data.data._id);
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
        const now = Date.now();
        setIsAuthenticated(true);
        setAuthenticatedTeamName(teamName);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authenticatedTeamName', teamName);
        localStorage.setItem('authTimestamp', now.toString());
        await fetchTeamData(teamName);
        toast.success('Team authentication successful! You will be logged out in 15 minutes.', {
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

  // Add auto-logout effect
  useEffect(() => {
    if (isAuthenticated) {
      const checkExpiryInterval = setInterval(() => {
        if (!checkAuthExpiry()) {
          setIsAuthenticated(false);
          setAuthenticatedTeamName(null);
          setTeamData(null);
          toast.error('Your session has expired. Please log in again.', {
            position: "top-right",
            autoClose: 5000,
          });
        }
      }, 60000); // Check every minute

      return () => clearInterval(checkExpiryInterval);
    }
  }, [isAuthenticated]);

  const handleTeamUpdate = async (updatedTeam) => {
  
  };

  const handlePlayerUpdate = async () => {
    if (authenticatedTeamName) {
      await fetchTeamData(authenticatedTeamName);
    }
  };

  const handleLogoUpload = (logoUrl) => {
    setTeamData(prev => ({
      ...prev,
      logo: logoUrl
    }));
    toast.success('Team logo updated successfully!');
  };

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authenticatedTeamName');
    localStorage.removeItem('authTimestamp');
    setIsAuthenticated(false);
    setAuthenticatedTeamName(null);
    setTeamData(null);
    toast.success('Successfully logged out. Please close this window for security.', {
      position: "top-center",
      duration: 5000,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
              Team Captain Portal
            </h1>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left side - Information */}
              <div className="flex-1 space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-blue-800 mb-2">Welcome Team Captains!</h2>
                  <p className="text-blue-700">
                    This portal is exclusively for team captains to manage their team's information. 
                    Please use your team's secret key to access the customization features.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-green-800 mb-2">Available Features</h2>
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li>Update team information (team name, captain details)</li>
                    <li>Manage player roster and details</li>
                    <li>Upload and update team logo</li>
                    <li>Add player profile images</li>
                    <li>Update player positions and jersey numbers</li>
                    <li>Track player statistics</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h2>
                  <p className="text-gray-600">
                    If you've lost your secret key or need assistance, please contact the tournament organizers.
                    Do not attempt to access the portal without proper authorization.
                  </p>
                </div>
              </div>

              {/* Right side - Authentication Form */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Team Authentication</h2>
                  <TeamAuthForm onAuthenticate={handleAuthentication} />
                </div>
              </div>
            </div>
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
    <div>
      <Navbar />
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

          {/* Logout Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-red-50 rounded-lg p-6 max-w-3xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center space-x-2 text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="text-lg font-semibold">Important Security Notice</h3>
                </div>
                <p className="text-red-600">
                  Always log out when you're done to prevent unauthorized access to your team's data.
                  Other team members should not be able to modify team information without proper authentication.
                </p>
                <button
                  onClick={handleLogout}
                  className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCustomization;
