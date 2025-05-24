"use client";

import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PLAYER_API_URL}/api/player/players`
        );
        if (!res.ok) throw new Error("Failed to fetch players");
        const data = await res.json();
        setPlayers(data.players);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          Registered Players
        </h1>

        {players.length === 0 ? (
          <p className="text-center text-gray-600">
            No players have registered yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {players.map((player) => (
              <div
                key={player._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer text-center"
              >
                {player.image && (
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                )}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {player.name}
                </h2>
                <p className="text-gray-600">Batch: {player.batch}</p>
                <p className="text-gray-600">Position: {player.position}</p>
                <p className="text-gray-600">School: {player.school}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PlayersPage;
