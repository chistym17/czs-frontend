"use client";

import {
  Bell,
  FileText,
  LogOut,
  Menu,
  ShieldCheck,
  Trash,
  UploadCloud,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { FaTrash, FaCheck, FaTimes, FaEdit, FaUsers, FaChevronRight } from 'react-icons/fa';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState([]);
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, playersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams`),
        ]);

        const teamsData = await teamsRes.json();

        if (teamsData.success) {
          setTeams(teamsData.data);
        }
      } catch (error) {
        console.error("Error loading dashboard:", error);
        toast.error('Failed to fetch teams');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const deleteTeam = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/team/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete team');
      }

      toast.success('Team deleted successfully');
      setTeams((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error('Error deleting team:', error);
      toast.error(error.message || 'Failed to delete team');
    }
  };

  const deletePlayer = async (id) => {
    if (!confirm("Are you sure you want to delete this player?")) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setPlayers((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete player.");
    }
  };

  const handleTeamSelect = async (team) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/${team._id}`);
      const data = await response.json();
      if (data.success) {
        setSelectedTeam(data.data);
        setSelectedTeamPlayers(data.data.players || []);
        setShowTeamDetails(true);
      } else {
        throw new Error(data.message || 'Failed to fetch team details');
      }
    } catch (error) {
      console.error('Error fetching team details:', error);
      toast.error('Failed to fetch team details');
    }
  };

  const handleToggleVerification = async (teamId, currentStatus) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/${teamId}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isVerified: !currentStatus })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Team ${!currentStatus ? 'verified' : 'unverified'} successfully`);
        fetchTeams();
        if (selectedTeam?._id === teamId) {
          setSelectedTeam(prev => ({ ...prev, isVerified: !currentStatus }));
        }
      } else {
        throw new Error(data.message || 'Failed to update team verification status');
      }
    } catch (error) {
      console.error('Error updating team verification:', error);
      toast.error(error.message || 'Failed to update team verification status');
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/team/${teamId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Team deleted successfully');
        setShowDeleteConfirm(false);
        setTeamToDelete(null);
        if (selectedTeam?._id === teamId) {
          setSelectedTeam(null);
        }
      } else {
        throw new Error(data.message || 'Failed to delete team');
      }
    } catch (error) {
      console.error('Error deleting team:', error);
      toast.error(error.message || 'Failed to delete team');
    }
  };

  const handleDeletePlayer = async (teamId, playerId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/teams/${teamId}/players/${playerId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Player deleted successfully');
        if (selectedTeam?._id === teamId) {
          setSelectedTeam(prev => ({
            ...prev,
            players: prev.players.filter(p => p._id !== playerId)
          }));
        }
      } else {
        throw new Error(data.message || 'Failed to delete player');
      }
    } catch (error) {
      console.error('Error deleting player:', error);
      toast.error(error.message || 'Failed to delete player');
    }
  };

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-blue-100 shadow flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-blue-700 hover:text-blue-900"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-extrabold">Tournament Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-blue-600 hover:text-blue-800">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-blue-700" />
            </div>
            <div className="hidden md:block text-sm">admin@example.com</div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-10 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-6 space-y-4 text-blue-800">
          <button
            onClick={() => router.push("/admin/upload-fixture")}
            className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-900"
          >
            <UploadCloud className="h-5 w-5" />
            Upload Fixtures
          </button>
          <button
            onClick={() => router.push("/admin/upload-result")}
            className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-900"
          >
            <FileText className="h-5 w-5" />
            Upload Results
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 hover:text-red-800"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-24 px-6 transition-all ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <section className="bg-blue-50 p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-extrabold mb-2">Welcome Admin</h2>
          <p className="text-blue-700">
            Use the sidebar to upload tournament fixtures and match results.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-blue-200 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">Upload Fixtures</h3>
            <p className="text-sm text-blue-700 mb-4">
              Upload upcoming match fixtures to keep your tournament updated.
            </p>
            <button
              onClick={() => router.push("/admin/upload-fixture")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Go to Upload Fixtures
            </button>
          </div>

          <div className="bg-white border border-blue-200 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">Upload Match Results</h3>
            <p className="text-sm text-blue-700 mb-4">
              Upload results for completed matches and track performance.
            </p>
            <button
              onClick={() => router.push("/admin/upload-result")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Go to Upload Results
            </button>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Registered Teams</h2>
            <div className="text-sm text-gray-500">
              Total Teams: {teams.length}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div 
                key={team._id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FaUsers className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{team.teamName}</h3>
                        <p className="text-sm text-gray-500">Batch {team.batchYear}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      team.isVerified 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {team.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium w-24">Captain:</span>
                      <span>{team.captainName}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium w-24">Vice Captain:</span>
                      <span>{team.viceCaptainName}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleVerification(team._id, team.isVerified)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1 ${
                          team.isVerified
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                      >
                        {team.isVerified ? (
                          <>
                            <FaTimes className="w-3.5 h-3.5" />
                            <span>Unverify</span>
                          </>
                        ) : (
                          <>
                            <FaCheck className="w-3.5 h-3.5" />
                            <span>Verify</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setTeamToDelete(team);
                          setShowDeleteConfirm(true);
                        }}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 flex items-center space-x-1"
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                    <button
                      onClick={() => router.push(`/admin/teams/${team._id}`)}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center space-x-1"
                    >
                      <span>View Details</span>
                      <FaChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        <footer className="mt-12 text-center text-sm text-blue-400">
          © {new Date().getFullYear()} Tournament Admin. All rights reserved.
        </footer>

        {/* Team Details Modal */}
        {showTeamDetails && selectedTeam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedTeam.teamName}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Batch {selectedTeam.batchYear}
                    </span>
                    <span className={`px-3 py-1 ${
                      selectedTeam.isVerified
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    } rounded-full text-sm`}>
                      {selectedTeam.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowTeamDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Captain</h4>
                  <p className="text-gray-900">{selectedTeam.captainName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Vice Captain</h4>
                  <p className="text-gray-900">{selectedTeam.viceCaptainName}</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Team Players</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedTeamPlayers.map((player) => (
                    <div
                      key={player._id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{player.name}</h5>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {player.position}
                            </span>
                            {player.jerseyNumber && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                #{player.jerseyNumber}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeletePlayer(selectedTeam._id, player._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          title="Delete Player"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && teamToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {teamToDelete.teamName}? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setTeamToDelete(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteTeam(teamToDelete._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Team
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
