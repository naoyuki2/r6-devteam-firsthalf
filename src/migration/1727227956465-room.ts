import { MigrationInterface, QueryRunner } from "typeorm";

export class Room1727227956465 implements MigrationInterface {
    name = 'Room1727227956465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" date NOT NULL, "isClosed" boolean NOT NULL DEFAULT false, "requestId" integer, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_1ce580b76f10b29dc16649d94e4" FOREIGN KEY ("requestId") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_1ce580b76f10b29dc16649d94e4"`);
        await queryRunner.query(`DROP TABLE "room"`);
    }

}
