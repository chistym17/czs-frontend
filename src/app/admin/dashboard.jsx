"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../utils/axios"; // Axios instance

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    } else {
      // Fetch admin info from the backend (optional)
      api
        .get("/admin/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAdminInfo(res.data);
        })
        .catch(() => {
          router.push("/admin/login");
        });
    }
  }, [router]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {adminInfo ? (
        <div>
          <p>Welcome, {adminInfo.email}</p>
          {/* Add more dashboard features like team approval/rejection */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
