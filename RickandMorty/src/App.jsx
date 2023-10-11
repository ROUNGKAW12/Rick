import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [episodeFilter, setEpisodeFilter] = useState('');
  const [characterFilter, setCharacterFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleLocationFilterChange = event => {
    setLocationFilter(event.target.value);
  };
  const handleEpisodeFilterChange = event => {
    setEpisodeFilter(event.target.value);
  };
  const handleCharacterFilterChange = event => {
    setCharacterFilter(event.target.value);
  };

  // Helper function to extract episode numbers from the episode strings
  const extractEpisodeNumbers = episodes => {
    return episodes.map(ep => ep.match(/\d+/)[0]).join(', ');
  };

  return (
    <div>
      <header>
        <nav className="navbar">
        <nav className="navbar " >
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/">Home</a>
        </li>
        <li className="nav-item">
          <a href="/เกี่ยวกับ">About</a>
        </li>
        <li className="nav-item">
          <a href="/บริการ">Docs</a>
        </li>
        <li className="nav-item ">
          <a href="/ติดต่อ">Support Us</a>
        </li>
      </ul>
    </nav>
        </nav>
        <h1 className='h1'>The Rick and Morty API</h1>
        <label htmlFor="locationFilter" className='location-filter'>Location Filter:</label>
        <input
          className='box1'
          type="text"
          id="locationFilter"
          value={locationFilter}
          onChange={handleLocationFilterChange}
          style={{ width: '200px', height: '30px', border: '1px solid' }}
        />
        <label htmlFor="episodeFilter" className="episode-filter">Episode Filter:</label>
        <input
          className="box1"
          type="text"
          id="episodeFilter"
          value={episodeFilter}
          onChange={handleEpisodeFilterChange}
          style={{ width: '200px', height: '30px', border: '1px solid' }}
        />
        <label htmlFor="characterFilter" className="character-filter">Character Filter:</label>
        <input
          className="box1"
          type="text"
          id="characterFilter"
          value={characterFilter}
          onChange={handleCharacterFilterChange}
          style={{ width: '200px', height: '30px', border: '1px solid' }}
        />
      </header>
      <ul>
        {characters
          .filter(character => {
            return (
              character.location.name.toLowerCase().includes(locationFilter.toLowerCase()) &&
              character.episode.some(ep => ep.toLowerCase().includes(episodeFilter.toLowerCase())) &&
              character.name.toLowerCase().includes(characterFilter.toLowerCase())
            );
          })
          .map(character => (
            <li key={character.id} className='l1'>
              <div className='character-info'>
                <div>
                  <img src={character.image} alt={character.name} width={100} height={100} className="character-image" />
                </div>
                <div className='info5'>
                  Name: {character.name}
                  <br />
                  Status: {character.status}
                  <br />
                  Gender: {character.gender}
                  <br />
                  First location: {character.location.name}
                  <br />
                  Episode: {extractEpisodeNumbers(character.episode)}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
