import { Router } from "express";
import { ownerController } from "../controllers/index.js";
const ownerRoutes = Router();
/**
 * @swagger
 * /owners:
 *   post:
 *     summary: Create a new owner
 *     tags: [Owners]
 *     description: Register a new owner and create an associated library and person entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - owner_name
 *               - owner_email
 *               - owner_pass
 *               - library_name
 *             properties:
 *               owner_name:
 *                 type: string
 *                 description: Name of the owner.
 *               owner_email:
 *                 type: string
 *                 format: email
 *                 description: Email of the owner.
 *               owner_pass:
 *                 type: string
 *                 description: Password of the owner.
 *               library_name:
 *                 type: string
 *                 description: Name of the library.
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
ownerRoutes.post('/owners', ownerController.createOwner);
export default ownerRoutes;
