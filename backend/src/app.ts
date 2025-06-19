import cors from 'cors';
import express, { json } from 'express';

import authRoutes from './routes/auth';
import placeRoutes from './routes/placeRoutes';
import { errorHandler } from './middleware/errorHandlers';

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/place', placeRoutes);

app.use(errorHandler);

export default app;
