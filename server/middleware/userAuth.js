import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';
import asyncHandler from "express-async-handler";
import HttpError from '../utils/httpError.js';
import { STATUS_CODE } from '../constants/constants.js';


const userAuth = asyncHandler(async(req, res, next)=>{
    const token = req.cookies.token; 

     console.log('Token:', token); 

    if(!token){
      return next(new HttpError("Not authorized, no token", STATUS_CODE.BAD_REQUEST.UNAUTHORIZED));
    }

      const decoded = jwt.decode(token);

      if(!decoded || !decoded.id){
        next(
            new HttpError("Not authorized, invalid token", STATUS_CODE.UNAUTHORIZED)
        );
      }

      const user = await userModel.findById(decoded.id).select("-password");

      if(!user){
        next(new HttpError("Not authorized", STATUS_CODE.NOT_FOUND ));
      }

      const jwtSecret = user.jwt_secret;

      if(jwtSecret){
        next(
            new HttpError(
                 "Server error: User jwt_secret missing",
                 STATUS_CODE.SERVER_ERROR

            )
        );
      }

      try{
        jwt.verify(token, jwtSecret);
        req.user=user;
        next();
      }catch(verificationError){
        return next(new HttpError("Not authorized, invalid token", STATUS_CODE.UNAUTHORIZED));
      }
    });
    const authorizeRoles = (...allowedRoles) =>{
        return (req, res, next) => {
            if (!req.user || !allowedRoles.includes(req.user.role)) {
              return next(new HttpError("Not authorized", STATUS_CODE.FORBIDDEN));
            }
            next(); 
          };
    } 

export default {userAuth, authorizeRoles } 




