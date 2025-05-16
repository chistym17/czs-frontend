"use client";

import {
  Bell,
  FileText,
  LogOut,
  Menu,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

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
            onClick={() => router.push("/admin/upload-fixtures")}
            className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-900"
          >
            <UploadCloud className="h-5 w-5" />
            Upload Fixtures
          </button>
          <button
            onClick={() => router.push("/admin/upload-results")}
            className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-900"
          >
            <FileText className="h-5 w-5" />
            Upload Results
          </button>
          <button
            onClick={() => alert("Logging out...")}
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

        <footer className="mt-12 text-center text-sm text-blue-400">
          © {new Date().getFullYear()} Tournament Admin. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
