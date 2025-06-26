import { body, ValidationChain } from 'express-validator';
import { categories } from '../utils/category';
import { validateField } from '../utils/validation';

const validateTitle = (): ValidationChain => {
  return validateField({
    field: 'title',
    source: body,
    msg: 'Title is required',
  })
    .isLength({ min: 4 })
    .withMessage('Title must be at least 4 characters long');
};

const validateDesc = (): ValidationChain => {
  return validateField({
    field: 'description',
    source: body,
    msg: 'Description is required',
  })
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long');
};

const validateImgUrl = (): ValidationChain => {
  return validateField({
    field: 'imageUrl',
    source: body,
    msg: 'Image not empty 220020',
  }).custom((url) => {
    const isValidUrl = /^https?:\/\/.+$/i.test(url);

    const isBase64Image =
      /^data:image\/(png|jpeg|jpg|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(url);

    if (!isValidUrl && !isBase64Image) {
      throw new Error('Image must be a valid image URL or base64 string');
    }

    return true;
  });
};

const validateLocation = (): ValidationChain => {
  return validateField({
    field: 'location',
    source: body,
    msg: 'Location is required',
  })
    .isLength({ min: 3 })
    .withMessage('Location must be at least 3 characters long');
};

const validateCategory = (): ValidationChain => {
  return validateField({
    field: 'category',
    source: body,
    msg: 'Category is required',
  })
    .isIn(categories)
    .withMessage(`Category must be one of: ${categories.join(', ')}`);
};

export const createPlaceValidator: ValidationChain[] = [
  validateTitle(),
  validateDesc(),
  validateImgUrl(),
  validateLocation(),
  validateCategory(),
];

export const editPlaceValidator: ValidationChain[] = [
  body('title')
    .optional()
    .isLength({ min: 4 })
    .withMessage('Title must be at least 4 characters'),

  body('description')
    .optional()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),

  body('imageUrl')
    .optional()
    .custom((url) => {
      const isValidUrl = /^https?:\/\/.+$/i.test(url);

      const isBase64Image =
        /^data:image\/(png|jpeg|jpg|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(
          url,
        );

      if (!isValidUrl && !isBase64Image) {
        throw new Error('Image must be a valid image URL or base64 string');
      }

      return true;
    }),

  body('location')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Location must be at least 3 characters'),

  body('category')
    .optional()
    .isIn([...categories])
    .withMessage(`Category must be one of: ${categories.join(', ')}`),
];
