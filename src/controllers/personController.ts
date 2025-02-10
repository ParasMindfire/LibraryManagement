import express,{ NextFunction, Request, Response } from 'express';
import sequelize from '../db/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/badRequest.js';
import { InternalServerError } from '../errors/internalServerError.js';
import { NotFoundError } from '../errors/notFound.js';
import { UnauthenticatedError } from '../errors/unauthenticated.js';
import { ForbiddenError } from '../errors/forbiddenError.js';
import { sendEmail } from '../helpers/nodeMailer.js';
import { ConflictError } from '../errors/conflictError.js';

dotenv.config();

export const getPerson = async (req: Request, res: Response, next: NextFunction)=> {
  try {
    const { email } = req.body.auth;

    if (!email) {
        throw new BadRequestError("Authentication email is required");
    }

    const [validPerson]: any = await sequelize.query(
        "SELECT roles FROM person WHERE person_email = ?",
        { replacements: [email] }
    );

    if (!validPerson || validPerson.length === 0 || (validPerson[0].roles !== "owner" && validPerson[0].roles !== "admin")) {
        throw new ForbiddenError("Not allowed to See Borrowings");
    }

    
      const [getAllPerson]: any[] = await sequelize.query("SELECT * FROM person");

      if (!getAllPerson || getAllPerson.length === 0) {
          throw new NotFoundError('No persons found');
      }

      res.status(StatusCodes.OK).json(getAllPerson);
  } catch (error) {
      next(new InternalServerError('Failed to fetch persons'));
  }
};


export const createPerson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body.auth;  
  
      if (!email) {
        throw new BadRequestError("Authentication email is required");
      }
  
      const [validPerson]: any = await sequelize.query(
        "SELECT roles FROM person WHERE person_email = ?",
        { replacements: [email] }
      );
  
      if (!validPerson || validPerson.length === 0) {
        throw new ForbiddenError("Invalid user, access denied");
      }
  
      const userRole = validPerson[0].roles;
  
      const { fname, lname, phone, address, roles, reqEmail, library_name } = req.body;
  
      if (!fname || !lname || !phone || !address || !roles || !reqEmail || !library_name) {
        throw new BadRequestError('All fields are required');
      }
  
      const allowedRoles:any = {
        owner: ["admin", "librarian", "reader"],
        admin: ["librarian", "reader"],
      };
  
      if (!allowedRoles[userRole]?.includes(roles)) {
        throw new ForbiddenError("You do not have permission to create this role");
      }
  
      const [existingPerson]: any = await sequelize.query(
        "SELECT person_email FROM person WHERE person_email = ?",
        { replacements: [reqEmail] }
      );
  
      if (existingPerson && existingPerson.length > 0) {
        throw new ConflictError("Email already registered");
      }
  
      const defaultPassword = `${fname.toLowerCase()}_${library_name}`;
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(defaultPassword, salt);
  
      const [personResult]: any = await sequelize.query(
        "INSERT INTO person (fname, lname, phone, address, roles, person_email, library_name) VALUES (?, ?, ?, ?, ?, ?, ?)",
        { replacements: [fname, lname, phone, address, roles, reqEmail, library_name] }
      );
  
      if (!personResult) {
        throw new InternalServerError('Error creating person');
      }
  
      await sequelize.query(
        "INSERT INTO authorisation (person_email, person_pass_hash) VALUES (?, ?)",
        { replacements: [reqEmail, hashedPassword] }
      );
  
      sendEmail(library_name, fname, lname, reqEmail, roles, defaultPassword);
  
      res.status(StatusCodes.CREATED).json({ message: 'Person created successfully' });
    } catch (error) {
      next(error);
    }
  };
  


  export const loginPerson = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new BadRequestError('Email and password are required');
        }

        const [user]: any[] = await sequelize.query(
            "SELECT * FROM authorisation WHERE person_email = ?",
            { replacements: [email] }
        );

        if (!user || user.length === 0) {
            throw new NotFoundError('User not found');
        }

        const validPassword = await bcrypt.compare(password, user[0].person_pass_hash);
        if (!validPassword) {
            throw new UnauthenticatedError('Invalid credentials');
        }

        const token = jwt.sign(
            { email: user[0].person_email },
            process.env.JWT_SECRET!,
            { expiresIn: '3h' }
        );

        res.status(StatusCodes.OK).json({ message: 'Login successful', token });
    } catch (error) {
        next(error);
    }
};


