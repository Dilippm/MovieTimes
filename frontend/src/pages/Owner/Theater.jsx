import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/OwnerHeader';
import { GetTheatres, AddTheatre } from '../../api-helpers/api-helpers';
import AddTheatreForm from '../../components/Theatre/AddTheatreForm';

const Theater = () => {
  const [theatre, setTheatre] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetTheatres();
        setTheatre(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleAddTheatre = async (theatreData) => {
    try {
      const response = await AddTheatre(theatreData);
      console.log('Theatre added successfully:', response);
      setTheatre([...theatre, response]);
      toast.success('Theatre Added Successfully');
    } catch (error) {
      console.error('Failed to add theatre:', error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />

      <Box>
        <Typography variant="h3" padding={2} textAlign="center" bgcolor="#900C3F" color="white">
          <b>All Theatres</b>
        </Typography>
        <Box marginTop={4} marginLeft={3}>
          <AddTheatreForm onAddTheatre={handleAddTheatre} />
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
                <b>Name</b>
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography variant="h4">
                <b>Seats</b>
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography variant="h4">
                <b>ShowTimings</b>
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography variant="h4">
                <b>Movie</b>
              </Typography>
            </Box>
            <Box flex={0.75}>
              <Typography variant="h4">
                <b>Actions</b>
              </Typography>
            </Box>
          </Box>

          {/* Display the theatre data */}
          {theatre.map((theatreItem, index) => (
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
                <Typography variant="h5"> <b>{theatreItem.name}</b> </Typography>
              </Box>
              <Box flex={1}>
                <Typography variant="h5"> <b>{theatreItem.seats}</b></Typography>
              </Box>
              <Box flex={1}>
                {theatreItem.showTimings.map((timing, index) => (
                  <Typography key={index} variant="h5">
                    <b> {timing.startTime}</b>
                  </Typography>
                ))}
              </Box>
              <Box flex={1}>
                <Typography variant="h5"> <b>{theatreItem.movies}</b> </Typography>
              </Box>
              <Box flex={0.75}>
                <Box display="flex" alignItems="center">
                  {/* Add the required button components here */}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Theater;
