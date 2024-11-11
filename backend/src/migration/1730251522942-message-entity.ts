import { MigrationInterface, QueryRunner } from "typeorm";

export class MessageEntity1730251522942 implements MigrationInterface {
    name = 'MessageEntity1730251522942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "created_at" date NOT NULL`);
    }

}
