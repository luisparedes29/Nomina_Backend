/*
  Warnings:

  - Added the required column `Company_ID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `Company_ID` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Amount` DOUBLE NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `User` INTEGER NOT NULL,
    `Modification_date` VARCHAR(191) NOT NULL,
    `Company_ID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Periodicity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Start_date` DATETIME(3) NOT NULL,
    `End_date` DATETIME(3) NOT NULL,
    `Payment_Method` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payroll` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Employee` VARCHAR(191) NOT NULL,
    `Payment_period` DATETIME(3) NOT NULL,
    `Gross_salary` DOUBLE NOT NULL,
    `Total_perceptions` DOUBLE NOT NULL,
    `Total_deductions` DOUBLE NOT NULL,
    `Net_salary` DOUBLE NOT NULL,
    `Tax_information` VARCHAR(191) NOT NULL,
    `State` VARCHAR(191) NOT NULL,
    `Details` VARCHAR(191) NOT NULL,
    `Voucher` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Last_name` VARCHAR(191) NOT NULL,
    `CI` INTEGER NOT NULL,
    `Birthdate` DATETIME(3) NOT NULL,
    `Gender` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `Phone` INTEGER NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Civil_status` VARCHAR(191) NOT NULL,
    `Start_date` DATETIME(3) NOT NULL,
    `Charge` VARCHAR(191) NOT NULL,
    `Department` VARCHAR(191) NOT NULL,
    `Base_salary` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payroll_Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perception` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Amount` DOUBLE NOT NULL,
    `Tax_information` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Receipt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Employee` VARCHAR(191) NOT NULL,
    `Generation_date` DATETIME(3) NOT NULL,
    `Company_ID` INTEGER NOT NULL,
    `Perception` DOUBLE NOT NULL,
    `Deductions` DOUBLE NOT NULL,
    `Base_salary` DOUBLE NOT NULL,
    `Amount` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deductions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Amount` DOUBLE NOT NULL,
    `Tax_information` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_Company_ID_fkey` FOREIGN KEY (`Company_ID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Setting` ADD CONSTRAINT `Setting_Company_ID_fkey` FOREIGN KEY (`Company_ID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
