import { MigrationInterface, QueryRunner } from "typeorm";

export class RequestColor1733109002780 implements MigrationInterface {
    name = 'RequestColor1733109002780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "color" SET DEFAULT '#84C9EF'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "color" SET DEFAULT '84C9EF'`);
    }

}
