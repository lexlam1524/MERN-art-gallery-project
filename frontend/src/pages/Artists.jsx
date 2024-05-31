import React, { useState } from 'react';
import ArtistList from '../components/ArtistList';
import AddArtifactForm from '../components/AddArtifactForm';

export default function Artists() {
  const [newArtifact, setNewArtifact] = useState(null);

  const handleArtifactAdded = artifact => {
    setNewArtifact(artifact);
  };

  return (
    <div>
      <h1>Artists</h1>
      <ArtistList />
      <h2>Add New Artifact</h2>
      <AddArtifactForm onArtifactAdded={handleArtifactAdded} />
    </div>
  );
}
