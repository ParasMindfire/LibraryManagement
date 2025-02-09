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
 *       - authorization: []
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
 *                 default: "1234567891234"
 *               total_copies:
 *                 type: integer
 *                 default: 0
*     responses:
 *      200:
 *         description: Ok, The field Was Added 
 *      201:
 *         description: Book borrowed successfully.
 *      400:
 *         description: Bad request, missing required fields.
 *      401:
 *         description:Unauthorized Error
 *      403:
 *         description: Forbidden Error
 *      404:
 *         description: Not Found Error
 */
bookRoutes.post('/books', authorisation, bookController.createBooks);



/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Book Routes]
 *     description: Filter books by author
*     responses:
 *      200:
 *         description: Ok, The field Was Added 
 *      201:
 *         description: Book borrowed successfully.
 *      400:
 *         description: Bad request, missing required fields.
 *      401:
 *         description:Unauthorized Error
 *      403:
 *         description: Forbidden Error
 *      404:
 *         description: Not Found Error
 */
bookRoutes.get('/books', bookController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Update a book
 *     tags: [Book Routes]
 *     description: Modify details of an existing book.
 *     security:
 *       - authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ISBN
 *               - copies
 *             properties:
 *               ISBN:
 *                 type: string
 *                 default: "1234567891234"
 *               copies:
 *                 type: integer
 *                 default: 0
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update.
*     responses:
 *      200:
 *         description: Ok, The field Was Added 
 *      201:
 *         description: Book borrowed successfully.
 *      400:
 *         description: Bad request, missing required fields.
 *      401:
 *         description:Unauthorized Error
 *      403:
 *         description: Forbidden Error
 *      404:
 *         description: Not Found Error
 */
bookRoutes.patch('/books/:id', authorisation, bookController.updateBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book
 *     tags: [Book Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book.
*     responses:
 *      200:
 *         description: Ok, The field Was Added 
 *      201:
 *         description: Book borrowed successfully.
 *      400:
 *         description: Bad request, missing required fields.
 *      401:
 *         description:Unauthorized Error
 *      403:
 *         description: Forbidden Error
 *      404:
 *         description: Not Found Error
 */
bookRoutes.get('/books/:id', bookController.singleBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Book Routes]
 *     description: Remove a book from the library.
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book.
*     responses:
 *      200:
 *         description: Ok, The field Was Added 
 *      201:
 *         description: Book borrowed successfully.
 *      400:
 *         description: Bad request, missing required fields.
 *      401:
 *         description:Unauthorized Error
 *      403:
 *         description: Forbidden Error
 *      404:
 *         description: Not Found Error
 */
bookRoutes.delete('/books/:id', authorisation, bookController.deleteBooks);

export default bookRoutes;
