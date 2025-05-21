"use client";

import {
  Bell,
  FileText,
  LogOut,
  Menu,
  ShieldCheck,
  Trash,
  UploadCloud,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, playersRes] = await Promise.all([
          fetch("http://localhost:5000/team", { credentials: "include" }),
          fetch("http://localhost:5000/player/players", {
            credentials: "include",
          }),
        ]);

        const teamsData = await teamsRes.json();
        const playersData = await playersRes.json();

        if (teamsData.success && playersData.success) {
          setTeams(teamsData.data);
          setPlayers(playersData.players);
        }
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const deleteTeam = async (id) => {
    if (!confirm("Are you sure you want to delete this team?")) return;
    try {
      await fetch(`http://localhost:5000/team/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setTeams((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete team.");
    }
  };

  const deletePlayer = async (id) => {
    if (!confirm("Are you sure you want to delete this player?")) return;
    try {
      await fetch(`http://localhost:5000/player/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setPlayers((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete player.");
    }
  };

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-white text-blue-800">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-blue-100 shadow flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-blue-700 hover:text-blue-900"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-extrabold">Tournament Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-blue-600 hover:text-blue-800">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-blue-700" />
            </div>
            <div className="hidden md:block text-sm">admin@example.com</div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-10 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-6 space-y-4 text-blue-800">
          <button
            onClick={() => router.push("/admin/upload-fixture")}
            className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-900"
          >
            <UploadCloud className="h-5 w-5" />
            Upload Fixtures
          </button>
          <button
            onClick={() => router.push("/admin/upload-result")}
            className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-900"
          >
            <FileText className="h-5 w-5" />
            Upload Results
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 hover:text-red-800"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-24 px-6 transition-all ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <section className="bg-blue-50 p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-extrabold mb-2">Welcome Admin</h2>
          <p className="text-blue-700">
            Use the sidebar to upload tournament fixtures and match results.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-blue-200 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">Upload Fixtures</h3>
            <p className="text-sm text-blue-700 mb-4">
              Upload upcoming match fixtures to keep your tournament updated.
            </p>
            <button
              onClick={() => router.push("/admin/upload-fixture")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Go to Upload Fixtures
            </button>
          </div>

          <div className="bg-white border border-blue-200 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">Upload Match Results</h3>
            <p className="text-sm text-blue-700 mb-4">
              Upload results for completed matches and track performance.
            </p>
            <button
              onClick={() => router.push("/admin/upload-result")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Go to Upload Results
            </button>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Registered Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div key={team._id} className="border p-4 rounded-lg shadow">
                <h3 className="font-bold text-xl">{team.teamName}</h3>
                <p>Batch: {team.batchYear}</p>
                <p>Captain: {team.captainName}</p>
                <p>Vice Captain: {team.viceCaptainName}</p>
                <button
                  onClick={() => deleteTeam(team._id)}
                  className="mt-3 text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash className="h-4 w-4" /> Delete Team
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Registered Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((player) => (
              <div key={player._id} className="border p-4 rounded-lg shadow">
                <h3 className="font-bold text-xl">{player.name}</h3>
                <p>Batch: {player.batch}</p>
                <p>Position: {player.position}</p>
                {player.image && (
                  <img
                    src={player.image}
                    alt="player"
                    className="w-20 h-20 object-cover rounded-full mt-2"
                  />
                )}
                <button
                  onClick={() => deletePlayer(player._id)}
                  className="mt-3 text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash className="h-4 w-4" /> Delete Player
                </button>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-12 text-center text-sm text-blue-400">
          © {new Date().getFullYear()} Tournament Admin. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
