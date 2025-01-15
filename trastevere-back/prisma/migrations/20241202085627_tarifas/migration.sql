/*
  Warnings:

  - You are about to drop the column `trfId` on the `Reserva` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reserva` DROP FOREIGN KEY `Reserva_trfId_fkey`;

-- AlterTable
ALTER TABLE `Reserva` DROP COLUMN `trfId`;

-- CreateTable
CREATE TABLE `TarifaDays` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trfId` INTEGER NOT NULL,
    `fechaInicio` DATE NOT NULL,
    `fechaFin` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TarifaDays` ADD CONSTRAINT `TarifaDays_trfId_fkey` FOREIGN KEY (`trfId`) REFERENCES `Tarifa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
