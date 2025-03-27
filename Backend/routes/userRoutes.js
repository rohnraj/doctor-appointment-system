
import express from 'express';
import { userController } from '../controllers/userController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateJWT, userController)

export default router