import { MigrationInterface, QueryRunner } from 'typeorm';

export class extension1711397832373 implements MigrationInterface {
  name = 'extension1711397832373';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "test_classes" ADD "extension" text NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "test_classes" DROP COLUMN "extension"');
  }
}
