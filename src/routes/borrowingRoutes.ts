import { Router } from "express";
import { borrowingController } from "../controllers/index.js";
import { authorisation } from "../middlewares/auth.js";

const borrowingRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: Borrowings
 *     description: API related to borrowing books
 */

/**
 * @swagger
 * /borrowings:
 *   post:
 *     summary: Borrow a book
 *     description: Allows a reader to borrow a book from the library.
 *     tags: [Borrowings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - librarian_id
 *               - reader_id
 *               - book_id
 *               - borrow_date
 *               - due_date
 *             properties:
 *               librarian_id:
 *                 type: integer
 *                 description: ID of the librarian authorizing the borrowing.
 *                 example: 101
 *               reader_id:
 *                 type: integer
 *                 description: ID of the reader borrowing the book.
 *                 example: 202
 *               book_id:
 *                 type: integer
 *                 description: ID of the book being borrowed.
 *                 example: 303
 *               borrow_date:
 *                 type: string
 *                 format: date
 *                 description: Date when the book is borrowed.
 *                 example: "2024-02-10"
 *               due_date:
 *                 type: string
 *                 format: date
 *                 description: Date when the book is due to be returned.
 *                 example: "2024-03-10"
 *     responses:
 *       201:
 *         description: Book borrowed successfully.
 *       400:
 *         description: Bad request - Missing required fields.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - User does not have permission to borrow books.
 *       404:
 *         description: Not found - Book or user does not exist.
 *       500:
 *         description: Internal Server Error.
 */

borrowingRoutes.post('/borrowings',[authorisation],borrowingController.assignBooks);

/**
 * @swagger
 * /borrowings:
 *   get:
 *     summary: Retrieve all borrowings
 *     description: Fetch a list of all borrowed books from the library.
 *     tags: [Borrowings]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved borrowings.
 *       400:
 *         description: Bad request - Invalid parameters or missing required fields.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - User does not have permission to access this data.
 *       404:
 *         description: Not found - No borrowings available.
 *       500:
 *         description: Internal Server Error.
 */

borrowingRoutes.get('/borrowings',[authorisation], borrowingController.getAllBorrowings);

/**
 * @swagger
 * /defaulters:
 *   get:
 *     summary: Retrieve defaulters list
 *     description: Fetch a list of users who have overdue borrowings.
 *     tags: [Borrowings]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of defaulters.
 *       400:
 *         description: Bad request - Invalid parameters or missing required fields.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - User does not have permission to access this data.
 *       404:
 *         description: Not found - No defaulters available.
 *       500:
 *         description: Internal Server Error.
 */

borrowingRoutes.get('/defaulters',[authorisation], borrowingController.checkDefaulters);

export default borrowingRoutes;
