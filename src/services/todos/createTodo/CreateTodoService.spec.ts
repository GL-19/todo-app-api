import { InMemoryTodosRepository } from "../../../repositories/todos/InMemoryTodosRepository";
import { ITodosRepository } from "../../../repositories/todos/ITodosRepository";
import { CreateTodoService } from "./CreateTodoService";

let todosRepository: ITodosRepository;
let createTodoService: CreateTodoService;

describe("Create Todo Service", () => {
	beforeEach(() => {
		todosRepository = new InMemoryTodosRepository();
		createTodoService = new CreateTodoService(todosRepository);
	});

	it("should be able to create a new todo", async () => {
		const todo = await createTodoService.execute("test", "12345");

		expect(todo).toHaveProperty("id");
		expect(todo).toHaveProperty("createdAt");
		expect(todo.name).toBe("test");
		expect(todo.userId).toBe("12345");
		expect(todo.isDone).toBeFalsy();
		expect(todo.order).toBe(1);
	});
});
