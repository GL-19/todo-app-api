import { dataSource } from "../../database/dataSource";
import { ITodo } from "../../entities/todo/ITodo";
import { Todo } from "../../entities/todo/Todo";
import { Repository } from "typeorm";
import { ITodosRepository } from "./ITodosRepository";

class TodosRepository implements ITodosRepository {
	private repository: Repository<Todo>;

	constructor() {
		this.repository = dataSource.getRepository(Todo);
	}

	async create(name: string, userId: string): Promise<ITodo> {
		const tableLength = await this.repository.count();

		const todo = await this.repository.create({
			name,
			userId,
			order: tableLength + 1,
		});

		await this.repository.save(todo);

		return todo;
	}

	async delete(id: string): Promise<void> {
		await this.repository.delete({ id });
	}

	async increasePositionsByOne(start: number = 1, end: number): Promise<void> {
		const query = this.repository
			.createQueryBuilder()
			.update(Todo)
			.set({ order: () => "order + 1" })
			.where("order >= :start", { start });

		if (end) {
			query.andWhere("order <= :end", { end });
		}

		await query.execute();
	}

	async decreasePositionsByOne(start: number = 1, end: number): Promise<void> {
		const query = this.repository
			.createQueryBuilder()
			.update(Todo)
			.set({ order: () => "order - 1" })
			.where("order >= :start", { start });

		if (end) {
			query.andWhere("order <= :end", { end });
		}

		await query.execute();
	}

	async findById(id: string): Promise<ITodo> {
		return this.repository.findOneBy({ id });
	}

	async listByUser(userId: string): Promise<ITodo[]> {
		return this.repository.findBy({ userId });
	}
}

export { TodosRepository };
