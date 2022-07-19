import { Router } from "express";
import { usersRouter } from "./users.routes";
import { todosRouter } from "./todos.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/todos", todosRouter);

export { router };
