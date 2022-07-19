import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { TodosController } from "../controllers/TodosController";

const todosRouter = Router();

const todosController = new TodosController();

todosRouter.post("/", ensureAuthenticated, todosController.create);

export { todosRouter };
