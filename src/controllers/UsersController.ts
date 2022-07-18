import { Request, Response } from "express";
import { CreateUserService } from "../services/createUser/CreateUserService";
import { container } from "tsyringe";

class UsersController {
	async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;

		const createUserService = container.resolve(CreateUserService);

		await createUserService.execute({ name, email, password });

		return response.send();
	}
}

export { UsersController };
