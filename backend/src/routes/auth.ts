import { Router } from 'express';

import {
  registerController,
  signinController,
  logoutController,
  refresh,
} from '../controllers/authController';
import { signUpValidator, signInValidator } from '../middleware/authValidation';
import { validationRequest } from '../middleware/validationRequest';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/refresh', refresh);
router.post('/logout', logoutController);
router.post('/signup', signUpValidator, validationRequest, registerController);
router.post('/signin', signInValidator, validationRequest, signinController);

export default router;
