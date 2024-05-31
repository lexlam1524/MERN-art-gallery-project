import React, { useEffect, useState } from "react";

export default function ArtistList() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch("/api/artists");
        const data = await res.json();
        setArtists(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="card-container">
      {artists.map((artist) => (
        <li key={artist._id} className="card">
          <img src={artist.profilePicture} alt={artist.name} />
          <div className="card-content">
            <h3>{artist.name}</h3>
            <p>{artist.bio}</p>
          </div>
        </li>
      ))}
    </div>
  );
}
