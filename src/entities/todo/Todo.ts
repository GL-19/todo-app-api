import { User } from "../user/User";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { ITodo } from "./ITodo";

@Entity("todos")
class Todo implements ITodo {
	@PrimaryColumn()
	id: string;

	@Column()
	userId: string;

	@ManyToOne(() => User, "user")
	user: User;

	@Column()
	name: string;

	@Column()
	order: number;

	@CreateDateColumn()
	createdAt: Date;

	@Column("boolean", { default: false })
	isDone: boolean;

	constructor() {
		if (!this.id) {
			this.id = uuidV4();
		}
	}
}

export { Todo };
