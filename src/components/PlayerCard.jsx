'use client'
import { useState } from 'react';
import Image from 'next/image';
import EditPlayerModal from './EditPlayerModal';

const PlayerCard = ({ player, teamId, onPlayerUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="relative group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-72 h-[420px] overflow-hidden flex flex-col">
      <div className="relative h-80 w-full overflow-hidden">
        {player.image ? (
          <Image
            src={player.image}
            alt={player.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-200">{player.jerseyNumber}</span>
          </div>
        )}
      </div>

      <div className="p-2 space-y-1 flex-grow flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold text-gray-800 max-w-[180px] truncate">
              {player.name}
            </h3>
            <p className="text-xs text-gray-500">{player.position}</p>
          </div>
          <div className="bg-blue-50 px-2 py-0.5 rounded-lg">
            <span className="text-xs font-medium text-blue-600">#{player.jerseyNumber}</span>
          </div>
        </div>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="w-full py-1 px-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm mt-auto"
        >
          Edit Player
        </button>
      </div>

      <EditPlayerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        player={player}
        teamId={teamId}
        onUpdate={onPlayerUpdate}
      />
    </div>
  );
};

export default PlayerCard;
