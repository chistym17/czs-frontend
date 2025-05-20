'use client'
import Image from 'next/image';

const TeamPlayerCard = ({ player }) => {
  const shouldShowPlayerImage = player.image && player.image.trim() !== '';
  const hasGoals = player.goals && player.goals > 0;

  return (
    <div className="relative group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-72 h-[420px] overflow-hidden flex flex-col">
      <div className="relative h-80 w-full overflow-hidden">
        {shouldShowPlayerImage ? (
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

      <div className="p-4 bg-white relative">
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2.5 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
            {player.position}
          </span>
          {player.jerseyNumber && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
              #{player.jerseyNumber}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-800 truncate">
          {player.name}
        </h3>

        {hasGoals && (
          <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1.5 rounded-lg font-medium text-sm flex items-center space-x-1 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Goals-{player.goals}</span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/60 group-hover:via-black/30 group-hover:to-black/0 transition-all duration-300" />
    </div>
  );
};

export default TeamPlayerCard; 