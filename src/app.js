import express from 'express';
import dotenv from 'dotenv';
import dbConnect from '../config/db.js';
import appRoutes from './api/routes/indexRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

dbConnect();

app.use('/api/v1', appRoutes);

export default app;
