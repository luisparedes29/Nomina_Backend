const {body, param} = require('express-validator')
const {validate} = require('../../helpers/validatorHelper')
const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');


const signup = [
    body("name")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio"),
    body("lastName")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio"),
    body("email")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isEmail()
    .withMessage("E-mail no valido")
    .custom( async value => {
        const existingUser = await prisma.user.findUnique({
            where: { email: value },
        });
        if (existingUser) {
            return Promise.reject("El correo electronico ya esta registrado");
        }
        return true
    }),
    body("phone")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isNumeric()
    .isLength({
        min: 10,
        max: 10
    })
    .withMessage("Teléfono debe de contener 9 caracteres"),
    body("address")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio"),
    body("password")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio")
    .matches(/^(?=.*[A-Z])(?=.*\d).{6,}$/)
    .withMessage('La contraseña debe ser de al menos 6 caracteres, incluir una mayúscula y un número.'),
    body("role")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio"),
    param("companyId")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio")
    .custom(async value => {
        const existingCompany = await prisma.company.findUnique({
            where:{
                id : value
            }
        })
        if(!existingCompany){
            return Promise.reject("Compania no encontrada")
        }
        return true
    }),
    (req, res, next) => {
        validate(req, res, next);
    }
]

const login = [
    body("email")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isEmail()
    .custom(async value => {
        const user = await prisma.user.findUnique({
            where: { email: value },
        })
        if(!user){
            return Promise.reject('El correo electronico ingresado no existe' )
        }
        return true
    })
    .withMessage("E-mail no valido"), 
    body("password")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio")
    .custom(async (value,{req}) => {
        const user = await prisma.user.findUnique({
            where:{
                email: req.body.email
            }
        })
        if(!user){   
            return Promise.reject('El correo electronico ingresado no existe' )
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return Promise.reject('La contraseña es incorrecta')
        }
        return true
    }),
    (req, res, next) => {
        validate(req, res, next)
    } 
]

const validateEdit = [
    body("name")
    .optional({
        values: "falsy"
    }),
    body("lastName")
    .optional({
        values: "falsy"
    }),
    body("email")
    .optional({
        values: "falsy"
    })
    .isEmail()
    .withMessage("E-mail no valido")
    .custom( async value => {
        const existingUser = await prisma.user.findUnique({
            where: { email: value },
        });
        if (existingUser) {
            return Promise.reject("El correo electronico ya esta registrado");
        }
        return true
    }),
    body("phone")
    .optional({
        values: "falsy"
    })
    .isNumeric()
    .isLength({
        min: 10,
        max: 10
    })
    .withMessage("Teléfono debe de contener 9 caracteres"),
    body("address")
    .optional({
        values: "falsy"
    }),
    body("password")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio")
    .matches(/^(?=.*[A-Z])(?=.*\d).{6,}$/)
    .withMessage('La contraseña debe ser de al menos 6 caracteres, incluir una mayúscula y un número.'),
    body("role")
    .optional({
        values: "falsy"
    }),
    param("companyId")
    .optional({
        values: "falsy"
    })
    .custom(async value => {
        const existingCompany = await prisma.company.findUnique({
            where:{
                id : value
            }
        })
        if(!existingCompany){
            return Promise.reject("Compania no encontrada")
        }
        return true
    }),
    (req, res, next) => {
        validate(req, res, next);
    }
]

module.exports = {
    signup,
    login,
    validateEdit
}