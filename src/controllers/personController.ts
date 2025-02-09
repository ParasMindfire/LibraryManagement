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

    if (!validPerson || validPerson.length === 0 || (validPerson[0].roles !== "librarian" && validPerson[0].roles !== "owner" && validPerson[0].roles !== "admin")) {
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

export const createPerson = async (req: Request, res: Response, next: NextFunction)=> {
    try {

      const { email } = req.body.auth;

      // console.log("emial aya ",email);

      if (!email) {
        throw new BadRequestError("Authentication email is required");
      }

      const [validPerson]: any = await sequelize.query(
          "SELECT * FROM person WHERE person_email = ?",
          { replacements: [email] }
      );

      if (!validPerson || validPerson.length === 0 || (validPerson[0].roles !== "owner" && validPerson[0].roles !== "admin")) {
          throw new ForbiddenError("Not allowed to Create person Entries");
      }

      const { fname, lname, phone, address, roles, reqEmail, library_name } = req.body;
  
      if (!fname || !lname || !phone || !address || !roles || !email || !library_name) {
        throw new BadRequestError('All fields are required');
      }
  
      const person_email = reqEmail; 
      const defaultPassword = `${fname.toLowerCase()}_${library_name}`;
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(defaultPassword, salt);
  
      const [personResult]: any[] = await sequelize.query(
        "INSERT INTO person (fname, lname, phone, address, roles, person_email,library_name) VALUES (?, ?, ?, ?, ?, ?,?) ", 
        { replacements: [fname, lname, phone, address, roles, person_email,library_name] }
      );
  
      if (!personResult || personResult.length === 0) {
        throw new InternalServerError('Error creating person');
      }


      console.log("person Result",personResult);
  
      await sequelize.query(
        "INSERT INTO authorisation (person_email, person_pass_hash) VALUES (?, ?)",
        { replacements: [person_email, hashedPassword] }
      );

      sendEmail(library_name,fname,lname,person_email,roles,defaultPassword);
  
      res.status(StatusCodes.CREATED).json({ message: 'Person created successfully', personResult });
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

      const [existingPerson]: any = await sequelize.query(
          "SELECT * FROM person WHERE person_id = ?",
          { replacements: [personId] }
      );

      if (!existingPerson || existingPerson.length === 0) {
          throw new NotFoundError("Person Not Found");
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










