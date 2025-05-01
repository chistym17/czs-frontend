'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCopy, FaCheck } from 'react-icons/fa';

const RegistrationModal = ({ onClose, teamData, completePlayers }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [teamId, setTeamId] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [secretKey, setSecretKey] = useState('');

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

      // Create FormData with player details
      const formData = new FormData();
      formData.append('players', JSON.stringify(playersToSend.map(player => ({
        name: player.name,
        position: player.position,
        jerseyNumber: player.jerseyNumber
      }))));


      const response = await fetch(`http://localhost:3001/api/teams/update-players/${teamId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      const data = await response.json();
      console.log('Registration response:', data);

      setSecretKey(data.secretKey);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
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
        className="bg-white rounded-lg p-6 max-w-3xl w-full mx-auto"
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
            <h3 className="text-xl font-semibold mb-2">{steps[step - 1]?.title}</h3>
            <p className="text-gray-600">{steps[step - 1]?.description}</p>
          </div>
          {step === 5 && (
            <div className="space-y-4">
              <div className="text-green-600 font-semibold mb-4">
                Registration Complete! Your team is now registered.
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">
                  Important: Team Access Key
                </h3>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      This key will be shown only once. Save it for future team access.
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="font-mono text-sm text-gray-800">
                      {secretKey}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <FaCheck /> Copied
                        </>
                      ) : (
                        <>
                          <FaCopy /> Copy Key
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegistrationModal;
