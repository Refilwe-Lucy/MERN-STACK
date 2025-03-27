import userModel from "../models/userModels.js";
import { STATUS_CODE } from "../constants/constants.js";
import HttpError from "../utils/httpError.js"
//import jwt from "jsonwebtoken";
//import crypto from "crypto";

import bcrypt from 'bcryptjs';




//Register User

export const register = async(UseData) =>{
    const { name, email, password, dob, gender, maritalStatus, internId } = UseData;

   //checking exsisting user

   const existingUser = await userModel.findOne({ email });

   if(existingUser){
      throw new HttpError("User already exist",STATUS_CODE.CONFLICT);
   }

   const jwt_secret = crypto.randomBytes(32).toString("hex");

   const hashedPassword = await bcrypt.hash(password, 12);

   const newUser = await userModel.create({
    name,
    email, 
    password: hashedPassword,
    dob, 
    gender, 
    maritalStatus, 
    internId

   });


   return newUser;

}

export const login = async(req, next) =>{
   const {email, password } = req.body;

   const user = await userModel.findOne({ email });

   if(!user || !(await user.comparePasswords(password))){
      return next(new HttpError("Incorrect email or password"),STATUS_CODE.UNAUTHORIZED);
   }
   const { password: userPassword, ...userWithoutPassword } = user.toObject();

   return userWithoutPassword;

}