/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class FixUserRoleUnique1785398875143 {
    name = 'FixUserRoleUnique1785398875143'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "USER" DROP CONSTRAINT "UQ_a85700a0f9486affacd06df36a9"`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "USER" ADD CONSTRAINT "UQ_a85700a0f9486affacd06df36a9" UNIQUE ("role")`);
    }
}
