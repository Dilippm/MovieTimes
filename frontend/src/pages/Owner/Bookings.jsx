import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, CardContent, Grid } from '@mui/material';
import { getBookingsForOwner } from '../../api-helpers/api-helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Bookings = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);
    const tokenExpirationMiddleware = (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("ownertoken");
          localStorage.removeItem("ownerId");
          localStorage.removeItem("ownerimage");
          localStorage.removeItem("ownername");
          toast.error("Token expired. Redirecting to login page...");
          navigate("/owner/login");
        } else {
          throw error;
        }
      };
    const fetchBookings = async () => {
        try {
          const response = await getBookingsForOwner();
         
          const sortedBookings = response.bookings.sort((a, b) => {
           
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setBookings(sortedBookings);
        } catch (error) {
            tokenExpirationMiddleware(error);
          console.log(error);
        }
      };
      
  return (
    <>
      <ToastContainer />
 
    <Container maxWidth="80%">
        <Typography variant="h3" component="h1" gutterBottom sx={{ margin: "30px", marginTop: "50px", marginLeft: "850px" }}>
            <b> Bookings</b>
        </Typography>
        {bookings.map((booking) => (
            <Card key={booking.id} sx={{ margin: 'auto', background: 'linear-gradient(45deg, black, red)', border: 0, borderRadius: 3, boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .9)', color: 'white', marginBottom: '20px', width: "80vw", height: "200px" }}>
                <CardContent>
                    <Grid container spacing={4} direction="row">
                        <Grid item xs={3}>
                            <Typography variant="h6" component="h2" sx={{ fontSize: "30px" }}>
                                <b>Booking ID:</b>   {booking._id}
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: "30px" }} mt={2}>
                                <b>Date:</b>  {booking.date}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="body1" sx={{ fontSize: "30px", marginLeft: "60px" }}>
                                <b>Theater:</b>  {booking.theater}
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: "30px", marginLeft: "60px" }} mt={2}>
                                <b>Movie:</b>  {booking.movie}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="body1" sx={{ fontSize: "28px", marginLeft: "60px" }}>
                                <b>ShowTime:</b>  {booking.time}
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: "30px", marginLeft: "60px" }} mt={2}>
                                <b>Seats:</b>   {booking.seatNumber} 
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="body1" sx={{ fontSize: "28px", marginLeft: "60px" }}>
                                <b>Amount:</b>  ₹{booking.amount}/-
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: "30px", marginLeft: "60px" }} mt={2}>
                                <b>User:</b>   {booking.user.name} 
                            </Typography>
                        </Grid>
                       
                    </Grid>
                </CardContent>
            </Card>
        ))}
    </Container>
</>
);
};


export default Bookings
