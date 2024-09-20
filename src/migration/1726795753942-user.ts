import { MigrationInterface, QueryRunner } from "typeorm";

export class User1726795753942 implements MigrationInterface {
    name = 'User1726795753942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "place" integer NOT NULL, "item" character varying NOT NULL, "limit" date NOT NULL, "description" character varying NOT NULL, "createdAt" date NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "icon" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "travel" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "fast" character varying NOT NULL, "second" character varying NOT NULL, "third" character varying NOT NULL, "purpose" character varying NOT NULL, "start_day" date NOT NULL, "end_day" date NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_657b63ec7adcf2ecf757a490a67" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "travel"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
