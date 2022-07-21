import { Repository } from "typeorm";

import { dataSource } from "../../database/dataSource";
import { ITodo } from "../../entities/todo/ITodo";
import { Todo } from "../../entities/todo/Todo";
import { ITodosRepository } from "./ITodosRepository";

class TodosRepository implements ITodosRepository {
	private repository: Repository<Todo>;

	constructor() {
		this.repository = dataSource.getRepository(Todo);
	}

	async updateTodoIsDone(id: string, isDone: boolean): Promise<void> {
		await this.repository.update({ id }, { isDone });
	}

	async countTodosByUser(userId: string): Promise<number> {
		const userTodosLength = await this.repository.count({ where: { userId } });

		return userTodosLength;
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

	async changeTodoOrder(id: string, newOrder: number): Promise<void> {
		const todo = await this.repository.findOneBy({ id });

		const query = this.repository.createQueryBuilder().update(Todo);

		if (newOrder > todo.order) {
			query
				.set({ order: () => '"order" - 1' })
				.where({ userId: todo.userId })
				.andWhere("order > :currentOrder and order <= :newOrder", {
					currentOrder: todo.order,
					newOrder,
				});
		}

		if (newOrder < todo.order) {
			query
				.set({ order: () => '"order" + 1' })
				.where({ userId: todo.userId })
				.andWhere("order < :currentOrder and order >= :newOrder", {
					currentOrder: todo.order,
					newOrder,
				});
		}

		await query.execute();

		await this.repository.update({ id: todo.id }, { order: newOrder });
	}
}

export { TodosRepository };
