/*
  Warnings:

  - You are about to drop the column `amount` on the `deductions` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `deductions` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `deductions` table. All the data in the column will be lost.
  - You are about to drop the column `payrollId` on the `deductions` table. All the data in the column will be lost.
  - You are about to drop the column `taxInformation` on the `deductions` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `perception` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `perception` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `perception` table. All the data in the column will be lost.
  - You are about to drop the column `payrollId` on the `perception` table. All the data in the column will be lost.
  - You are about to drop the column `taxInformation` on the `perception` table. All the data in the column will be lost.
  - Added the required column `condition` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `deductions` DROP FOREIGN KEY `Deductions_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `deductions` DROP FOREIGN KEY `Deductions_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `deductions` DROP FOREIGN KEY `Deductions_payrollId_fkey`;

-- DropForeignKey
ALTER TABLE `perception` DROP FOREIGN KEY `Perception_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `perception` DROP FOREIGN KEY `Perception_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `perception` DROP FOREIGN KEY `Perception_payrollId_fkey`;

-- AlterTable
ALTER TABLE `deductions` DROP COLUMN `amount`,
    DROP COLUMN `companyId`,
    DROP COLUMN `employeeId`,
    DROP COLUMN `payrollId`,
    DROP COLUMN `taxInformation`;

-- AlterTable
ALTER TABLE `employee` ADD COLUMN `condition` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `perception` DROP COLUMN `amount`,
    DROP COLUMN `companyId`,
    DROP COLUMN `employeeId`,
    DROP COLUMN `payrollId`,
    DROP COLUMN `taxInformation`;

-- CreateTable
CREATE TABLE `perceptionData` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `application` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `perceptionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deductionsData` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `percentage` DOUBLE NOT NULL,
    `application` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `deductionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `perceptionData` ADD CONSTRAINT `perceptionData_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perceptionData` ADD CONSTRAINT `perceptionData_perceptionId_fkey` FOREIGN KEY (`perceptionId`) REFERENCES `Perception`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deductionsData` ADD CONSTRAINT `deductionsData_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deductionsData` ADD CONSTRAINT `deductionsData_deductionId_fkey` FOREIGN KEY (`deductionId`) REFERENCES `Deductions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
