import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import axios from 'axios';

//key - 7dc7f662

const API_URL = 'http://www.omdbapi.com/?apikey=7dc7f662';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const searchMovies = async (title) => {
    try {
      const res = await axios.get(`${API_URL}&s=${title}`);
      setMovies(res.data.Search);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    searchMovies('');
  }, []);

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input
          placeholder='Search for movies'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchMovies(search)}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(search)}
        ></img>
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
