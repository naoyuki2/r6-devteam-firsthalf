import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCreated1727233298030 implements MigrationInterface {
  name = 'AddCreated1727233298030'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1"`,
    )
    await queryRunner.query(
      `ALTER TABLE "item" RENAME COLUMN "userId" TO "requestId"`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_19c0b0b720d5f41b9b0abf35da4" FOREIGN KEY ("requestId") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_19c0b0b720d5f41b9b0abf35da4"`,
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" date NOT NULL`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "user" ADD "created_at" date NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "item" RENAME COLUMN "requestId" TO "userId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
