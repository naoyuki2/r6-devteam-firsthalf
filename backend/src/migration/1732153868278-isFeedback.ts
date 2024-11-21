import { MigrationInterface, QueryRunner } from "typeorm";

export class IsFeedback1732153868278 implements MigrationInterface {
    name = 'IsFeedback1732153868278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_user" ADD "isFeedback" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "room_user" ADD "isReceive" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_user" DROP COLUMN "isReceive"`);
        await queryRunner.query(`ALTER TABLE "room_user" DROP COLUMN "isFeedback"`);
    }

}
