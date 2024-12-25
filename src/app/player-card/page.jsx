import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PlayerCard from '@/components/PlayerCard';

const PlayerCardPage = () => {
  const playerDetails = {
    picture: 'https://via.placeholder.com/150', // Replace with the player's image URL
    name: 'Cristiano Ronaldo',
    about:
      'A prolific forward with numerous records and incredible goal-scoring ability.',
    position: 'Forward',
    jerseyNumber: 7,
  };

  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <PlayerCard player={playerDetails} />
      </div>
      <Footer />
    </div>
  );
};

export default PlayerCardPage;
