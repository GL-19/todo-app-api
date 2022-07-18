interface ITodo {
	id: string;
	userId: string;
	name: string;
	order: number;
	createdAt: Date;
	isDone: boolean;
}

export { ITodo };
