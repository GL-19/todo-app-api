import { container } from "tsyringe";
import { InMemoryUsersRepository } from "../../repositories/users/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

container.registerSingleton<IUsersRepository>(
	"InMemoryUsersRepository",
	InMemoryUsersRepository
);
