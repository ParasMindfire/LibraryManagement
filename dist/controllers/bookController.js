import sequelize from "../db/index.js";
import { NotFoundError } from "../errors/notFound.js";
import { InternalServerError } from "../errors/internalServerError.js";
import { BadRequestError } from "../errors/badRequest.js";
import { ForbiddenError } from "../errors/forbiddenError.js";
import { StatusCodes } from "http-status-codes";
export const getAllBooks = async (req, res, next) => {
    try {
        const [books] = await sequelize.query("SELECT * FROM books");
        if (!books || books.length === 0) {
            throw new NotFoundError("No books found");
        }
        res.status(200).json({ books });
    }
    catch (error) {
        next(new InternalServerError("Failed to fetch books"));
    }
};
export const createBooks = async (req, res, next) => {
    try {
        const { email } = req.body.auth;
        if (!email) {
            throw new BadRequestError("Authentication email is required");
        }
        const [validPerson] = await sequelize.query("SELECT roles FROM person WHERE person_email = ?", { replacements: [email] });
        if (!validPerson || validPerson.length === 0 || (validPerson[0].roles !== "librarian" && validPerson[0].roles !== "admin")) {
            throw new ForbiddenError("Not allowed to Add books");
        }
        const { title, author, genre, ISBN, total_copies } = req.body;
        if (!title || !author || !genre || !ISBN || !total_copies) {
            throw new BadRequestError("All book fields are required");
        }
        const [bookResult] = await sequelize.query("INSERT INTO books (title, author, genre, isbn, total_copies) VALUES (?, ?, ?, ?, ?)", { replacements: [title, author, genre, ISBN, total_copies] });
        if (!bookResult || bookResult.length === 0) {
            throw new InternalServerError("Error creating book");
        }
        res.status(201).json({ message: "Book created successfully", bookResult });
    }
    catch (error) {
        next(error);
    }
};
export const updateBooks = async (req, res, next) => {
    try {
        const { email } = req.body.auth;
        const { copies, ISBN } = req.body;
        if (!email) {
            throw new BadRequestError("Authentication email is required");
        }
        const [validPerson] = await sequelize.query("SELECT roles FROM person WHERE person_email = ?", { replacements: [email] });
        if (!validPerson || validPerson.length === 0 || (validPerson[0].roles !== "librarian" && validPerson[0].roles !== "admin")) {
            throw new ForbiddenError("Not allowed to Add books");
        }
        if (!copies || !ISBN) {
            throw new BadRequestError("Copies and ISBN fields are required");
        }
        const [updatedBook] = await sequelize.query("UPDATE books SET total_copies = ? WHERE isbn = ?", { replacements: [copies, ISBN] });
        if (!updatedBook || updatedBook.length === 0) {
            throw new InternalServerError("Error updating book");
        }
        res.status(200).json({ message: "Book updated successfully", updatedBook });
    }
    catch (error) {
        next(error);
    }
};
export const singleBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [singleBook] = await sequelize.query("SELECT * FROM books WHERE book_id = ?", { replacements: [id] });
        if (!singleBook || singleBook.length === 0) {
            throw new NotFoundError("Book not found with the given ID");
        }
        res.status(StatusCodes.OK).json({ message: "Book retrieved successfully", singleBook });
    }
    catch (error) {
        next(error);
    }
};
export const deleteBooks = async (req, res, next) => {
    try {
        const { email } = req.body.auth;
        const [validPerson] = await sequelize.query("SELECT roles FROM person WHERE person_email = ?", { replacements: [email] });
        if (!validPerson || validPerson.length === 0 || (validPerson[0].roles !== "librarian" && validPerson[0].roles !== "admin")) {
            throw new ForbiddenError("Not allowed to Add books");
        }
        const id = req.params.id;
        const [deletedBooks] = await sequelize.query("DELETE FROM books WHERE book_id = ?", { replacements: [id] });
        if (!deletedBooks || deletedBooks.length === 0) {
            throw new NotFoundError("Error Deleting Book: Book not found");
        }
        res.status(StatusCodes.OK).json({ message: "Book Deleted Successfully", deletedBooks });
    }
    catch (error) {
        next(error);
    }
};
