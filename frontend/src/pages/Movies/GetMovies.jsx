import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import BaseURL from '../../config';
import Header from '../../components/AdminHeader';
import { getMovies } from '../../api-helpers/api-helpers';
import AddMovie from '../../components/Movie/AddMovie';
import { useNavigate } from 'react-router-dom';
import EditMovie from '../../components/Movie/EditMovie';

const GetMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const handleStatusChange = async (movie) => {
    try {
      const token = localStorage.getItem('admintoken');
      const response = await axios.post(`${BaseURL}admin/moviestatus/${movie._id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedStatus = response.data.movie.status;
        setMovies((prevMovies) =>
          prevMovies.map((prevMovie) => {
            if (prevMovie._id === movie._id) {
              return {
                ...prevMovie,
                status: updatedStatus,
              };
            }
            return prevMovie;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditMovie = (movie) => {
    navigate(`/admin/editmovie/${movie._id}`);
  };

  return (
    <>
      <Header />

      <Box>
        <Typography variant="h3" padding={2} textAlign="center" bgcolor="#900C3F" color="white">
          <b>All Movies</b>
        </Typography>
        <Box marginTop={4} marginLeft={3}>
          <AddMovie />
        </Box>

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
                <b>Actions</b>
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
                <Typography variant="h5">{movie.title}</Typography>
              </Box>
              <Box flex={1}>
                <Typography variant="h5">{movie.language}</Typography>
              </Box>
              <Box flex={1}>
                <img src={movie.postedUrl} alt="Movie Poster" style={{ width: '100px', height: '100px' }} />
              </Box>
              <Box flex={0.75}>
                <Box display="flex" alignItems="center">
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: movie.status ? 'green' : '#edb009',
                      color: 'white',
                      marginRight: '5px',
                    }}
                    onClick={() => handleStatusChange(movie)}
                  >
                    {movie.status ? 'Listed' : 'Unlisted'}
                  </Button>
                  <EditMovie movieId={movie._id} />
                  <Button
                    variant="contained"
                    style={{ marginLeft: '5px', backgroundColor: 'ThreeDHighlight', color: 'white' }}
                  >
                    View
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default GetMovies;
