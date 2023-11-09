const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const { createToken } = require('./jwtCreate')

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

const registerUser = async (req, res) => {
  try {
    const companyId = req.params.id
    const { name, lastName, email, phone, address, password, role } = req.body
    if (
      !name ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !password ||
      !role ||
      !companyId
    ) {
      return res.status(400).json({
        error:
          'Es necesario rellenar todos los campos para poder avanzar con el registro',
      })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: 'El correo electronico no es valido' })
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'El correo electronico ya esta registrado' })
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          'La contraseña debe ser de al menos 6 caracteres, incluir una mayúscula y un número.',
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
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
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Rellene los campos para iniciar sesión' })
    }
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user) {
      return res
        .status(400)
        .json({ error: 'El correo electronico ingresado no existe' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'La contraseña es incorrecta' })
    }
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

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json({ users: users })
  } catch (error) {
    res.status(500).json({
      error: 'Hubo un error al momento de obtener los usuarios',
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

module.exports = { registerUser, loginUser, getAllUsers, getAllUsersOfCompany }
