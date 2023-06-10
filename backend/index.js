const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

const app = express();


const userRouter  = require("./routes/user_route");
const ownerRouter =require("./routes/owner_route")
const adminRouter =require("./routes/admin_route");
const movieRouter= require("./routes/movie_route")
const bookingRouter =require("./routes/booking_route")

app.use(express.json());
// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/public/images',express.static('public/images'))
/*middlewares*/
app.use("/user", userRouter);
app.use("/owner", ownerRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);
app.use("/booking",bookingRouter);

// server connection
app.listen(5000, () => {
  console.log(`Connected to localhost port ${5000}`);
});

/** mongodb connect */
mongoose
  .connect("mongodb://127.0.0.1:27017/movietimes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });
