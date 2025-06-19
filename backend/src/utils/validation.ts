import { ValidationChain, FieldMessageFactory } from 'express-validator';

type SourceFn = (
  fields?: string | string[] | undefined,
  message?: FieldMessageFactory | undefined,
) => ValidationChain;

interface ValidateFieldProps {
  source: SourceFn;
  field: string;
  msg: string;
}

export function validateField({
  source,
  field,
  msg,
}: ValidateFieldProps): ValidationChain {
  return source(field).trim().notEmpty().withMessage(msg);
}
