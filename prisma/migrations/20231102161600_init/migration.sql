-- This migration was generated by Luis Santiago
/*
Changes: 
In employee model fields: CI, Phone and Email now are unique. 
This, 'cus now we can use the prisma's method called findUnique. 
*/

/*
  Warnings:

  - You are about to alter the column `Employee` on the `receipt` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[CI]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Phone]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Company_ID` to the `Deductions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Employee_ID` to the `Deductions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Payroll_ID` to the `Deductions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Company_ID` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Company_ID` to the `Payroll_Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Employee` to the `Payroll_Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Payroll_ID` to the `Payroll_Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Company_ID` to the `Perception` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Employee_ID` to the `Perception` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Payroll_ID` to the `Perception` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Payroll_ID` to the `Periodicity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `deductions` ADD COLUMN `Company_ID` INTEGER NOT NULL,
    ADD COLUMN `Employee_ID` INTEGER NOT NULL,
    ADD COLUMN `Payroll_ID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `payroll` ADD COLUMN `Company_ID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `payroll_employee` ADD COLUMN `Company_ID` INTEGER NOT NULL,
    ADD COLUMN `Employee` INTEGER NOT NULL,
    ADD COLUMN `Payroll_ID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `perception` ADD COLUMN `Company_ID` INTEGER NOT NULL,
    ADD COLUMN `Employee_ID` INTEGER NOT NULL,
    ADD COLUMN `Payroll_ID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `periodicity` ADD COLUMN `Payroll_ID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `receipt` MODIFY `Employee` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employee_CI_key` ON `Employee`(`CI`);

-- CreateIndex
CREATE UNIQUE INDEX `Employee_Phone_key` ON `Employee`(`Phone`);

-- CreateIndex
CREATE UNIQUE INDEX `Employee_Email_key` ON `Employee`(`Email`);

-- AddForeignKey
ALTER TABLE `Periodicity` ADD CONSTRAINT `Periodicity_Payroll_ID_fkey` FOREIGN KEY (`Payroll_ID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payroll` ADD CONSTRAINT `Payroll_Company_ID_fkey` FOREIGN KEY (`Company_ID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payroll_Employee` ADD CONSTRAINT `Payroll_Employee_Employee_fkey` FOREIGN KEY (`Employee`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payroll_Employee` ADD CONSTRAINT `Payroll_Employee_Payroll_ID_fkey` FOREIGN KEY (`Payroll_ID`) REFERENCES `Payroll`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payroll_Employee` ADD CONSTRAINT `Payroll_Employee_Company_ID_fkey` FOREIGN KEY (`Company_ID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Perception` ADD CONSTRAINT `Perception_Payroll_ID_fkey` FOREIGN KEY (`Payroll_ID`) REFERENCES `Payroll`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Perception` ADD CONSTRAINT `Perception_Company_ID_fkey` FOREIGN KEY (`Company_ID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Perception` ADD CONSTRAINT `Perception_Employee_ID_fkey` FOREIGN KEY (`Employee_ID`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receipt` ADD CONSTRAINT `Receipt_Employee_fkey` FOREIGN KEY (`Employee`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receipt` ADD CONSTRAINT `Receipt_Company_ID_fkey` FOREIGN KEY (`Company_ID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deductions` ADD CONSTRAINT `Deductions_Payroll_ID_fkey` FOREIGN KEY (`Payroll_ID`) REFERENCES `Payroll`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deductions` ADD CONSTRAINT `Deductions_Company_ID_fkey` FOREIGN KEY (`Company_ID`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deductions` ADD CONSTRAINT `Deductions_Employee_ID_fkey` FOREIGN KEY (`Employee_ID`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;