/*
  Warnings:

  - You are about to drop the column `fechaFin` on the `TarifaDays` table. All the data in the column will be lost.
  - You are about to drop the column `fechaInicio` on the `TarifaDays` table. All the data in the column will be lost.
  - Added the required column `dayEnd` to the `TarifaDays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayInit` to the `TarifaDays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthEnd` to the `TarifaDays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthInit` to the `TarifaDays` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TarifaDays` DROP COLUMN `fechaFin`,
    DROP COLUMN `fechaInicio`,
    ADD COLUMN `dayEnd` INTEGER NOT NULL,
    ADD COLUMN `dayInit` INTEGER NOT NULL,
    ADD COLUMN `monthEnd` INTEGER NOT NULL,
    ADD COLUMN `monthInit` INTEGER NOT NULL;
