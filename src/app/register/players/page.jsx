"use client"
import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PlayersRegistration = ({ teamName, batchYear, captainName, viceCaptainName }) => {
  const [players, setPlayers] = useState(Array(16).fill({
    name: "",
    image: "",
    position: "",
    jerseyNumber: ""
  }));

  const positions = [
    'GK', 'CB', 'RB', 'LB', 'RWB', 'LWB', 'SW',
    'CDM', 'CM', 'CAM', 'RM', 'LM', 'RW', 'LW',
    'CF', 'ST', 'SS', 'RF', 'LF'
  ];

  const handlePlayerChange = (index, field, value) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setPlayers(newPlayers);
  };

  const isFormComplete = () => {
    return players.every(player => 
      player.name && player.position && player.jerseyNumber
    );
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Team Info and Instructions - Same as before */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {players.map((player, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-2xl transition-shadow">
              {/* Image Preview/Upload Section */}
              <div className="h-48 bg-blue-50 relative">
                {player.image ? (
                  <img
                    src={player.image}
                    alt={`Player ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <label className="cursor-pointer text-center p-4 hover:text-blue-600 transition-colors">
                      <div className="text-4xl mb-2">📷</div>
                      <span className="text-sm text-blue-600">Upload Photo (Optional)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              handlePlayerChange(index, 'image', reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Player Details Form */}
              <div className="p-5 space-y-4 bg-gradient-to-b from-white to-blue-50">
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Player Name *
                  </label>
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                    className="input input-bordered w-full text-sm bg-white"
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Position *
                    </label>
                    <select
                      value={player.position}
                      onChange={(e) => handlePlayerChange(index, 'position', e.target.value)}
                      className="select select-bordered w-full text-sm bg-white"
                      required
                    >
                      <option value="">Select</option>
                      {positions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Jersey # *
                    </label>
                    <input
                      type="number"
                      value={player.jerseyNumber}
                      onChange={(e) => handlePlayerChange(index, 'jerseyNumber', e.target.value)}
                      className="input input-bordered w-full text-sm bg-white"
                      placeholder="#"
                      min="1"
                      max="99"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Card Number Badge */}
              <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold shadow-lg">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 mb-16">
          <button 
            className={`btn btn-primary w-full ${!isFormComplete() ? 'btn-disabled opacity-50' : ''}`}
            disabled={!isFormComplete()}
          >
            Complete Registration
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlayersRegistration; 