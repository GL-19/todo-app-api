import { Router } from "express";
import { UsersController } from "../controllers/UsersController";

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post("/", usersController.create);

usersRouter.get("/", (req, res) => {
	return res.json({ mes: "teste" });
});

export { usersRouter };
