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
		const userTodosLength = await this.repository.count({ where: { userId } });

		const todo = await this.repository.create({
			name,
			userId,
			order: userTodosLength + 1,
		});

		await this.repository.save(todo);

		return todo;
	}

	async delete(id: string): Promise<void> {
		const todo = await this.repository.findOneBy({ id });

		await this.repository.delete({ id });

		const reorderUserTodosQuery = this.repository
			.createQueryBuilder()
			.update(Todo)
			.set({ order: () => '"order" - 1' })
			.where({ userId: todo.userId })
			.andWhere("order >= :currentOrder", { currentOrder: todo.order });

		await reorderUserTodosQuery.execute();
	}

	async increasePositionsByOne(start: number = 1, end?: number): Promise<void> {
		const query = this.repository
			.createQueryBuilder()
			.update(Todo)
			.set({ order: () => '"order" + 1' });

		if (start) {
			query.andWhere("order >= :start", { start });
		}

		if (end) {
			query.andWhere("order <= :end", { end });
		}

		await query.execute();
	}

	async decreasePositionsByOne(start: number, end: number): Promise<void> {
		const query = this.repository
			.createQueryBuilder()
			.update(Todo)
			.set({ order: () => '"order" - 1' });

		if (start) {
			query.andWhere("order >= :start", { start });
		}

		if (end) {
			query.andWhere("order <= :end", { end });
		}

		await query.execute();
	}

	async findById(id: string): Promise<ITodo> {
		return this.repository.findOneBy({ id });
	}

	async listByUser(userId: string, option?: string): Promise<ITodo[]> {
		if (!option) {
			return this.repository.find({
				where: {
					userId,
				},
				order: {
					order: "ASC",
				},
			});
		}

		if (option === "completed") {
			return this.repository.find({
				where: {
					userId,
					isDone: true,
				},
				order: {
					order: "ASC",
				},
			});
		}

		if (option === "incompleted") {
			return this.repository.find({
				where: {
					userId,
					isDone: false,
				},
				order: {
					order: "ASC",
				},
			});
		}
	}
}

export { TodosRepository };
