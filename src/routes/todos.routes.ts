import { Router } from "express";
import { TodosController } from "../controllers/TodosController";

const todosRouter = Router();

const todosController = new TodosController();

todosRouter.post("/", todosController.create);

export { todosRouter };
