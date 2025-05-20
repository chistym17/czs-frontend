'use client'
import Image from 'next/image';

const TeamPlayerCard = ({ player }) => {
  const shouldShowPlayerImage = player.image && player.image.trim() !== '';

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

      <div className="p-4 bg-white">
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
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/60 group-hover:via-black/30 group-hover:to-black/0 transition-all duration-300" />
    </div>
  );
};

export default TeamPlayerCard; 