import express from "express";
import {
    loginUser,
    logoutUser,
    registerUser, updateUserProfile,
    userProfile,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/account', userProfile);
userRouter.put('/account', updateUserProfile);

export default userRouter;