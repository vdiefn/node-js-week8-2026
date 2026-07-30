/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class UpdateSchemaSetting1785401919444 {
    name = 'UpdateSchemaSetting1785401919444'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "SUBJECT" ADD "subjectId" uuid`);
        await queryRunner.query(`ALTER TABLE "GRADE" ADD "subject_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "STUDENT" DROP CONSTRAINT "FK_4fb1ca1a74779f553a538b83e26"`);
        await queryRunner.query(`ALTER TABLE "STUDENT" ALTER COLUMN "class_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "GRADE" DROP CONSTRAINT "FK_92c82e6528220f8ca6b202c8fef"`);
        await queryRunner.query(`ALTER TABLE "GRADE" ALTER COLUMN "student_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "SUBJECT" ADD CONSTRAINT "FK_232bc4949c8126beaf0131e6d36" FOREIGN KEY ("subjectId") REFERENCES "SUBJECT"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "STUDENT" ADD CONSTRAINT "FK_4fb1ca1a74779f553a538b83e26" FOREIGN KEY ("class_id") REFERENCES "CLASS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "GRADE" ADD CONSTRAINT "FK_92c82e6528220f8ca6b202c8fef" FOREIGN KEY ("student_id") REFERENCES "STUDENT"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "GRADE" ADD CONSTRAINT "FK_d173d08c8481c8331a3cb48b715" FOREIGN KEY ("subject_id") REFERENCES "SUBJECT"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "GRADE" DROP CONSTRAINT "FK_d173d08c8481c8331a3cb48b715"`);
        await queryRunner.query(`ALTER TABLE "GRADE" DROP CONSTRAINT "FK_92c82e6528220f8ca6b202c8fef"`);
        await queryRunner.query(`ALTER TABLE "STUDENT" DROP CONSTRAINT "FK_4fb1ca1a74779f553a538b83e26"`);
        await queryRunner.query(`ALTER TABLE "SUBJECT" DROP CONSTRAINT "FK_232bc4949c8126beaf0131e6d36"`);
        await queryRunner.query(`ALTER TABLE "GRADE" ALTER COLUMN "student_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "GRADE" ADD CONSTRAINT "FK_92c82e6528220f8ca6b202c8fef" FOREIGN KEY ("student_id") REFERENCES "STUDENT"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "STUDENT" ALTER COLUMN "class_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "STUDENT" ADD CONSTRAINT "FK_4fb1ca1a74779f553a538b83e26" FOREIGN KEY ("class_id") REFERENCES "CLASS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "GRADE" DROP COLUMN "subject_id"`);
        await queryRunner.query(`ALTER TABLE "SUBJECT" DROP COLUMN "subjectId"`);
    }
}
