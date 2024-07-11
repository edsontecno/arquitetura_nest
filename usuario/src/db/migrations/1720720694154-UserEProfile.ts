import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEProfile1720720694154 implements MigrationInterface {
  name = 'UserEProfile1720720694154';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "resources" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "isMenu" boolean NOT NULL, CONSTRAINT "UQ_f276c867b5752b7cc2c6c797b2b" UNIQUE ("name"), CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "UQ_4e9da7cade0e9edd393329bb326" UNIQUE ("name"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "resources_profiles_profiles" ("resourcesId" integer NOT NULL, "profilesId" integer NOT NULL, CONSTRAINT "PK_8037242ce76893782ea5227ff71" PRIMARY KEY ("resourcesId", "profilesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1903aba25638f148a506363c71" ON "resources_profiles_profiles" ("resourcesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fbd5b65e58edba43ee97483cd0" ON "resources_profiles_profiles" ("profilesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_profiles_profiles" ("usersId" integer NOT NULL, "profilesId" integer NOT NULL, CONSTRAINT "PK_34aab1efc63a7184bcaec5c7ec0" PRIMARY KEY ("usersId", "profilesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1b33a9b8908fb2e0ed28ddab62" ON "users_profiles_profiles" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e04bf374b1143ad226483a7e96" ON "users_profiles_profiles" ("profilesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "resources_profiles_profiles" ADD CONSTRAINT "FK_1903aba25638f148a506363c71b" FOREIGN KEY ("resourcesId") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "resources_profiles_profiles" ADD CONSTRAINT "FK_fbd5b65e58edba43ee97483cd09" FOREIGN KEY ("profilesId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_profiles_profiles" ADD CONSTRAINT "FK_1b33a9b8908fb2e0ed28ddab624" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_profiles_profiles" ADD CONSTRAINT "FK_e04bf374b1143ad226483a7e961" FOREIGN KEY ("profilesId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_profiles_profiles" DROP CONSTRAINT "FK_e04bf374b1143ad226483a7e961"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_profiles_profiles" DROP CONSTRAINT "FK_1b33a9b8908fb2e0ed28ddab624"`,
    );
    await queryRunner.query(
      `ALTER TABLE "resources_profiles_profiles" DROP CONSTRAINT "FK_fbd5b65e58edba43ee97483cd09"`,
    );
    await queryRunner.query(
      `ALTER TABLE "resources_profiles_profiles" DROP CONSTRAINT "FK_1903aba25638f148a506363c71b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e04bf374b1143ad226483a7e96"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1b33a9b8908fb2e0ed28ddab62"`,
    );
    await queryRunner.query(`DROP TABLE "users_profiles_profiles"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fbd5b65e58edba43ee97483cd0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1903aba25638f148a506363c71"`,
    );
    await queryRunner.query(`DROP TABLE "resources_profiles_profiles"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "profiles"`);
    await queryRunner.query(`DROP TABLE "resources"`);
  }
}
