import { ITodosRepository } from "../../../repositories/todos/ITodosRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class DeleteTodoService {
	constructor(
		@inject("TodosRepository")
		private todosRepository: ITodosRepository
	) {}

	async execute(id: string): Promise<void> {
		const todo = await this.todosRepository.findById(id);

		if (!todo) {
			throw new AppError("Todo not found!", 401);
		}

		await this.todosRepository.delete(id);
	}
}

export { DeleteTodoService };
