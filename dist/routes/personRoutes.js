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
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: List of persons.
 *       500:
 *         description: Internal server error.
 */
personRoutes.get('/persons', personController.getPerson);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Persons]
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
 *               - email
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
 *               email:
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
personRoutes.post('/users', personController.createPerson);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Persons]
 *     description: Authenticate a user and return a token.
 *     responses:
 *       200:
 *         description: Login successful.
 */
personRoutes.post('/login', personController.loginPerson);
/**
 * @swagger
 * /password:
 *   put:
 *     summary: Update password
 *     tags: [Persons]
 *     description: Change the password of an authenticated user.
 *     responses:
 *       200:
 *         description: Password updated successfully.
 */
personRoutes.put('/password', authorisation, personController.updatePassword);
export default personRoutes;
