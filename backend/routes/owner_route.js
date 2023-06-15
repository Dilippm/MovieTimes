const express = require("express");
const { uploadOptions } = require("../multer/multer");
const { ownerRegister,
   
    ownerLogin,
getOwner,
updateOwner,getTheatres, addTheatre,getMovies } = require("../controllers/owner_Controller");
const ownerRoute = express.Router();

/*POST Routes*/
ownerRoute.post('/register', ownerRegister)
ownerRoute.post('/login', ownerLogin)
ownerRoute.post('/add_theatre',addTheatre)
/*PUT Routes*/
ownerRoute.post('/:id',uploadOptions.single("image") ,updateOwner)
/*GET Routes*/
ownerRoute.get('/:id',getOwner)
ownerRoute.get('/movies/:id',getMovies)
ownerRoute.get('/theatre/:id',getTheatres)


module.exports = ownerRoute;