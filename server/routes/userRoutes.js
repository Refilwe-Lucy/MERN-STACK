import express from 'express';
import userAuth from '../middleware/userAuth.js';
//import { getUserData } from '../controllers/userController.js';
import { getUserProfile } from '../controllers/userController.js';
import { getIntern } from '../controllers/userController.js';

const userRouter = express.Router();

//userRouter.get('/data', userAuth, getUserData);
userRouter.get('/profile/:id', userAuth, getUserProfile);
userRouter.get('/internList', userAuth, getIntern);

export default userRouter;