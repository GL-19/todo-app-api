import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { jwt_secret } from "../shared/config/auth";
import { IUser } from "../entities/user/IUser";
import { InMemoryUsersRepository } from "../repositories/users/InMemoryUsersRepository";
import { IUsersRepository } from "../repositories/users/IUsersRepository";
import { ensureAuthenticated } from "./ensureAuthenticated";

let usersRepository: IUsersRepository;
let token: string;
let user: IUser;

describe("Ensure Authenticated Middleware", () => {
	beforeAll(async () => {
		usersRepository = new InMemoryUsersRepository();

		await usersRepository.create({
			name: "Test name",
			email: "test@email.com",
			password: "12345",
		});

		user = await usersRepository.findByEmail("test@email.com");

		token = sign({ id: user.id }, jwt_secret, { expiresIn: "7d" });
	});

	it("shoulbe be able to verify if user is authenticated", async () => {
		const mockRequest = {
			headers: {
				authorization: `Bearer ${token}`,
			},
		} as Request;

		const mockResponse = {} as Response;

		const mockNext = jest.fn() as NextFunction;

		await ensureAuthenticated(mockRequest, mockResponse, mockNext);

		expect(mockNext).toHaveBeenCalled();
		expect(mockNext).toHaveBeenCalledTimes(1);
	});
});
