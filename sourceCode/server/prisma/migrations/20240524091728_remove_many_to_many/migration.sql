/*
  Warnings:

  - You are about to drop the `_t_activiteTot_ruche` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_t_activiteTot_ruche` DROP FOREIGN KEY `_t_activiteTot_ruche_A_fkey`;

-- DropForeignKey
ALTER TABLE `_t_activiteTot_ruche` DROP FOREIGN KEY `_t_activiteTot_ruche_B_fkey`;

-- AlterTable
ALTER TABLE `t_activite` ADD COLUMN `fkRuche` INTEGER UNSIGNED NOT NULL DEFAULT 5;

-- DropTable
DROP TABLE `_t_activiteTot_ruche`;

-- AddForeignKey
ALTER TABLE `t_activite` ADD CONSTRAINT `t_activite_fkRuche_fkey` FOREIGN KEY (`fkRuche`) REFERENCES `t_ruche`(`idRuche`) ON DELETE RESTRICT ON UPDATE CASCADE;
