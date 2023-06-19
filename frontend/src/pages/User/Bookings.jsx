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
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="70vh" >
      <Card style={{ width: '500px', height: '550px', border: '3px solid #000', boxShadow: '10px 20px 4px rgba(0, 0, 0, 0.5)',backgroundColor:"#ECD5BB" }}>
          <CardContent >
            <Typography style={{marginBottom:"20px",marginTop:"10px"}} variant="h5" component="h2" align="center">
             <b>Theater:<i style={{color:"#3D0C02"}}>{reservationDetails.theatreName}</i> </b> 
            </Typography>
            <br />
            <Typography style={{marginBottom:"20px"}}  variant="h5" component="h2" align="center">
             <b> Movie:  <i style={{color:"#3D0C02"}}>{reservationDetails.movieName}</i></b>
            </Typography>
            <br />
            <Typography style={{marginBottom:"20px"}}  variant="h5" component="h2" align="center">
             <b>Date: <i style={{color:"#3D0C02"}}>{reservationDetails.Date}</i></b> 
            </Typography>
            <br />
            <Typography style={{marginBottom:"20px"}} variant="h5" component="h2" align="center">
             <b>Time:<i style={{color:"#3D0C02"}}>{reservationDetails.Time}</i>  </b> 
            </Typography>
            <br />
            <Typography style={{marginBottom:"20px"}}  variant="h5" component="h2" align="center">
             <b>Seats Selected: <i>{reservationDetails.SeatsSelected.join(', ')}</i> </b>
            </Typography>
            <br />
            <Typography style={{marginBottom:"20px"}}  variant="h5" component="h2" align="center">
             <b>Price:<i style={{marginBottom:"20px"}}>{reservationDetails.price}</i> </b> 
            </Typography>
            <PayButton reservationDetails={reservationDetails} />
          </CardContent>
          
        </Card>
      </Box>
    </div>
  );
};

export default Bookings;
