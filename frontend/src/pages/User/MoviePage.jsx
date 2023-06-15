import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../../api-helpers/api-helpers';
import Header from '../../components/Header';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Movietheatre from '../../components/Theatre/Movietheatre';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch movie details using the ID
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await getMovieById(id);
        const movieSpecific = movieDetails.movie;
        setMovie(movieSpecific[0]);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const MovieImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'fit',
    borderRadius: '5px',
    border: '1px solid black',
  });

  return (
    <div style={{ backgroundColor: '#d6d6d6' }}>
      <Header />
      <Box marginTop="40px" marginLeft={'70px'}>
        <Movietheatre selectedMovie={movie._id} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="80px"
        style={{
          backgroundColor: '#d6d6d6',
          boxShadow: '0px 0px 10px rgba(50, 50, 50, 0.5)',
        }}
      >
        <Box
          width="80%"
          maxWidth="1200px"
          margin="40px"
          display="flex"
          flexDirection="column"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box height="650px">
                <MovieImage src={movie.postedUrl} alt={movie.title} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                boxShadow: '0px 0px 10px rgba(50, 50, 50, 0.5)',
                padding: '40px',
                borderRadius: '5px',
              }}
            >
              <Typography
                variant="h2"
                gutterBottom
                style={{
                  textAlign: 'center',
                  fontFamily: 'Georgia, serif',
                  textTransform: 'uppercase',
                  animation: 'fadeIn 3s ease-in',
                }}
              >
                <b>{movie.title}</b>
              </Typography>
              <br />
              <br />
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  fontFamily: 'Georgia, serif',
                }}
              >
                <span
                  style={{
                    color: 'blue',
                    fontWeight: 'bold',
                  }}
                >
                 Language:
                </span>{' '}
                <span
                  style={{
                    color: 'black',
                  }}
                >
                  <b>{movie.language}</b>
                </span>
              </Typography>
              <br />
              <br />
              <Typography variant="h5" gutterBottom>
                <span
                  style={{
                    color: 'blue',
                    fontWeight: 'bold',
                  }}
                >
                  Description:
                </span>
              </Typography>
              <br />

              <Typography
                variant="body1"
                style={{
                  lineHeight: '2.5em',
                  fontSize: '25px',
                }}
              >
                <b>{movie.description}</b>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default MoviePage;
