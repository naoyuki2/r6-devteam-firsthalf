import { MigrationInterface, QueryRunner } from "typeorm";

export class RoomColumnUpdate1729557426899 implements MigrationInterface {
    name = 'RoomColumnUpdate1729557426899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "created_at" date NOT NULL`);
    }

}
