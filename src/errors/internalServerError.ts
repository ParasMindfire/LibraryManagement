import { StatusCodes } from "http-status-codes";
import { CustomError } from "./customError.js";

export class InternalServerError extends CustomError {
    constructor(message: string) {
      super(message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }