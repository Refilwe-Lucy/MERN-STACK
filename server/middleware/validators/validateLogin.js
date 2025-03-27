import asyncHandler from "express-async-handler";
import { loginSchema } from "../../schemas/authSchemas.js";


const validateLogin = asyncHandler(async(req,res,next) =>{
    const result = loginSchema.safeParse(req,body);


    if(!result.success){
        return next(result.error)
    }

    req.body = result.data;

    next();
} )

export default validateLogin;
