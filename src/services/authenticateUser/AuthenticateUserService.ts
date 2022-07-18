import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { jwt_secret } from "../../shared/config/auth";
import { AppError } from "../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { User } from "entities/user/User";

interface IAuthenticateResponse {
	user: {
		id: string;
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserService {
	constructor(
		@inject("InMemoryUsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute(email: string, password: string): Promise<IAuthenticateResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError("Email or Password incorrect");
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new AppError("Email or Password incorrect");
		}

		const token = sign({ id: user.id }, jwt_secret, { expiresIn: "7d" });

		return {
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		};
	}
}

export { AuthenticateUserService };
