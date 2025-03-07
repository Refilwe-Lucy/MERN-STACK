import express from 'express';
import { createAdmin, updateAdminProfile } from '../controllers/adminController.js';
import userAuth from '../middleware/userAuth.js';

//import { getAdminProfile } from '../controllers/userController.js'
//import { getAdminProfile } from '../controllers/adminGetController.js';


const  authRoutes = express.Router();

authRoutes.post('/create', createAdmin );
authRoutes.post('/adminProfile',userAuth, updateAdminProfile)
//authRoutes.get('/profile', getAdminProfile);

export default  authRoutes;


