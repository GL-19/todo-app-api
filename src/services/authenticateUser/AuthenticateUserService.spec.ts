import { hash } from "bcryptjs";
import { AppError } from "../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/users/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { AuthenticateUserService } from "./AuthenticateUserService";

let usersRepository: IUsersRepository;
let authenticateUserService: AuthenticateUserService;

describe("Authenticate User Service", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		authenticateUserService = new AuthenticateUserService(usersRepository);
	});

	it("should be able to authenticate an user", async () => {
		const password = "test123";
		const hashedPassword = await hash(password, 8);

		await usersRepository.create({
			name: "Test Name",
			email: "test@email.com",
			password: hashedPassword,
		});

		const response = await authenticateUserService.execute("test@email.com", password);

		expect(response).toHaveProperty("token");
		expect(response).toHaveProperty("user");
		expect(response.user).toHaveProperty("id");
		expect(response.user.name).toBe("Test Name");
		expect(response.user.email).toBe("test@email.com");
	});

	it("should not be able to authenticate an user that does not exist", async () => {
		await expect(
			authenticateUserService.execute("test@email.com", "password")
		).rejects.toEqual(new AppError("Email or Password incorrect"));
	});

	it("should not be able to authenticate an user with incorrect password", async () => {
		const password = "correctPassword";
		const hashedPassword = await hash(password, 8);

		await usersRepository.create({
			name: "Test Name",
			email: "test@email.com",
			password: hashedPassword,
		});

		await expect(
			authenticateUserService.execute("test@email.com", "incorrect")
		).rejects.toEqual(new AppError("Email or Password incorrect"));
	});
});
