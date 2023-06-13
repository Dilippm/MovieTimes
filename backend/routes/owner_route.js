const express = require("express");
const { uploadOptions } = require("../multer/multer");
const { ownerRegister,
   
    ownerLogin,
getOwner,
updateOwner,getTheatres } = require("../controllers/owner_Controller");
const ownerRoute = express.Router();

/*POST Routes*/
ownerRoute.post('/register', ownerRegister)
ownerRoute.post('/login', ownerLogin)
/*PUT Routes*/
ownerRoute.post('/:id',uploadOptions.single("image") ,updateOwner)
/*GET Routes*/
ownerRoute.get('/:id',getOwner)
ownerRoute.get('/theatre'.getTheatres)


module.exports = ownerRoute;