import * as z from 'zod/v4';

export const SignUpSchema = z
  .object({
    username: z
      .string()
      .nonempty('username is required')
      .min(3, 'Username must be at least 3 characters')
      .regex(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric'),
    email: z.email('Invalid email'),
    password: z
      .string()
      .nonempty('password is required')
      .min(6, 'Password too short')
      .regex(/[A-Z]/, 'Must include at least one uppercase letter')
      .regex(/(?:.*\d.*){2,}/, 'Must contain at least 2 numbers')
      .regex(/[^a-zA-Z0-9]/, 'Must contain a symbol'),
    confirmPw: z.string().nonempty('confirmPw is required'),
  })
  .refine((data) => data.password === data.confirmPw, {
    message: "Passwords don't match",
    path: ['confirmPw'],
  });

export const SignInSchema = z.object({
  identifier: z.string().nonempty('Username or email is required'),
  password: z.string().nonempty('Password is required'),
});

export const CreatePlaceSchema = z.object({
  title: z
    .string()
    .nonempty('title is required')
    .min(4, 'Title must be at least 4 characters'),
  description: z.string().nonempty('desc is required').min(10, 'Descir min 10'),
  location: z
    .string()
    .nonempty('location is required')
    .min(5, 'minimal length 5'),
  imageUrl: z
    .string()
    .refine(
      (val) =>
        /^https?:\/\/.+$/i.test(val) ||
        /^data:image\/(png|jpeg|jpg|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(
          val,
        ),
      { error: 'Image URL must be a valid link or base64 image string' },
    ),
});
