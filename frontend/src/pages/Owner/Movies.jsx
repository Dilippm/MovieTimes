import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { getAllMovies } from '../../api-helpers/api-helpers';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getAllMovies();
     
      if (data) {
        setMovies(data.movies);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h3" padding={2} textAlign="center" bgcolor="#900C3F" color="white">
          <b>All Movies</b>
        </Typography>

        <Box width={'80%'} margin={'auto'}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={2}
            marginTop={2}
            marginLeft={5}
            marginBottom={'50px'}
            height={'150px'}
          >
            <Box flex={1}>
              <Typography variant="h4">
                <b>Title</b>
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography variant="h4">
                <b>Language</b>
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography variant="h4">
                <b>Image</b>
              </Typography>
            </Box>
            <Box flex={0.75}>
              <Typography variant="h4">
                <b>Status</b>
              </Typography>
            </Box>
          </Box>

          {movies.map((movie, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={2}
              marginTop={2}
              marginBottom={'80px'}
              bgcolor="#f5f5f5"
              height={'150px'}
            >
              <Box flex={1}>
                <Typography variant="h5"> <b>{movie.title}</b></Typography>
              </Box>
              <Box flex={1}>
                <Typography variant="h5">
                 <b>{movie.language}</b> </Typography>
              </Box>
              <Box flex={1}>
                <img src={movie.postedUrl} alt="Movie Poster" style={{ width: '100px', height: '100px' }} />
              </Box>
              <Box flex={0.75}>
              <Typography variant="h5">
               <b>{movie.status ? "Listed" : "Unlisted"}</b> </Typography>

              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Movies;
