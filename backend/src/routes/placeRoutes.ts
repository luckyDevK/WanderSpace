import { Router } from 'express';

import {
  getPlaces,
  createPlace,
  updatePlace,
  deletePlace,
  searchPlaces,
} from '../controllers/placeController';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  createPlaceValidator,
  editPlaceValidator,
} from '../middleware/placeValidation';
import { validationRequest } from '../middleware/validationRequest';

const router = Router();

router.get('/', getPlaces);
router.get('/search', searchPlaces);

router.use(authMiddleware);
router.get('/getUserPlace');
router.post('/create', createPlaceValidator, validationRequest, createPlace);
router.patch(`/update/:id`, editPlaceValidator, validationRequest, updatePlace);
router.delete('/delete/:id', deletePlace);

export default router;
