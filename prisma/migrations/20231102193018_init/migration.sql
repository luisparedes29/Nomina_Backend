/*
Changes: 
In employee model fields: Only Email now is unique. 
This, 'cus now we can use the prisma's method called findUnique. */
-- DropIndex
DROP INDEX `Employee_CI_key` ON `employee`;

-- DropIndex
DROP INDEX `Employee_Phone_key` ON `employee`;
