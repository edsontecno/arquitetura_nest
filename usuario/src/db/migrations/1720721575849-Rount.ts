import { MigrationInterface, QueryRunner } from "typeorm";

export class Rount1720721575849 implements MigrationInterface {
    name = 'Rount1720721575849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resources" ADD "route" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "route"`);
    }

}
