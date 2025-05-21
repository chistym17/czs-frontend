'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast, Toaster } from 'react-hot-toast';
import { FaTrash, FaArrowLeft, FaEdit, FaCheck, FaTimes, FaFutbol } from 'react-icons/fa';

export default function TeamDetailsClient({ teamId }) {
  const router = useRouter();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [showAddGoalsModal, setShowAddGoalsModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [goalsToAdd, setGoalsToAdd] = useState('');

  useEffect(() => {
    fetchTeamDetails();
  }, [teamId]);

  const fetchTeamDetails = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/${teamId}`);
      const data = await response.json();
      if (data.success) {
        setTeam(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch team details');
      }
    } catch (error) {
      console.error('Error fetching team details:', error);
      toast.error('Failed to fetch team details');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVerification = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/teams/${teamId}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ isVerified: !team.isVerified })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Team ${!team.isVerified ? 'verified' : 'unverified'} successfully`);
        setTeam(prev => ({ ...prev, isVerified: !prev.isVerified }));
      } else {
        throw new Error(data.message || 'Failed to update team verification status');
      }
    } catch (error) {
      console.error('Error updating team verification:', error);
      toast.error(error.message || 'Failed to update team verification status');
    }
  };

  const handleDeletePlayer = async () => {
    if (!playerToDelete) return;
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/teams/${teamId}/players/${playerToDelete._id}`,
        { 
          method: 'DELETE',
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success('Player deleted successfully');
        setTeam(prev => ({
          ...prev,
          players: prev.players.filter(p => p._id !== playerToDelete._id)
        }));
        setShowDeleteConfirm(false);
        setPlayerToDelete(null);
      } else {
        throw new Error(data.message || 'Failed to delete player');
      }
    } catch (error) {
      console.error('Error deleting player:', error);
      toast.error(error.message || 'Failed to delete player');
    }
  };

  const handleAddGoals = async () => {
    if (!selectedPlayer || !goalsToAdd || isNaN(goalsToAdd) || parseInt(goalsToAdd) < 0) {
      toast.error('Please enter a valid number of goals');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/teams/${teamId}/players/${selectedPlayer._id}/goals`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ goals: parseInt(goalsToAdd) })
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success('Goals added successfully');
        setTeam(prev => ({
          ...prev,
          players: prev.players.map(p => 
            p._id === selectedPlayer._id 
              ? { ...p, goals: (p.goals || 0) + parseInt(goalsToAdd) }
              : p
          )
        }));
        setShowAddGoalsModal(false);
        setSelectedPlayer(null);
        setGoalsToAdd('');
      } else {
        throw new Error(data.message || 'Failed to add goals');
      }
    } catch (error) {
      console.error('Error adding goals:', error);
      toast.error(error.message || 'Failed to add goals');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Team Not Found</h2>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="text-blue-600 hover:text-blue-800"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{team.teamName}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleToggleVerification}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 ${
                  team.isVerified
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                }`}
              >
                {team.isVerified ? (
                  <>
                    <FaTimes className="w-4 h-4" />
                    <span>Unverify Team</span>
                  </>
                ) : (
                  <>
                    <FaCheck className="w-4 h-4" />
                    <span>Verify Team</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Batch Year</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{team.batchYear}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Captain</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{team.captainName}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Vice Captain</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{team.viceCaptainName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  team.isVerified
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {team.isVerified ? 'Verified' : 'Pending Verification'}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Players</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{team.players.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Players Grid */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Team Players</h2>
            <span className="text-base text-gray-500">{team.players.length} Players</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.players.map((player) => (
              <div
                key={player._id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-80 bg-gray-100">
                  {player.image ? (
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                      <span className="text-7xl font-bold text-blue-200">
                        {player.jerseyNumber || '?'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedPlayer(player);
                          setShowAddGoalsModal(true);
                        }}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Add Goals"
                      >
                        <FaFutbol className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setPlayerToDelete(player);
                          setShowDeleteConfirm(true);
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Player"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {player.position}
                    </span>
                    {player.jerseyNumber && (
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                        #{player.jerseyNumber}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center space-x-2 bg-green-50 p-2 rounded-lg">
                    <FaFutbol className="w-5 h-5 text-green-600" />
                    <span className="text-base font-medium text-gray-900">
                      Goals: {player.goals || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Player Confirmation Modal */}
      {showDeleteConfirm && playerToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Player</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {playerToDelete.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setPlayerToDelete(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePlayer}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Player
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Goals Modal */}
      {showAddGoalsModal && selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Goals</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Player
                </label>
                <input
                  type="text"
                  value={selectedPlayer.name}
                  disabled
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Number of Goals
                </label>
                <input
                  type="number"
                  min="0"
                  value={goalsToAdd}
                  onChange={(e) => setGoalsToAdd(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter number of goals"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => {
                  setShowAddGoalsModal(false);
                  setSelectedPlayer(null);
                  setGoalsToAdd('');
                }}
                className="px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoals}
                className="px-6 py-3 text-base font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Goals
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 