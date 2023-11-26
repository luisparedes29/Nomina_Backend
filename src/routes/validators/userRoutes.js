const {body} = require('express-validator')
const {validate} = require('../../helpers/validatorHelper')
const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

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
    }),
    body("phone")
    .exists()
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isNumeric()
    .isLength({
        min: 9,
        max: 9
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
    body("companyId")
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


module.exports = {
    signup
}