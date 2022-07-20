import { inject, injectable } from "tsyringe";

import { ITodo } from "../../../entities/todo/ITodo";
import { ITodosRepository } from "../../../repositories/todos/ITodosRepository";

@injectable()
class ListTodosService {
	constructor(
		@inject("TodosRepository")
		private todosRespository: ITodosRepository
	) {}

	async execute(userId: string, option?: string): Promise<ITodo[]> {
		const todos = await this.todosRespository.listByUser(userId, option);

		return todos;
	}
}

export { ListTodosService };
