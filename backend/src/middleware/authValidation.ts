import { body, Meta, ValidationChain } from 'express-validator';
import bcrypt from 'bcrypt';

import { validateField } from '../utils/validation';
import User from '../models/user';

const validateUsername = (): ValidationChain => {
  return validateField({
    source: body,
    field: 'username',
    msg: 'Username is required',
  })
    .isLength({ min: 3 })
    .isAlphanumeric()
    .withMessage('Min length is three and must only alphanumeric');
};

const validateEmail = (): ValidationChain => {
  return validateField({
    source: body,
    field: 'email',
    msg: 'Email is required',
  })
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail();
};

const validatePassword = (): ValidationChain => {
  return validateField({
    source: body,
    field: 'password',
    msg: 'Password is required',
  }).isStrongPassword({ minLength: 6, minNumbers: 2, minSymbols: 1 });
};

const validateConfirmPw = (): ValidationChain => {
  return validateField({
    source: body,
    field: 'confirmPw',
    msg: 'Confirmation password is required',
  }).custom(async (confirmPw: string, { req }: Meta) => {
    const password = req.body.password;

    if (confirmPw !== password) {
      throw new Error('Confirmation password must match');
    }

    return true;
  });
};

const ValidationUserExist = (): ValidationChain => {
  return body('email').custom(async (email: string) => {
    const user = await User.findOne({ email });

    if (user) {
      throw new Error('User already exists');
    }

    return true;
  });
};

const ValidationIdentifier = (): ValidationChain => {
  return validateField({
    field: 'identifier',
    source: body,
    msg: 'Email or username required',
  }).custom(async (identifier: string) => {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return true;
  });
};

export const signUpValidator: ValidationChain[] = [
  validateUsername(),
  validateEmail(),
  validatePassword(),
  validateConfirmPw(),
  ValidationUserExist(),
];

export const signInValidator: ValidationChain[] = [
  ValidationIdentifier(),
  validatePassword(),
];
