const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { createToken } = require('./jwtCreate');

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

const registerUser = async (req, res) => {
    try {
        const companyId = req.params.id
        const { name, lastName, email, phone, address, password, role } = req.body
        const phoneStr = phone.toString()
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                name,
                lastName,
                email,
                phone: phoneStr,
                address,
                password: hashedPassword,
                role,
                companyId,
            },
        })
        res.status(200).json({ message: 'Usuario creado exitosamente' })
    } catch (error) {
        console.error('Error al registrar el usuario:', error)
        res.status(500).json({
            error: 'Hubo un error al registrar el usuario.',
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        let token = createToken({
            id: user.id,
            Name: user.name,
            Last_name: user.lastName,
            Email: user.email,
            role: user.role,
        })
        res.status(200).json({ userInfo: user, token: token }) // Por aca se pasará el token al front cuando se conecte
    } catch (error) {
        console.error('Error al registrar el usuario:', error)
        res.status(500).json({
            error: 'Hubo un error al registrar el usuario.',
        })
    }
}

const getAllUsersOfCompany = async (req, res) => {
    try {
        const companyId = req.params.id
        const users = await prisma.user.findMany({
            where: {
                companyId: companyId,
            },
        })
        res.status(200).json({ users: users })
    } catch (error) {
        res.status(500).json({
            error: 'Hubo un error al momento de obtener los usuarios de la empresa',
        })
    }
}


const editUser = async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
            phone,
            address,
            password,
            role,
        } = req.body;
        const phoneStr = phone.toString()
        const user = await prisma.user.update({
            where: {
                id: req.params.id,
            },
            data: {
                name,
                lastName,
                email,
                phone: phoneStr,
                address,
                password,
                role,
            },
        });
        res.status(200).json({ message: 'Se ha actualizado la informacion del usuario de forma exitosa' });
    } catch (error) {
        console.error(error);
        res.status(500).json('Ocurrió un error al actualizar la informacion del usuario');
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: 'Se ha borrado al usuario exitosamente' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Se ha producido un error al intentar borrar el usuario');
    }
};

module.exports = { registerUser, loginUser, getAllUsersOfCompany, editUser, deleteUser };
