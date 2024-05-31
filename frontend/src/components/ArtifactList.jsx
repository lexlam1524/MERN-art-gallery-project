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
    <div>
      <ul>
        {artifacts.map((artifact) => (
          <li key={artifact._id}>
            <img src={artifact.imageUrl} alt={artifact.title} />
            <h3>{artifact.title}</h3>
            <p>{artifact.description}</p>
            <p>Artist: {artifact.artist ? artifact.artist.name : "Unknown"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
