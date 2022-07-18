import "reflect-metadata";
import "express-async-errors";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import "./shared/container";
import { AppError } from "./shared/errors/AppError";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.get("/", async (req: Request, res: Response) => {
	return res.json({ mes: "teste" });
});

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		response.status(error.statusCode).json({ message: error.message });
	}

	console.log(error);

	response.status(500).json({
		message: `Internal Server Error - ${error.message}`,
	});
});

export { app };
