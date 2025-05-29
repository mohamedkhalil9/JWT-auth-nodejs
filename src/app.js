import express from "express";
import "dotenv/config";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import dbConnect from "./config/db.js";
import appRoutes from "./routes/indexRoutes.js";

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

app.all("*", notFound);
app.use(errorHandler);

export default app;
