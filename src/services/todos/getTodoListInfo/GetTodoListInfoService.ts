import { inject, injectable } from "tsyringe";
import { ITodosRepository } from "../../../repositories/todos/ITodosRepository";

interface IResponse {
	total: number;
	completed: number;
	incompleted: number;
}

@injectable()
class GetTodoListInfoService {
	constructor(
		@inject("TodosRepository")
		private todosRepository: ITodosRepository
	) {}

	async execute(userId: string): Promise<IResponse> {
		const total = await this.todosRepository.countTodosByUser(userId);
		const completed = await this.todosRepository.countTodosByUser(userId, "completed");
		const incompleted = await this.todosRepository.countTodosByUser(
			userId,
			"incompleted"
		);

		return {
			completed,
			incompleted,
			total,
		};
	}
}

export { GetTodoListInfoService };
