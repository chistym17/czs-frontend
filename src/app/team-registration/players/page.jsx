"use client";
import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import PlayerForm from "../../../components/PlayerForm";
import RegistrationModal from "../../../components/RegistrationModal";

export default function PlayersRegistration() {
  const [teamData, setTeamData] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [savedPlayers, setSavedPlayers] = useState([]);
  const [currentStep, setCurrentStep] = useState({
    player: 1,
    total: 16
  });
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [completePlayers, setCompletePlayers] = useState([]);

  useEffect(() => {
    // Initialize from localStorage only on client side
    const savedTeamData = JSON.parse(localStorage.getItem('teamData') || '{}');
    const savedCurrentPlayer = parseInt(localStorage.getItem('currentPlayer')) || 1;
    const savedPlayersData = JSON.parse(localStorage.getItem('players') || '[]');

    setTeamData(savedTeamData);
    setCurrentPlayer(savedCurrentPlayer);
    setSavedPlayers(savedPlayersData);
    setCurrentStep(prev => ({
      ...prev,
      player: savedCurrentPlayer
    }));
  }, []);

  const handleNextPlayer = async (playerData) => {
    // Only add player and increment counter if we're below 16
    // Always save the player data first
    let playerWithImage = { ...playerData };
    if (playerData.image && playerData.image.file) {
      playerWithImage = {
        ...playerData,
        image: {
          name: playerData.image.name,
          playerID: currentStep.player
        }
      };
    }

    const updatedPlayers = [...savedPlayers, playerWithImage];
    setSavedPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));

    // Only increment counter if we're below 16
    if (currentStep.player < 16) {
      const nextPlayer = currentStep.player + 1;
      setCurrentPlayer(nextPlayer);
      localStorage.setItem('currentPlayer', nextPlayer);
      setCurrentStep(prev => ({
        ...prev,
        player: nextPlayer
      }));
    }


    // Show complete button if we're at exactly 16
    if (currentStep.player === 16) {
      setRegistrationModalOpen(true);
      const playersData = JSON.parse(localStorage.getItem('players') || '[]');
      const completePlayers = playersData.map(player => {
        const matchingImage = playersData.find(p => p.image?.playerID === player.image?.playerID);
        return {
          id: player.image?.playerID || 'N/A',
          name: player.name,
          position: player.position,
          jerseyNumber: player.jerseyNumber,
          image: matchingImage?.image?.name || 'No image'
        };
      });
      setCompletePlayers(completePlayers);
    }
  };

  const handleCloseModal = () => {
    setRegistrationModalOpen(false);
    setSavedPlayers([]);
    setCurrentPlayer(1);
    setTeamData({});
    // localStorage.removeItem('players');
    localStorage.removeItem('currentPlayer');
    localStorage.removeItem('teamData');
    window.location.href = "/team-customization"
  };

  const handlePreviousPlayer = () => {
    const previousPlayer = currentStep.player - 1;
    setCurrentPlayer(previousPlayer);
    localStorage.setItem('currentPlayer', previousPlayer);
    setCurrentStep(prev => ({
      ...prev,
      player: previousPlayer
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {registrationModalOpen && (
        <RegistrationModal
          isOpen={registrationModalOpen}
          onClose={handleCloseModal}
          step={currentStep.player}
          steps={[
            { title: 'Team Information', description: 'Team details registered successfully' },
            { title: 'Player 1', description: 'Player 1 registered successfully' },
            { title: 'Player 2', description: 'Player 2 registered successfully' },
            { title: 'Player 3', description: 'Player 3 registered successfully' },
            { title: 'Player 4', description: 'Player 4 registered successfully' },
            { title: 'Player 5', description: 'Player 5 registered successfully' },
            { title: 'Player 6', description: 'Player 6 registered successfully' },
            { title: 'Player 7', description: 'Player 7 registered successfully' },
            { title: 'Player 8', description: 'Player 8 registered successfully' },
            { title: 'Player 9', description: 'Player 9 registered successfully' },
            { title: 'Player 10', description: 'Player 10 registered successfully' },
            { title: 'Player 11', description: 'Player 11 registered successfully' },
            { title: 'Player 12', description: 'Player 12 registered successfully' },
            { title: 'Player 13', description: 'Player 13 registered successfully' },
            { title: 'Player 14', description: 'Player 14 registered successfully' },
            { title: 'Player 15', description: 'Player 15 registered successfully' },
            { title: 'Player 16', description: 'Player 16 registered successfully' },
            { title: 'Complete', description: 'All players registered successfully' }
          ]}
          teamData={teamData}
          completePlayers={completePlayers}
        />
      )}
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
    </div>
  );
};
