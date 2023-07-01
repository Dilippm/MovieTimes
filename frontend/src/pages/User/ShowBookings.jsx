import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, CardContent, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from '../../components/Header';
import { getBookingsForUser, cancelBooking } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';
const ShowBookings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bookings, setBookings] = useState([]);
    const [cancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const tokenExpirationMiddleware = (error) => {
        if (error.response && error.response.status === 401) {
            dispatch(userActions.logout());
          toast.error("Token expired. Redirecting to login page...");
          navigate("/login");
        } else {
          throw error;
        }
      };
    const fetchBookings = async () => {
        try {
            const response = await getBookingsForUser();
            const sortedBookings = response.bookings.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setBookings(sortedBookings);
        } catch (error) {
            tokenExpirationMiddleware(error);
            console.log(error);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        setSelectedBookingId(bookingId);
        setCancelConfirmationOpen(true);
    };

    const confirmCancelBooking = async () => {
        try {
            await cancelBooking(selectedBookingId);
            const updatedBookings = bookings.filter((booking) => booking._id !== selectedBookingId);
            setBookings(updatedBookings);
        } catch (error) {
            console.log(error);
        }
        setCancelConfirmationOpen(false);
    };

    const closeCancelConfirmation = () => {
        setCancelConfirmationOpen(false);
    };

    const isBookingCancelable = (bookingDate) => {
        const currentDate = new Date();
        const formattedBookingDate = new Date(bookingDate);
        return currentDate < formattedBookingDate;
    };

    return (
        <>
            <Header />
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
                                    {isBookingCancelable(booking.date) && (
                                        <Button variant="contained" sx={{ marginLeft: "70px", marginTop: "50px", backgroundColor: "black" }} onClick={() => handleCancelBooking(booking._id)}>
                                            <b>Cancel</b>
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
            </Container>

            {/* Cancel Confirmation Dialog */}
            <Dialog open={cancelConfirmationOpen} onClose={closeCancelConfirmation}>
                <DialogTitle>Cancel Booking</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to cancel this booking?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeCancelConfirmation} sx={{ backgroundColor: "blue", color: "whitesmoke" }}>No</Button>
                    <Button onClick={confirmCancelBooking} autoFocus sx={{ backgroundColor: "red", color: "whitesmoke" }}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ShowBookings;
