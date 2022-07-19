import { ITodo } from "../../entities/todo/ITodo";

interface ITodosRepository {
	create(name: string, userId: string): Promise<ITodo>;
	delete(id: string): Promise<void>;
	increasePositionsByOne(start?: number, end?: number): Promise<void>;
	decreasePositionsByOne(start?: number, end?: number): Promise<void>;
	findById(id: string): Promise<ITodo>;
	listByUser(userId: string): Promise<ITodo[]>;
}

export { ITodosRepository };
