import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { UnauthenticatedError } from "../errors/unauthenticated.js";
import { ForbiddenError } from "../errors/forbiddenError.js";

dotenv.config();

export const authorisation = async (req:Request, res :Response, next:NextFunction) => {
  try {
    console.log("headers", req.headers);

    const authHeader = req.headers.authorization;

    // console.log("authHeader",authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Token Not Found in Header");
    }

    const token = authHeader.split(" ")[1];
    console.log("Token: ", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.body.auth = decoded;
        next();
    } catch (error) {
        throw new ForbiddenError("Invalid or Expired Token");
    }
  } catch (error) {
    next(error);
  }
}
