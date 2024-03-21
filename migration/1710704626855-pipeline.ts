import { MigrationInterface, QueryRunner } from "typeorm";

export class pipeline1710704626855 implements MigrationInterface {
    name = 'pipeline1710704626855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_classes" DROP CONSTRAINT "FK_c06978826b9426582bdca202644"`);
        await queryRunner.query(`ALTER TABLE "test_classes" DROP COLUMN "scaffolding"`);
        await queryRunner.query(`ALTER TABLE "test_classes" DROP COLUMN "scaffolding_class_id"`);
        await queryRunner.query(`ALTER TABLE "test_classes" ADD "name" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_classes" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "test_classes" ADD "scaffolding_class_id" integer`);
        await queryRunner.query(`ALTER TABLE "test_classes" ADD "scaffolding" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "test_classes" ADD CONSTRAINT "FK_c06978826b9426582bdca202644" FOREIGN KEY ("scaffolding_class_id") REFERENCES "test_classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
