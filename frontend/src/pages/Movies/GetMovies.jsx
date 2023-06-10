import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import BaseURL from '../../config';
import Header from '../../components/AdminHeader';
import { getMovies } from '../../api-helpers/api-helpers';
import AddMovie from '../../components/Movie/AddMovie';
import { useNavigate } from 'react-router-dom';

const GetMovies = () => {
  const navigate =useNavigate();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);

  useEffect(() => {
    getMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleStatusChange = async (movieId) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('admintoken');
  
      const response = await axios.post(`${BaseURL}admin/moviestatus/${movieId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const updatedStatus = response.data.movie.status;
        setMovies((prevMovies) => {
          const updatedMovie = prevMovies.map((movie) => {
            if (movie._id === movieId) {
              return {
                ...movie,
                status: updatedStatus,
              };
            }
            return movie;
          });
          return updatedMovie;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const getPaginatedMovies = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return movies.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(movies.length / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const handleEditMovie = (movieId) => {
    // Navigate to "/editmovie" path when the "Edit Movie" button is clicked
    navigate(`/admin/editmovie/${movieId}`);
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

          {getPaginatedMovies().map((movie, index) => (
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
                <Box>
                <Button
  variant="outlined"
  style={{
    backgroundColor: movie.status ? 'green' : '#edb009',
    color: 'white',
    marginRight: '5px',
  }}
  onClick={() => handleStatusChange(movie._id)}
>
  {movie.status ? 'Listed' : 'Unlisted'}
</Button>

<Button variant="contained" onClick={() => handleEditMovie(movie._id)}>
                    Edit Movie
                  </Button>
                  <Button variant="contained" style={{ marginLeft: '5px', backgroundColor: 'ThreeDHighlight', color: 'white' }}>
                    View
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}

          <Box display="flex" justifyContent="center" marginTop={4} marginBottom={10}>
            <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous Page
            </Button>
            {pageNumbers.map((pageNumber) => (
              <Button
                key={pageNumber}
                variant="outlined"
                onClick={() => setCurrentPage(pageNumber)}
                disabled={pageNumber === currentPage}
                style={{ marginLeft: '10px' }}
              >
                {pageNumber}
              </Button>
            ))}
            <Button variant="contained" onClick={handleNextPage} disabled={currentPage === totalPages} style={{ marginLeft: '10px' }}>
              Next Page
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GetMovies;
