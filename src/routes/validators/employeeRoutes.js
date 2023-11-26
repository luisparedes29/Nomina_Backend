const {body, param} = require('express-validator')
const {validate} = require('../../helpers/validatorHelper')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const validateCreate = [ 
    body("name")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isLength({
        min:4,
        max: 90
    }),
    body("lastName")
    .exists()
    .notEmpty()
    .isLength({
        min:4,
        max: 90
    })
    .withMessage("Campo obligatorio"),
    body("startDate")
    .exists()
    .notEmpty()
    .trim()
    .isISO8601(),
    body("birthdate")
    .exists()
    .notEmpty()
    .trim()
    .isISO8601()
    .withMessage("Campo obligatorio"),
    body("gender")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio"),
    body("email")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isEmail()
    .custom(async value => {
        const existingEmployee = await prisma.employee.findUnique({
            where: {
                email: value,
            },
        });

        if (existingEmployee) {
            return res.status(400).json({ error: 'Empleado ya resgistrado' });
        }
    })
    .withMessage("E-mail inválido."),
    body("phone")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isNumeric()
    .isLength({
        min: 9,
        max: 9
    })
    .withMessage("Teléfono debe de contener 9 caracteres."),
    body("civilStatus")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio"),
    body("address")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio"),
    body("charge")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio"),
    body("baseSalary")
    .exists()
    .notEmpty()
    .isFloat()
    .withMessage("Campo obligatorio"),
    body("departmentId")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio")
    .custom(async (value) => {
        console.log("THIS WORk")
        const departmentExists = await prisma.department.findUnique({
            where:{
                id : value
            }
        })
        if(!departmentExists){
            return Promise.reject("No se ha encontrado departamento")
        }
        return true
    }),
    body("identityCard")
    .exists()
    .notEmpty()
    .isInt()
    .withMessage("Campo obligatorio"),
    (req,res,next) => {
        validate(req,res,next);
    }
]

const validateEdit = [
    param("id")
    .exists()
    .notEmpty()
    .custom(async value => {
        const existingEmployee = await prisma.employee.findUnique({
            where:{
                id : value
            }
        })
        if(!existingEmployee){
            return Promise.reject("¡Empleado no encontrado!")
        }
    }),
    body("name")
    .optional({
        values: "falsy"
    })
    .isLength({
        min:4,
        max: 90
    })
    .withMessage("Debe contener entre 4 y 90 caracteres"),
    body("lastName")
    .optional({
        values: "falsy"
    })
    .isLength({
        min:4,
        max: 90
    })
    .withMessage("Debe contener entre 4 y 90 caracteres"),
    body("startDate")
    .optional({
        values: "falsy"
    })
    .trim()
    .isISO8601()
    .withMessage("Formato de fecha invalido"),
    body("birthdate")
    .optional({
        values: "falsy"
    })
    .trim()
    .isISO8601()
    .withMessage("Formato de fecha invalido"),
    body("gender")
    .optional({
        values: "falsy"
    }),
    body("email")
    .optional(
        {
            values : "falsy"
        }
    )
    .isEmail()
    .withMessage("E-mail inválido.")
    .custom(async( value, {req}) => {
        const existingEmployee = await prisma.employee.findMany({
            where: {
                email: value,
            },
        });
        console.log(existingEmployee.length)
        if(existingEmployee.length > 1){
            return Promise.reject("E-mail duplicado")
        }
        return false
    }),
    body("phone")
    .optional({
        values: "falsy"
    })
    .isNumeric()
    .isLength({
        min: 9,
        max: 9
    })
   ,
    body("civilStatus")
    .optional({
        values: "falsy"
    }),
    body("address")
    .optional({
        values: "falsy"
    }),
    body("charge")
    .optional({
        values: "falsy"
    }),
    body("baseSalary")
    .optional({
        values: "falsy"
    })
    .isFloat(),
    body("departmentId")
    .optional({
        values: "falsy"
    })
    .custom(async (value) => {
        const departmentExists = await prisma.department.findUnique({
            where:{
                id : value
            }
        })
        if(!departmentExists){
            return Promise.reject("No se ha encontrado departamento")
        }
        return true
    }),
    body("identityCard")
    .optional({
        values: "falsy"
    })
    .isInt()
    .withMessage("Debe ser un entero"),
    (req,res,next) => {
        validate(req,res,next);
    }
]

module.exports = {
    validateCreate,
    validateEdit
}