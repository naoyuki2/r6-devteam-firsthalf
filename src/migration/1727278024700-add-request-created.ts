import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRequestCreated1727278024700 implements MigrationInterface {
    name = 'AddRequestCreated1727278024700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "request" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "request" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "request" ADD "updated_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "request" ADD "createdAt" date NOT NULL`);
    }

}
