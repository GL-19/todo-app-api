import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { TodosController } from "../controllers/TodosController";

const todosRouter = Router();

const todosController = new TodosController();

todosRouter.get("/", ensureAuthenticated, todosController.list);

todosRouter.post("/", ensureAuthenticated, todosController.create);

todosRouter.delete("/:id", ensureAuthenticated, todosController.delete);

export { todosRouter };
