import { StatusCodes } from "http-status-codes";
import { CustomError } from "./customError.js";
export class ConflictError extends CustomError {
    constructor(message) {
        super(message, StatusCodes.CONFLICT);
    }
}
