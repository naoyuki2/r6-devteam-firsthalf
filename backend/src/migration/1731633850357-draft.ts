import { MigrationInterface, QueryRunner } from "typeorm";

export class Draft1731633850357 implements MigrationInterface {
    name = 'Draft1731633850357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "draft_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "draftRequestId" integer, CONSTRAINT "PK_cec9bb5bed08b5a738ca753f5ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "draft_request" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "location_prefecture" character varying NOT NULL, "location_details" character varying NOT NULL, "delivery_prefecture" character varying NOT NULL, "delivery_details" character varying, "description" text NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "completed_at" date, "roomId" uuid, CONSTRAINT "PK_0b18f47e332cbfedbba23c36a5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "draft_item" ADD CONSTRAINT "FK_310e4ce048e2a4b26e65cd02d51" FOREIGN KEY ("draftRequestId") REFERENCES "draft_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "draft_request" ADD CONSTRAINT "FK_145540acfd1dae9532f5c301849" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "draft_request" DROP CONSTRAINT "FK_145540acfd1dae9532f5c301849"`);
        await queryRunner.query(`ALTER TABLE "draft_item" DROP CONSTRAINT "FK_310e4ce048e2a4b26e65cd02d51"`);
        await queryRunner.query(`DROP TABLE "draft_request"`);
        await queryRunner.query(`DROP TABLE "draft_item"`);
    }

}
