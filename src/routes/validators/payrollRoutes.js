const {body, param} = require('express-validator');
const {validate} = require('../../helpers/validatorHelper')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 

const validateCreate = [ 
    body("employee")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio")
    .custom(async (value, {req}) => {
        const {
            employee,
            grossSalary,
            totalPerceptions,
            totalDeductions,
            netSalary,
            taxInformation,
            state,
            details,
            voucher} = req
        const existingPayroll = await prisma.payroll.findFirst({ // ENCUENTRA SIMILAR
            where: {
                employee,
                grossSalary,
                totalPerceptions,
                totalDeductions,
                netSalary,
                taxInformation,
                state,
                details,
                voucher
            }
        })
        if (existingPayroll) { // SI EXISTE
            return Promise.reject("Nomina ya registrada.");
        }
        return true
    }),
    body("grossSalary")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio"),
    body("totalPerceptions")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio"),
    body("totalDeductions")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio"),
    body("netSalary")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio"),
    body("taxInformation")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio"),
    body("state")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio"),
    body("details")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio"),
    body("voucher")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio"),
    param("companyId")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio")
    .custom(async value => {
        const existingCompany = await prisma.company.findUnique({
            where: {
                id : value
            }
        })
        if(!existingCompany){
            return Promise.reject("Compañia no encontrada")
        }
    }),
    body("employee")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio"),
    body("totalPerceptions")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio"),
    body("totalDeductions")
    .exists()
    .notEmpty()
    .withMessage("Campo es obligatorio"),
    (req, res, next) => {
        validate(req, res, next);
    }
]

module.exports = {
    validateCreate
}