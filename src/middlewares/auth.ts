import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const authorisation = async (req:Request, res :Response, next:NextFunction) => {
    console.log("headers",req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      res.status(201).json({message:"Token Not Found in header"});
    }
  
    const token = authHeader!.split(' ')[2];

    console.log("tokennn ",token);
  
    try {
      const decoded= jwt.verify(token, process.env.JWT_SECRET as string);
    //   console.log("decoded  ",decoded);
      req.body.auth=decoded;
      next();
    } catch (error) {
        res.status(400).json({message:"Token Not Found"});
    }
}

// module.exports=authentication;