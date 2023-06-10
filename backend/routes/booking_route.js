const express = require("express");

const bookingRouter = express.Router();
const {
    newBookings, 
    getBookinById} = require( "../controllers/booking_Controller")

/**POST ROUTES */
bookingRouter.post("/addbooking", newBookings);
/**GET ROUTES */
bookingRouter.get("/bookings/:id", getBookinById);

module.exports = bookingRouter;
