const Owner = require("../models/Owner");
const Admin= require("../models/Admin")
const User =require("../models/User")
const Movie =require("../models/Movies")
const Theatre =require("../models/Theatre")
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const config = require('../config');
const jwtSecret = config.JWT_SECRET;
const mongoose = require('mongoose');


/*theater Owner Registration*/ 
const ownerRegister = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(422).json({ error: "Invalid inputs" });
  }
  const newPassword = bcrypt.hashSync(password);
  try {
    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      return res.status(409).json({ message: "Owner already exists" });
    }
    const owner = new Owner({ name, email, password: newPassword, phone });
  
    await owner.save();
    
 let admin = await Admin.findOne(); 
    admin.owners.push(owner); 
    admin = await admin.populate("owners");
    await admin.save();
    
    return res.status(200).json({ message: "Registered successfully", owner });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Unexpected error occurred" });
  }
};

  /*To get all user details*/
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
/*theater Owner Login*/ 
const ownerLogin = async (req,res,next)=>{
    const {email, password} = req.body;
    if (!email && email.trim() === "" || !password && password.trim() === "" ) {
        return res.status(422).json({ error: "Invalid inputs" });
    }
    let owner;
    try {
        owner = await Owner.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if (!owner) {
        return res
            .status(404)
            .json({error: "owner doesn't exist!!"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, owner.password);
    if (!isPasswordCorrect) {
        return res
            .status(400)
            .json({error: "email or password wrong"})
    }
    const token = jwt.sign({id:owner._id},jwtSecret,{expiresIn:"1d"})
    
    return res
        .status(200)
        .json({message: "Login successfull",token,id:owner._id,name:owner.name,image:owner.image});

}
const getOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid owner ID' });
    }

    let owner = await Owner.findById(id);

    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    return res.status(200).json({ message: 'Owner found successfully', owner });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
/** admin update */
const updateOwner = async (req, res, next) => {
    const { id } = req.params;
  
    const { name, email, phone } = JSON.parse(req.body.ownerdata);
  
    try {
      // Find the user by id
      let owner = await Owner.findById(id);
  
      if (!owner) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Update the user properties
      owner.name = name;
      owner.email = email;
      owner.phone = phone;
  
      // Check if a file was uploaded
      if (req.file) {
        // Generate a URL for the uploaded image
        const imageUrl = `http://localhost:5000/public/images/${req.file.filename}`;
        // Store the image URL in the user's profile
        owner.image = imageUrl;
      }
  
      // Save the updated user
      owner = await owner.save();
  
      return res.status(200).json({ message: "Updated successfully", owner });
    } catch (error) {
      
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  /**Get Movies */
  const getMovies=async(req,res,next)=>{
    const { id } = req.params;
    let owner = await Owner.findById(id);
    if(!owner){
      return res
            .status(500)
            .json({error: "Unexpected error occurred"});

    }
    let movies = await Movie.find();
    if(!movies){
      return res.status(500).json({error:"no movies found"})
    }
  
    return res.status(200).json({message:"movies found",movies})

  }
/**Get All theaters */
const getTheatres = async (req, res, next) => {

  const {id} =req.params
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(404).json({ message: 'Token not found' });
  }

  let ownerId;

  try {
    const decodedToken = jwt.verify(token.split(' ')[1], jwtSecret);
    ownerId = decodedToken.id;
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }

  try {
    const owner = await Owner.findById(id).populate('theatres');


    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

   
    const ownerName = owner.name;
    const theaters = owner.theatres;

    res.status(200).json({ ownerName, theaters });
  } catch (error) {
    console.error('Failed to get theaters:', error);
    res.status(500).json({ message: 'Failed to get theaters' });
  }
};


  /**Add Theatre  */
  const addTheatre = async (req, res, next) => {
    const { name, seats, price, timings, movieName } = req.body;
    const ownerId = req.ownerId;
  
    try {
      const ownerUser = await Owner.findOne({ _id: ownerId });
  
      if (!ownerUser) {
        return res.status(404).json({ message: 'Invalid owner ID' });
      }
  
      const newTheatreData = {
        name,
        seats,
        price,
        movies: movieName,
        showTimings: timings.map((startTime) => ({ startTime }))
      };
  
      const newTheatre = new Theatre(newTheatreData);
      newTheatre.owner = ownerUser._id;
      const savedTheatre = await newTheatre.save();
      ownerUser.theatres.push(savedTheatre._id);
      await ownerUser.save();
  
      res.status(200).json({ message: 'Theatre added successfully' });
    } catch (error) {
      console.error('Failed to add theatre:', error);
      res.status(500).json({ message: 'Failed to add theatre' });
    }
  };
  
 /***Get A Theatre */
 const getSpecificTheatre = async (req, res, next) => {
  const ownerId = req.ownerId;
  const theatreId = req.params.id;

  try {
    const ownertheatre = await Owner.findOne({ _id: ownerId }).populate('theatres');

    if (!ownertheatre) {
      return res.status(404).json({ message: 'Invalid owner ID' });
    }

    const theatre = ownertheatre.theatres.find((theatre) => theatre._id.toString() === theatreId);
    if (!theatre) {
      return res.status(404).json({ message: 'Invalid theatre ID' });
    }

    return res.status(200).json({ message: 'Theatre found successfully', theatre });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Request failed' });
  }
};

  /**Update the thatre */


const updateTheatre = async (req, res, next) => {
  const ownerId = req.ownerId;
  const theatreId = req.params.id;
  const updatedDetails = req.body;

  try {
    const ownertheatre = await Owner.findOne({ _id: ownerId }).populate('theatres');

    if (!ownertheatre) {
      return res.status(404).json({ message: 'Invalid owner ID' });
    }

    const theatre = ownertheatre.theatres.find((theatre) => theatre._id.toString() === theatreId);

    if (!theatre) {
      return res.status(404).json({ message: 'Invalid theatre ID' });
    }

    theatre.name = updatedDetails.name;
    theatre.seats = updatedDetails.seats;
    theatre.price = updatedDetails.price;
    theatre.movies = updatedDetails.movies;
    theatre.showTimings = updatedDetails.showTimings.map((timing) => ({
      _id: isValidObjectId(timing._id) ? new mongoose.Types.ObjectId(timing._id) : new mongoose.Types.ObjectId(),
      startTime: timing.startTime,
      owner: ownerId,
    }));

    
    await theatre.save();

    return res.status(200).json({ message: 'Theatre updated successfully', theatre });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Request failed' });
  }
};

const isValidObjectId = (id) => {
  if (mongoose.isValidObjectId(id)) {
    return true;
  }
  return false;
};

/**GET REvenue reoprt fot eh movies booked by owner */
const getAllBookings = async(req,res,next)=>{
  try {
    const ownerId = req.ownerId;

    const owner = await Owner.findById(ownerId).populate("bookings");
    const bookings = owner.bookings;

  

   
    const totalRevenueByDate = bookings.reduce((acc, booking) => {
      const key = `${booking.movie}-${booking.theater}-${booking.date}`;
      if (acc.hasOwnProperty(key)) {
        acc[key] += +booking.amount; 
      } else {
        acc[key] = +booking.amount; 
      }
      return acc;
    }, {});

    console.log("totalRevenueByDate", totalRevenueByDate);

    res.status(200).json(totalRevenueByDate);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
  
  
module.exports ={
    ownerRegister,
    getUsers,
    ownerLogin,
    getOwner,
    updateOwner,
    getTheatres,
    addTheatre,
    getMovies,
    getSpecificTheatre,
    updateTheatre,
    getAllBookings
    


}