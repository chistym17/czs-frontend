"use client";
import { Star, Trophy, Users, Zap } from "lucide-react";

const Briefing = () => {
  return (
    <div className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-400 rounded-full opacity-25"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-blue-500 rounded-full opacity-40"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-blue-200">
            <Star className="w-5 h-5 text-blue-500 animate-spin" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Official Tournament
            </span>
            <Star className="w-5 h-5 text-blue-500 animate-spin" />
          </div>

          {/* Main heading with enhanced styling */}
          <div className="relative mb-8">
            <h2 className="text-5xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 mb-4 animate-pulse">
              32 TEAMS
            </h2>
            {/* <div className="absolute -top-4 -right-4 text-6xl opacity-20 text-blue-500 animate-bounce">
              ⚡
            </div> */}
            {/* <div className="absolute -bottom-2 -left-4 text-4xl opacity-30 text-blue-600 animate-spin">
              🏆
            </div> */}
          </div>

          {/* Enhanced divider */}
          <div className="flex justify-center items-center mb-8">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mx-4 animate-pulse"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
          </div>

          {/* Enhanced description */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <p className="text-2xl text-gray-700 leading-relaxed font-medium">
              Experience the{" "}
              <span className="text-blue-600 font-bold">
                thrill of competition
              </span>{" "}
              as the best teams battle for glory in the{" "}
              <span className="text-blue-700 font-bold">CZS Super Cup</span>.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get ready for{" "}
              <span className="text-blue-600 font-semibold">
                heart-pounding action
              </span>
              , unforgettable moments, and a tournament like no other!
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-300">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-3 text-center">
              Hall of Fame
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              See who won the prestigious CZS Super Cup in previous seasons
            </p>
            <a
              href="/hall-of-fame"
              className="mt-4 text-blue-600 font-semibold hover:underline ml-20"
            >
              View Winners
            </a>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-300">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-3 text-center">
              Gallery Memories
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Relive the best moments from past tournaments in our gallery
            </p>
            <a
              href="/gallery"
              className="mt-4 text-blue-600 font-semibold hover:underline ml-20"
            >
              View Gallery
            </a>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-300">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-3 text-center">
              Global Unity
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Witness teams from around the world unite in competition
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg hover:from-blue-700 hover:to-blue-800">
            <span>Join the Experience</span>
            <Zap className="w-5 h-5 group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Briefing;
