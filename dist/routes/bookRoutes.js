import { Router } from "express";
import { bookController } from "../controllers/index.js";
import { authorisation } from "../middlewares/auth.js";
const bookRoutes = Router();
/**
 * @swagger
 * tags:
 *   name: Book Routes
 *   description: API related to libraries
 */
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Book Routes]
 *     description: Add a new book to the library.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - ISBN
 *               - total_copies
 *             properties:
 *               title:
 *                 type: string
 *                 default: "Sample Book Title"
 *               author:
 *                 type: string
 *                 default: "John Doe"
 *               genre:
 *                 type: string
 *                 default: "Fiction"
 *               ISBN:
 *                 type: string
 *                 default: "123-4567891234"
 *               total_copies:
 *                 type: integer
 *                 default: 10
 *     responses:
 *       201:
 *         description: Book added successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
bookRoutes.post('/books', bookController.createBooks);
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Book Routes]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter books by author
 *     responses:
 *       200:
 *         description: A list of books
 */
bookRoutes.get('/books', bookController.getAllBooks);
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Book Routes]
 *     description: Modify details of an existing book.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update.
 *     responses:
 *       200:
 *         description: Book updated successfully.
 */
bookRoutes.put('/books/:id', authorisation, bookController.updateBooks);
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book
 *     tags: [Book Routes]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book.
 *     responses:
 *       200:
 *         description: Book details retrieved.
 */
bookRoutes.get('/books/:id', bookController.singleBook);
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Book Routes]
 *     description: Remove a book from the library.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book.
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 */
bookRoutes.delete('/books/:id', authorisation, bookController.deleteBooks);
export default bookRoutes;
