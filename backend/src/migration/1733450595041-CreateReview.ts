import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReview1733450595041 implements MigrationInterface {
    name = 'CreateReview1733450595041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "send_user_role" character varying NOT NULL, "body" text NOT NULL, "isGood" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "sendUserId" integer, "receiveUserId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_7642b605955374b78c9eeb676d4" FOREIGN KEY ("sendUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_458ca12bba665deafe372bb9f10" FOREIGN KEY ("receiveUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_458ca12bba665deafe372bb9f10"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_7642b605955374b78c9eeb676d4"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
