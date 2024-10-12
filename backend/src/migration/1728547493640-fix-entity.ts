import { MigrationInterface, QueryRunner } from "typeorm";

export class FixEntity1728547493640 implements MigrationInterface {
    name = 'FixEntity1728547493640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" RENAME COLUMN "createdAt" TO "created_at"`);
        await queryRunner.query(`ALTER TABLE "room" RENAME COLUMN "createdAt" TO "created_at"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "delivery_location"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "delivery_date"`);
        await queryRunner.query(`ALTER TABLE "request" ADD "delivery_prefecture" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "request" ADD "delivery_details" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "delivery_details"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "delivery_prefecture"`);
        await queryRunner.query(`ALTER TABLE "request" ADD "delivery_date" date`);
        await queryRunner.query(`ALTER TABLE "request" ADD "delivery_location" character varying`);
        await queryRunner.query(`ALTER TABLE "room" RENAME COLUMN "created_at" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "message" RENAME COLUMN "created_at" TO "createdAt"`);
    }

}
