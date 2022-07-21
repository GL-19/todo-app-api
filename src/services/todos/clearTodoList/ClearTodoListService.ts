import { inject, injectable } from "tsyringe";

import { ITodosRepository } from "../../../repositories/todos/ITodosRepository";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class ClearTodoListService {
	constructor(
		@inject("TodosRepository")
		private todosRepository: ITodosRepository
	) {}

	async execute(userId: string, clearOption: string): Promise<void> {
		if (
			clearOption !== "all" &&
			clearOption !== "completed" &&
			clearOption !== "incompleted"
		) {
			throw new AppError("Invalid clear option!");
		}

		await this.todosRepository.clearUserList(userId, clearOption);
	}
}

export { ClearTodoListService };
