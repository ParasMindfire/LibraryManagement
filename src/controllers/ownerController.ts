import { Request, Response, NextFunction } from "express";
import sequelize from "../db/index.js";
import bcrypt from "bcryptjs";
import { BadRequestError, InternalServerError } from "../errors/index.js";

export const createOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { owner_name, owner_email, library_name } = req.body;

        if (!owner_name || !owner_email  || !library_name) {
            throw new BadRequestError("Owner name, email, password, and library name are required");
        }

        const [existingOwner]: any = await sequelize.query(
            "SELECT owner_id FROM owner_table WHERE owner_email = ?",
            { replacements: [owner_email] }
        );

        if (existingOwner && existingOwner.length > 0) {
            throw new BadRequestError("Owner already exists!");
        }

        const defaultPassword = `${owner_name.toLowerCase()}_${library_name}`;
        const personHashedPassword = bcrypt.hashSync(defaultPassword, 10);

        const [newOwner]: any = await sequelize.query(
            `INSERT INTO owner_table (owner_name, owner_email, owner_pass_hash)
             VALUES (?, ?, ?)`,
            { replacements: [owner_name, owner_email, personHashedPassword] }
        );

        const [owner]: any = await sequelize.query(
            `SELECT owner_id FROM owner_table WHERE owner_email = ?`,
            { replacements: [owner_email] }
        );
        
        const owner_id = owner[0]?.owner_id;

        await sequelize.query(
            `INSERT INTO library_table (library_name, owner_id)
             VALUES (?, ?)`,
            { replacements: [library_name, owner_id] }
        );

        const [newPerson]: any = await sequelize.query(
            `INSERT INTO person (fname, lname, phone, address, roles, person_email, library_name)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            {
                replacements: [owner_name, "Owner", "N/A", "N/A", "owner", owner_email, library_name]
            }
        );

        if (!newPerson) {
            throw new InternalServerError("Failed to create owner entry in person table");
        }

        await sequelize.query(
            `INSERT INTO authorisation (person_email, person_pass_hash)
             VALUES (?, ?)`,
            { replacements: [owner_email, personHashedPassword] }
        );

        res.status(201).json({
            message: "Owner, Library, and Person entry created successfully!",
            owner: { owner_id, owner_name, owner_email },
            library: { library_name: `${library_name}` },
            person: { person_email: owner_email, roles: "owner" }
        });

    } catch (error) {
        next(error);
    }
};
