const express = require("express");
const {uploadOptions} = require("../multer/multer");
const {
    adminLogin,
    getAdmin,
    updateAdmin,
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
    getAllBookings,
    getdashboarddetails,
    getDashboardChart,
    getMovieChart,
    getTheaterList
   
} = require("../controllers/admin_Controller");
const verifyAdminToken = require("../Middlewares/AdminMIddleware")
const adminRoute = express.Router();

/*POST Routes*/
adminRoute.post('/login', adminLogin);
adminRoute.post('/:id', uploadOptions.single("image"), updateAdmin)
adminRoute.post("/users/:id", verifyAdminToken, updateuserStatus);
adminRoute.post(
    "/movie/:id",
    uploadOptions.single("image"),
    verifyAdminToken,
    addMovie
);
adminRoute.post("/moviestatus/:id", verifyAdminToken, updatemovieStatus)
adminRoute.post("/owners/:id", verifyAdminToken, changeOwnerStatus)
adminRoute.post('/banners/:id', verifyAdminToken, addBanner)
/**GET Routes */
adminRoute.get('/:id', getAdmin)
adminRoute.get("/users/:id", getUsers)
adminRoute.get("/movies/:id", getMovies)
adminRoute.get("/owners/:id", getOwners)
adminRoute.get('/allbanners/:id', getBanners)
adminRoute.get('/allbookings/:id', verifyAdminToken, getAllBookings)
adminRoute.get('/dashboardrevenue/:id', verifyAdminToken, getdashboarddetails)
adminRoute.get('/dashboardchart/:id', verifyAdminToken, getDashboardChart)
adminRoute.get('/movieschart/:id',verifyAdminToken,getMovieChart)
adminRoute.get('/theaterschart/:id',verifyAdminToken,getTheaterList)

/**Delete Route */
adminRoute.delete('/deltebanner/:id', deleteBanner)

module.exports = adminRoute;