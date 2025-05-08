import Image from 'next/image';

const PlayerCard = ({ player }) => {
  const getPositionColor = (position) => {
    const colors = {
      GK: 'bg-yellow-500',
      CB: 'bg-red-500',
      RB: 'bg-red-600',
      LB: 'bg-red-600',
      CDM: 'bg-blue-500',
      CM: 'bg-blue-600',
      CAM: 'bg-blue-700',
      RM: 'bg-green-500',
      LM: 'bg-green-500',
      RW: 'bg-green-600',
      LW: 'bg-green-600',
      CF: 'bg-purple-500',
      ST: 'bg-purple-600',
      SS: 'bg-purple-700',
    };
    return colors[position] || 'bg-gray-500';
  };

  return (
    <div className="relative w-64 h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
      {/* Card Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
      </div>

      {/* Player Image */}
      <div className="relative h-48 w-full">
        {player.image ? (
          <Image
            src={player.image}
            alt={player.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">No Photo</span>
          </div>
        )}
      </div>

      {/* Player Info */}
      <div className="p-4 text-white">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold truncate">{player.name}</h3>
          <span className={`${getPositionColor(player.position)} text-white text-sm px-2 py-1 rounded-full`}>
            {player.position}
          </span>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Jersey</span>
            <span className="text-xl font-bold">{player.jerseyNumber}</span>
          </div>
        </div>

        {/* Edit Button */}
        <button className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm transition-colors">
          Edit
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;
