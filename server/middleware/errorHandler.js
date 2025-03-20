import { ZodError } from "zod";
import HttpError from "../utils/httpError";
import { STATUS_CODE } from "../constants/constants";

const notFound = (req, res, next) =>{
    const error = new HttpError(`${req.originalUrl} : NOT FOUND`, STATUS_CODE.NOT_FOUND);
    next(error);
}
const handleZodError = (err) =>{
    const errors = err.issues.map((issue) =>({
        path: issue.path.join("."),
        message: issue.message,
    }));

    return{
        statusCode: STATUS_CODE.BAD_REQUEST,
        body: {
            errors,
            message: "Validation Error",
        },
    };
};

const errorHandler = (err, req, res, next) =>{
    console.error(err);

    if(err instanceof HttpError){
       return res.status(err.statusCode || 500).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? 'hidden' : err.stack,
       });
    }
    if (err instanceof ZodError) {
        const { statusCode, body } = handleZodError(err);
        return res.status(statusCode).json(body);
      }
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        
        stack: process.env.NODE_ENV === 'production' ? 'hidden' : err.stack,
      });
    };
    export { errorHandler, notFound}
