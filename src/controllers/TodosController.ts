import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTodoService } from "../services/todos/createTodo/CreateTodoService";

class TodosController {
	async create(request: Request, response: Response): Promise<Response> {
		const userId = request.userId;
		const { name } = request.body;

		const createTodoService = container.resolve(CreateTodoService);

		const todo = await createTodoService.execute(name, userId);

		return response.status(201).json({ todo });
	}
}

export { TodosController };
