import e from "express";

import authRoutes from './authRoutes.js';
import userDetailsRoutes from './userRoutes.js';
import cardRoutes from './cardRoutes.js';

const router = e.Router();

router.use('/auth', authRoutes);
router.use('/details', userDetailsRoutes);
router.use('/card', cardRoutes);

router.get('/health', (_req, res) => res.status(200).send('OK'));
router.all('*', (_req, res) => res.status(404).send('Invalid path'));

export default router;
