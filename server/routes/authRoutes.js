import express from 'express';
import validateRegister from '../middleware/validators/validateRegister.js';
import validateLogin from "../middleware/validators/validateLogin.js"

//import userAuth from '../middleware/userAuth.js';
import { loginHandler, logoutHandler, registerHandler } from '../controllers/authController.js';




const authRoutes = express.Router();

authRoutes.post("/register", validateRegister, registerHandler);
authRoutes.post("/login", validateLogin, loginHandler);
authRoutes.get("/logout", logoutHandler);

/*

authRoutes.post('/auth', login);
authRoutes.post('/register', register);
authRoutes.post('/logout', logOut);
authRoutes.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRoutes.post('/verify-account', userAuth, verifyEmail);
authRoutes.get('/is-auth', isAuthenticated); 
authRoutes.post('/send-reset-otp', sendResetOtp);
authRoutes.post('/reset-password', resetPassword);
*/





export default authRoutes;

