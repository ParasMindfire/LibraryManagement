import { StatusCodes } from "http-status-codes";
import { CustomError } from "./customError.js";
export class InternalServerError extends CustomError {
    constructor(message) {
        super(message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
