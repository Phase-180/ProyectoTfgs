-- DropForeignKey
ALTER TABLE `Reserva` DROP FOREIGN KEY `Reserva_trfId_fkey`;

-- DropIndex
DROP INDEX `Reserva_trfId_key` ON `Reserva`;
