import { Todo } from "../../entities/todo/Todo";
import { ITodo } from "../../entities/todo/ITodo";
import { ITodosRepository } from "./ITodosRepository";

class InMemoryTodosRepository implements ITodosRepository {
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

	async findById(id: string): Promise<ITodo> {
		return this.todos.find((todo) => todo.id === id);
	}

	async listByUser(userId: string): Promise<ITodo[]> {
		return this.todos.filter((todo) => todo.userId === userId);
	}
}

export { InMemoryTodosRepository };
