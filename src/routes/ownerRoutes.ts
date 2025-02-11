import { Router } from "express";
import { ownerController, } from "../controllers/index.js";

const ownerRoutes = Router();

/**
 * @swagger
 * /owners:
 *   post:
 *     summary: Register a new owner
 *     tags: [Owners]
 *     description: Create a new owner and associate them with a library and person entry.
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
 *                 format: password
 *                 description: Password for the owner.
 *               library_name:
 *                 type: string
 *                 description: Name of the library.
 *     responses:
 *       201:
 *         description: Owner registered successfully.
 *       400:
 *         description: Bad request, missing required fields or invalid data.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       403:
 *         description: Forbidden. User does not have permission to create an owner.
 *       409:
 *         description: Conflict. Owner email already exists.
 *       500:
 *         description: Internal Server Error.
 */

ownerRoutes.post('/owners', ownerController.createOwner);



/**
 * @swagger
 * /owners:
 *   delete:
 *     summary: Delete an owner
 *     tags: [Owners]
 *     description: Remove an owner from the system using their email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the owner to delete.
 *     responses:
 *       200:
 *         description: Owner deleted successfully.
 *       400:
 *         description: Bad request, missing or invalid email.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       403:
 *         description: Forbidden. User does not have permission to delete an owner.
 *       404:
 *         description: Owner not found.
 *       500:
 *         description: Internal Server Error.
 */


ownerRoutes.delete('/owners', ownerController.deleteOwner);

export default ownerRoutes;
