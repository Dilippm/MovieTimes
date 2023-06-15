import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Typography, TextField } from '@mui/material';
import { getAllMovies } from '../../api-helpers/api-helpers';
import MovieItems from './MovieItems';
import Header from '../../components/Header';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const fetchMovies = () => {
    getAllMovies(currentPage)
      .then((data) => {
      
        setMovies(data.movies);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          style={{ width: "50px", height: "50px", margin: "2px", backgroundColor: currentPage === i ? "green" : "#FFF", color: currentPage === i ? "#FFF" : "#000" }}
          onClick={() => handlePageChange(i)}
        >
         <b>{i}</b> 
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <Header />
      <Box width={'100%'} height={'100%'} margin={'auto'} marginTop={2}></Box>
      <Box margin={'auto'} marginTop={4}>
        <Typography variant='h4' padding={2} textAlign={'center'} bgcolor={'#900C3F'} color={'white'}>
          <b>All Movies</b>
        </Typography>
        <Box width={'30%'} margin={'auto'} marginTop={'20px'}>
          <TextField
            label='Search'
            variant='outlined'
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            margin='normal'
          />
        </Box>
        <Box width={'100%'} margin={'auto'} display={'flex'} justifyContent={'center'} flexWrap={'wrap'}>
          {filteredMovies.map((movie, index) => (
            <MovieItems
              key={index}
              postedUrl={movie.postedUrl}
              id ={movie._id}
              title={movie.title}
              language={movie.language}
              description={movie.description}
              releaseDate={movie.releaseDate}
            />
          ))}
        </Box>
        <Box display='flex' justifyContent='center' marginTop={2}>
          {currentPage > 1 && (
            <button style={{ width: "100px", height: "50px", backgroundColor: "#4287f5", color: "white" }} onClick={() => handlePageChange(currentPage - 1)}>
              <b>Previous</b>
            </button>
          )}
          {renderPageNumbers()}
          {currentPage < totalPages && (
            <button style={{ width: "100px", height: "50px", backgroundColor: "#4287f5", color: "white", marginLeft: "10px" }} onClick={() => handlePageChange(currentPage + 1)}>
              Next Page
            </button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Movies;

