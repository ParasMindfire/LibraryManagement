import express from 'express';
import { getLibraries, getAllOwners } from '../controllers/libraryController.js';
import { createPerson, getPerson, loginPerson, updatePassword } from '../controllers/personController.js';
import { createBooks, getAllBooks, updateBooks, deleteBooks, singleBook } from '../controllers/bookController.js';
import { assignBooks, getAllBorrowings, checkDefaulters, getAllfines, updateFines } from '../controllers/borrowingController.js';
import { authorisation } from '../middlewares/auth.js';
const router = express.Router();
/**
 * @swagger
 * /libraries:
 *   get:
 *     summary: Get all libraries
 *     description: Retrieve a list of all libraries in the system.
 *     responses:
 *       200:
 *         description: A list of libraries.
 */
router.get('/libraries', getLibraries);
/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Get all owners
 *     description: Retrieve a list of all library owners.
 *     responses:
 *       200:
 *         description: A list of owners
 */
router.get('/owners', [], getAllOwners);
/**
 * @swagger
 * /persons:
 *   get:
 *     summary: Get all persons
 *     description: Retrieve a list of all persons in the system.
 *     responses:
 *       200:
 *         description: A list of persons.
 */
router.get('/persons', [], getPerson);
router.post('/users', [], createPerson);
router.post('/login', [], loginPerson);
router.put('/password', [authorisation], updatePassword);
router.post('/books', [], createBooks);
router.get('/books', [], getAllBooks);
router.put('/books/:id', [authorisation], updateBooks);
router.get('/books/:id', [], singleBook);
router.delete('/books/:id', [authorisation], deleteBooks);
router.post('/borrowings', [], assignBooks);
router.get('/borrowings', [], getAllBorrowings);
router.get('/defaulters', [], checkDefaulters);
router.get('/fines', [], getAllfines);
router.put('/fines', [], updateFines);
export default router;
