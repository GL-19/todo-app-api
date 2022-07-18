import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { AppError } from "../../shared/errors/AppError";
import { ICreateUserDTO } from "../../shared/types/ICreateUserDTO";
import { secret } from "../../shared/config/auth";

@injectable()
class CreateUserUseCase {
	constructor(
		@inject("InMemoryUsersRepository") private usersRepository: IUsersRepository
	) {}

	async execute(data: ICreateUserDTO): Promise<void> {
		const existingUser = await this.usersRepository.findByEmail(data.email);

		if (existingUser) {
			throw new AppError("User Already Exists!");
		}

		const hashedPassword = await hash(data.password, secret);

		await this.usersRepository.create({ ...data, password: hashedPassword });
	}
}

export { CreateUserUseCase };
