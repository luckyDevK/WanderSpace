import cors from 'cors';
import express, { json } from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth';
import placeRoutes from './routes/placeRoutes';
import { errorHandler } from './middleware/errorHandlers';

const app = express();

app.use(cookieParser());
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

app.use('/auth', authRoutes);
app.use('/place', placeRoutes);

app.use(errorHandler);

export default app;
