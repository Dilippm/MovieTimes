const User = require("../models/User");
const Admin =require("../models/Admin")
const Theatre =require("../models/Theatre");
const Movie=  require("../models/Movies");
const Booking = require("../models/Bookings")
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
const getTheatre = async (req, res) => {
    try {
       
      const {id} = req.params; 
     
      const movie = await Movie.findOne({_id:id});
      
      const theatre = await Theatre.find({movies:movie.title});
    
      if(!theatre){
        res.status(400).json({message:'no theatre found'})
      }
      const theatreNames = theatre.map(theatre => theatre.name);
      
   
    res.status(200).json({message:"found",theatreNames});
    } catch (error) {
      console.error('Failed to fetch theaters:', error);
      res.status(500).json({ error: 'Failed to fetch theaters' });
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
    getTheatre
};