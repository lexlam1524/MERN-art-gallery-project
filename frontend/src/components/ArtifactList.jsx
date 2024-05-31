import React, { useEffect, useState } from 'react';

export default function ArtifactList() {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const res = await fetch('/api/artifacts');
        const data = await res.json();
        setArtifacts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArtifacts();
  }, []);

  return (
    <div>
      <h2>Artifacts</h2>
      <ul>
        {artifacts.map(artifact => (
          <li key={artifact._id}>
            <img src={artifact.imageUrl} alt={artifact.title} />
            <h3>{artifact.title}</h3>
            <p>{artifact.description}</p>
            <p>Artist: {artifact.artist.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
