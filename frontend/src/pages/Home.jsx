import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import './Home.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { getAllMovies } from '../api-helpers/api-helpers';

import MovieItems from './Movies/MovieItems';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
 
    getAllMovies()
      .then((data) => {
        setMovies(data.movies);
        setFilteredMovies(data.movies);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = movies.filter((movie) => {
      const titleMatch = movie.title.toLowerCase().includes(searchValue.toLowerCase());
      const languageMatch = movie.language.toLowerCase().includes(searchValue.toLowerCase());
      return titleMatch || languageMatch;
    });
    setFilteredMovies(filtered);
  }, [searchValue, movies]);
  

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <Header />
      <Box width={'100%'} height={'100%'} margin={'auto'} marginTop={3}>
        <Box className="poster-box" margin={'auto'} width={'99%'} height={'60vh'} padding={2}>
          <img
            src="https://www.nowrunning.com/content/movie/2020/ponni-24737/bg_ps1_2.jpg"
            alt="PS1"
            width="100%"
            height="100%"
          />
        </Box>
        <Box padding={5} margin={'auto'}>
          <hr />
          <Typography variant="h4" textAlign={'center'} marginTop={3} >
            <b>Latest Release</b>
          </Typography>
          <Box width={'30%'} height={'80%'} margin="auto" marginTop={3}>
            <TextField
              sx={{
                input: {
                  color: 'white',
                  border: '3px solid black',
                  borderRadius:30,
                  backgroundColor:"black",
                  width:"500px",
                  height:"40px"
                },
                


              }}
              variant="standard"
              placeholder="Search By Title or Language"
              value={searchValue}
              onChange={handleSearchInputChange}
            />
          </Box>
        </Box>
        <Box display="flex" width="100%" justifyContent="center" flexWrap="wrap">
          {filteredMovies.slice(0, 4).map((movie, index) => (
            <MovieItems
              key={index}
              title={movie.title}
              releaseDate={movie.releaseDate}
              postedUrl={movie.postedUrl}
              description={movie.description}
              language={movie.language}
              id={movie._id}
            />
          ))}
        </Box>
        <Box display="flex" padding={5} margin="auto" justifyContent="center">
          <Link to="/movies" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" sx={{ margin: 'auto', color: '#2b2d42' }}>
              View All Movies
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Home;
