import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch("http://localhost:3001/api/admin/teams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setTeams(data.teams);
        setLoading(false);
      } else {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      }
    };

    fetchTeams();
  }, []);

  const handleApprove = async (teamId) => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      `http://localhost:3001/api/admin/teams/${teamId}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team._id === teamId ? { ...team, status: "approved" } : team
        )
      );
    }
  };

  const handleReject = async (teamId) => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      `http://localhost:5000/api/admin/teams/${teamId}/reject`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team._id === teamId ? { ...team, status: "rejected" } : team
        )
      );
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Teams Management</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.status}</td>
              <td>
                {team.status !== "approved" && (
                  <button onClick={() => handleApprove(team._id)}>
                    Approve
                  </button>
                )}{" "}
                {team.status !== "rejected" && (
                  <button onClick={() => handleReject(team._id)}>Reject</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
