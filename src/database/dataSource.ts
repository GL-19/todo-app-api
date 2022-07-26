import "dotenv/config";

import { Todo } from "../entities/todo/Todo";
import { DataSource } from "typeorm";
import { User } from "../entities/user/User";
import { CreateUsers1658187381045 } from "./migrations/1658187381045-CreateUsers";
import { CreateTodos1658193995289 } from "./migrations/1658193995289-CreateTodos";

// use the name of the docker database container as host, on dev

const dataSource =
	process.env.ENV === "prod"
		? new DataSource({
				type: "postgres",
				url: process.env.DATABASE_URL,
				ssl: {
					rejectUnauthorized: false,
				},
				migrations: [CreateUsers1658187381045, CreateTodos1658193995289],
				entities: [User, Todo],
		  })
		: new DataSource({
				type: "postgres",
				host: "todo_app_database",
				port: 5432,
				username: "postgres",
				password: "postgres",
				database: "todo_app_database",
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
