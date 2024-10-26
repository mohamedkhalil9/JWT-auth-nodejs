import express from 'express';
import dotenv from 'dotenv';
import dbConnect from '../config/db.js';
import appRoutes from './api/routes/indexRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

dbConnect();

app.use('/api/v1', appRoutes);

app.all('*', (req, res, next)=> {
    return res.status(404).json({ status: "error", message: 'this resource is not available'});
})

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || "error", message: error.message, code: error.statusCode || 500, data: null});
})


export default app;
