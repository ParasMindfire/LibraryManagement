import express from 'express';
import { getLibraries,getAllOwners} from '../controllers/libraryController.js';
import { postUsers,getPerson } from '../controllers/personController.js';
import {verifyAuthorisation} from '../controllers/authControllers.js'


const router = express.Router();

router.get('/getLibraries', getLibraries);
router.get('/getOwners',getAllOwners);

router.get('/getPersons',getPerson);
router.post('/postUsers',postUsers);

router.post('/verifyAuthorisation',verifyAuthorisation);


export default router;