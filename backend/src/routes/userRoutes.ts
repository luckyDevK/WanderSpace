import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getCurrentUserController } from '../controllers/userController';

const router = Router();

router.get('/me', authMiddleware, getCurrentUserController);

export default router;
