import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import "./shared/container";
import { AppError } from "./shared/errors/AppError";
import { router } from "./routes";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.get("/", ensureAuthenticated, async (req: Request, res: Response) => {
	return res.json({ mes: "authenticated with success", userId: req.userId });
});

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({ message: error.message });
	}

	console.log(error);

	return response.status(500).json({
		message: `Internal Server Error - ${error.message}`,
	});
});

export { app };
