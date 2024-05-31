import React, { useState } from 'react';
import ArtistList from '../components/ArtistList';
import AddArtifactForm from '../components/AddArtifactForm';
import AddArtistForm from '../components/AddArtistFrom';

export default function Artifacts() {
  const [newArtifact, setNewArtifact] = useState(null);

  const handleArtifactAdded = artifact => {
    setNewArtifact(artifact);
  };

  return (
    <div>
      <h2>Add New Artifact</h2>
      <AddArtifactForm onArtifactAdded={handleArtifactAdded} />
    </div>
  );
}
