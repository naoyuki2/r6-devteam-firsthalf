import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserRequestItem1727225219866 implements MigrationInterface {
  name = 'UserRequestItem1727225219866'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "delivery_location" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "delivery_date" DROP NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "completed_at" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "completed_at" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "delivery_date" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "delivery_location" SET NOT NULL`,
    )
  }
}
