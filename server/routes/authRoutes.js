import express from 'express';
import { isAuthenticated, login, logOut, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail, } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';



const authRoutes = express.Router();

authRoutes.post('/auth', login);
authRoutes.post('/register', register);
authRoutes.post('/logout', logOut);
authRoutes.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRoutes.post('/verify-account', userAuth, verifyEmail);
authRoutes.get('/is-auth', isAuthenticated); 
authRoutes.post('/send-reset-otp', sendResetOtp);
authRoutes.post('/reset-password', resetPassword);




export default authRoutes;

