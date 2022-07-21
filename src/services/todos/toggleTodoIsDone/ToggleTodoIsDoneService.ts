import { inject, injectable } from "tsyringe";

import { ITodosRepository } from "../../../repositories/todos/ITodosRepository";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class ToggleTodoIsDoneService {
	constructor(
		@inject("TodosRepository")
		private todosRepository: ITodosRepository
	) {}

	async execute(id: string): Promise<void> {
		const todo = await this.todosRepository.findById(id);

		if (!todo) {
			throw new AppError("Todo not found!");
		}

		await this.todosRepository.updateTodoIsDone(id, !todo.isDone);
	}
}

export { ToggleTodoIsDoneService };
