import express from 'express';
import dotenv from 'dotenv';
import appRoutes from './routes/indexRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/v1', appRoutes);

export default app;
