
const Movie = require("../models/Movies")
const Admin =require("../models/Admin")
const Owner = require("../models/Owner")
const jwt = require("jsonwebtoken");
const config = require('../config');
const jwtSecret = config.JWT_SECRET;


const BASE_URL =config.BASE_URL;
/** Add New movie */
const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken || extractedToken.trim() === "") {
      return res.status(404).json({ message: "Token not found" });
    }
  
    let adminId;
    try {
      const decodedToken = jwt.verify(extractedToken, jwtSecret);
      adminId = decodedToken.id;
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  
    const { title, description, releaseDate, language, postedUrl } = req.body;
    if (!title || title.trim() === "" || !description || description.trim() === "" || !language || language.trim() === "" || !postedUrl || postedUrl.trim() === "") {
      return res.status(422).json({ message: "Invalid input" });
    }
  
    try {
      const movie = new Movie({
        title,
        description,
        releaseDate: new Date(releaseDate),
        language,
       
        postedUrl,
      });
  
      await movie.save();
  
      const adminUser = await Admin.findById(adminId).populate("movies");
      adminUser.movies.push(movie);
      await adminUser.save();
  
      return res.status(200).json({ message: "Movie added successfully", movie, adminUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Request failed" });
    }
  };
/** Get All Movies added */
const getMovies = async (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const moviesPerPage = parseInt(req.query.limit) || 3;

  try {
    const totalMovies = await Movie.countDocuments({ status: false });
    const totalPages = Math.ceil(totalMovies / moviesPerPage);

    const movies = await Movie.find({ status: false })
      .skip((currentPage - 1) * moviesPerPage)
      .limit(moviesPerPage);

    return res.status(200).json({ movies, totalPages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Request failed" });
  }
};



  /** Get specific movie by ID */
  const getMovieById = async (req, res, next) => {
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
      const admin = await Admin.findById(adminId).populate({
        path: 'movies',
        match: { _id: movieId }, // Only include the specific movie ID in the result
        select: 'title language description status postedUrl', // Specify the fields you want to retrieve
      });
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const movie = admin.movies[0]; // Retrieve the first movie (if found) from the populated result
  
      if (!movie) {
        return res.status(404).json({ message: 'Invalid movie ID' });
      }
 
      res.json({ message: 'Movie found', movie });
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: 'Failed to fetch the movie' });
    }
  };
  

  /**update movie by id */
  const updateMovieById = async (req, res, next) => {
   
    const { title, language, description } = JSON.parse(req.body.admindata)
   
    const extractedToken = req.headers.authorization.split(" ")[1];
    
    if (!extractedToken || extractedToken.trim() === "") {
      return res.status(404).json({ message: "Token not found" });
    }
  
    let adminId;
    try {
      const decodedToken = jwt.verify(extractedToken, jwtSecret);
      adminId = decodedToken.id;
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  
    // Update movie
    const movieId = req.params.id;
  
    try {
      const adminUser = await Admin.findOne({ movies: movieId }).populate("movies");
  
      if (!adminUser) {
        return res.status(404).json({ message: "Invalid movie ID" });
      }
  
      const movie = adminUser.movies.find((movie) => movie._id.toString() === movieId);
  
      if (!movie) {
        return res.status(404).json({ message: "Invalid movie ID" });
      }
  
      movie.title = title;
      movie.language = language;
      movie.description = description;
 
  console.log(req.file);
      if (req.file) {
        // Generate a URL for the uploaded image
        const imageUrl = `${BASE_URL}/${req.file.filename}`;
        // Store the image URL in the movie data
        movie.postedUrl = imageUrl;
      }
  
      await movie.save();
  
      return res.status(200).json({ message: "Movie updated successfully", movie });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Request failed" });
    }
  };
  
  

module.exports = {
    addMovie,
    getMovies,
    getMovieById,
    updateMovieById
  

}