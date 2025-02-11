import {NextFunction, Request,Response} from "express";
import sequelize from "../db/index.js";
import { NotFoundError } from "../errors/notFound.js";
import { InternalServerError } from "../errors/internalServerError.js";
import { BadRequestError } from "../errors/badRequest.js";
import { ForbiddenError } from "../errors/forbiddenError.js";
import { StatusCodes } from "http-status-codes";
import { ConflictError } from "../errors/conflictError.js";

export const getAllBooks = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const [books]: any[] = await sequelize.query("SELECT * FROM books");

        if (!books || books.length === 0) {
            throw new NotFoundError("No books found");
        }

        console.log("books ",books);

        return res.status(200).json({ books:books });
    } catch (error) {
        next(new InternalServerError("Failed to fetch books"));
    }
};

export const createBooks = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { email } = req.body.auth;

        if (!email) {
            throw new BadRequestError("Authentication email is required");
        }

        const [validPerson]: any = await sequelize.query(
            "SELECT roles FROM person WHERE person_email = ?",
            { replacements: [email] }
        );

        if (!validPerson || validPerson.length === 0 || (validPerson[0].roles !== "owner" && validPerson[0].roles !== "librarian" && validPerson[0].roles !== "admin")) {
            throw new ForbiddenError("Not allowed to Add books");
        }


        const { title, author, genre, ISBN, total_copies } = req.body;

        if (!title || !author || !genre || !ISBN || !total_copies) {
            throw new BadRequestError("All book fields are required");
        }

        const [existingBook]: any[] = await sequelize.query(
            "SELECT * FROM books WHERE isbn = ?",
            { replacements: [ISBN] }
        );

        if (existingBook.length > 0) {
            throw new ConflictError("A book with this ISBN already exists");
        }

        const [bookResult]: any[] = await sequelize.query(
            "INSERT INTO books (title, author, genre, isbn, total_copies) VALUES (?, ?, ?, ?, ?)",
            { replacements: [title, author, genre, ISBN, total_copies] }
        );

        if (!bookResult || bookResult.length === 0) {
            throw new InternalServerError("Error creating book");
        }

        res.status(201).json({ message: "Book created successfully", bookResult });
    } catch (error) {
        next(error);
    }
};


export const updateBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body.auth;
        const { copies, ISBN } = req.body;

        if (!email) {
            throw new BadRequestError("Authentication email is required");
        }

        const [validPerson]: any = await sequelize.query(
            "SELECT roles FROM person WHERE person_email = ?",
            { replacements: [email] }
        );

        if (!validPerson || validPerson.length === 0 || (validPerson[0].roles !== "owner" && validPerson[0].roles !== "librarian" && validPerson[0].roles !== "admin")) {
            throw new ForbiddenError("Not allowed to Add books");
        }

        if (!copies || !ISBN) {
            throw new BadRequestError("Copies and ISBN fields are required");
        }

        const [updatedBook]: any[] = await sequelize.query(
            "UPDATE books SET total_copies = ? WHERE isbn = ?",
            { replacements: [copies, ISBN] }
        );

        if (!updatedBook || updatedBook.length === 0) {
            throw new InternalServerError("Error updating book");
        }

        res.status(200).json({ message: "Book updated successfully", updatedBook });
    } catch (error) {
        next(error);
    }
};



export const singleBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const [singleBook]: any[] = await sequelize.query(
            "SELECT * FROM books WHERE book_id = ?", { replacements: [id] }
        );

        if (!singleBook || singleBook.length === 0) {
            throw new NotFoundError("Book not found with the given ID");
        }

        res.status(StatusCodes.OK).json({ message: "Book retrieved successfully", singleBook });
    } catch (error) {
        next(error);
    }
};




export const deleteBooks = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { email } = req.body.auth;

        const [validPerson]: any = await sequelize.query(
            "SELECT roles FROM person WHERE person_email = ?", 
            { replacements: [email] }
        );

        if (!validPerson || validPerson.length === 0 || (validPerson[0].roles !== "owner" && validPerson[0].roles !== "librarian" && validPerson[0].roles !== "admin")) {
            throw new ForbiddenError("Not allowed to Add books");
        }

        const id = req.params.id;

        const [deletedBooks]: any[] = await sequelize.query(
            "DELETE FROM books WHERE book_id = ?", 
            { replacements: [id] }
        );

        if (!deletedBooks || deletedBooks.length === 0) {
            throw new NotFoundError("Error Deleting Book: Book not found");
        }

        res.status(StatusCodes.OK).json({ message: "Book Deleted Successfully", deletedBooks });

    } catch (error) {
        next(error);
    }
};


export const returnBook = async (req: Request, res: Response, next: NextFunction):Promise<any>=> {
    try {
      const { email } = req.body.auth;
      const { borrowing_id } = req.body;
  
      if (!email || !borrowing_id) {
        throw new BadRequestError("Authentication email and Borrowing ID are required");
      }
  
      const [validPerson]: any = await sequelize.query(
        "SELECT roles FROM person WHERE person_email = ?",
        { replacements: [email] }
      );
  
      if (!validPerson || validPerson.length === 0 || !["librarian", "owner", "admin"].includes(validPerson[0].roles)) {
        throw new ForbiddenError("Not allowed to return books");
      }
  
      const [borrowingRecord]: any = await sequelize.query(
        "SELECT fine_id FROM borrowing WHERE borrowing_id = ?",
        { replacements: [borrowing_id] }
      );
  
      if (!borrowingRecord || borrowingRecord.length === 0) {
        throw new NotFoundError("Borrowing record not found");
      }
  
      const { fine_id } = borrowingRecord[0];
  
      if (fine_id === -1) {
        await sequelize.query(
          "UPDATE borrowing SET status = 'resolved' WHERE borrowing_id = ?",
          { replacements: [borrowing_id] }
        );
        return res.status(200).json({ message: "Book returned successfully, no fine applied" });
      }
  
      const [fineRecord]: any = await sequelize.query(
        "SELECT status FROM fine WHERE fine_id = ?",
        { replacements: [fine_id] }
      );
  
      if (!fineRecord || fineRecord.length === 0) {
        throw new InternalServerError("Fine record not found");
      }
  
      const { status: fineStatus } = fineRecord[0];
  
      if (fineStatus === "pending") {
        return res.status(400).json({ message: "Fine is pending, book cannot be returned until payment is made" });
      }

      await sequelize.query(
        "UPDATE borrowing SET status = 'resolved' WHERE borrowing_id = ?",
        { replacements: [borrowing_id] }
      );
  
      return res.status(200).json({ message: "Book returned successfully, fine has been resolved" });
  
    } catch (error) {
      next(error);
    }
  };
  