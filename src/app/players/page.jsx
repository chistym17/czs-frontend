"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-gray-600 text-lg">Loading players...</p>
  </div>
);

const PlayerCard = ({ player }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!isVisible) {
    return (
      <div
        ref={cardRef}
        className="bg-white p-6 rounded-lg shadow h-[400px] animate-pulse"
      />
    );
  }

  return (
    <div
      ref={cardRef}
      className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 cursor-pointer text-center"
    >
      <div className="relative w-32 h-32 mx-auto mb-6">
        {player.image ? (
          <Image
            src={player.image}
            alt={player.name}
            fill
            sizes="(max-width: 128px) 100vw, 128px"
            className="rounded-full object-cover border-4 border-gray-100 shadow-sm"
            priority={false}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-4 border-gray-100 shadow-sm">
            <span className="text-4xl font-bold text-white">
              {getInitials(player.name)}
            </span>
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {player.name}
      </h2>
      <div className="space-y-2">
        <p className="text-gray-600">Batch: {player.batch}</p>
        <p className="text-gray-600">Position: {player.position}</p>
        <p className="text-gray-600 truncate max-w-[200px] mx-auto" title={player.school}>
          School: {player.school}
        </p>
      </div>
    </div>
  );
};

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedPlayers, setDisplayedPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const playersPerPage = 20;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/player/players`
        );
        if (!res.ok) throw new Error("Failed to fetch players");
        const data = await res.json();
        setPlayers(data.players);
        // Initialize with first batch of players
        setDisplayedPlayers(data.players.slice(0, playersPerPage));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Filter players based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      // If search is empty, show first page of all players
      setDisplayedPlayers(players.slice(0, playersPerPage));
      setCurrentPage(1);
    } else {
      // Filter players based on search query
      const filtered = players.filter(player =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedPlayers(filtered.slice(0, playersPerPage));
      setCurrentPage(1);
    }
  }, [searchQuery, players]);

  const handleShowMore = () => {
    const filteredPlayers = searchQuery.trim() === ""
      ? players
      : players.filter(player =>
          player.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const nextPage = currentPage + 1;
    const nextBatch = filteredPlayers.slice(
      (nextPage - 1) * playersPerPage,
      nextPage * playersPerPage
    );
    setDisplayedPlayers([...displayedPlayers, ...nextBatch]);
    setCurrentPage(nextPage);
  };

  const hasMorePlayers = displayedPlayers.length < (
    searchQuery.trim() === ""
      ? players.length
      : players.filter(player =>
          player.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).length
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <LoadingSpinner />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-red-500 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-xl font-semibold">Error: {error}</p>
            <p className="mt-2 text-gray-600">Please try again later</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Players Registered for 2025 Season
          </h1>
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <p className="text-xl text-gray-600 mb-2">
                  Total Players Registered:{" "}
                  <span className="font-bold text-blue-600">
                    {searchQuery.trim() === ""
                      ? players.length
                      : players.filter(player =>
                          player.name.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length}
                  </span>
                </p>
                <p className="text-gray-500">
                  Join our growing community of talented players
                </p>
              </div>
              <div className="relative w-full md:w-64">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {players.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <p className="text-xl text-gray-600">No players have registered yet.</p>
            <p className="text-gray-500 mt-2">Be the first to join!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedPlayers.map((player) => (
                <PlayerCard key={player._id} player={player} />
              ))}
            </div>
            
            {hasMorePlayers && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleShowMore}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Show More Players
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <p className="mt-2 text-sm text-gray-500">
                  Showing {displayedPlayers.length} of{" "}
                  {searchQuery.trim() === ""
                    ? players.length
                    : players.filter(player =>
                        player.name.toLowerCase().includes(searchQuery.toLowerCase())
                      ).length}{" "}
                  players
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PlayersPage;
