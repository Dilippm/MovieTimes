const Admin = require("../models/Admin");
const Movie =require("../models/Movies")
const User =require("../models/User")
const jwt =require("jsonwebtoken");
const config = require('../config');
const Owner = require("../models/Owner");
const Banner =require("../models/Banner")
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
        .json({ message: "Login successful", token,id:admin.id,name:admin.name,image:admin.image });
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
        let admin = await Admin.findById({_id:id})
       
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
      const adminId = req.params.id;
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
  
      const admin = await Admin.findById(adminId)
        .populate({
          path: "users",
          select: "name email phone status",
          options: {
            skip: (page - 1) * limit, 
            limit: limit, 
          },
        })
        .exec();
  
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      const users = admin.users;
      const totalCount = await User.find().count()
 
  
      res.json({ message: "Users found", users, totalUsers: totalCount, totalPages: Math.ceil(totalCount / limit) });
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: "Failed to fetch users" });
    }
  };
  
  

/**Block or unblock user */
  const updateuserStatus = async (req, res, next) => {
    
    
    const adminId = req.adminId;
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
  
      user.status = !user.status;
  
      await user.save();
  
      return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Request failed' });
    }

  };
  /**Get Movies */
  const getMovies = async (req, res, next) => {
    try {
      const adminId = req.params.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const admin = await Admin.findById(adminId).populate({
        path: 'movies',
        select: 'title language description status postedUrl',
        options: {
          skip: (page - 1) * limit,
          limit: limit,
        },
      });
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const movies = admin.movies;
      const totalCount = await Movie.find().count();
      const totalPages = Math.ceil(totalCount / limit);
  
      res.json({ message: 'Movies found', movies, totalPages });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch movies', error });
    }
  };
  
  
  /**Add A Movie */
 const addMovie = async (req, res, next) => {
  const { title, language, description } = JSON.parse(req.body.admindata);
  const adminId = req.adminId;

  try {
    let admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
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

    admin.movies.push(savedMovie._id);
    await admin.save();

    const owners = await Owner.find({});
    if (!owners || owners.length === 0) {
      return res.status(404).json({ message: 'No owners found' });
    }
    for (let i = 0; i < owners.length; i++) {
      owners[i].movies.push(savedMovie._id);
      await owners[i].save();
    }

    res.status(200).json({ message: 'Movie added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add movie' });
  }
};
  
  /**update movie status */
  const updatemovieStatus = async (req, res, next) => {
    const adminId = req.adminId;
    const movieId = req.params.id;
  
    try {
      const adminmovie = await Admin.findOne({ _id: adminId }).populate('movies');
  
      if (!adminmovie) {
        return res.status(404).json({ message: 'Invalid admin ID' });
      }
  
      const movie = adminmovie.movies.find((movie) => movie._id.toString() === movieId);
  
      if (!movie) {
        return res.status(404).json({ message: 'Invalid movie ID' });
      }
  
      if (movie.status == true) {
        movie.status = false;
      } else if (movie.status == false) {
        movie.status = true;
      }
  
      await movie.save();
  
      return res.status(200).json({ message: 'Movie updated successfully', movie });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Request failed' });
    }
  };
  
   /**get All owners */
   const getOwners =async(req,res,next)=>{
   
    try {
     let adminId =req.params.id
      const admin = await Admin.findById(adminId).populate({
        path: "owners",
        select: "name phone email Isapproved " 
      });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
     
      
      const owners = admin.owners;
     

      res.json({ message: "owners found", owners });;
      
    } catch (error) {
      console.log(error);
      return res.status(400).json({message:error.message});
    }

   }
  /**Change owner status */
  const changeOwnerStatus = async (req, res, next) => {
    const adminId = req.adminId;
    const ownerId = req.params.id;
  
    try {
      const adminUser = await Admin.findOne({ _id: adminId }).populate('owners');
  
      if (!adminUser) {
        return res.status(404).json({ message: 'Invalid admin ID' });
      }
  
      const owner = adminUser.owners.find((user) => user._id.toString() === ownerId);
  
      if (!owner) {
        return res.status(404).json({ message: 'Invalid owner ID' });
      }
  
      if (owner.Isapproved) {
        owner.Isapproved = false;
      } else if (owner.Isapproved == false) {
        owner.Isapproved = true;
      }
  
      await owner.save();
  
      return res.status(200).json({ message: 'Owner updated successfully', owner });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Request failed' });
    }
  };
  
  /**Add Banner */
  const addBanner = async (req, res, next) => {
    try {
      const { title, description, image } = req.body;
 
      const newBanner = new Banner({
        title,
        description,
        postedUrl:image,
      });
  
      const savedBanner = await newBanner.save();
  
    
  
      res.status(200).json({ message: 'Banner added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add banner' });
    }
  };
  /**GET ALL BAnners */
  const getBanners = async (req, res, next) => {
    const adminId = req.params.id;
  
    try {
   
      const admin = await Admin.findById(adminId);
      console.log("admin:",admin);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const banners = await Banner.find();
      console.log(banners);
      res.status(200).json(banners);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch banners' });
    }
  };
/**Delete Banner */
const deleteBanner = async (req, res, next) => {
  const { id } = req.params;
 
  try {
 
    const response = await Banner.deleteOne({ _id: id });

 
    if (response.deletedCount === 1) {
    
    
      res.status(200).json({ message: "Banner deleted successfully" });
    } else {
      console.log("Banner not found");
      res.status(404).json({ message: "Banner not found" });
    }
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
/**GET ALL BOOKINgs for revenue report*/
const getAllBookings = async (req, res, next) => {
  try {
    const adminId = req.adminId;

    const admin = await Admin.findById(adminId).populate("bookings");
    const bookings = admin.bookings;

  

   
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
};


module.exports = {
   adminLogin,
   updateAdmin,
   getAdmin,
   getUsers,
   updateuserStatus,
   getMovies,
   addMovie,
   updatemovieStatus,
   getOwners,
   changeOwnerStatus,
   addBanner,
   getBanners,
   deleteBanner,
   getAllBookings

 
};