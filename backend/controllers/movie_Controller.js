
const Movie = require("../models/Movies")
const Admin =require("../models/Admin")
const jwt = require("jsonwebtoken");
const config = require('../config');
const jwtSecret = config.JWT_SECRET;

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
  
   
     
       
        try {
          const movies = await Movie.find({ status: false });
        
          return res.status(200).json({ movies });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Request failed" });
        }
        
  };


  /** Get specific movie by ID */
const getMovieById = async (req, res, next) => {
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
  
      return res.status(200).json({ movie });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Request failed" });
    }
  };


  /**update movie by id */

  const updateMovieById = async (req, res, next) => {
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
    
    const { title, language, description, releaseDate, postedUrl } = req.body;
  
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
      movie.releaseDate = releaseDate;
      movie.postedUrl = postedUrl;
  
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