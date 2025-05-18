"use client";
import { Dribbble, Goal, Medal, Star, Trophy } from "lucide-react";

// pages/tournament-history.jsx
// import { Goal, Medal, Star, Trophy } from "lucide-react";
import Head from "next/head";
import { useState } from "react";

export default function TournamentHistory() {
  const [activeTab, setActiveTab] = useState("season6");

  // Example data - replace with your actual tournament data
  const seasons = {
    season6: {
      year: "2024",
      winner: {
        name: "FC Barcelona",
        image: "/api/placeholder/300/200",
      },
      runnerUp: {
        name: "Real Madrid",
        image: "/api/placeholder/300/200",
      },
      topScorer: {
        name: "Luis Hernandez",
        goals: 28,
        image: "/api/placeholder/240/300",
      },
      mvp: {
        name: "Kevin De Silva",
        image: "/api/placeholder/240/300",
      },
      bestGoalkeeper: {
        name: "Manuel Neumann",
        cleanSheets: 18,
        image: "/api/placeholder/240/300",
      },
    },
    season5: {
      year: "2023",
      winner: {
        name: "Bayern Munich",
        image: "/api/placeholder/300/200",
      },
      runnerUp: {
        name: "Paris Saint-Germain",
        image: "/api/placeholder/300/200",
      },
      topScorer: {
        name: "Robert Lewandski",
        goals: 31,
        image: "/api/placeholder/240/300",
      },
      mvp: {
        name: "Kylian Mbappé",
        image: "/api/placeholder/240/300",
      },
      bestGoalkeeper: {
        name: "Jan Oblak",
        cleanSheets: 22,
        image: "/api/placeholder/240/300",
      },
    },
    season4: {
      year: "2022",
      winner: {
        name: "Liverpool FC",
        image: "/api/placeholder/300/200",
      },
      runnerUp: {
        name: "Manchester City",
        image: "/api/placeholder/300/200",
      },
      topScorer: {
        name: "Mohammad Salah",
        goals: 27,
        image: "/api/placeholder/240/300",
      },
      mvp: {
        name: "Kevin De Bruyne",
        image: "/api/placeholder/240/300",
      },
      bestGoalkeeper: {
        name: "Alisson Becker",
        cleanSheets: 20,
        image: "/api/placeholder/240/300",
      },
    },
    season3: {
      year: "2021",
      winner: {
        name: "Chelsea FC",
        image: "/api/placeholder/300/200",
      },
      runnerUp: {
        name: "Manchester United",
        image: "/api/placeholder/300/200",
      },
      topScorer: {
        name: "Erling Haaland",
        goals: 29,
        image: "/api/placeholder/240/300",
      },
      mvp: {
        name: "N'Golo Kanté",
        image: "/api/placeholder/240/300",
      },
      bestGoalkeeper: {
        name: "Edouard Mendy",
        cleanSheets: 19,
        image: "/api/placeholder/240/300",
      },
    },
    season2: {
      year: "2020",
      winner: {
        name: "Atletico Madrid",
        image: "/api/placeholder/300/200",
      },
      runnerUp: {
        name: "Juventus",
        image: "/api/placeholder/300/200",
      },
      topScorer: {
        name: "Cristiano Ronaldo",
        goals: 30,
        image: "/api/placeholder/240/300",
      },
      mvp: {
        name: "Luis Suarez",
        image: "/api/placeholder/240/300",
      },
      bestGoalkeeper: {
        name: "Thibaut Courtois",
        cleanSheets: 17,
        image: "/api/placeholder/240/300",
      },
    },
    season1: {
      year: "2019",
      winner: {
        name: "Manchester City",
        image: "/api/placeholder/300/200",
      },
      runnerUp: {
        name: "Tottenham Hotspur",
        image: "/api/placeholder/300/200",
      },
      topScorer: {
        name: "Harry Kane",
        goals: 25,
        image: "/api/placeholder/240/300",
      },
      mvp: {
        name: "Bernardo Silva",
        image: "/api/placeholder/240/300",
      },
      bestGoalkeeper: {
        name: "Ederson",
        cleanSheets: 21,
        image: "/api/placeholder/240/300",
      },
    },
  };

  const activeSeason = seasons[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Head>
        <title>Tournament History</title>
        <meta
          name="description"
          content="Tournament history of previous seasons"
        />
      </Head>

      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Tournament History
        </h1>

        {/* Season Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {Object.keys(seasons)
            .reverse()
            .map((season) => (
              <button
                key={season}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeTab === season
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-blue-600 shadow hover:shadow-md hover:scale-105"
                }`}
                onClick={() => setActiveTab(season)}
              >
                Season {season.replace("season", "")} ({seasons[season].year})
              </button>
            ))}
        </div>

        {/* Season Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-10">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
            Season {activeTab.replace("season", "")} • {activeSeason.year}
          </h2>

          {/* Winner & Runner Up Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Winner */}
            <div className="bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-md p-6 transition-transform hover:scale-105 duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="text-yellow-500" size={28} />
                <h3 className="text-xl font-bold text-blue-900">Champion</h3>
              </div>
              <div className="text-center">
                <div className="relative w-64 h-44 mx-auto mb-4 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={activeSeason.winner.image}
                    alt={`${activeSeason.winner.name} team`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-2xl font-bold text-blue-800">
                  {activeSeason.winner.name}
                </h4>
              </div>
            </div>

            {/* Runner Up */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md p-6 transition-transform hover:scale-105 duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Medal className="text-gray-400" size={28} />
                <h3 className="text-xl font-bold text-blue-900">Runner Up</h3>
              </div>
              <div className="text-center">
                <div className="relative w-64 h-44 mx-auto mb-4 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={activeSeason.runnerUp.image}
                    alt={`${activeSeason.runnerUp.name} team`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-2xl font-bold text-blue-800">
                  {activeSeason.runnerUp.name}
                </h4>
              </div>
            </div>
          </div>

          {/* Individual Awards Section */}
          <h3 className="text-2xl font-bold text-blue-800 text-center mb-8">
            Individual Awards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Scorer */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md p-6 transition-transform hover:scale-105 duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Goal className="text-blue-600" size={24} />
                <h3 className="text-lg font-bold text-blue-900">
                  Top Goal Scorer
                </h3>
              </div>
              <div className="text-center">
                <div className="relative w-48 h-56 mx-auto mb-4 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={activeSeason.topScorer.image}
                    alt={activeSeason.topScorer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-blue-800">
                  {activeSeason.topScorer.name}
                </h4>
                <p className="text-blue-600 font-semibold">
                  {activeSeason.topScorer.goals} Goals
                </p>
              </div>
            </div>

            {/* MVP */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md p-6 transition-transform hover:scale-105 duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Star className="text-yellow-500" size={24} />
                <h3 className="text-lg font-bold text-blue-900">
                  Most Valuable Player
                </h3>
              </div>
              <div className="text-center">
                <div className="relative w-48 h-56 mx-auto mb-4 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={activeSeason.mvp.image}
                    alt={activeSeason.mvp.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-blue-800">
                  {activeSeason.mvp.name}
                </h4>
                <p className="text-blue-600 font-semibold">MVP</p>
              </div>
            </div>

            {/* Best Goalkeeper */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md p-6 transition-transform hover:scale-105 duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Dribbble className="text-green-500" size={24} />
                <h3 className="text-lg font-bold text-blue-900">
                  Best Goalkeeper
                </h3>
              </div>
              <div className="text-center">
                <div className="relative w-48 h-56 mx-auto mb-4 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={activeSeason.bestGoalkeeper.image}
                    alt={activeSeason.bestGoalkeeper.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-blue-800">
                  {activeSeason.bestGoalkeeper.name}
                </h4>
                <p className="text-blue-600 font-semibold">
                  {activeSeason.bestGoalkeeper.cleanSheets} Clean Sheets
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} Tournament Championship. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
