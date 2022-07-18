import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { IUser } from "./IUser";

@Entity("users")
class User implements IUser {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	constructor() {
		if (!this.id) {
			this.id = uuidV4();
		}
	}
}

export { User };
