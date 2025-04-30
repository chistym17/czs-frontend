"use client";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import PlayerForm from "../../../components/PlayerForm";

const PlayersRegistration = () => {
  // Get team data from localStorage
  const teamData = JSON.parse(localStorage.getItem('teamData') || '{}');

  // Get current player index from localStorage
  const currentPlayer = parseInt(localStorage.getItem('currentPlayer')) || 1;

  // Get saved players from localStorage
  const savedPlayers = JSON.parse(localStorage.getItem('players') || '[]');

  const [currentStep, setCurrentStep] = useState({
    player: currentPlayer,
    total: 16
  });

  const handleNextPlayer = (playerData) => {
    // Save the image file path if it exists
    let playerWithImage = { ...playerData };
    if (playerData.image && playerData.image.file) {
      // Store only the file name with player ID
      playerWithImage = { 
        ...playerData, 
        image: {
          name: playerData.image.name,
          playerID: currentStep.player
        }
      };
    }

    // Save current player data with image
    const updatedPlayers = [...savedPlayers, playerWithImage];
    localStorage.setItem('players', JSON.stringify(updatedPlayers));

    // Update current player index
    const nextPlayer = currentStep.player + 1;
    localStorage.setItem('currentPlayer', nextPlayer);
    setCurrentStep(prev => ({
      ...prev,
      player: nextPlayer
    }));

    // If all players are registered, proceed to final page
    if (nextPlayer > 16) {
      // Create FormData for submission
      const formData = new FormData();

      // Add players data
      formData.append('players', JSON.stringify(updatedPlayers));

      // Create complete player objects with images
      const playersData = JSON.parse(localStorage.getItem('players') || '[]');
      const completePlayers = playersData.map(player => {
        // Find the image that matches this player's ID
        const matchingImage = playersData.find(p => p.image?.playerID === player.image?.playerID);
        
        return {
          id: player.image?.playerID || 'N/A',
          name: player.name,
          position: player.position,
          jerseyNumber: player.jerseyNumber,
          image: matchingImage?.image?.name || 'No image'
        };
      });

      // Log the complete player objects
      console.log('=== Complete Player Data ===');
      console.log(completePlayers);

      // Add the complete players data to FormData
      formData.append('completePlayers', JSON.stringify(completePlayers));

      // Send to backend
      fetch('/api/save-players', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          // Update team data with all players
          const updatedTeamData = {
            ...teamData,
            players: updatedPlayers
          };
          localStorage.setItem('teamData', JSON.stringify(updatedTeamData));
          window.location.href = "/team-registration/confirmation";
        })
        .catch(error => {
          console.error('Error saving players:', error);
          alert('Failed to save player data. Please try again.');
        });
    }
  };

  const handlePreviousPlayer = () => {
    const previousPlayer = currentStep.player - 1;
    localStorage.setItem('currentPlayer', previousPlayer);
    setCurrentStep(prev => ({
      ...prev,
      player: previousPlayer
    }));
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
      <Navbar />

      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-blue-800">Player Registration</h1>
            <span className="bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-full">
              {currentStep.player} of {currentStep.total}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep.player / currentStep.total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Team Information Card */}
        <div className="mb-5">
          <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Team Information
          </h2>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-gray-500 font-medium w-32">Team Name:</span>
                  <span className="font-semibold text-gray-800">{teamData.teamName || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 font-medium w-32">Batch Year:</span>
                  <span className="font-semibold text-gray-800">{teamData.batchYear || 'N/A'}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-gray-500 font-medium w-32">Captain:</span>
                  <span className="font-semibold text-gray-800">{teamData.captainName || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 font-medium w-32">Vice-Captain:</span>
                  <span className="font-semibold text-gray-800">{teamData.viceCaptainName || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Player #{currentStep.player} Details
          </h2>

          <PlayerForm
            onNext={handleNextPlayer}
            onPrevious={handlePreviousPlayer}
            playerNumber={currentStep.player}
            totalPlayers={currentStep.total}
          />
        </div>
      </div>

    </div>
  );
};

export default PlayersRegistration;