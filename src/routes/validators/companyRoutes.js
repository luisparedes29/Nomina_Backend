const {body, param} = require('express-validator')
const {validate} = require('../../helpers/validatorHelper')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const validateCreate = [
    body('name')
    .exists()
    .notEmpty()
    .withMessage("Debe ingresar nombre de la compañia")
    .custom(async (value, {req}) => {
        console.log('Im working')
        const existingCompany = await prisma.company.findFirst({
            where: { name:value },
        });
        if (existingCompany) {
            return Promise.reject("Empresa en existencia");    
        }
        return true
    }),
    body('type')
    .exists()
    .notEmpty(),
    (req,res,next) => {
        validate(req,res,next);
    }
]

const validateGetById = [ 
    param('id')
    .exists()
    .notEmpty()
    .custom(async value =>{
        const company = await prisma.company.findUnique({
            where: {
                id: value,
            },
        });
        if (!company) {
            return Promise.reject('La empresa no existe');   
        }
        return true 
    }),
    (req,res,next) => {
        validate(req,res,next);
    }
]


module.exports = {validateCreate, validateGetById }