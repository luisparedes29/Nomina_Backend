-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Last_name` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Phone` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_Email_key`(`Email`),
    UNIQUE INDEX `User_Phone_key`(`Phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
