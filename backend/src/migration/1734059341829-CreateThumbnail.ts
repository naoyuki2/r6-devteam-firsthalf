import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateThumbnail1734059341829 implements MigrationInterface {
    name = 'CreateThumbnail1734059341829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" ADD "thumbnail_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "thumbnail_url"`);
    }

}
