import asyncHandler from "express-async-handler"
import { registerSchema } from "../../schemas/authSchemas"

export const validateRegister = asyncHandler(async(req, res, next) =>{
    const results = registerSchema.safeParse(req.body);

    if(!results.success){
        return(error);
    }

    req.body = results.data;

    next();

})
export default validateRegister;
