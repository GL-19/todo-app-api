import { Todo } from "../../entities/todo/Todo";
import { ITodo } from "../../entities/todo/ITodo";
import { ITodosRepository } from "./ITodosRepository";

class InMemoryTodosRepository implements ITodosRepository {
	async countTodosByUser(userId: string): Promise<number> {
		throw new Error("Method not implemented.");
	}
	async changeTodoOrder(id: string, newOrder: number): Promise<void> {
		throw new Error("Method not implemented.");
	}

	private todos: ITodo[] = [];

	async create(name: string, userId: string): Promise<ITodo> {
		const todo = new Todo();

		const order = this.todos.filter((todo) => todo.userId === userId).length;

		Object.assign(todo, {
			name,
			userId,
			order: order + 1,
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
