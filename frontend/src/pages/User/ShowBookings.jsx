import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, CardContent, Box, Grid } from '@mui/material';


import Header from '../../components/Header';
import { getBookingsForUser } from '../../api-helpers/api-helpers';



const ShowBookings = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await getBookingsForUser();
            console.log("page response:", response);
            setBookings(response.bookings);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <Container maxWidth="80%"  >

                <Typography variant="h3" component="h1" gutterBottom sx={{ margin: "30px", marginTop: "50px", marginLeft: "850px" }}>
                    <b> Bookings</b>

                </Typography>
                {bookings.map((booking) => (
                    <Card key={booking.id} sx={{ margin: 'auto', background: 'linear-gradient(45deg, black, red)', border: 0, borderRadius: 3, boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .9)', color: 'white', marginBottom: '20px', width:"80vw",height: "200px" }}>
                        <CardContent>
                            <Grid container spacing={4} direction="row" > 
                                <Grid item xs={4}>
                                    <Typography variant="h6" component="h2" sx={{fontSize:"30px"}}>
                                      <b>Booking ID:</b>   {booking._id}
                                    </Typography>
                                    <Typography variant="body1"sx={{fontSize:"30px"}} mt={2}>
                                       <b>Date:</b>  {booking.date}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1" sx={{fontSize:"30px"}}>
                                    <b>Theater:</b>  {booking.theater}
                                    </Typography>
                                    <Typography variant="body1" sx={{fontSize:"30px"}} mt={2} >
                                    <b>Movie:</b>  {booking.movie}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1"  sx={{fontSize:"30px"}}>
                                    <b>ShowTime:</b>  {booking.time}
                                    </Typography>
                                    <Typography variant="body1" sx={{fontSize:"30px"}} mt={2}>
                                    <b>Seats:</b>   {booking.seatNumber}
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

export default ShowBookings;
