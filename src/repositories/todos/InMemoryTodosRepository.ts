import { Todo } from "../../entities/todo/Todo";
import { ITodo } from "../../entities/todo/ITodo";
import { ITodosRepository } from "./ITodosRepository";

class InMemoryTodosRepository implements ITodosRepository {
	increasePositionsByOne(start: number = 1, end: number): Promise<void> {
		throw new Error("Method not implemented.");
	}
	decreasePositionsByOne(start: number = 1, end: number): Promise<void> {
		throw new Error("Method not implemented.");
	}
	private todos: ITodo[] = [];

	async create(name: string, userId: string): Promise<ITodo> {
		const todo = new Todo();

		Object.assign(todo, {
			name,
			userId,
			order: this.todos.length + 1,
			createdAt: new Date(),
			isDone: false,
		});

		this.todos.push(todo);

		return todo;
	}

	async delete(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async findById(id: string): Promise<ITodo> {
		return this.todos.find((todo) => todo.id === id);
	}

	async listByUser(userId: string, option?: string): Promise<ITodo[]> {
		if (!option) {
			return this.todos.filter((todo) => todo.userId === userId);
		}

		if (option === "completed") {
			return this.todos.filter((todo) => todo.userId === userId && todo.isDone);
		}

		if (option === "incompleted") {
			return this.todos.filter((todo) => todo.userId === userId && !todo.isDone);
		}
	}
}

export { InMemoryTodosRepository };
