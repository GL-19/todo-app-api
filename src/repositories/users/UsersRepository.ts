import { IUser } from "entities/user/IUser";
import { ICreateUserDTO } from "shared/types/ICreateUserDTO";
import { IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
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
