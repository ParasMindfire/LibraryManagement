import { Router } from "express";
import { borrowingController } from "../controllers/index.js";
import { authorisation } from "../middlewares/auth.js";
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
fineRoutes.get('/fines', [authorisation], borrowingController.getAllFines);
/**
 * @swagger
 * /fines:
 *   patch:
 *     summary: Update fine amount
 *     tags: [Fine Routes]
 *     security:
 *       - authorization: []
 *     description: Modify or update fine details.
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
fineRoutes.patch('/fines', [authorisation], borrowingController.updateFines);
export default fineRoutes;
