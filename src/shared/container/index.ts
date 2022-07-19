import { container } from "tsyringe";
import { UsersRepository } from "../../repositories/users/UsersRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { ITodosRepository } from "../../repositories/todos/ITodosRepository";
import { TodosRepository } from "../../repositories/todos/TodosRepository";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<ITodosRepository>("TodosRepository", TodosRepository);
