import cors from 'cors';
import express, { json, NextFunction, Response, Request } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import placeRoutes from './routes/placeRoutes';
import { errorHandler } from './middleware/errorHandlers';

const app = express();

app.use(cookieParser());
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL!,
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);
  next();
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/place', placeRoutes);

app.use(errorHandler);

export default app;
