import { Router } from "express";
import { bookController } from "../controllers/index.js";
import { authorisation } from "../middlewares/auth.js";
const bookRoutes = Router();
/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*
* security:
*   - bearerAuth: []
*
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Book Routes]
 *     security:
 *       - bearerAuth: []
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
 *         description: Unauthorized Error
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
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
 * /books/{id}:
 *   patch:
 *     summary: Update a book
 *     tags: [Book Routes]
 *     description: Modify details of an existing book.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: "ID of the book to update"
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
 *     responses:
 *      200:
 *         description: Ok, The field Was Added
 *      201:
 *         description: Book borrowed successfully.
 *      400:
 *         description: Bad request, missing required fields.
 *      401:
 *         description: Unauthorized Error
 *      403:
 *         description: Forbidden Error
 *      404:
 *         description: Not Found Error
 */
bookRoutes.patch('/books/:id', authorisation, bookController.updateBooks);
/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http,
*       in: header,
*       name: authorization,
*       scheme: bearer,
*       bearerFormat: JWT
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
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http,
*       in: header,
*       name: authorization,
*       scheme: bearer,
*       bearerFormat: JWT
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
/**
 * @swagger
 * /return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Book Routes]
 *     description: Allows a librarian, owner, or admin to process the return of a borrowed book.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: "{token}"
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
 *         description: Unauthorized Error
 *       403:
 *         description: Forbidden Error (Only librarians, owners, or admins can return books)
 *       404:
 *         description: Not Found Error (Borrowing record or fine not found)
 *       500:
 *         description: Internal Server Error
 */
bookRoutes.patch('/books', authorisation, bookController.returnBook);
export default bookRoutes;
