const express = require("express");
const {getUsers, userRegister, updateUser, userLogin, getBookingsofUser,userGooleLogin,getUser,getTheatre,TheatreDetail,userReservation,reservedSeats,showBooking} = require(
    "../controllers/user_Controller"
);
const { uploadOptions } = require("../multer/multer");

const userRouter = express.Router();

/**GET ROUTES */

userRouter.get("/", getUsers);
userRouter.get("/booking/:id", getBookingsofUser);
userRouter.get('/:id',getUser);
userRouter.get('/movie/:id', getTheatre);
userRouter.get('/theatres/:id', TheatreDetail);
userRouter.get('/reservedseats/:id',reservedSeats)
userRouter.get('/reservations/:id',showBooking)
/**POST ROUTES */

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.post('/google_login', userGooleLogin)
userRouter.post('/reservation',userReservation);


/**PUT ROUTES */

userRouter.post('/:id',uploadOptions.single("image") ,updateUser)

module.exports = userRouter;
