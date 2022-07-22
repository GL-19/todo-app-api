import { ITodo } from "../../entities/todo/ITodo";

interface ITodosRepository {
	create(name: string, userId: string): Promise<ITodo>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<ITodo>;
	listByUser(userId: string, option?: string): Promise<ITodo[]>;
	clearUserList(userId: string, clearOption: string): Promise<void>;
	changeTodoOrder(id: string, newOrder: number): Promise<void>;
	countTodosByUser(userId: string, option?: string): Promise<number>;
	updateTodoIsDone(id: string, isDone: boolean): Promise<void>;
}

export { ITodosRepository };
