import { inject, injectable } from "tsyringe";
import { ITodosRepository } from "../../../repositories/todos/ITodosRepository";
import { ITodo } from "../../../entities/todo/ITodo";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class GetTodoService {
	constructor(
		@inject("TodosRepository")
		private todosRepository: ITodosRepository
	) {}

	async execute(id: string): Promise<ITodo> {
		const todo = await this.todosRepository.findById(id);

		if (!todo) {
			throw new AppError("Todo not found!", 401);
		}

		return todo;
	}
}

export { GetTodoService };
