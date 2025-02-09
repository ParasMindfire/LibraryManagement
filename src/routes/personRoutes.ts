import { Router } from "express";
import { personController } from "../controllers/index.js";
import { authorisation } from "../middlewares/auth.js";

const personRoutes = Router();

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
 *   - name: Persons
 *     description: Person management
 */



/**
 * @swagger
 * /persons:
 *   get:
 *     summary: Get all persons
 *     tags: [Persons]
 *     security:
 *       - authorization: []
 *     responses:
 *       200:
 *         description: List of persons.
 *       500:
 *         description: Internal server error.
 */
personRoutes.get('/persons',[authorisation],personController.getPerson);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Persons]
 *     security:
 *       - authorization: []
 *     description: Register a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fname
 *               - lname
 *               - phone
 *               - address
 *               - roles
 *               - reqEmail
 *             properties:
 *               fname:
 *                 type: string
 *                 description: First name of the user.
 *               lname:
 *                 type: string
 *                 description: Last name of the user.
 *               phone:
 *                 type: string
 *                 description: Phone number of the user.
 *               address:
 *                 type: string
 *                 description: Address of the user.
 *               roles:
 *                 type: string
 *                 description: Role of the user.
 *               reqEmail:
 *                 type: string
 *                 format: email
 *                 description: Email of the user.
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Internal Server Error.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 description: oldPassword of the user.
 *               password:
 *                 type: string
 *                 description: newPassword of the user.
 *     tags: [Persons]
 *     security:
 *       - authorization: []
 *     description: Change the password of an authenticated user.
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
personRoutes.patch('/password', authorisation, personController.updatePassword);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete User
 *     tags: [Persons]
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the User.
 *     description: Delete the user.
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
personRoutes.delete('/users/:id',authorisation,personController.deletePerson)

export default personRoutes;
