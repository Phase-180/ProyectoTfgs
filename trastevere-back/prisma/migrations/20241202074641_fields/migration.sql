/*
  Warnings:

  - You are about to drop the column `cod` on the `Tarifa` table. All the data in the column will be lost.
  - Added the required column `price` to the `Tarifa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reserva` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Tarifa` DROP COLUMN `cod`,
    ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
