import express from 'express';
import libraryRoutes from './libraryRoutes.js';
import personRoutes from './personRoutes.js';
import bookRoutes from './bookRoutes.js';
import borrowingRoutes from './borrowingRoutes.js';
import fineRoutes from './fineRoutes.js';

const router = express.Router();

router.use('/', libraryRoutes);
router.use('/', personRoutes);
router.use('/', bookRoutes);
router.use('/', borrowingRoutes);
router.use('/', fineRoutes);

export default router;
