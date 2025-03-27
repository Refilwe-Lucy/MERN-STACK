import asyncHandler from "express-async-handler";
import HttpError from "../utils/httpError.js";
import { STATUS_CODE } from "../constants/constants.js";


export const deleteOne = (Model) =>
    asyncHandler(async(req, res, next) =>{
        const document = await Model.findByIdAndDelete(req.params.id);

        if(!document){
            return next(new HttpError("No document found with that ID", STATUS_CODE.NOT_FOUND)); 
        }

        res.status(OK).json({
            status: "doc deleted successfully",
        });
    });

    export const updateOne = (Model) =>
        asyncHandler(async(req, res, next) =>{
            const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
               new: true,
               runValidators: true,
            });
            if (!document) {
                return next(new HttpError("No document found with that ID", STATUS_CODE.NOT_FOUND));
              }

              res.status(OK).json({
                status: "doc updated successfully",
                data: {
                  data: document,
                },
              });
            });
            export const getOne = (Model) =>
                asyncHandler(async (req, res, next) => {
                  const doc = await Model.findById(req.params.id);
              
                  if (!doc) {
                    return next(new HttpError("No document found with that ID", STATUS_CODE.NOT_FOUND));
                  }
              
                  res.status(OK).json({
                    status: "success",
                    id: req.params.id,
                    data: doc,
                  });
                });
               export const getAllDocs = (Model) =>
                    asyncHandler(async (req, res, next) => {
                      const doc = await Model.find();
                  
                      res.status(OK).json({
                        status: "success",
                        result: doc.length,
                        data: {
                          data: doc,
                        },
                      });
                    });
             
        