import { StatusCodes } from "http-status-codes";
import { CustomError } from "./customError.js";
export class UnauthenticatedError extends CustomError {
    constructor(message) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}
