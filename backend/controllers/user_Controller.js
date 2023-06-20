const User = require("../models/User");
const Admin =require("../models/Admin")
const Theatre =require("../models/Theatre");
const Reservation =require('../models/Reservation')
const Movie=  require("../models/Movies");
const Booking = require("../models/Bookings")
const Owner =require("../models/Owner")
const bcrypt = require("bcryptjs");
const config = require('../config');
const jwtSecret = config.JWT_SECRET;
const jwt = require('jsonwebtoken');
const BASE_URL =config.BASE_URL;
/* all user details*/
const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return next(error);
    }
    if (!users) {
        return res
            .status(500)
            .json({error: "Unexpected error occurred"});
    }
    return res
        .status(200)
        .json({users});
};
/*User signup*/
const userRegister = async (req, res, next) => {
    const {name, email, password, phone} = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "" && !phone && phone.trim() === "") {
        return res
            .status(422)
            .json({error:"invalid inputs"});
    }
    const newPassword = bcrypt.hashSync(password);
    let user;
    try {
        const existingUser = await User.findOne({ email }); // Check if user with the same email already exists
        if (existingUser) {
            return res.status(409).json({ error: "Owner already exists" });
          }
        user = new User({name, email, password: newPassword, phone});
        user = await user.save();

        
        let admin = await Admin.findOne();
        admin.users.push(user);
        admin = await admin.populate("users");
        await admin.save();

    } catch (error) {
        return console.log(error);
    }
    if (!user) {
        return res
            .status(500)
            .json({error:"unexpeted error occured"})
    }
    return res
        .status(200)
        .json({message: "Registered successfully", id:user._id});

}
/**user googlelogin */

const userGooleLogin = async (req, res) => {
    const { name, email, password, image } = req.body.user;
  

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const token = jwt.sign({id:existingUser._id},jwtSecret,{expiresIn:"1d"})
            return res
                .status(200)
                .json({message: "Login successfull",id: existingUser._id,token});
        }
        
  
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = new User({ name, email, password: hashedPassword, image });
      
      await user.save();
  
      let admin = await Admin.findOne();
      admin.users.push(user);
      admin = await admin.populate("users");
      await admin.save();
      const token = jwt.sign({id:user._id},jwtSecret,{expiresIn:"1d"})
    return res
        .status(200)
        .json({message: "Login successfull",id: user._id,token});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Unexpected error occurred" });
    }
  };
/*user Login*/
const userLogin = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "") {
        return res.status(422).json({error:"Invalid inputs"});
      }
      
    let user;
    try {
        user = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if (!user) {
        return res
            .status(404)
            .json({error: "user doesn't exist!!"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res
            .status(400)
            .json({error: "email or password wrong"})
    }
    if(!user.status){
        return res
        .status(400)
        .json({error: "Sorry! blocked by Admin..."})
    }
   
    
    const token = jwt.sign({id:user._id},jwtSecret,{expiresIn:"1d"})
    return res
        .status(200)
        .json({message: "Login successfull",user,token});
}
/** user update */
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = JSON.parse(req.body.userdata);

  try {
    // Find the user by id
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user properties
    user.name = name;
    user.email = email;
    user.phone = phone;

    // Check if a file was uploaded
    if (req.file) {
      // Generate a URL for the uploaded image
      const imageUrl = `${BASE_URL}/${req.file.filename}`;
      // Store the image URL in the user's profile
      user.image = imageUrl;
    }

    // Save the updated user
    user = await user.save();

    return res.status(200).json({ message: "Updated successfully", user });
  } catch (error) {
   
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/**get user booking using userid */
const getBookingsofUser =async(req,res,next)=>{
    const id= req.params.id;
    let bookings;
    try {
        bookings=  await Booking.find({user:id})
    } catch (error) {
        return console.log(error);
    }
    if(!bookings){
        return res.status(500).json({message:"unable to find bookings "});

    }
    return res.status(200).json({bookings})
}


const getUser= async(req,res,next)=>{
    const {id} = req.params;
    try {
        let user = await User.findById(id);
       
        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"});
        }
       
        return res
        .status(200)
        .json({message: "user found successfully", user});

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({message: "Something went wrong"});
        
    }
}
/**Get the theaters movie palying */
const getTheatre = async (req, res) => {
    try {
      const { id } = req.params;
      
      const movie = await Movie.findOne({ _id: id });
      
      const theatre = await Theatre.find({ movies: movie.title });
      
      if (!theatre || theatre.length === 0) {
        return res.status(400).json({ message: 'No theatres found' });
      }
      
      const theatreData = theatre.map(({ _id, name }) => ({ id: _id, name }));
      
      res.status(200).json({ message: 'Theatres found', theatreData });
    } catch (error) {
      console.error('Failed to fetch theatres:', error);
      res.status(500).json({ error: 'Failed to fetch theatres' });
    }
  };
  
  const TheatreDetail = async (req, res, next) => {
    try {
      const {id} = req.params;
    
      const theatre = await Theatre.findOne({ _id: id });
      if (!theatre) {
        return res.status(404).json({ message: 'Theatre not found' });
      }
    
      res.json(theatre);
    } catch (error) {
      console.error('Failed to fetch theatre details:', error);
      next(error);
    }
  };
  /**user reservation */
  const userReservation =async(req,res,next)=>{
    
    try {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const { theatreName, movieName, Time, Date, seatsSelected, price } = req.body;
      const existingReservation = await Reservation.findOne({
        theatreName,
        movieName,
        Time,
        Date,
        SeatsSelected: { $in: seatsSelected },
      });
  
      if (existingReservation) {
        return res.status(400).json({ error: 'Sorry Seats are already reserved' });
      }
  
      const reservationData = new Reservation({
        theatreName,
        movieName,
        Time,
        Date,
        SeatsSelected: seatsSelected,
        price,
      });
  
      await reservationData.save();
  
      user.reservation.push(reservationData);
      await user.save();
  
      res.json({ message: 'Reservation stored successfully.', reservationData });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }

  }
  /**block the seats */
  const reservedSeats = async (req, res, next) => {
    try {
      const { movie, theatre, date, time } = req.query;
      
  
      const seats = await Reservation.find({
        movieName: movie,
        theatreName: theatre,
        Date: date,
        Time: time,
      }).select("SeatsSelected");
  
      const reservedSeats = seats.map((reservation) => reservation.SeatsSelected);
   
  
      res.json({ reservedSeats });
    } catch (error) {
      console.log("Error fetching reserved seats:", error);
      res.status(500).json({ error: "Failed to fetch reserved seats" });
    }
  };
  /**booking page */
  const showBooking = async(req,res,next)=>{
    
    try {
      const id = req.params.id;
      const userId = req.userId;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const reservation = user.reservation.id(id);
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      res.status(200).json({ reservation });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  };

  
  /**saving the booing data to user admin and owner */
  const userBooking = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const {
        theatreName,
        movieName,
        Date,
        Time,
        SeatsSelected,
        price,
        _id,
      } = req.body.bookingDetails;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const existingBooking = await Booking.findOne({
        theater: theatreName,
        movie: movieName,
        date: Date,
        time: Time,
        seatNumber: SeatsSelected,
        user: user._id,
      });
  
      if (existingBooking) {
        return res.status(400).json({ message: 'Booking with same details already exists.' });
      }
  
      const payment = new Booking({
        theater: theatreName,
        movie: movieName,
        date: Date,
        time: Time,
        seatNumber: SeatsSelected,
        price,
        user: user._id,
      });
  
      const savedBooking = await payment.save();
  
      user.bookings.push(savedBooking._id);
      await user.save();
  
      const admin = await Admin.findOne();
      admin.bookings.push(savedBooking._id);
      await admin.save();
  
      const theatre = await Theatre.find({ name: theatreName }).populate('owner');
      const ownerId = theatre[0].owner._id;
  
      const owner = await Owner.findById(ownerId);
      owner.bookings.push(savedBooking._id);
      await owner.save();
  
      // Remove the reservation from the Reservation collection
      await Reservation.deleteOne({ _id });
  
      res.status(200).json({ message: 'Booking saved successfully.' });
    } catch (error) {
      console.error('Error saving booking details:', error);
      res.status(500).json({ error: 'Error saving booking details.' });
    }
  };
  
  
  
module.exports = {
    getUsers,
    userRegister,
    updateUser,
    userLogin,
    getBookingsofUser,
    userGooleLogin,
    getUser,
    getTheatre,
    TheatreDetail,
    userReservation,
    reservedSeats,
    showBooking,
    userBooking
    
};