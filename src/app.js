import express from "express";
import "dotenv/config";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import cookieParser from "cookie-parser";
import dbConnect from "../config/db.js";
import appRoutes from "./api/routes/indexRoutes.js";

dbConnect();

const app = express();
app.use(express.json());
app.use(cookieParser());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use("/api", apiLimiter);
app.use(helmet());
app.use(
    cors({
        credentials: true,
    }),
);
app.use(morgan("dev"));

app.use("/api/v1", appRoutes);

app.all("*", (req, res, next) => {
    return res
        .status(404)
        .json({ status: "error", message: "this resource is not available" });
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || "error",
        message: error.message,
        code: error.statusCode || 500,
        data: null,
    });
});

export default app;
