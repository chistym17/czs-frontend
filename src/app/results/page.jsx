// 📁 src/app/results/page.jsx
"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MatchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/list-results`,
        {
          headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}` },
        }
      );
      setResults(res.data);
    } catch (err) {
      console.error("Error loading results:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Match Results
          </h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        ) : results.length === 0 ? (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-xl font-medium text-gray-600">
              No match results available
            </h2>
            <p className="text-gray-500 mt-2">
              Check back later for recent match results
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((res, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={res.url}
                    alt={res.matchTitle || "Match result"}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "auto" }}
                  />
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
                  <h3 className="text-lg font-semibold truncate">
                    {res.matchTitle}
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
