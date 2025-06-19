import { Router } from 'express';

import { getPlaces, createPlace } from '../controllers/placeController';
import { authMiddleware } from '../middleware/authMiddleware';
import { createPlaceValidator } from '../middleware/placeValidation';

const router = Router();

router.get('/', getPlaces);
router.post('/create', authMiddleware, createPlaceValidator, createPlace);

export default router;
