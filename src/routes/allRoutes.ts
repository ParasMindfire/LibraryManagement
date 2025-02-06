import express from 'express';
import { getLibraries,getAllOwners} from '../controllers/libraryController.js';
import { createPerson,getPerson,loginPerson,updatePassword} from '../controllers/personController.js';
import { authorisation } from '../middlewares/auth.js';


const router = express.Router();

router.get('/getLibraries',[],getLibraries);
router.get('/getOwners',[],getAllOwners);

router.get('/getPersons',[],getPerson);
router.post('/postUsers',[],createPerson);
router.post('/loginPerson',[],loginPerson);
router.post('/updatePassword',[authorisation],updatePassword);




export default router;