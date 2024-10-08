import { MigrationInterface, QueryRunner } from "typeorm";

export class RoomuserMessage1727321269772 implements MigrationInterface {
    name = 'RoomuserMessage1727321269772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room_user" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, "roomId" uuid, "userId" integer, CONSTRAINT "PK_4bae79e46b7d9395a7ebdf86423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "body" text NOT NULL, "createdAt" date NOT NULL, "roomId" uuid, "userId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room_user" ADD CONSTRAINT "FK_507b03999779b22e06538595dec" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_user" ADD CONSTRAINT "FK_27dad61266db057665ee1b13d3d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c"`);
        await queryRunner.query(`ALTER TABLE "room_user" DROP CONSTRAINT "FK_27dad61266db057665ee1b13d3d"`);
        await queryRunner.query(`ALTER TABLE "room_user" DROP CONSTRAINT "FK_507b03999779b22e06538595dec"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "room_user"`);
    }

}
