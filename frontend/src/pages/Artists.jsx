import React, { useState } from 'react';
import ArtistList from '../components/ArtistList';
import AddArtifactForm from '../components/AddArtifactForm';
import AddArtistForm from '../components/AddArtistFrom';

export default function Artists() {
  const [newArtist, setNewArtist] = useState(null);

  const handleArtistAdded = artifact => {
    setNewArtist(artifact);
  };

  return (
    <div>
      <h2>Add New Artists</h2>
      <AddArtistForm onArtifactAdded={handleArtistAdded} />
    </div>
  );
}
