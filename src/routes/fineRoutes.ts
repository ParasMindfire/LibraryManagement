import { Router } from "express";
import { borrowingController } from "../controllers/index.js";

const fineRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Fine Routes
 *   description: API related to libraries
 */

/**
 * @swagger
 * /fines:
 *   get:
 *     summary: Get all fines
 *     tags: [Fine Routes]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: query
 *         name: reader_id
 *         schema:
 *           type: integer
 *         description: Filter fines by reader ID.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, paid]
 *         description: Filter fines by status.
 *     responses:
 *       200:
 *         description: List of fines.
 *       500:
 *         description: Internal server error.
 */
fineRoutes.get('/fines', borrowingController.getAllfines);

/**
 * @swagger
 * /fines:
 *   put:
 *     summary: Update fine amount
 *     tags: [Fine Routes]
 *     security:
 *       - Authorization: []
 *     description: Modify or update fine details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fine_id
 *               - amount
 *             properties:
 *               fine_id:
 *                 type: integer
 *               amount:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Fine updated successfully.
 *       400:
 *         description: Bad request, missing required fields.
 *       500:
 *         description: Internal server error.
 */
fineRoutes.put('/fines', borrowingController.updateFines);

export default fineRoutes;
