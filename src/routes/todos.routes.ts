import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { TodosController } from "../controllers/TodosController";

const todosRouter = Router();

const todosController = new TodosController();

todosRouter.get("/", ensureAuthenticated, todosController.list);

todosRouter.post("/", ensureAuthenticated, todosController.create);

todosRouter.get("/:id", ensureAuthenticated, todosController.get);

todosRouter.delete("/:id", ensureAuthenticated, todosController.delete);

todosRouter.patch("/:id", ensureAuthenticated, todosController.toggleTodoIsDone);

todosRouter.post("/change-order", ensureAuthenticated, todosController.changeTodoOrder);

export { todosRouter };
