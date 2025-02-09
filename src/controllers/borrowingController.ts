import { NextFunction, Request, Response } from 'express';
import sequelize from '../db/index.js';
import { BadRequestError } from '../errors/badRequest.js';
import { NotFoundError } from '../errors/notFound.js';
import { InternalServerError } from '../errors/internalServerError.js';
import { ForbiddenError } from '../errors/forbiddenError.js';


export const getAllBorrowings = async (req: Request, res: Response, next: NextFunction) => {
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

      const [borrowings]: any[] = await sequelize.query("SELECT * FROM borrowing");

      if (!borrowings || borrowings.length === 0) {
          throw new NotFoundError('No borrowings found');
      }

      res.status(200).json({ borrowings });
  } catch (error) {
      next(error);
  }
};


export const getAllFines = async (req: Request, res: Response, next: NextFunction) => {
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
        throw new ForbiddenError("Not allowed to See Fines");
    }

      const [fines]: any[] = await sequelize.query("SELECT * FROM fine");

      if (!fines || fines.length === 0) {
          throw new NotFoundError('No fines found');
      }

      res.status(200).json({ fines });
  } catch (error) {
      next(error);
  }
};


export const assignBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body.auth;

    if (!email) {
        throw new BadRequestError("Authentication email is required");
    }

    const [validPerson]: any = await sequelize.query(
        "SELECT roles FROM person WHERE person_email = ?",
        { replacements: [email] }
    );

    if (!validPerson || validPerson.length === 0 || (validPerson[0].roles !== "librarian")) {
        throw new ForbiddenError("Not allowed to Assign books");
    }


      const { librarian_id, reader_id, book_id } = req.body;

      if (!librarian_id || !reader_id || !book_id) {
          throw new BadRequestError('All borrowing fields are required');
      }

      const [assignResult]: any[] = await sequelize.query(
          "INSERT INTO borrowing (librarian_id, reader_id, book_id, borrow_date, due_date) VALUES (?, ?, ?, CURDATE(), ADDDATE(CURDATE(),INTERVAL 14 DAY))",
          { replacements: [librarian_id, reader_id, book_id] }
      );

      if (!assignResult) {
          throw new InternalServerError('Error assigning books');
      }

      res.status(201).json({ message: 'Book assigned successfully' });
  } catch (error) {
      next(error);
  }
};


export const checkDefaulters = async (req: Request, res: Response, next: NextFunction) => {
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
        throw new ForbiddenError("Not allowed to See Defaulters");
    }


      const [defaulters]: any[] = await sequelize.query(
          "SELECT * FROM borrowing WHERE CURDATE() > due_date AND fine_id = -1"
      );

      if (!defaulters || defaulters.length === 0) {
          throw new NotFoundError('No defaulters detected');
      }

      for (const defaulter of defaulters) {
          const borrowing_id = defaulter.borrowing_id;
          const reader_id = defaulter.reader_id;
          const fine_amount = 100;

          const [result]: any = await sequelize.query(
              "INSERT INTO fine (reader_id, amount, status) VALUES (?, ?, ?)",
              { replacements: [reader_id, fine_amount, 'pending'] }
          );

          if (!result) {
              throw new InternalServerError('Error inserting fine');
          }

          const fine_id = result.fine_id;

          await sequelize.query(
              "UPDATE borrowing SET fine_id = ? WHERE borrowing_id = ?",
              { replacements: [fine_id, borrowing_id] }
          );
      }

      res.status(200).json({ message: 'Defaulters processed successfully' });
  } catch (error) {
      next(error);
  }
};



export const updateFines = async (req: Request, res: Response, next: NextFunction) => {
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
        throw new ForbiddenError("Not allowed to update Fines");
    }


      const [defaultersWithFine]: any[] = await sequelize.query(
          "SELECT * FROM borrowing WHERE fine_id != -1"
      );

      if (!defaultersWithFine || defaultersWithFine.length === 0) {
          throw new NotFoundError('No defaulters with pending fines');
      }

      for (const defaulter of defaultersWithFine) {
          const borrowing_id = defaulter.borrowing_id;
          const fine_id = defaulter.fine_id;

          const [fineRecord]: any[] = await sequelize.query(
              "SELECT amount FROM fine WHERE fine_id = ? AND status = 'pending'",
              { replacements: [fine_id] }
          );

          if (fineRecord && fineRecord.length > 0) {
              const currentFine = fineRecord[0].amount;
              const newFineAmount = currentFine + 100;

              await sequelize.query(
                  "UPDATE fine SET amount = ? WHERE fine_id = ?",
                  { replacements: [newFineAmount, fine_id] }
              );
          }
      }

      res.status(200).json({ message: 'Fines updated successfully' });
  } catch (error) {
      next(error);
  }
};


 
  






