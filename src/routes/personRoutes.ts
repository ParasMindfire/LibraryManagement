import { Router } from "express";
import { personController } from "../controllers/index.js";
import { authorisation } from "../middlewares/auth.js";

const personRoutes = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * tags:
 *   - name: Persons
 *     description: Person management
 *
 * paths:
 *   /persons:
 *     get:
 *       summary: Get all persons
 *       tags: [Persons]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: OK - Successfully retrieved all persons.
 *         400:
 *           description: Bad request - Missing or invalid parameters.
 *         401:
 *           description: Unauthorized Error - Missing or invalid JWT token.
 *         403:
 *           description: Forbidden Error - User does not have permission.
 *         404:
 *           description: Not Found Error - No persons found.
 */

personRoutes.get('/persons',[authorisation],personController.getPerson);

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
 * paths:
 *   /users:
 *     post:
 *       summary: Create a new user
 *       tags: [Persons]
 *       security:
 *         - BearerAuth: []
 *       description: Register a new user in the system.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - fname
 *                 - lname
 *                 - phone
 *                 - address
 *                 - roles
 *                 - reqEmail
 *               properties:
 *                 fname:
 *                   type: string
 *                   description: First name of the user.
 *                   example: "John"
 *                 lname:
 *                   type: string
 *                   description: Last name of the user.
 *                   example: "Doe"
 *                 phone:
 *                   type: string
 *                   description: Phone number of the user.
 *                   example: "+1234567890"
 *                 address:
 *                   type: string
 *                   description: Address of the user.
 *                   example: "123 Main St, City, Country"
 *                 roles:
 *                   type: string
 *                   description: Role of the user.
 *                   example: "Admin"
 *                 reqEmail:
 *                   type: string
 *                   format: email
 *                   description: Email of the user.
 *                   example: "johndoe@example.com"
 *       responses:
 *         200:
 *           description: Ok, the user was added successfully.
 *         201:
 *           description: User created successfully.
 *         400:
 *           description: Bad request - Missing or invalid fields.
 *         401:
 *           description: Unauthorized Error - Missing or invalid JWT token.
 *         403:
 *           description: Forbidden Error - User does not have permission.
 *         404:
 *           description: Not Found Error - Endpoint not found.
 */

personRoutes.post('/users',[authorisation],personController.createPerson);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     tags: [Persons]
 *     description: Authenticate a user and return a token.
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
personRoutes.post('/login', personController.loginPerson);

/**
 * @swagger
 * /password:
 *   patch:
 *     summary: Update password
 *     description: Change the password of an authenticated user.
 *     tags: [Persons]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user.
 *               oldPassword:
 *                 type: string
 *                 description: Current password of the user.
 *               newPassword:
 *                 type: string
 *                 description: New password of the user.
 *     responses:
 *       200:
 *         description: OK - Password updated successfully.
 *       400:
 *         description: Bad request - Missing or invalid fields.
 *       401:
 *         description: Unauthorized Error - Missing or invalid JWT token.
 *       403:
 *         description: Forbidden Error - User does not have permission.
 *       404:
 *         description: Not Found Error - User not found.
 */

personRoutes.patch('/password', authorisation, personController.updatePassword);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by their ID.
 *     tags: [Persons]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the user.
 *     responses:
 *       200:
 *         description: OK - User deleted successfully.
 *       400:
 *         description: Bad request - Invalid user ID or missing parameters.
 *       401:
 *         description: Unauthorized Error - Missing or invalid JWT token.
 *       403:
 *         description: Forbidden Error - User does not have permission to delete.
 *       404:
 *         description: Not Found Error - User not found.
 */

personRoutes.delete('/users/:id',authorisation,personController.deletePerson)

export default personRoutes;
