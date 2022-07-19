import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1658187381045 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const usersTable = new Table({
			name: "users",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true,
				},
				{
					name: "name",
					type: "varchar",
				},
				{
					name: "email",
					type: "varchar",
					isUnique: true,
				},
				{
					name: "password",
					type: "varchar",
				},
				{
					name: "createdAt",
					type: "timestamp",
					default: "now()",
				},
			],
		});

		await queryRunner.createTable(usersTable);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}
}
