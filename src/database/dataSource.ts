import { DataSource } from "typeorm";
import { User } from "../entities/user/User";

// use the name of the docker database container as host
const dataSource = new DataSource({
	type: "postgres",
	host: "todo_app_database",
	port: 5433,
	username: "postgres",
	password: "postgres",
	database: "todo_app_database",
	migrations: [],
	entities: [User],
});

dataSource
	.initialize()
	.then(() => {
		console.log("Data Source has been initialized!");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});

export { dataSource };
