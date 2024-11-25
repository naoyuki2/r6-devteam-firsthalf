import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsReceivedIsFeedback1732504900813 implements MigrationInterface {
    name = 'AddIsReceivedIsFeedback1732504900813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_user" ADD "isReceived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "room_user" ADD "isFeedback" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_user" DROP COLUMN "isFeedback"`);
        await queryRunner.query(`ALTER TABLE "room_user" DROP COLUMN "isReceived"`);
    }

}
