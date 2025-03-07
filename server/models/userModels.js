import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name:{type: String,
         required: true
   },
   email: {
          type: String,
          required: true,
          unique: true 
   },
   password:{
          type: String,
          required: true
   },
   internId:{
      type: String,
      required: true,
   },
   dob: {
      type: Date,
      required: true,
   },
   gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
   },
   maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced'],
   },
   role: {
       type: String,
       enum: ['admin', 'intern'],
       default: 'intern',
   },
   initials: {
     type: String 
    },
   verifyOTP: {
            type: String,
            default: ''

   },
   verifyOTPExpitedAt: {
            type: Number,
            default: 0

   },
   isAccountVerified:{
           type: Boolean,
           default: false
   },
   resetOTP : {
       type: String,
       default: '' 


   },
   resetOTPExpiredAt: {
     type: Number,
     default: 0
   }





})

const  userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;