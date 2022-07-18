import { IUser } from "../../entities/user/IUser";
import { User } from "../../entities/user/User";
import { ICreateUserDTO } from "../../shared/types/ICreateUserDTO";
import { IUsersRepository } from "./IUsersRepository";

class InMemoryUsersRepository implements IUsersRepository {
	private users: IUser[] = [];

	async create(data: ICreateUserDTO): Promise<IUser> {
		const user = new User();

		Object.assign(user, { ...data, createdAt: new Date() });

		this.users.push(user);

		return user;
	}

	async findByEmail(email: string): Promise<IUser> {
		return this.users.find((user) => user.email === email);
	}
}

export { InMemoryUsersRepository };
