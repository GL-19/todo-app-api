import { v4 as uuidV4 } from "uuid";
import { ITodo } from "./ITodo";

class Todo implements ITodo {
	id: string;
	userId: string;
	name: string;
	order: number;
	createdAt: Date;
	isDone: boolean;

	constructor() {
		if (!this.id) {
			this.id = uuidV4();
		}
	}
}

export { Todo };
