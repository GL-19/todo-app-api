import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../repositories/users/IUsersRepository";
import { AppError } from "../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../../shared/types/ICreateUserDTO";

@injectable()
class CreateUserService {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute(data: ICreateUserDTO): Promise<void> {
		const existingUser = await this.usersRepository.findByEmail(data.email);

		if (existingUser) {
			throw new AppError("User Already Exists!");
		}

		const hashedPassword = await hash(data.password, 8);

		await this.usersRepository.create({ ...data, password: hashedPassword });
	}
}

export { CreateUserService };
