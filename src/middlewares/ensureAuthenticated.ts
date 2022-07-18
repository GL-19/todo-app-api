import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { UsersRepository } from "../repositories/users/UsersRepository";

import { jwt_secret } from "../shared/config/auth";
import { AppError } from "../shared/errors/AppError";

async function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const usersRepository = new UsersRepository();

	const { authorization } = request.headers;

	if (!authorization) {
		throw new AppError("Authorization header missing!", 401);
	}

	const token = authorization.split(" ")[1];

	if (!token) {
		throw new AppError("Token missing!", 401);
	}

	try {
		const payload = verify(token, jwt_secret) as JwtPayload;

		const userId = payload.id;

		const user = await usersRepository.findById(userId);

		if (!user) {
			throw new AppError("User not found!", 404);
		}

		request.userId = userId;

		return next();
	} catch (error) {
		if (error instanceof AppError) {
			throw new AppError(error.message, error.statusCode);
		}

		throw new AppError("Invalid token!", 401);
	}
}

export { ensureAuthenticated };
