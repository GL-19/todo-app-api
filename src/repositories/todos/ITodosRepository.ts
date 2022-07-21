import { ITodo } from "../../entities/todo/ITodo";

interface ITodosRepository {
	create(name: string, userId: string): Promise<ITodo>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<ITodo>;
	listByUser(userId: string, option?: string): Promise<ITodo[]>;
	changeTodoOrder(id: string, newOrder: number): Promise<void>;
	countTodosByUser(userId: string): Promise<number>;
}

export { ITodosRepository };
