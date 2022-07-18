import { AppError } from "../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/users/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { CreateUserService } from "./CreateUserService";

let usersRepository: IUsersRepository;
let createUserService: CreateUserService;

describe("Create User Service", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		createUserService = new CreateUserService(usersRepository);
	});

	it("should be able to create a new user", async () => {
		const data = {
			name: "Test name",
			email: "test@email.com",
			password: "testPassword",
		};

		await createUserService.execute(data);

		const user = await usersRepository.findByEmail(data.email);

		expect(user).toHaveProperty("id");
		expect(user).toHaveProperty("password");
		expect(user).toHaveProperty("createdAt");
		expect(user.name).toBe(data.name);
		expect(user.email).toBe(data.email);
	});

	it("should not be able to create users with the same email", async () => {
		const data = {
			name: "Test name",
			email: "test@email.com",
			password: "testPassword",
		};

		await createUserService.execute(data);

		await expect(createUserService.execute(data)).rejects.toEqual(
			new AppError("User Already Exists!")
		);
	});
});
