const express = require("express");
const { addMovie,
    getMovies,
    getMovieById,
    updateMovieById
   } =require("../controllers/movie_Controller");

const movieRoute = express.Router();

/*POST* */
movieRoute.post('/addmovie',addMovie)

/** GET Routes */
movieRoute.get('/movies',getMovies)
movieRoute.get('/editmovie/:id',getMovieById)

/** PUT Routes */
movieRoute.put('/editedmovies/:id', updateMovieById);


module.exports =movieRoute;