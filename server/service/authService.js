import userModel from "../models/userModels";
import { STATUS_CODE } from "../constants/constants";
import bcrypt from 'bcryptjs';




//Register User

export const register = async(UseData) =>{
    const { name, email, password, dob, gender, maritalStatus, internId } = UseData;

   //checking exsisting user

   const existingUser = await userModel.findOne({ email });

   if(existingUser){
      throw new ("User already exist",STATUS_CODE.CONFLICT);
   }

   const newUser = userModel.create({
    name, email, password, dob, gender, maritalStatus, internId

   })
   return newUser;

}