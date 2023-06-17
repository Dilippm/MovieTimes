import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Header from '../../components/Header';
import BaseURL from '../../config';
import PayButton from '../../components/Payment/PayButton';

const Bookings = () => {
  const { id } = useParams();
  const [reservationDetails, setReservationDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Replace with your actual token
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get(`${BaseURL}user/reservations/${id}`, { headers });
        setReservationDetails(response.data.reservation);

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch reservation details', error);
        setIsLoading(false);
      }
    };

    fetchReservationDetails();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!reservationDetails) {
    return <p>Failed to fetch reservation details</p>;
  }

  return (
    <div>
      <Header />
      <Typography variant="h4" marginTop={8} padding={2} textAlign="center" bgcolor="#900C3F" color="white">
        <b>Booking</b>
      </Typography>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="60vh">
        <Card style={{ width: '400px' }}>
          <CardContent>
            <Typography variant="h5" component="h2" align="center">
              Theater: {reservationDetails.theatreName}
            </Typography>
            <br />
            <Typography color="textSecondary" variant="h5" component="h2" align="center">
              Movie: {reservationDetails.movieName}
            </Typography>
            <br />
            <Typography color="textSecondary" variant="h5" component="h2" align="center">
              Date: {reservationDetails.Date}
            </Typography>
            <br />
            <Typography color="textSecondary" variant="h5" component="h2" align="center">
              Time: {reservationDetails.Time}
            </Typography>
            <br />
            <Typography color="textSecondary" variant="h5" component="h2" align="center">
              Seats Selected: {reservationDetails.SeatsSelected.join(', ')}
            </Typography>
            <br />
            <Typography color="textSecondary" variant="h5" component="h2" align="center">
              Price: {reservationDetails.price}
            </Typography>
          </CardContent>
          <PayButton reservationDetails={reservationDetails} />
        </Card>
      </Box>
    </div>
  );
};

export default Bookings;
