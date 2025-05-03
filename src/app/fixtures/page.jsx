"use client";

import { getAllFixtures } from "@/lib/api";
import { useEffect, useState } from "react";

export default function PublicFixturesPage() {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    async function fetchFixtures() {
      const res = await getAllFixtures();
      if (res && res.length >= 0) {
        setFixtures(res);
      }
    }
    fetchFixtures();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // Format like: 5/3/2025, 6:00 PM
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Upcoming Fixtures</h1>

      {fixtures.length === 0 && <p>No fixtures available.</p>}

      <div className="space-y-4">
        {fixtures.map((fixture) => (
          <div
            key={fixture._id}
            className="border p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">
                {fixture.teamA} vs {fixture.teamB}
              </h2>
              <p className="text-sm text-gray-600">
                Date: {formatDate(fixture.date)}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                fixture.status === "completed"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {fixture.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
