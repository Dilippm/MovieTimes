import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import BaseURL from '../../config';
import RatingComponent from './Rating';

const GetRatings = ({ theaterId }) => {
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`${BaseURL}user/ratings/${theaterId}`);
      
  
        const allRatings = response.data.theatre.reduce((all, theater) => {
          if (theater.ratings) {
            return all.concat(theater.ratings);
          }
          return all;
        }, []);
  
        setRatings(allRatings);
      } catch (error) {
        console.error('Failed to fetch ratings:', error);
      }
    };
  
    fetchRatings();
  }, [theaterId]);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
       <b> View Comments</b>
      </Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '100vw' } }} >
        <DialogTitle>All Ratings</DialogTitle>
        <DialogContent>
          {ratings.length > 0 ? (
            ratings.map((rating) => (
              <Box key={rating._id} marginBottom={2} border={"2px solid black" }>
                {rating.image && <img src={rating.image} alt="comment" />}
                <Typography variant="body1">Comment: {rating.comment}</Typography>
                <RatingComponent value={rating.rating} />
             
              </Box>
            ))
          ) : (
            <Typography variant="body1">No ratings available.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GetRatings;
