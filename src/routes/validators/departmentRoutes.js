const {body, param} = require("express-validator")
const {validate} = require("../../helpers/validatorHelper")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();

const validateCreate = [ 
    body("name")
    .exists()
    .notEmpty()
    .withMessage("Debe ingresar nombre del departamento")
    .custom(async (value) => {
        const departmentExist = await prisma.department.findFirst( {
            where: {
                name : value
            }
        })
        if (departmentExist) {
            return Promise.reject("Departamento en existencia");    
        }
        return true
    }),
    body("companyId")
    .exists()
    .custom(async value => {
        const existingCompany = await prisma.company.findUnique({
            where: {
                id: value
            }
        })
        if(!existingCompany){
            return Promise.reject("¡Companía no encontrada!")
        }
    })
    .notEmpty()
    .withMessage("Debe ingresar ID de la companía"),
    (req, res, next) => {
        validate(req, res, next);
    }
]

const validateEdit = [
    param("id")
    .exists()
    .withMessage("Introduce id del departamento")
    .custom(async value => {
        const existingDepartment = await prisma.department.findUnique({
            where:{
                id:value
            }
        })
        if( !existingDepartment ){
            return Promise.reject("Departamento no encontrado")
        }
        return true
    }),
    body("name")
    .optional(
        {
            values: "falsy"
        }
    ),
    body("companyId")
    .optional({
        values:"falsy"
    })
    .custom(async value => {
        const existingCompany = await prisma.company.findUnique({
            where: {
                id: value
            }
        })
        if(!existingCompany){
            return Promise.reject("¡Companía no encontrada!")
        }
        return true
    })
    .notEmpty()
    .withMessage("Debe ingresar ID de la companía"),
    (req, res, next) => {
        validate(req, res, next);
    }
]


module.exports = {
    validateCreate,
    validateEdit
}