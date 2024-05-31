import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function AddArtistsForm({ onArtistsAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profilePicture: "",
  });
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ ...formData, artist: currentUser._id }),
      });
      const data = await res.json();
      if (data.success === false) {
        throw new Error(data.error);
      }
      onArtistsAdded(data);
    } catch (error) {
      console.error("Failed to add Artists", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="bg-slate-100 p-3 rounded-lg"
      />
      <input
        type="text"
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleChange}
        className="bg-slate-100 p-3 rounded-lg"
      />
      <input
        type="text"
        name="profilePicture"
        placeholder="Profile Picture URL"
        value={formData.profilePicture}
        onChange={handleChange}
        className="bg-slate-100 p-3 rounded-lg"
      />
      <button
        type="submit"
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
      >
        Add Artists
      </button>
    </form>
  );
}
