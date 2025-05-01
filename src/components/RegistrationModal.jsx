'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationModal = ({ onClose, teamData, completePlayers }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [teamId, setTeamId] = useState(null);

  const steps = [
    {
      title: "Verifying Team Information",
      description: "We're verifying your team details. Please wait..."
    },
    {
      title: "Registering Team",
      description: "Creating your team profile in our database..."
    },
    {
      title: "Processing Player Data",
      description: "Registering all 16 players. This may take 5-6 minutes..."
    },
    {
      title: "Uploading Player Images",
      description: "Uploading player photos. Please do not close the browser..."
    },
    {
      title: "Finalizing Registration",
      description: "Almost done! Finalizing your team registration..."
    }
  ];

  const handleTeamRegistration = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch('http://localhost:3001/api/teams/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register team');
      }

      setTeamId(data.data._id);
      setStep(3);
      toast.success('Team registered successfully!');
    } catch (error) {
      toast.error(error.message);
      setIsProcessing(false);
    }
  };

  const handlePlayersRegistration = async () => {
    console.log('Team ID:', teamId);
    console.log('Total players:', completePlayers);


    try {
      // If more than 16 players, only take the first 16
      const playersToSend = completePlayers.slice(0, 16);

      // Create FormData for player images
      const formData = new FormData();

      // Add players data (only first 16)
      formData.append('players', JSON.stringify(playersToSend));

      // Add player images with proper indexing (only first 16)
      playersToSend.forEach((player, index) => {
        if (player.image) {
          formData.append(`playerImages[${index}]`, player.image);
        }
      });

      console.log('Sending registration request...');

      console.log(formData)

      const response = await fetch(`http://localhost:3001/api/teams/update-players/${teamId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      const data = await response.json();
      console.log('Registration response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register players');
      }

      setStep(5);
      toast.success('All players registered successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (step === 1) {
      handleTeamRegistration();
    } else if (step === 3) {
      handlePlayersRegistration();
    }
  }, [step]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-auto"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Team Registration Progress
          </h2>
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{steps[step - 1].title}</h3>
            <p className="text-gray-600">{steps[step - 1].description}</p>
          </div>
          {step === 5 && (
            <div className="text-green-600 font-semibold">
              Registration Complete! Your team is now registered.
            </div>
          )}
          <div className="mt-6">
            <button
              onClick={onClose}
              disabled={isProcessing || step < 5}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing && step < 5 ? 'Processing...' : 'Close'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegistrationModal;
