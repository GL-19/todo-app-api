import { DataSource } from "typeorm";
import { User } from "../entities/user/User";
import { CreateUsers1658187381045 } from "./migrations/1658187381045-CreateUsers";

// use the name of the docker database container as host
const dataSource = new DataSource({
	type: "postgres",
	host: "todo_app_database",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "todo_app_database",
	migrations: [CreateUsers1658187381045],
	entities: [User],
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
