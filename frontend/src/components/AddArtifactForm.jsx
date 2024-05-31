import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function AddArtifactForm({ onArtifactAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: ''
  });
  const { currentUser } = useSelector(state => state.user);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/artifacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ ...formData, artist: currentUser._id }),
      });
      const data = await res.json();
      if (data.success === false) {
        throw new Error(data.error);
      }
      onArtifactAdded(data);
    } catch (error) {
      console.error('Failed to add artifact', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="bg-slate-100 p-3 rounded-lg"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="bg-slate-100 p-3 rounded-lg"
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
        className="bg-slate-100 p-3 rounded-lg"
      />
      <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
        Add Artifact
      </button>
    </form>
  );
}
