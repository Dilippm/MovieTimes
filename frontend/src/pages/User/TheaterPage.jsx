import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, CardContent, Grid } from '@mui/material';
import Header from '../../components/Header';
import { getTheaters } from "../../api-helpers/api-helpers"
import RatingComponent from '../../components/Rating/Rating';
import AddRating from '../../components/Rating/AddRating';
import GetRatings from '../../components/Rating/GetRatings';
const TheaterPage = () => {
    const [theaters, setTheaters] = useState([]);

    useEffect(() => {
        const fetchtheaterDetails = async () => {
            try {
                const theaterDetails = await getTheaters();

                setTheaters(theaterDetails.theatre);
               
            } catch (error) {
                console.error('Failed to fetch theater details:', error);
            }
        };

        fetchtheaterDetails();
    }, []);



    return (
        <>
            <Header />
            <Container maxWidth="80%">
                <Typography variant="h3" component="h1" gutterBottom sx={{ margin: "30px", marginTop: "50px", marginLeft: "850px" }}>
                    <b> Theaters</b>
                </Typography>
                {theaters.map((theater) => (
                    <Card key={theater._id} sx={{ margin: 'auto', background: 'linear-gradient(45deg, black, red)', border: 0, borderRadius: 3, boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .9)', color: 'white', marginBottom: '20px', width: "80vw", height: "200px" }}>
                        <CardContent>
                            <Grid container spacing={4} direction="row">
                                <Grid item xs={3}>
                                    <Typography variant="h6" component="h2" sx={{ fontSize: "30px" }}>
                                        <b>Theater:</b>   {theater.name}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: "30px" }} mt={2}>
                                        <b>Movie:</b>  {theater.movies}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="body1" sx={{ fontSize: "30px", marginLeft: "60px" }}>
                                        <b>No. of Seats:</b>  {theater.seats}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: "30px", marginLeft: "60px" }} mt={2}>
                                        <b>Price:</b>  ₹{theater.price}/-
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                <Typography variant="body1" sx={{ fontSize: "30px", marginLeft: "60px" }}>
                                        <b>Ratings:</b> <RatingComponent value={theater.totalRating} />
                                    </Typography>
                                
                                </Grid>

                                <Grid item xs={3}>
                                <AddRating theaterId={theater._id} />
                                <GetRatings theaterId={theater._id}/>
                            </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
            </Container>
        </>
    );
}

export default TheaterPage
