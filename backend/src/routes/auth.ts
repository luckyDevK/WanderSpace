import { Router } from 'express';

import {
  registerController,
  signinController,
} from '../controllers/authController';
import { signUpValidator, signInValidator } from '../middleware/authValidation';
import { validationRequest } from '../middleware/validationRequest';

const router = Router();

router.post('/signup', signUpValidator, validationRequest, registerController);
router.post('/signin', signInValidator, validationRequest, signinController);

export default router;
