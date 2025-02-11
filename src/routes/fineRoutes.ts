import { Router } from "express";
import { borrowingController } from "../controllers/index.js";
import { authorisation } from "../middlewares/auth.js";

const fineRoutes = Router();

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
/**
 * @swagger
 * /fines:
 *   get:
 *     summary: Retrieve all fines
 *     description: Fetch a list of all fines in the system.
 *     tags: [Fines]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK - List of fines retrieved successfully.
 *       400:
 *         description: Bad request - Invalid query parameters.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - User does not have permission to access this resource.
 *       404:
 *         description: Not Found - No fines available.
 */

fineRoutes.get('/fines', [authorisation],borrowingController.getAllFines);

/**
 * @swagger
 * /fines:
 *   patch:
 *     summary: Update fine amount
 *     description: Modify or update fine details.
 *     tags: [Fines]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fineId
 *               - amount
 *             properties:
 *               fineId:
 *                 type: integer
 *                 description: The ID of the fine to update.
 *                 example: 123
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The new fine amount.
 *                 example: 50.5
 *     responses:
 *       200:
 *         description: Fine amount updated successfully.
 *       400:
 *         description: Bad request - Missing required fields.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       403:
 *         description: Forbidden - User does not have permission to update fines.
 *       404:
 *         description: Not found - Fine record does not exist.
 *       500:
 *         description: Internal Server Error.
 */

fineRoutes.patch('/fines',[authorisation], borrowingController.updateFines);

export default fineRoutes;
