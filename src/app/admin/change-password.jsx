"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../../utils/axios"; // Axios instance

const AdminChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("You need to be logged in to change the password.");
      return;
    }

    try {
      const response = await api.post(
        "/admin/change-password",
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setError("");
    } catch (err) {
      setError("Failed to change password. Please try again.");
    }
  };

  return (
    <div>
      <h2>Change Admin Password</h2>
      {success && <p>Password changed successfully!</p>}
      <form onSubmit={handleChangePassword}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default AdminChangePassword;
