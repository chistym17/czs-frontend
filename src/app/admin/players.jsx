import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminPlayers() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/admin/players", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setPlayers(data.players);
        setLoading(false);
      } else {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      }
    };

    fetchPlayers();
  }, []);

  const handleApprove = async (playerId) => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      `http://localhost:5000/api/admin/players/${playerId}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player._id === playerId ? { ...player, status: "approved" } : player
        )
      );
    }
  };

  const handleReject = async (playerId) => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      `http://localhost:5000/api/admin/players/${playerId}/reject`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player._id === playerId ? { ...player, status: "rejected" } : player
        )
      );
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Players Management</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player._id}>
              <td>{player.name}</td>
              <td>{player.email}</td>
              <td>{player.status}</td>
              <td>
                {player.status !== "approved" && (
                  <button onClick={() => handleApprove(player._id)}>
                    Approve
                  </button>
                )}{" "}
                {player.status !== "rejected" && (
                  <button onClick={() => handleReject(player._id)}>
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
