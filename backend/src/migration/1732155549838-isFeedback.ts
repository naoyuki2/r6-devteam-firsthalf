import { MigrationInterface, QueryRunner } from "typeorm";

export class IsFeedback1732155549838 implements MigrationInterface {
    name = 'IsFeedback1732155549838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_user" RENAME COLUMN "isReceive" TO "isReceived"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_user" RENAME COLUMN "isReceived" TO "isReceive"`);
    }

}
