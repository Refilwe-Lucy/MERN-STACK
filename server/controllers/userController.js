
import userModel from "../models/userModels.js";
//import asyncHandler from "express-async-handler"
import { deleteOne, getAllDocs, getOne, updateOne } from "../service/crudHanlder.js";

export const getAllUsers = getAllDocs(userModel);
export const getUsers = getOne(userModel);
export const deleteUser = deleteOne(userModel);
export const updateUser = updateOne(userModel)



/*export const getUserProfile = async (req, res) => {
  try {
    
    const userId = req.params.id;

    console.log("Received userId:", userId);
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (!user.initials) {
      const getInitials = (name) => {
        return name
          .split(' ')
          .map(word => word.charAt(0).toUpperCase())
          .join('');
      };

      user.initials = getInitials(user.name);
      await user.save(); 
    

    };

    const userData = {
      fullName: user.name,
      email: user.email,
      role: user.role, 
      initials: user.initials, 
    };

    
    if (user.role === 'admin') {
      
      return res.json({
        success: true,
        userData: {
          ...userData,
          
          isAccountVerified: user.isAccountVerified,
        },
      });
    } else if (user.role === 'intern') {
      
      return res.json({
        success: true,
        userData: {
          ...userData,
        
          internId: user.internId,
          dob: user.dob,
          gender: user.gender,
          maritalStatus: user.maritalStatus,
          initials: user.initials
        },
      });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid user role' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getIntern = async (req, res) => {
    try {
     
      const internId = req.user.id;

      const intern = await userModel.findById(internId);
  
      if (!intern) {
        return res.status(404).json({ success: false, message: 'Intern not found' });
      }
  
     
      const internData = {
        name: intern.name,
        email: intern.email,
        internId: intern.internId,
        dob: intern.dob,
        gender: intern.gender,
        maritalStatus: intern.maritalStatus,
        initials: intern.initials,
      };
  
     
      return res.json({ success: true, internData });
  
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  */
  
  











  

