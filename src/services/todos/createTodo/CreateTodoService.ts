import { ITodosRepository } from "../../../repositories/todos/ITodosRepository";

import { inject, injectable } from "tsyringe";
import { ITodo } from "../../../entities/todo/ITodo";

@injectable()
class CreateTodoService {
	constructor(
		@inject("TodosRepository")
		private todosRepository: ITodosRepository
	) {}

	async execute(name: string, userId: string): Promise<ITodo> {
		const todo = await this.todosRepository.create(name, userId);

		return todo;
	}
}

export { CreateTodoService };
