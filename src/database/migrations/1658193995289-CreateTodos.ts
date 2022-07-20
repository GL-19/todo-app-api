import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTodos1658193995289 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const todosTable = new Table({
			name: "todos",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true,
				},
				{
					name: "userId",
					type: "uuid",
				},
				{
					name: "name",
					type: "varchar",
				},
				{
					name: "order",
					type: "integer",
					isNullable: false,
				},
				{
					name: "createdAt",
					type: "timestamp",
					default: "now()",
				},
				{
					name: "isDone",
					type: "boolean",
					default: false,
				},
			],
			foreignKeys: [
				{
					name: "FKUser",
					referencedTableName: "users",
					referencedColumnNames: ["id"],
					columnNames: ["userId"],
					onDelete: "CASCADE",
					onUpdate: "CASCADE",
				},
			],
		});

		await queryRunner.createTable(todosTable);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("todos");
	}
}
