import React, { useEffect, useState } from "react";

export default function ArtifactList({ artistId }) {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const res = await fetch("/api/artifacts");
        const data = await res.json();
        if (artistId) {
          setArtifacts(
            data.filter((artifact) => artifact.artist._id === artistId)
          );
        } else {
          setArtifacts(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchArtifacts();
  }, [artistId]);

  return (
    <div className="card-container">
      {artifacts.map((artifact) => (
        <li key={artifact._id} className="card">
          <img src={artifact.imageUrl} alt={artifact.title} />
          <div className="card-content">
            <h3>{artifact.title}</h3>
            <p>{artifact.description}</p>
          </div>
        </li>
      ))}
    </div>
  );
}
