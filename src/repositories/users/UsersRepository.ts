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
		throw new Error("Method not implemented.");
	}

	async findByEmail(email: string): Promise<IUser> {
		throw new Error("Method not implemented.");
	}

	async findById(id: string): Promise<IUser> {
		throw new Error("Method not implemented.");
	}
}

export { UsersRepository };
