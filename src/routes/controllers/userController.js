const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { createToken } = require('./jwtCreate');

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

const registerUser = async (req, res) => {
    try {
        const { name, lastName, email, phone, address, password, role, companyId } = req.body;
        if (!name || !lastName || !email || !phone || !address || !password || !role || !companyId) {
            return res.status(400).json({ error: 'Es necesario rellenar todos los campos para poder avanzar con el registro' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'El correo electronico no es valido' });
        }
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electronico ya esta registrado' });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: 'La contraseña debe ser de al menos 6 caracteres, incluir una mayúscula y un número.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                lastName,
                email,
                phone,
                address,
                password: hashedPassword,
                role,
                companyId,
            },
        });
        let token = createToken({ id: newUser.id, name: newUser.name, lastName: newUser.lastName, email: newUser.email, role: newUser.role });
        res.status(200).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({
            error: 'Hubo un error al registrar el usuario.',
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Rellene los campos para iniciar sesión' });
        }
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(400).json({ error: 'El correo electronico ingresado no existe' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'La contraseña es incorrecta' });
        }
        let token = createToken({ id: user.id, name: user.name, lastName: user.lastName, email: user.email, role: user.role });
        res.status(200).json({ userInfo: user }); // Por aca se pasará el token al front cuando se conecte
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({
            error: 'Hubo un error al registrar el usuario.',
        });
    }
};

const editUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'El correo electronico no es valido' });
        }
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electronico ya esta registrado' });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: 'La contraseña debe ser de al menos 6 caracteres, incluir una mayúscula y un número.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.update({
            where: {
                id: req.params.id,
            },
            data: {
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                password: hashedPassword,
                role: req.body.role,
            },
        });
        res.status(200).json({ message: 'Se ha actualizado la informacion del usuario de forma exitosa' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Ocurrió un error al actualizar la informacion del usuario');
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
        res.status(500).send('Se ha producido un error al intentar borrar el usuario');
    }
};

module.exports = { registerUser, loginUser, editUser, deleteUser };
