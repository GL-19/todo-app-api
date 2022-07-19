import { Repository } from "typeorm";

import { IUsersRepository } from "./IUsersRepository";
import { dataSource } from "../../database/dataSource";
import { IUser } from "../../entities/user/IUser";
import { User } from "../../entities/user/User";
import { ICreateUserDTO } from "../../shared/types/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
	private repository: Repository<User>;

	constructor() {
		this.repository = dataSource.getRepository(User);
	}

	async create(data: ICreateUserDTO): Promise<IUser> {
		const user = this.repository.create(data);

		await this.repository.save(user);

		return user;
	}

	async findByEmail(email: string): Promise<IUser> {
		const user = await this.repository.findOneBy({ email });

		return user;
	}

	async findById(id: string): Promise<IUser> {
		const user = await this.repository.findOneBy({ id });

		return user;
	}
}

export { UsersRepository };
