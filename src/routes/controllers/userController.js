const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { createToken } = require('./jwtCreate');

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

const registerUser = async (req, res) => {
    try {
        const { Name, Last_name, Email, Phone, Address, Password, Role, Company_ID } = req.body;
        if (!Name || !Last_name || !Email || !Phone || !Address || !Password || !Role || !Company_ID) {
            return res.status(400).json({ error: 'Es necesario rellenar todos los campos para poder avanzar con el registro' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return res.status(400).json({ error: 'El correo electronico no es valido' });
        }
        const existingUser = await prisma.user.findUnique({
            where: { Email },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electronico ya esta registrado' });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(Password)) {
            return res.status(400).json({ error: 'La contraseña debe ser de al menos 6 caracteres, incluir una mayúscula y un número.' });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = await prisma.user.create({
            data: {
                Name,
                Last_name,
                Email,
                Phone,
                Address,
                Password: hashedPassword,
                Role,
                Company_ID,
            },
        });
        let token = createToken({ id: newUser.id, Name: newUser.Name, Last_name: newUser.Last_name, Email: newUser.Email, role: newUser.Role });
        console.log(token);
        res.status(200).json({ newUser: newUser }); // Por aca se pasará el token al front cuando se conecte
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({
            error: 'Hubo un error al registrar el usuario.',
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({ error: 'Rellene los campos para iniciar sesión' });
        }
        const user = await prisma.user.findUnique({
            where: { Email },
        });
        if (!user) {
            return res.status(400).json({ error: 'El correo electronico ingresado no existe' });
        }
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'La contraseña es incorrecta' });
        }
        let token = createToken ({ id: user.id, Name: user.Name, Last_name: user.Last_name, Email: user.Email, role: user.Role });
        console.log(token)
        res.status(200).json({ userInfo: user }); // Por aca se pasará el token al front cuando se conecte
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({
            error: 'Hubo un error al registrar el usuario.',
        });
    }
};

module.exports = { registerUser, loginUser };
