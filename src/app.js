import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { notFound, globalErrorHandler } from "./middlewares/errorHandler.js";
import appRouter from "./routes/index.js";

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

app.use(passport.initialize());
app.use("/api/v1", appRouter);

app.all("*", notFound);
app.use(globalErrorHandler);

export default app;
