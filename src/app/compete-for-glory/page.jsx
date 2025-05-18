"use client";
// pages/compete-for-glory/page.jsx
import { Calendar, ChevronRight, Trophy, Users } from "lucide-react";
import Head from "next/head";
import { useState } from "react";

export default function CompeteForGlory() {
  const [activeStage, setActiveStage] = useState("roundOf32");

  // Example data - replace with your actual tournament data
  const tournamentData = {
    name: "Tournament Championship 2025",
    startDate: "June 10, 2025",
    endDate: "July 15, 2025",
    venue: "Global Sports Arena",
    stages: [
      { id: "roundOf32", name: "Round of 32", teams: 32, matches: 16 },
      { id: "roundOf16", name: "Round of 16", teams: 16, matches: 8 },
      { id: "quarterFinals", name: "Quarter Finals", teams: 8, matches: 4 },
      { id: "semiFinals", name: "Semi Finals", teams: 4, matches: 2 },
      { id: "final", name: "Final", teams: 2, matches: 1 },
    ],
  };

  // Example team data - replace with your actual team data
  const teams = {
    roundOf32: [
      { id: 1, name: "FC Barcelona", flag: "🇪🇸", seed: 1 },
      { id: 2, name: "Real Madrid", flag: "🇪🇸", seed: 2 },
      { id: 3, name: "Manchester City", flag: "🇬🇧", seed: 3 },
      { id: 4, name: "Liverpool FC", flag: "🇬🇧", seed: 4 },
      { id: 5, name: "Bayern Munich", flag: "🇩🇪", seed: 5 },
      { id: 6, name: "Borussia Dortmund", flag: "🇩🇪", seed: 6 },
      { id: 7, name: "Paris Saint-Germain", flag: "🇫🇷", seed: 7 },
      { id: 8, name: "Juventus", flag: "🇮🇹", seed: 8 },
      { id: 9, name: "AC Milan", flag: "🇮🇹", seed: 9 },
      { id: 10, name: "Inter Milan", flag: "🇮🇹", seed: 10 },
      { id: 11, name: "Ajax", flag: "🇳🇱", seed: 11 },
      { id: 12, name: "Atletico Madrid", flag: "🇪🇸", seed: 12 },
      { id: 13, name: "Chelsea FC", flag: "🇬🇧", seed: 13 },
      { id: 14, name: "Manchester United", flag: "🇬🇧", seed: 14 },
      { id: 15, name: "Arsenal", flag: "🇬🇧", seed: 15 },
      { id: 16, name: "Tottenham Hotspur", flag: "🇬🇧", seed: 16 },
      { id: 17, name: "RB Leipzig", flag: "🇩🇪", seed: 17 },
      { id: 18, name: "Sevilla FC", flag: "🇪🇸", seed: 18 },
      { id: 19, name: "Napoli", flag: "🇮🇹", seed: 19 },
      { id: 20, name: "FC Porto", flag: "🇵🇹", seed: 20 },
      { id: 21, name: "Benfica", flag: "🇵🇹", seed: 21 },
      { id: 22, name: "Lyon", flag: "🇫🇷", seed: 22 },
      { id: 23, name: "AS Monaco", flag: "🇫🇷", seed: 23 },
      { id: 24, name: "Ajax Amsterdam", flag: "🇳🇱", seed: 24 },
      { id: 25, name: "PSV Eindhoven", flag: "🇳🇱", seed: 25 },
      { id: 26, name: "Celtic FC", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", seed: 26 },
      { id: 27, name: "Rangers FC", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", seed: 27 },
      { id: 28, name: "Sporting CP", flag: "🇵🇹", seed: 28 },
      { id: 29, name: "Bayer Leverkusen", flag: "🇩🇪", seed: 29 },
      { id: 30, name: "AS Roma", flag: "🇮🇹", seed: 30 },
      { id: 31, name: "Shakhtar Donetsk", flag: "🇺🇦", seed: 31 },
      { id: 32, name: "Zenit St. Petersburg", flag: "🇷🇺", seed: 32 },
    ],
    roundOf16: [
      { id: 1, name: "FC Barcelona", flag: "🇪🇸", seed: 1 },
      { id: 2, name: "Real Madrid", flag: "🇪🇸", seed: 2 },
      { id: 3, name: "Manchester City", flag: "🇬🇧", seed: 3 },
      { id: 4, name: "Liverpool FC", flag: "🇬🇧", seed: 4 },
      { id: 5, name: "Bayern Munich", flag: "🇩🇪", seed: 5 },
      { id: 6, name: "Borussia Dortmund", flag: "🇩🇪", seed: 6 },
      { id: 7, name: "Paris Saint-Germain", flag: "🇫🇷", seed: 7 },
      { id: 8, name: "Juventus", flag: "🇮🇹", seed: 8 },
      { id: 9, name: "AC Milan", flag: "🇮🇹", seed: 9 },
      { id: 10, name: "Inter Milan", flag: "🇮🇹", seed: 10 },
      { id: 11, name: "Ajax", flag: "🇳🇱", seed: 11 },
      { id: 12, name: "Atletico Madrid", flag: "🇪🇸", seed: 12 },
      { id: 13, name: "Chelsea FC", flag: "🇬🇧", seed: 13 },
      { id: 14, name: "Manchester United", flag: "🇬🇧", seed: 14 },
      { id: 15, name: "Arsenal", flag: "🇬🇧", seed: 15 },
      { id: 16, name: "Tottenham Hotspur", flag: "🇬🇧", seed: 16 },
    ],
    quarterFinals: [
      { id: 1, name: "FC Barcelona", flag: "🇪🇸", seed: 1 },
      { id: 2, name: "Real Madrid", flag: "🇪🇸", seed: 2 },
      { id: 3, name: "Manchester City", flag: "🇬🇧", seed: 3 },
      { id: 4, name: "Liverpool FC", flag: "🇬🇧", seed: 4 },
      { id: 5, name: "Bayern Munich", flag: "🇩🇪", seed: 5 },
      { id: 6, name: "Paris Saint-Germain", flag: "🇫🇷", seed: 7 },
      { id: 7, name: "Juventus", flag: "🇮🇹", seed: 8 },
      { id: 8, name: "Chelsea FC", flag: "🇬🇧", seed: 13 },
    ],
    semiFinals: [
      { id: 1, name: "FC Barcelona", flag: "🇪🇸", seed: 1 },
      { id: 2, name: "Manchester City", flag: "🇬🇧", seed: 3 },
      { id: 3, name: "Bayern Munich", flag: "🇩🇪", seed: 5 },
      { id: 4, name: "Chelsea FC", flag: "🇬🇧", seed: 13 },
    ],
    final: [
      { id: 1, name: "FC Barcelona", flag: "🇪🇸", seed: 1 },
      { id: 2, name: "Bayern Munich", flag: "🇩🇪", seed: 5 },
    ],
  };

  // Tournament schedule example
  const tournamentSchedule = {
    roundOf32: { start: "June 10", end: "June 15", 2025: true },
    roundOf16: { start: "June 18", end: "June 22", 2025: true },
    quarterFinals: { start: "June 25", end: "June 27", 2025: true },
    semiFinals: { start: "July 2", end: "July 3", 2025: true },
    final: { start: "July 15", end: "July 15", 2025: true },
  };

  const getStageTeams = (stageId) => {
    return teams[stageId] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Head>
        <title>Compete for Glory | Tournament Roadmap</title>
        <meta
          name="description"
          content="Tournament roadmap for 32 teams competing for glory"
        />
      </Head>

      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">
          Compete for Glory
        </h1>
        <p className="text-xl text-center text-blue-600 mb-10">
          The road to the championship
        </p>

        {/* Tournament Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Trophy className="text-yellow-500" size={32} />
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Tournament
                </h3>
                <p className="text-lg font-bold text-blue-900">
                  {tournamentData.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-blue-500" size={32} />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Schedule</h3>
                <p className="text-lg font-bold text-blue-900">
                  {tournamentData.startDate} - {tournamentData.endDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="text-green-500" size={32} />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Teams</h3>
                <p className="text-lg font-bold text-blue-900">
                  32 Teams, 5 Stages
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Stages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Tournament Stages
          </h2>

          <div className="bg-white rounded-xl shadow-md p-1 mb-8">
            <div className="flex flex-wrap">
              {tournamentData.stages.map((stage, index) => (
                <button
                  key={stage.id}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex-1 min-w-max ${
                    activeStage === stage.id
                      ? "bg-blue-600 text-white"
                      : "text-blue-800 hover:bg-blue-50"
                  }`}
                  onClick={() => setActiveStage(stage.id)}
                >
                  <span className="hidden md:inline">{stage.name}</span>
                  <span className="md:hidden">
                    {stage.name.split(" ").pop()}
                  </span>
                  <span className="text-xs block md:inline md:ml-2 opacity-75">
                    ({stage.teams} teams)
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tournament Bracket Visual */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-blue-900">
                {
                  tournamentData.stages.find(
                    (stage) => stage.id === activeStage
                  )?.name
                }
              </h3>
              <div className="text-sm text-blue-600 font-medium">
                {tournamentSchedule[activeStage]?.start} -{" "}
                {tournamentSchedule[activeStage]?.end}, 2025
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {getStageTeams(activeStage).map((team) => (
                <div
                  key={team.id}
                  className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md p-4 transition-transform hover:scale-105 duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{team.flag}</div>
                    <div>
                      <h4 className="text-lg font-bold text-blue-900">
                        {team.name}
                      </h4>
                      <p className="text-sm text-blue-600">Seed #{team.seed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tournament Path Visualization */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Tournament Path
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-6 overflow-x-auto">
            <div className="min-w-max">
              <div className="flex justify-between mb-4">
                {tournamentData.stages.map((stage) => (
                  <div key={stage.id} className="text-center px-4">
                    <div
                      className={`text-lg font-bold mb-2 ${
                        activeStage === stage.id
                          ? "text-blue-600"
                          : "text-blue-900"
                      }`}
                    >
                      {stage.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {stage.teams} Teams, {stage.matches} Matches
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative py-8">
                {/* Progress bar */}
                <div className="absolute h-2 bg-gray-200 top-1/2 left-0 right-0 transform -translate-y-1/2 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${
                        ((tournamentData.stages.findIndex(
                          (s) => s.id === activeStage
                        ) +
                          1) *
                          100) /
                        tournamentData.stages.length
                      }%`,
                    }}
                  ></div>
                </div>

                {/* Stage dots */}
                <div className="flex justify-between relative z-10">
                  {tournamentData.stages.map((stage, index) => (
                    <div
                      key={stage.id}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        tournamentData.stages.findIndex(
                          (s) => s.id === activeStage
                        ) >= index
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-900 border border-gray-300"
                      }`}
                      onClick={() => setActiveStage(stage.id)}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            How It Works
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-blue-100 rounded-full p-4 mb-4">
                  <Users className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  32 Teams
                </h3>
                <p className="text-gray-600">
                  The tournament starts with 32 elite teams from around the
                  world, all competing for the championship title.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-blue-100 rounded-full p-4 mb-4">
                  <ChevronRight className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Single Elimination
                </h3>
                <p className="text-gray-600">
                  Each match is decisive. Win and advance, lose and go home. The
                  pressure builds as teams progress through each round.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-blue-100 rounded-full p-4 mb-4">
                  <Trophy className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  One Champion
                </h3>
                <p className="text-gray-600">
                  After 31 matches over five thrilling stages, one team will
                  lift the trophy and be crowned champion.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Witness History?</h2>
          <p className="text-xl mb-6">
            Follow the journey of these 32 teams as they compete for glory!
          </p>
          <button className="bg-white text-blue-800 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-50 transition-all">
            Get Tournament Updates
          </button>
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-6 mt-16">
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
