import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PlayerCard from "../../components/PlayerCard";

const PlayerDetailsPage = () => {
  const playerDetails = {
    picture: "https://via.placeholder.com/150", // Replace with the player's image URL
    name: "Lionel Messi",
    about:
      "One of the greatest footballers of all time with unmatched skills and vision.",
    position: "Forward",
    jerseyNumber: 10,
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <PlayerCard player={playerDetails} />
      </div>
      <Footer />
    </div>
  );
};

export default PlayerDetailsPage;
