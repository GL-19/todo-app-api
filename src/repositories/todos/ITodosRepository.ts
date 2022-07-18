import { ITodo } from "../../entities/todo/ITodo";

interface ITodosRepository {
	create(name: string, userId: string): Promise<ITodo>;
}

export { ITodosRepository };
