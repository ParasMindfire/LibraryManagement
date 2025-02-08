import { Router } from "express";
import { borrowingController } from "../controllers/index.js";
const borrowingRoutes = Router();
/**
 * @swagger
 * tags:
 *   name: Borrowing Routes
 *   description: API related to libraries
 */
/**
 * @swagger
 * /borrowings:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrowing Routes]
 *     security:
 *       - Authorization: []
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
 *               reader_id:
 *                 type: integer
 *               book_id:
 *                 type: integer
 *               borrow_date:
 *                 type: string
 *                 format: date
 *               due_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Book borrowed successfully.
 *       400:
 *         description: Bad request, missing required fields.
 */
borrowingRoutes.post('/borrowings', borrowingController.assignBooks);
/**
 * @swagger
 * /borrowings:
 *   get:
 *     summary: Get all borrowings
 *     tags: [Borrowing Routes]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: query
 *         name: reader_id
 *         schema:
 *           type: integer
 *         description: Filter borrowings by reader ID.
 *       - in: query
 *         name: librarian_id
 *         schema:
 *           type: integer
 *         description: Filter borrowings by librarian ID.
 *       - in: query
 *         name: book_id
 *         schema:
 *           type: integer
 *         description: Filter borrowings by book ID.
 *     responses:
 *       200:
 *         description: List of borrowed books.
 *       500:
 *         description: Internal server error.
 */
borrowingRoutes.get('/borrowings', borrowingController.getAllBorrowings);
/**
 * @swagger
 * /defaulters:
 *   get:
 *     summary: Get defaulters
 *     tags: [Borrowing Routes]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: query
 *         name: overdue_days
 *         schema:
 *           type: integer
 *         description: Filter defaulters by overdue days.
 *     responses:
 *       200:
 *         description: List of defaulters.
 *       500:
 *         description: Internal server error.
 */
borrowingRoutes.get('/defaulters', borrowingController.checkDefaulters);
export default borrowingRoutes;
