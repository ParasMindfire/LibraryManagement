import sequelize from "../db/index.js";
import bcrypt from "bcryptjs";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors/index.js";
import { ConflictError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
export const createOwner = async (req, res, next) => {
    try {
        const { owner_name, owner_email, library_name } = req.body;
        if (!owner_name || !owner_email || !library_name) {
            throw new BadRequestError("Owner name, email, password, and library name are required");
        }
        const [existingOwner] = await sequelize.query("SELECT owner_id FROM owner_table WHERE owner_email = ?", { replacements: [owner_email] });
        if (existingOwner && existingOwner.length > 0) {
            throw new BadRequestError("Owner already exists!");
        }
        const defaultPassword = `${owner_name.toLowerCase()}_${library_name}`;
        const personHashedPassword = bcrypt.hashSync(defaultPassword, 10);
        const [newOwner] = await sequelize.query(`INSERT INTO owner_table (owner_name, owner_email, owner_pass_hash)
             VALUES (?, ?, ?)`, { replacements: [owner_name, owner_email, personHashedPassword] });
        const [owner] = await sequelize.query(`SELECT owner_id FROM owner_table WHERE owner_email = ?`, { replacements: [owner_email] });
        const owner_id = owner[0]?.owner_id;
        await sequelize.query(`INSERT INTO library_table (library_name, owner_id)
             VALUES (?, ?)`, { replacements: [library_name, owner_id] });
        console.log("ownerID", owner_id);
        const [newPerson] = await sequelize.query(`INSERT INTO person (fname, lname, phone, address, roles, person_email, library_name)
             VALUES (?, ?, ?, ?, ?, ?, ?)`, {
            replacements: [owner_name, 'Owner', 'NA', 'NA', 'owner', owner_email, library_name]
        });
        console.log("new PErson ", newPerson);
        if (!newPerson) {
            throw new InternalServerError("Failed to create owner entry in person table");
        }
        await sequelize.query(`INSERT INTO authorisation (person_email, person_pass_hash)
             VALUES (?, ?)`, { replacements: [owner_email, personHashedPassword] });
        res.status(201).json({
            message: "Owner, Library, and Person entry created successfully!",
            owner: { owner_id, owner_name, owner_email },
            library: { library_name: `${library_name}` },
            person: { person_email: owner_email, roles: "owner" }
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteOwner = async (req, res, next) => {
    try {
        const { email } = req.body;
        const [validPerson] = await sequelize.query("SELECT * FROM owner_table WHERE owner_email = ?", { replacements: [email] });
        if (!validPerson || validPerson.length === 0) {
            throw new ConflictError("Owner Not Found");
        }
        const [deleteOwner] = await sequelize.query("DELETE FROM owner_table WHERE owner_email = ?", { replacements: [email] });
        if (!deleteOwner || deleteOwner.length === 0) {
            throw new NotFoundError("Error Deleting Owner: Owner not found");
        }
        res.status(StatusCodes.OK).json({ message: "Owner Deleted Successfully", deleteOwner });
    }
    catch (error) {
        next(error);
    }
};
