import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTodoService } from "../services/todos/deleteTodo/DeleteTodoService";
import { CreateTodoService } from "../services/todos/createTodo/CreateTodoService";
import { ListTodosService } from "../services/todos/listTodos/ListTodosService";

class TodosController {
	async create(request: Request, response: Response): Promise<Response> {
		const userId = request.userId;
		const { name } = request.body;

		const createTodoService = container.resolve(CreateTodoService);

		const todo = await createTodoService.execute(name, userId);

		return response.status(201).json({ todo });
	}

	async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const deleteTodoService = container.resolve(DeleteTodoService);

		await deleteTodoService.execute(id);

		return response.json({ message: "Todo deleted!" });
	}

	async list(request: Request, response: Response): Promise<Response> {
		const { userId } = request;
		let { filterOption } = request.query;

		if (filterOption !== "incompleted" && filterOption !== "completed") {
			filterOption = "";
		}

		const listTodosService = container.resolve(ListTodosService);

		const todos = await listTodosService.execute(userId, filterOption);

		return response.json({ todos });
	}
}

export { TodosController };
