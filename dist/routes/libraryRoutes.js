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
libraryRoutes.get('/libraries', libraryController.getLibraries);
/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Get all owners
 *     tags: [Libraries]
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
libraryRoutes.get('/owners', libraryController.getAllOwners);
export default libraryRoutes;
