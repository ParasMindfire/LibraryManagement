import express,{ NextFunction, Request, Response } from 'express';
import sequelize from '../db/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomError } from '../errors/customError.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/badRequest.js';

dotenv.config();

export const getPerson = async (req: Request, res: Response):Promise<any> => {
    try {
      const getAllPerson = await sequelize.query("SELECT * FROM person");
    //   console.log("getAllPersonController ",getAllPerson[0]);
      return res.json(getAllPerson[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createPerson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { fname, lname, phone, address, roles, email, library_name } = req.body;
  
      if (!fname || !lname || !phone || !address || !roles || !email || !library_name) {
        throw new BadRequestError('All fields are required');
      }
  
      const person_email = email; 
      const defaultPassword = `${fname.toLowerCase()}_${library_name}`;
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(defaultPassword, salt);
  
      const [personResult]: any[] = await sequelize.query(
        "INSERT INTO person (fname, lname, phone, address, roles, person_email) VALUES (?, ?, ?, ?, ?, ?) ", 
        { replacements: [fname, lname, phone, address, roles, email] }
      );
  
      if (!personResult || personResult.length === 0) {
        throw new CustomError('Error creating person', StatusCodes.INTERNAL_SERVER_ERROR);
      }
  
      await sequelize.query(
        "INSERT INTO authorisation (person_email, person_pass_hash) VALUES (?, ?)",
        { replacements: [person_email, hashedPassword] }
      );
  
      res.status(StatusCodes.CREATED).json({ message: 'Person created successfully', personResult });
    } catch (error) {
      next(error);
    }
  };


export const loginPerson = async (req: Request, res: Response):Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const [user]:any[]= await sequelize.query(
            "SELECT * FROM authorisation WHERE person_email = ?",
            { replacements: [email] }
        );
        

        if (!user || user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user[0].person_pass_hash);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { email: user[0].person_email },
            process.env.JWT_SECRET!,
            { expiresIn: '3h' }
        );

        res.status(200).json({ message: 'Login successful', token:token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updatePassword = async (req: Request, res: Response):Promise<any> => {
    try {
        
        const {email}=req.body.auth;

        const { oldPassword, newPassword } = req.body;

        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const [user]:any[]= await sequelize.query(
            "SELECT * FROM authorisation WHERE person_email = ?",
            { replacements: [email] }
        );

        if (!user || user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(oldPassword, user[0].person_pass_hash);
        if (!validPassword) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

        await sequelize.query(
            "UPDATE authorisation SET person_pass_hash = ? WHERE person_email = ?",
            { replacements: [hashedNewPassword, email] }
        );

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};






