import cors from 'cors';
import express, { json } from 'express';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import placeRoutes from './routes/placeRoutes';
import { errorHandler } from './middleware/errorHandlers';

const app = express();

app.use(cookieParser());
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/place', placeRoutes);

app.use(errorHandler);

export default app;