export const updatePassword = async (req: Request, res: Response, next: NextFunction)=> {
  try {
      const { email } = req.body.auth;
      const { oldPassword, newPassword } = req.body;

      if (!email || !oldPassword || !newPassword) {
          throw new BadRequestError('All fields are required');
      }

      const [user]: any[] = await sequelize.query(
          "SELECT * FROM authorisation WHERE person_email = ?",
          { replacements: [email] }
      );

      if (!user || user.length === 0) {
          throw new NotFoundError('User not found');
      }

      const validPassword = await bcrypt.compare(oldPassword, user[0].person_pass_hash);
      if (!validPassword) {
          throw new UnauthenticatedError('Old password is incorrect');
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

      await sequelize.query(
          "UPDATE authorisation SET person_pass_hash = ? WHERE person_email = ?",
          { replacements: [hashedNewPassword, email] }
      );

      res.status(StatusCodes.OK).json({ message: 'Password updated successfully' });
  } catch (error) {
      next(error);
  }
};


export const deletePerson = async (req: Request, res: Response,next: NextFunction) => {
  try {
      const { email } = req.body.auth; 
      const personId = req.params.id; 

      const [validPerson]: any = await sequelize.query(
          "SELECT roles FROM person WHERE person_email = ?",
          { replacements: [email] }
      );

      if (!validPerson || validPerson.length === 0 || (validPerson[0].roles !== "owner" && validPerson[0].roles !== "admin")) {
          throw new ForbiddenError("Not Allowed to Delete a Person");
      }

      const userRole = validPerson[0].roles;

      const [existingPerson]: any = await sequelize.query(
          "SELECT * FROM person WHERE person_id = ?",
          { replacements: [personId] }
      );

      if (!existingPerson || existingPerson.length === 0) {
          throw new NotFoundError("Person Not Found");
      }


      const targetRole = existingPerson[0].roles;

        if (userRole === "admin" && targetRole !== "librarian") {
            throw new ForbiddenError("Admins can only delete librarians");
        }

      const [deletedPerson]: any = await sequelize.query(
          "DELETE FROM person WHERE person_id = ?",
          { replacements: [personId] }
      );

      if (!deletedPerson || deletedPerson.length === 0) {
          throw new BadRequestError("Error Deleting Person");
      }

      res.status(200).json({
          message: "Person Deleted Successfully",
      });
  } catch (error) {
      next(error);
  }
};


export const updatePerson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body.auth; 
      const personId = req.params.id; 
      const { newRole } = req.body; 
  
      if (!email) {
        throw new BadRequestError("Authentication email is required");
      }
  
      if (!newRole) {
        throw new BadRequestError("New role is required");
      }
  
      const [validPerson]: any = await sequelize.query(
        "SELECT roles FROM person WHERE person_email = ?",
        { replacements: [email] }
      );
  
      if (!validPerson || validPerson.length === 0) {
        throw new NotFoundError("Authenticated user not found");
      }
  
      const userRole = validPerson[0].roles;
  
      if (userRole !== "owner") {
        throw new ForbiddenError("Only the owner can update a person's role");
      }
  
      const [existingPerson]: any = await sequelize.query(
        "SELECT roles FROM person WHERE person_id = ?",
        { replacements: [personId] }
      );
  
      if (!existingPerson || existingPerson.length === 0) {
        throw new NotFoundError("Person not found");
      }
  
    
      await sequelize.query(
        "UPDATE person SET roles = ? WHERE person_id = ?",
        { replacements: [newRole, personId] }
      );
  
      res.status(StatusCodes.OK).json({
        message: `Person role updated successfully to ${newRole}`,
      });
    } catch (error) {
      next(error);
    }
  };
  










