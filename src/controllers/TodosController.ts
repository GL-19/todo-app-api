import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTodoService } from "../services/todos/deleteTodo/DeleteTodoService";
import { CreateTodoService } from "../services/todos/createTodo/CreateTodoService";
import { ListTodosService } from "../services/todos/listTodos/ListTodosService";
import { GetTodoService } from "../services/todos/getTodo/GetTodoService";
import { ChangeTodoOrder } from "../services/todos/changeTodoOrder/ChangeTodoOrder";
import { ToggleTodoIsDoneService } from "../services/todos/toggleTodoIsDone/ToggleTodoIsDoneService";
import { ClearTodoListService } from "../services/todos/clearTodoList/ClearTodoListService";

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

	async get(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const getTodoService = container.resolve(GetTodoService);

		const todo = await getTodoService.execute(id);

		return response.json({ todo });
	}

	// validate that newOrder is an int
	async updateTodoOrder(request: Request, response: Response): Promise<Response> {
		const { id, newOrder } = request.body;

		const changeTodoOrder = container.resolve(ChangeTodoOrder);

		const todo = await changeTodoOrder.execute(id, newOrder);

		return response.status(201).send();
	}

	async updateTodoIsDone(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const toggleTodoIsDoneService = container.resolve(ToggleTodoIsDoneService);

		await toggleTodoIsDoneService.execute(id);

		return response.status(201).send();
	}

	//if there is no query option, shuould clear completed todos by default
	async clearList(request: Request, response: Response): Promise<Response> {
		const { userId } = request;
		const { option } = request.query;

		let clearOption: string;

		if (option !== "incompleted" && option !== "all") {
			clearOption = "completed";
		} else {
			clearOption = option;
		}

		const clearTodoListService = container.resolve(ClearTodoListService);

		await clearTodoListService.execute(userId, clearOption);

		return response.send();
	}
}

export { TodosController };
