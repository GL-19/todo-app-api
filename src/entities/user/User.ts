import { v4 as uuidV4 } from "uuid";
import { IUser } from "./IUser";

class User implements IUser {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;

	constructor() {
		if (!this.id) {
			this.id = uuidV4();
		}
	}
}

export { User };
