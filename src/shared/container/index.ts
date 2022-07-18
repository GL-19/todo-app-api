import { container } from "tsyringe";
import { UsersRepository } from "../../repositories/users/UsersRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
