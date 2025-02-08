import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../errors/customError.js';

export const errorHandler:ErrorRequestHandler= (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  };

  if (err.name === 'ValidationError') {
    customError.msg = Object.values((err as any).errors)
      .map((item: any) => item.message)
      .join(',');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  
  if ((err as any).code && (err as any).code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys((err as any).keyValue)} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  
  if (err.name === 'CastError') {
    customError.msg = `No item found with id: ${(err as any).value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  res.status(customError.statusCode).json({ msg: customError.msg });

  return;
};

