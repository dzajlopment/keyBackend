import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import AppError from "./utils/AppError";
import globalErrorHandler from "./controllers/errorController";
import { Response, Request, NextFunction, json } from "express";

import userRoute from "./routes/userRouter";
import keysRouter from "./routes/keysRouter";
import roomsRouter from "./routes/roomsRouter";
import rentHistoryRouter from "./routes/rentHistoryRouter";

const app = express();

app.enable("trust proxy");

app.use(cors());
app.options("*", cors());

app.use(helmet());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

const limiter = rateLimit({
	max: 100,
	windowMs: 1000 * 60,
	message: "Too many requests from this IP, please try again in a minute.",
});

app.use("/api", limiter);

app.use(json());

app.use(mongoSanitize());

app.use(compression());

// ROUTES
// default route path: '/api/v1/{route}'

app.use((req, res, next) => {
	(req as any).requestTime = new Date().toISOString();
	next();
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/keys", keysRouter);
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/history", rentHistoryRouter)

app.all("*", async (req, res, next) => {
	new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

app.use(globalErrorHandler);

export default app;
