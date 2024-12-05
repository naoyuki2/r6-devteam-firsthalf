import { MigrationInterface, QueryRunner } from "typeorm";

export class DraftItemCascade1731832921782 implements MigrationInterface {
    name = 'DraftItemCascade1731832921782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "draft_item" DROP CONSTRAINT "FK_310e4ce048e2a4b26e65cd02d51"`);
        await queryRunner.query(`ALTER TABLE "draft_item" ADD CONSTRAINT "FK_310e4ce048e2a4b26e65cd02d51" FOREIGN KEY ("draftRequestId") REFERENCES "draft_request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "draft_item" DROP CONSTRAINT "FK_310e4ce048e2a4b26e65cd02d51"`);
        await queryRunner.query(`ALTER TABLE "draft_item" ADD CONSTRAINT "FK_310e4ce048e2a4b26e65cd02d51" FOREIGN KEY ("draftRequestId") REFERENCES "draft_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
