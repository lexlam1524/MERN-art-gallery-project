import React from 'react'
import ArtistList from '../components/ArtistList';
import ArtifactList from '../components/ArtifactList';

export default function Home() {
  return (
    <div>
      <div className='m-10'>
      <h1>Artifact</h1>
      <ArtifactList />
      </div>
   

    <div className='m-10'>
    <h1>Artist</h1>
      <ArtistList />
      </div>

    </div>
 
  )
}

