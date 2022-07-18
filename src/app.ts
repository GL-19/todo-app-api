import "reflect-metadata";
import cors from "cors";
import express, { Request, Response } from "express";
import "./shared/container";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	return res.json({ mes: "teste" });
});

export { app };
