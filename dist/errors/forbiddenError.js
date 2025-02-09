import { StatusCodes } from "http-status-codes";
import { CustomError } from "./customError.js";
export class ForbiddenError extends CustomError {
    constructor(message) {
        super(message, StatusCodes.FORBIDDEN);
    }
}
