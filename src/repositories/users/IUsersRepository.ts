import { IUser } from "../../entities/user/IUser";
import { ICreateUserDTO } from "../../shared/types/ICreateUserDTO";

interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<IUser>;
	findByEmail(email: string): Promise<IUser>;
}

export { IUsersRepository };
