const Bookings = require("../models/Bookings");
const Movie = require("../models/Movies")
const User =require("../models/User")

/**Book a movie */
const newBookings = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;
  
    let existingMovie;
    let existingUser;
    try {
      existingMovie = await Movie.findById(movie);
      existingUser = await User.findById(user);
    } catch (error) {
      return console.log(error);
    }
  
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
  
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
  
    let newBooking;
    try {
      newBooking = new Bookings({
        movie,
        date: new Date(`${date}`),
        seatNumber,
        user,
      });
  
      await newBooking.save();
  
      const userbooking = await User.findById(user).populate("bookings");
      userbooking.bookings.push(newBooking);
      await userbooking.save();
  
      const moviebooking = await Movie.findById(movie).populate("bookings");
      moviebooking.bookings.push(newBooking);
      await moviebooking.save();
    } catch (error) {
      return console.log(error);
    }
  
    if (!newBooking) {
      return res.status(500).json({ message: "Unable to make a booking" });
    }
  
    return res.status(200).json({ booking: newBooking });
  };

  /**get a booking by booking id */
  const getBookinById =async(req,res,next)=>{
    const id= req.params.id;
    let booking;
    try {
        booking= await Bookings.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!booking){
        return res.status(500).json({message:"unexpected error"})
    }
    return  res.status(200).json({booking})
  }
  
module.exports ={
    newBookings,
    getBookinById
}