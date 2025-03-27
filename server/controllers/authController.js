import asyncHandler from "express-async-handler";
import { STATUS_CODE } from "../constants/constants.js";
//import HttpError from "../utils/httpError.js";
//import bcrypt from 'bcryptjs';
//import  jwt  from 'jsonwebtoken';
import userModel from '../models/userModels.js';
//import transporter from '../config/nodeMailer.js';
import { register } from "../service/authService.js";

export const registerHandler = asyncHandler(async (req, res, next) => {
    
    const user = await register(req.body);
  
    await generateToken(user, res);
  
    //
    const data = new userModel(user).omitField(["jwt_secret", "password"]);
  
    res.status(STATUS_CODE.CREATED).json({
      status: "User succefully registered",
      data,
    });
  });

export const loginHandler = asyncHandler(async (req, res, next) => {
    const user = await login(req.body); 
  
    const { accessToken, refreshToken } = await generateToken(user, res);
  
    const data = new userModel(user).omitField(["jwt_secret", "password"]);
  
    res.status(200).json({
      status: "User successfully logged alright",
      accessToken,
      refreshToken,
      role: user.role,
    });
  });
  export const logoutHandler = asyncHandler(async (req, res, next) => {
    clearAuthCookies(res);
    res.status(OK).json({
      status: "Logout Handler",
    });
  });
  export const refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken; 
  
    if (!refreshToken) {
      return res.status(UNAUTHORIZED).json({
        message: "Refresh token missing",
      }); 
    }
  
   
    const user = await userModel.findOne({
      refreshToken,
    });
  
    if (!user) {
      return res.status(FORBIDDEN).json({
        message: "Invalid refresh token",
      }); 
    }
  
   
    const accessToken = generateAccessToken(user);
    const newRefreshToken = await generateRefreshToken(user);
  
  
    user.refreshToken = newRefreshToken;
    await user.save();
  
   
    setAuthCookies(res, accessToken, newRefreshToken);
  
    res.status(200).json({
      message: "Tokens refreshed successfully",
    });
  });
    


    
    // const {name, email, password, dob, gender, maritalStatus, internId} = req.body;

    // if(!name || !email || !password || !dob || !internId){

    //     return res.json({success: false, message: 'Missing Details'});
        
    // }
    
    // try{

    //     const existingUser = await userModel.findOne({email}); //check the existing user by email, checks if the user exists
         
    //          if(existingUser){
    //             return res.json({success: false, message: 'user already exists'}) //if the user already exists return the message: return user alraedy exist
    //          }

    //          const getInitials = (name) => {
    //             return name
    //                 .split(' ')
    //                 .map(word => word.charAt(0).toUpperCase())
    //                 .join('');
    //         };
    
    //         const initials = getInitials(name);
            
    //          const hashPassword = await bcrypt.hash(password, 10); //it uses 10 salt rounds(salt rounds refers to how many time the hashing algorithms is applied to the password and the salt(while salt refers to random data added to a password before hashing it))
             
    //          const user = new userModel({
    //             name, 
    //             email, 
    //             password: hashPassword, 
    //             dob,
    //             gender,
    //             maritalStatus,
    //             internId,
    //             initials
    //         }); //now we are creating new user from userModel with name, email, password(but on the password we use the hashed password), then after save the new user to the database
          
    //          await user.save(); //save the user in the database
             
             
             

    //         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});


    //         res.cookie('token', token, {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === 'production',
    //             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    //             maxAge: 7 * 24 * 60  * 60 * 1000 
    //         });

    //         const mailOptions = {
    //             from: process.env.SENDER_EMAIL,
    //             to: email,
    //             subject: 'Welcome to Our Website',
    //             text: `Welcome to our website. Your account has been created with email id: ${email}. Use ${password} to login`
    //         }
            
    //         await transporter.sendMail(mailOptions);
            

    //          res.status(STATUS_CODE.CREATED).json({status: 'User registered successfully', data })
            
    //     }catch(error){

    //     res.json({sucess: false, message: error.message})

    // }





