import PlayerCard from './PlayerCard';

const PlayerGrid = ({ players }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {players.map((player) => (
        <PlayerCard key={player._id} player={player} />
      ))}
    </div>
  );
};

export default PlayerGrid; 