"use client";

import { getAllResults } from "@/lib/api";
import { useEffect, useState } from "react";

export default function PublicResultsPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      const res = await getAllResults();
      if (res && res.length >= 0) {
        setResults(res);
      }
    }
    fetchResults();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Match Results</h1>
      {results.length === 0 && <p>No results yet.</p>}

      <div className="space-y-4">
        {results.map((result) => (
          <div key={result._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">
              {result.teamA} vs {result.teamB}
            </h2>
            <p>
              Score: <strong>{result.score}</strong>
            </p>
            <p>Winner: {result.winner}</p>
            {result.mvp && <p>MVP: {result.mvp}</p>}
            {result.notes && (
              <p className="text-sm text-gray-600">Note: {result.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
