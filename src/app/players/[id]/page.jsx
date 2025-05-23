// app/players/[id]/page.jsx

import Image from "next/image";

async function getPlayer(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/player/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch player");
    const data = await res.json();
    return data.player;
  } catch (error) {
    console.error("Error fetching player:", error);
    return null;
  }
}

export default async function PlayerDetailPage({ params }) {
  const player = await getPlayer(params.id);

  if (!player) {
    return (
      <div className="text-center mt-10 text-red-500">
        Player not found or failed to load.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-4">{player.name}</h1>
        {player.image && (
          <Image
            src={player.image}
            alt={player.name}
            width={300}
            height={300}
            className="rounded-xl mb-4 object-cover"
          />
        )}
        <p className="text-lg mb-2">
          <strong>Batch:</strong> {player.batch}
        </p>
        <p className="text-lg">
          <strong>Position:</strong> {player.position}
        </p>
      </div>
    </div>
  );
}