//Controller for login
/*export const login = async(req, res) =>{

    const {email, password} = req.body;
    

    if(!email || !password){

        return res.json({'success': false, message: 'Email and password are required'});
    }
    
    try{
         const user = await userModel.findOne({email});

          if(!user){
            return res.json({success: false, message: 'Invalid email '});
          }
        
          //  console.log(await bcrypt.hash(password, 10));
           // console.log(user.password);
          const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.json({success: false, message: 'Invalid password'});
            }
            
             
            const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.json({
                success: true,
                message: "login successful",
                _id: user._id,
                role: user.role,
                token,
            });

            //return res.json({ success: true, message: 'Login successful' });
          }catch(error){
        res.json({'success': false, message: error.message});
    }
}
export const logOut = async(req, res) =>{ 

    try{
          res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })

         return res.json({sucess: true, message: 'Logged Out'}) 


    }catch(error){
        return res.json({sucess: false, message: error.message});
    }

}

export const sendVerifyOtp = async(req, res) =>{  //send verification otp on email
    try{

        //get user id to verify the user

        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({sucess: false, message: "Account is Already Verified"})

        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOTP = otp;
        user.verifyOTPExpitedAt = Date.now() + 24 * 60 * 60 * 1000;
  
        await user.save(); //save

            const mailOptions = {
            from: process.env.SENDER_EMAIL,  
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP`
        } 
        await transporter.sendMail(mailOptions); //send the email

        res.json({success: true, message:'Verification OTP Sent on Email'})



    }catch(error){
        res.json({success: false, message: error.message})

    }
}
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    // Check for missing details
    if (!userId || !otp) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        // Fetch user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        

        // Check if OTP matches or is empty
        console.log(otp);
        if (user.verifyOTP === '' || user.verifyOTP !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        // Check if OTP has expired
        if (user.verifyOTPExpitedAt < Date.now()) {
            return res.json({ success: false, message: 'User OTP already expired' });
        }

        // If OTP is valid, verify the user
        user.isAccountVerified = true;
        user.verifyOTP  = '';  // Clear OTP
        user.verifyOTPExpitedAt = 0;  // Clear expiration time

        await user.save();
        return res.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        console.error(error); // Optional: log the error for debugging
        return res.json({ success: false, message: error.message });
    }
};
export const isAuthenticated = async (req, res, next) =>{

    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).json({success: false, message: "No token provided."})
    }
   try{
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         req.user = decoded;
         

         next();

   }catch(error){
      return res.status(401).json({success: false, message: "Invalid or expired token. Please log in again."});
   }
    

}
//Password change for Admin
export const adminPasswordUpdate = async (req, res) =>{
    const {currentPassword, newPassword} = req.body;

    if(!currentPassword || !newPassword){
        return res.json({success: false, message: 'Incorrect Password'});
    }

    try{
        
        //search for a user
        const admin = await userModel.findOne({email: req.user.email, role: 'admin'});
        if(!admin){
            return res.json({success: false, messsage: 'Admin not Found'});
        }
           
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
          if(!isMatch){
            return res.json({success: false, message: 'Current Password is incorrect'});
          }

          const hashedPassword = await bcrypt.hash(newPassword, 10);

           //update the admin password

           admin.password = hashedPassword;
           await admin.save();

           return res.json({success: true, message: 'Password changed successfully'});

    }catch(error){
        res.json({success: false, message: error.message});
    }

}


//send Password Reset OTP
export const sendResetOtp = async (req, res) =>{
    const {email} = req.body;

       if(!email){
          return res.json({success: false, message: "Email is required"});
       }
       try{
          const user = await userModel.findOne({email});
          if(!user){
            return res.json({success: false, message: "user not found"}); 
          }
            //THIS CODE RESETOTP
          const otp = String(Math.floor(100000 + Math.random() * 900000));

           user.resetOTP  = otp;
           user.resetOTPExpiredAt = Date.now() + 15 * 60 * 1000;
           await user.save();

           //After reserting otp we have to send an email
           const mailOptions = {
            from: process.env.SENDER_EMAIL,  
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting your password is ${otp}. Reset Your Password using this OTP`
        } 

        await transporter.sendMail(mailOptions); //send the email
        return res.json({success: true, message: 'OTP sent to your email'});




       }catch(error){
          res.json({success: false, message: error.message});
       }

    
       
    }
//Reset User Password
export const resetPassword = async (req, res) =>{
    //for resseting new password we need email, otp, newPassword

   const {email, otp, newPassword} = req.body;
      if(!email || !otp || !newPassword){

        res.json({success: false, message: 'Email, OTP, and new Password required'});
      }
      try{

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "Email not found, Please enter correct email and try again"});
        }
        //if otp is empty string or otp is not valid
        if(user.resetOTP  === "" || user.resetOTP  !== otp){
            return res.json({success: false, message: 'Invalid OTP'})

        }

             if(user.resetOTPExpiredAt < Date.now()){
                return res.json({success: false, message: 'OTP Expired'});
             }

             const hashedPassword = await bcrypt.hash(newPassword, 10);
             //now we update user Password in the database
             user.password = hashedPassword;
             user.resetOtp = '';
             user.resetOTPExpiredAt = 0;

             await user.save();

             return res.json({success: true, message: 'Password has been reset successfully'});




      }catch(error){
         res.json({success: false, message: error.message})
      }

      
     

}
*/


