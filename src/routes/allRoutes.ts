import express from 'express';
import { getLibraries,getAllOwners} from '../controllers/libraryController.js';
import { createPerson,getPerson,loginPerson,updatePassword} from '../controllers/personController.js';
import { createBooks,getAllBooks,updateBooks,deleteBooks,singleBook} from '../controllers/bookController.js';
import { assignBooks,getAllBorrowings,checkDefaulters,getAllfines,updateFines} from '../controllers/borrowingController.js';
import { authorisation } from '../middlewares/auth.js';


const router = express.Router();

router.get('/libraries', [], getLibraries); 
router.get('/owners', [], getAllOwners);

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










