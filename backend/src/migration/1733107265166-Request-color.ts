import { MigrationInterface, QueryRunner } from "typeorm";

export class RequestColor1733107265166 implements MigrationInterface {
    name = 'RequestColor1733107265166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" ADD "color" character varying NOT NULL DEFAULT '84C9EF'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "color"`);
    }

}
