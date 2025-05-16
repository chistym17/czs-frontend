"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PublicFixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFixtures();
  }, []);

  const fetchFixtures = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5001/list-fixtures", {
        headers: { Authorization: "Bearer admin123" }, // remove if you want public access without token
      });
      setFixtures(res.data);
    } catch (err) {
      console.error("Error loading fixtures:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Upcoming Fixtures
          </h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        ) : fixtures.length === 0 ? (
          <div className="text-center py-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-blue-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>
            <h2 className="text-xl font-medium text-gray-600">
              No fixtures available at the moment
            </h2>
            <p className="text-gray-500 mt-2">
              Check back later for upcoming matches
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fixtures.map((fixture, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={fixture.url}
                    alt={fixture.matchTitle || "Match fixture"}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "auto" }}
                  />
                </div>
                <div className="p-5 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
                  <h3 className="text-lg font-semibold truncate">
                    {fixture.matchTitle}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-blue-800 text-white py-4 mt-12">
        <div className="container mx-auto text-center text-sm">
          <p>
            © {new Date().getFullYear()} Football Club - All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
