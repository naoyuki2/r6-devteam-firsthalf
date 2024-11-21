import { MigrationInterface, QueryRunner } from "typeorm";

export class IsAgreed1732109086046 implements MigrationInterface {
    name = 'IsAgreed1732109086046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_user" ADD "isAgreed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_user" DROP COLUMN "isAgreed"`);
    }

}
