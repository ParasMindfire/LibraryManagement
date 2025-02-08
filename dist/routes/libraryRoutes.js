import { Router } from "express";
import { libraryController } from "../controllers/index.js";
const libraryRoutes = Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Authorization:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * tags:
 *   - name: Libraries
 *     description: Library management
 */
/**
 * @swagger
 * /libraries:
 *   get:
 *     summary: Get all libraries
 *     tags: [Libraries]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: query
 *         name: library_ID
 *         schema:
 *           type: integer
 *         description: Filter libraries by ID.
 *       - in: query
 *         name: owner_id
 *         schema:
 *           type: integer
 *         description: Filter libraries by owner ID.
 *     responses:
 *       200:
 *         description: List of libraries.
 *       500:
 *         description: Internal server error.
 */
libraryRoutes.get('/libraries', libraryController.getLibraries);
/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Get all owners
 *     tags: [Libraries]
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: List of owners.
 *       500:
 *         description: Internal server error.
 */
libraryRoutes.get('/owners', libraryController.getAllOwners);
export default libraryRoutes;
