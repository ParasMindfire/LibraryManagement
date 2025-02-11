import { Router } from "express";
import { bookController } from "../controllers/index.js";
import { authorisation } from "../middlewares/auth.js";
const bookRoutes = Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - BearerAuth: []
 *
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Book Routes]
 *     security:
 *       - BearerAuth: []
 *     description: Add a new book to the library.
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
 *                 example: "Sample Book Title"
 *               author:
 *                 type: string
 *                 example: "John Doe"
 *               genre:
 *                 type: string
 *                 example: "Fiction"
 *               ISBN:
 *                 type: string
 *                 example: "1234567891234"
 *               total_copies:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Ok, The book was added successfully.
 *       201:
 *         description: Book created successfully.
 *       400:
 *         description: Bad request, missing required fields.
 *       401:
 *         description: Unauthorized Error - Missing or invalid JWT token.
 *       403:
 *         description: Forbidden Error - User does not have permission.
 *       404:
 *         description: Not Found Error - Endpoint not found.
 */
bookRoutes.post('/books', authorisation, bookController.createBooks);
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Book Routes]
 *     description: Retrieve a list of all books in the library.
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       genre:
 *                         type: string
 *                       isbn:
 *                         type: string
 *                       total_copies:
 *                         type: integer
 *       400:
 *         description: Bad request
 *       404:
 *         description: No books found
 *       500:
 *         description: Internal Server Error
 */
bookRoutes.get('/books', bookController.getAllBooks);
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - BearerAuth: []
 *
 * /books/{id}:
 *   patch:
 *     summary: Update a book
 *     tags: [Book Routes]
 *     security:
 *       - BearerAuth: []
 *     description: Modify details of an existing book.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book to update.
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
 *                 example: "1234567891234"
 *               copies:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Book updated successfully.
 *       400:
 *         description: Bad request, missing required fields.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 *       403:
 *         description: Forbidden. User does not have permission to update the book.
 *       404:
 *         description: Not found. Book with the given ID does not exist.
 *       500:
 *         description: Internal Server Error.
 */
bookRoutes.patch('/books/:id', authorisation, bookController.updateBooks);
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Book Routes]
 *     description: Retrieve details of a book by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved book details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 genre:
 *                   type: string
 *                 ISBN:
 *                   type: string
 *                 total_copies:
 *                   type: integer
 *       400:
 *         description: Bad request, missing required fields.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 *       403:
 *         description: Forbidden. User does not have permission.
 *       404:
 *         description: Not found. No book exists with the given ID.
 *       500:
 *         description: Internal Server Error.
 */
bookRoutes.get('/books/:id', bookController.singleBook);
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - BearerAuth: []
 *
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Book Routes]
 *     security:
 *       - BearerAuth: []
 *     description: Remove a book from the library.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 *       400:
 *         description: Bad request, missing required fields.
 *       401:
 *         description: Unauthorized Error - Missing or invalid JWT token.
 *       403:
 *         description: Forbidden Error - User does not have permission.
 *       404:
 *         description: Not Found Error - Book not found.
 */
bookRoutes.delete('/books/:id', authorisation, bookController.deleteBooks);
/**
 * @swagger
 * /return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Book Routes]
 *     description: Allows a librarian, owner, or admin to process the return of a borrowed book.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - borrowing_id
 *             properties:
 *               borrowing_id:
 *                 type: integer
 *                 description: The ID of the borrowing record.
 *     responses:
 *       200:
 *         description: Book returned successfully, no fine applied OR fine has been resolved.
 *       400:
 *         description: Bad request, missing required fields OR Fine is pending, book cannot be returned until payment is made.
 *       401:
 *         description: Unauthorized Error - Missing or invalid JWT token.
 *       403:
 *         description: Forbidden Error - Only librarians, owners, or admins can return books.
 *       404:
 *         description: Not Found Error - Borrowing record or fine not found.
 *       500:
 *         description: Internal Server Error.
 */
bookRoutes.patch('/books', authorisation, bookController.returnBook);
export default bookRoutes;
