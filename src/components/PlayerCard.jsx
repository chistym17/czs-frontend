const PlayerCard = ({ player }) => {
  return (
    <div className="card w-full lg:w-96 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
      <div className="avatar flex justify-center mb-4">
        <div className="w-32 mask mask-circle border border-gray-300">
          <img src={player.picture} alt={player.name} />
        </div>
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl font-bold text-gray-800">
          {player.name}
        </h2>
        <p className="text-sm text-gray-600 mt-2">{player.about}</p>
        <div className="mt-6 grid grid-cols-2 gap-4 w-full">
          <div className="badge badge-outline text-gray-700 text-md p-3 w-full text-center">
            <span className="font-semibold">Position:</span> {player.position}
          </div>
          <div className="badge badge-outline text-gray-700 text-md p-3 w-full text-center">
            <span className="font-semibold">Jersey:</span> #
            {player.jerseyNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
