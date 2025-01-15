/*
  Warnings:

  - A unique constraint covering the columns `[trfId]` on the table `Reserva` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trfId` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reserva` ADD COLUMN `trfId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Tarifa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iva` DOUBLE NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `cod` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Reserva_trfId_key` ON `Reserva`(`trfId`);

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_trfId_fkey` FOREIGN KEY (`trfId`) REFERENCES `Tarifa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
