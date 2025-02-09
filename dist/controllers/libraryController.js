import sequelize from '../db/index.js';
import { NotFoundError } from '../errors/notFound.js';
import { StatusCodes } from 'http-status-codes';
export const getLibraries = async (req, res, next) => {
    try {
        const [libraries] = await sequelize.query("SELECT * FROM library_table");
        if (!libraries || libraries.length === 0) {
            throw new NotFoundError("No libraries found");
        }
        res.status(StatusCodes.OK).json(libraries);
    }
    catch (error) {
        next(error);
    }
};
export const getAllOwners = async (req, res, next) => {
    try {
        const [owners] = await sequelize.query("SELECT * FROM owner_auth");
        if (!owners || owners.length === 0) {
            throw new NotFoundError("No owners found");
        }
        res.status(StatusCodes.OK).json(owners);
    }
    catch (error) {
        next(error);
    }
};
