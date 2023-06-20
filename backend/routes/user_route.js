const express = require("express");
const {getUsers, userRegister, updateUser, userLogin, getBookingsofUser,userGooleLogin,getUser,getTheatre,TheatreDetail,userReservation,reservedSeats,showBooking,userBooking} = require(
    "../controllers/user_Controller"
);
const{verifyToken} =require("../Middlewares/UserMiddleware")
const { uploadOptions } = require("../multer/multer");

const userRouter = express.Router();

/**GET ROUTES */

userRouter.get("/", getUsers);
userRouter.get("/booking/:id", getBookingsofUser);
userRouter.get('/:id',getUser);
userRouter.get('/movie/:id', getTheatre);
userRouter.get('/theatres/:id', TheatreDetail);
userRouter.get('/reservedseats/:id',reservedSeats)
userRouter.get('/reservations/:id',verifyToken,showBooking)
/**POST ROUTES */

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.post('/google_login', userGooleLogin)
userRouter.post('/reservation', verifyToken, userReservation);
userRouter.post('/userbooking/:id',userBooking);
userRouter.post('/:id',uploadOptions.single("image") ,updateUser);

module.exports = userRouter;
