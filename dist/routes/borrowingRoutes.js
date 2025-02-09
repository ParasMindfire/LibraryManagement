import { Router } from "express";
import { borrowingController } from "../controllers/index.js";
import { authorisation } from "../middlewares/auth.js";
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
 *       - authorization: []
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
borrowingRoutes.post('/borrowings', [authorisation], borrowingController.assignBooks);
/**
 * @swagger
 * /borrowings:
 *   get:
 *     summary: Get all borrowings
 *     tags: [Borrowing Routes]
 *     security:
 *       - authorization: []
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
borrowingRoutes.get('/borrowings', [authorisation], borrowingController.getAllBorrowings);
/**
 * @swagger
 * /defaulters:
 *   get:
 *     summary: Get defaulters
 *     tags: [Borrowing Routes]
 *     security:
 *       - authorization: []
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
borrowingRoutes.get('/defaulters', [authorisation], borrowingController.checkDefaulters);
export default borrowingRoutes;
