const express = require("express");
const { uploadOptions } = require("../multer/multer");
const {adminLogin,getAdmin,updateAdmin,getUsers,updateuserStatus,getMovies,addMovie,updatemovieStatus} = require("../controllers/admin_Controller")
const adminRoute = express.Router();

/*POST Routes*/
adminRoute.post('/login', adminLogin);
adminRoute.post('/:id',uploadOptions.single("image") ,updateAdmin)
adminRoute.post("/users/:id",updateuserStatus)
adminRoute.post("/movie/:id",uploadOptions.single("image"),addMovie)
adminRoute.post("/moviestatus/:id",updatemovieStatus)
/**GET Routes */
adminRoute.get('/:id',getAdmin)
adminRoute.get("/users/:id",getUsers)
adminRoute.get("/movies/:id",getMovies)

module.exports = adminRoute;