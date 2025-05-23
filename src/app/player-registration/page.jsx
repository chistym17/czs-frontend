"use client";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar";

const positions = [
  "GK",
  "CB",
  "RB",
  "LB",
  "CDM",
  "CM",
  "CAM",
  "RM",
  "LM",
  "RW",
  "LW",
  "CF",
  "ST",
  "SS",
];

export default function PlayerRegistration() {
  const [form, setForm] = useState({
    name: "",
    school: "",
    image: null,
    batch: "",
    position: "",
  });
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      if (files && files[0]) {
        setForm((prev) => ({ ...prev, image: files[0] }));
        setPreview(URL.createObjectURL(files[0]));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      school: "",
      image: null,
      batch: "",
      position: "",
    });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim()) return toast.error("Please enter player name");
    if (!form.school.trim()) return toast.error("Please enter school name");
    if (!form.batch.trim()) return toast.error("Please enter batch year");
    if (!form.position) return toast.error("Please select a position");

    setIsLoading(true);
    const loadingToast = toast.loading("Registering player...");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("school", form.school);
    formData.append("batch", form.batch);
    formData.append("position", form.position);
    if (form.image) formData.append("image", form.image);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/player/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to register player");
      }

      toast.dismiss(loadingToast);
      toast.success("Player registered successfully!");
      resetForm();
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(`Registration failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <Toaster position="top-center" />

          <form
            className="bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-2">
                Player Registration
              </h2>
              <p className="text-gray-500">Enter player details to register</p>
            </div>

            <div className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-md font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white"
                  placeholder="Enter player's name"
                  disabled={isLoading}
                />
              </div>

              {/* School */}
              <div className="space-y-2">
                <label className="block text-md font-medium text-gray-700">
                  School
                </label>
                <input
                  type="text"
                  name="school"
                  value={form.school}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white"
                  placeholder="Enter player's school"
                  disabled={isLoading}
                />
              </div>

              {/* Image upload */}
              <div className="space-y-2">
                <label className="block text-md font-medium text-gray-700">
                  Image
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-full sm:w-2/3">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="w-full sm:w-1/3 flex justify-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-24 w-24 rounded-md object-cover border"
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-md bg-gray-100 flex items-center justify-center border">
                        <span className="text-gray-400 text-sm text-center">
                          No image
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Batch & Position */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-md font-medium text-gray-700">
                    Batch
                  </label>
                  <input
                    type="text"
                    name="batch"
                    value={form.batch}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg bg-white"
                    placeholder="e.g., 2025"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-md font-medium text-gray-700">
                    Position
                  </label>
                  <select
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg bg-white"
                    disabled={isLoading}
                  >
                    <option value="" disabled>
                      Select position
                    </option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg"
                disabled={isLoading}
              >
                Reset
              </button>
              <button
                type="submit"
                className="w-full sm:w-2/3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg shadow flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Registering...
                  </>
                ) : (
                  "Register Player"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
