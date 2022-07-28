import "dotenv/config";

import { Todo } from "../entities/todo/Todo";
import { DataSource } from "typeorm";
import { User } from "../entities/user/User";
import { CreateUsers1658187381045 } from "./migrations/1658187381045-CreateUsers";
import { CreateTodos1658193995289 } from "./migrations/1658193995289-CreateTodos";

// use the name of the docker database container as host
const dataSource = new DataSource({
	type: "postgres",
	host: process.env.DATABASE_HOST || "todo_app_database",
	port: Number(process.env.DATABASE_PORT) || 5432,
	username: process.env.DATABASE_USERNAME || "postgres",
	password: process.env.DATABASE_PASSWORD || "postgres",
	database: process.env.DATABASE_NAME || "todo_app_database",
	migrations: [CreateUsers1658187381045, CreateTodos1658193995289],
	entities: [User, Todo],
});

dataSource
	.initialize()
	.then(() => {
		console.log("Data Source has been initialized!");
		dataSource.runMigrations();
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});

export { dataSource };
