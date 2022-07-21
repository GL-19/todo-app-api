import { inject, injectable } from "tsyringe";

import { ITodosRepository } from "../../../repositories/todos/ITodosRepository";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class ChangeTodoOrder {
	constructor(
		@inject("TodosRepository")
		private todosRepository: ITodosRepository
	) {}

	async execute(id: string, newOrder: number): Promise<void> {
		const todo = await this.todosRepository.findById(id);

		if (!todo) {
			throw new AppError("Todo not found!", 401);
		}

		const todoListSize = await this.todosRepository.countTodosByUser(todo.userId);

		if (newOrder < 1) {
			throw new AppError("The new order must be bigger than 0");
		}

		if (newOrder > todoListSize) {
			throw new AppError("The new order must not be bigger than the user todo list size");
		}

		await this.todosRepository.changeTodoOrder(id, newOrder);
	}
}

export { ChangeTodoOrder };
