import  jwt  from 'jsonwebtoken';
import generateAccessToken from './generateAccessToken';
import { DaysExpired } from '../constants/dateConstant';
import generateRefreshToken from './generateRefreshToken';

const generateToken = async (user, res) =>{
    try{
        const accessToken = generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        user.refreshToken = refreshToken;

         await user.save();

        setAuthCookies(res, accessToken, refreshToken);

        return { accessToken, refreshToken };
    }catch(error){
        console.error("Error generating tokens:", error);
        throw new Error("Failed to generate tokens");
    }
};
const setAuthCookies = (res, accessToken, refreshToken ) =>{
    if(!res.headersSent){
        res.cookie("accessToken", accessToken, accessCookieOptions());
        res.cookie("refreshToken",  refreshToken, refreshCookieOptions());
    }else{
        console.error("Headers already sent; cannot set cookies.");
    }
};

const accessCookieOptions = () => ({
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    secure: process.env.NODE_ENV === 'production', 
    expires: DaysExpired(),
    
    path: "/api", 

  });
  const refreshCookieOptions = () => ({
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    secure: process.env.NODE_ENV === 'production', 
    expires: DaysExpired(),
    path: "/api/refresh", 
  });
  
  export default generateToken;