const Admin = require("../models/Admin");
const Movie =require("../models/Movies")
const jwt =require("jsonwebtoken");
const config = require('../config');
const jwtSecret = config.JWT_SECRET;
const BASE_URL =config.BASE_URL;
/* admin Login */
const adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
        return res.status(422).json({ error: "Invalid inputs" });
    }

    let admin;
    try {
        admin = await Admin.findOne({ email });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "Internal server error" });
    }

    if (!admin) {
        return res
            .status(404)
            .json({ error: "Admin doesn't exist" });
    }

    const isPasswordCorrect = password === admin.password;
    if (!isPasswordCorrect) {
        return res
            .status(400)
            .json({ error: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: admin._id }, jwtSecret, { expiresIn: "1d" });
    return res
        .status(200)
        .json({ message: "Login successful", token,id:admin.id });
};

/** admin update */
const updateAdmin = async (req, res, next) => {
    const { id } = req.params;
  
    const { name, email, phone } = JSON.parse(req.body.admindata);
  
    try {
      // Find the user by id
      let admin = await Admin.findById(id);
  
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Update the user properties
      admin.name = name;
      admin.email = email;
      admin.phone = phone;
  
      // Check if a file was uploaded
      if (req.file) {
        // Generate a URL for the uploaded image
        const imageUrl = `${BASE_URL}/${req.file.filename}`;
        // Store the image URL in the user's profile
        admin.image = imageUrl;
      }
  
      // Save the updated user
      admin = await admin.save();
  
      return res.status(200).json({ message: "Updated successfully", admin });
    } catch (error) {
      
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  /**Admin Get */
  const getAdmin= async(req,res,next)=>{
    const {id} = req.params;
    try {
        let admin = await Admin.findById(id);
       
        if (!admin) {
            return res
                .status(404)
                .json({message: "Admin not found"});
        }
        
        return res
        .status(200)
        .json({message: "user found successfully", admin});

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({message: "Something went wrong"});
        
    }
}

  /** GET users */
  const getUsers = async (req, res, next) => {
    try {
      // Fetch all admins and populate the 'user' field
      let adminId = req.params.id;

   
      const admin = await Admin.findById(adminId).populate({
        path: "users",
        select: "name email phone status" // Specify the fields you want to retrieve
      });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      
      const users = admin.users;

      res.json({ message: "Users found", users });;
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: "Failed to fetch users" });
    }
  };
  


  const updateuserStatus = async (req, res, next) => {
    
    const token = req.headers.authorization;

    if (!token) {
      return res.status(404).json({ message: 'Token not found' });
    }
   
    let adminId;
  
    try {
  
      const decodedToken = jwt.verify(token.split(' ')[1], jwtSecret);

      adminId = decodedToken.id;
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
   
    const userId = req.params.id;
  
    try {
      const adminUser = await Admin.findOne({ _id: adminId }).populate('users');
      
      if (!adminUser) {
        return res.status(404).json({ message: 'Invalid admin ID' });
      }
  
      const user = adminUser.users.find((user) => user._id.toString() === userId);
    
      if (!user) {
        return res.status(404).json({ message: 'Invalid user ID' });
      }
  
      
      if (user.status) {
        user.status = false; 
      } else if(user.status==false) {
        user.status = true; 
      }
      
      await user.save();
      
  
      return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Request failed' });
    }
  };
  const getMovies = async(req,res,next)=>{
    try {
      // Fetch all admins and populate the 'user' field
      let adminId = req.params.id;

   
      const admin = await Admin.findById(adminId).populate({
        path: "movies",
        select: "title language description status postedUrl" // Specify the fields you want to retrieve
      });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      
      const movies = admin.movies;

      res.json({ message: "Users found", movies });;
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: "Failed to fetch movies" });
    }

  }
  
  const addMovie = async (req, res, next) => {
   
    const { title, language, description } = JSON.parse(req.body.admindata);
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }
    
    let adminId;
    try {
      const decodedToken = jwt.verify(token.split(" ")[1], jwtSecret);
      
      adminId = decodedToken.id;
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
    
  
    
    try {
      let admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      
      const newMovieData = {
        title,
        language,
        description,
      };
      
      if (req.file) {
        // Generate a URL for the uploaded image
        const imageUrl = `${BASE_URL}/${req.file.filename}`;
        // Store the image URL in the movie data
        newMovieData.postedUrl = imageUrl;
      }
      
      const newMovie = new Movie(newMovieData);
      const savedMovie = await newMovie.save();
      
      admin.movies.push(savedMovie);
      await admin.save();
      
      res.status(200).json({ message: "Movie added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add movie" });
    }
  };
  /**update movie status */
   const updatemovieStatus= async(req,res,next)=>{
    const token = req.headers.authorization;
   
        if (!token) {
          return res.status(404).json({ message: 'Token not found' });
        }
       
        let adminId;
      
        try {
      
          const decodedToken = jwt.verify(token.split(' ')[1], jwtSecret);
    
          adminId = decodedToken.id;
        } catch (error) {
          console.log(error);
          return res.status(400).json({ message: error.message });
        }
    
        const movieId = req.params.id;
        try {
          const adminmovie = await Admin.findOne({ _id: adminId }).populate('movies');
     
          if (!adminmovie) {
            return res.status(404).json({ message: 'Invalid admin ID' });
          }
      
          const movie = adminmovie.movies.find((movie) => movie._id.toString() === movieId);
          
          if (!movie) {
            return res.status(404).json({ message: 'Invalid user ID' });
          }
      
          
          if (movie.status) {
            movie.status = false; 
          } else if(movie.status==false) {
            movie.status = true; 
          }
          
          await movie.save();
          
      
          return res.status(200).json({ message: 'movie updated successfully', movie });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Request failed' });
        }

      
   }


module.exports = {
   adminLogin,
   updateAdmin,
   getAdmin,
   getUsers,
   updateuserStatus,
   getMovies,
   addMovie,
   updatemovieStatus
 
};