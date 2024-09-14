import express from "express";
import authRoute from './auth/authRoutes.js';
import storeRoute from './store/storeRoutes.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/store', storeRoute);

export default router;
