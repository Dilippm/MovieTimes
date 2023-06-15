const express = require("express");
const { uploadOptions } = require("../multer/multer");
const { addMovie,
    getMovies,
    getMovieById,
    updateMovieById,
    getUserMovie
   } =require("../controllers/movie_Controller");

const movieRoute = express.Router();

/*POST* */
movieRoute.post('/addmovie',addMovie)

/** GET Routes */
movieRoute.get('/movies',getMovies)
movieRoute.get('/editmovie/:id',getMovieById)
movieRoute.get('/usermovie/:id',getUserMovie)

/** PUT Routes */
movieRoute.post('/editedmovies/:id',uploadOptions.single("image"), updateMovieById);


module.exports =movieRoute;