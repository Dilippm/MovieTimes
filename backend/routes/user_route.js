const express = require("express");
const {getUsers, userRegister, updateUser, userLogin, getBookingsofUser,userGooleLogin,getUser} = require(
    "../controllers/user_Controller"
);
const { uploadOptions } = require("../multer/multer");

const userRouter = express.Router();

/**GET ROUTES */

userRouter.get("/", getUsers);
userRouter.get("/booking/:id", getBookingsofUser);
userRouter.get('/:id',getUser)
/**POST ROUTES */

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.post('/google_login', userGooleLogin)


/**PUT ROUTES */

userRouter.post('/:id',uploadOptions.single("image") ,updateUser)

module.exports = userRouter;
