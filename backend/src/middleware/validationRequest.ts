import { validationResult } from 'express-validator';
import { Response, Request, NextFunction } from 'express';

export function validationRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
}
