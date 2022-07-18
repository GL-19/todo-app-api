import { Request, Response } from "express";
import { CreateUserService } from "../services/createUser/CreateUserService";
import { container } from "tsyringe";
import { AuthenticateUserService } from "../services/authenticateUser/AuthenticateUserService";

class UsersController {
	async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;

		const createUserService = container.resolve(CreateUserService);

		await createUserService.execute({ name, email, password });

		return response.status(201).send();
	}

	async authenticate(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		const authenticateUserService = container.resolve(AuthenticateUserService);

		const { user, token } = await authenticateUserService.execute(email, password);

		return response.json({
			user,
			token,
		});
	}
}

export { UsersController };
