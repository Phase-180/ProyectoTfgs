-- AlterTable
ALTER TABLE `Reserva` ADD COLUMN `baja` DATETIME(3) NULL,
    ADD COLUMN `deleted` BOOLEAN NULL DEFAULT false;
