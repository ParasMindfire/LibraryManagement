import express from 'express';
import { getNotes, addNotes } from '../controllers/noteController.js';
const router = express.Router();
router.get('/notes', getNotes);
router.post('/addnotes', addNotes);
export default router;
