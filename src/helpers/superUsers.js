const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

const createSuperUser = async () => {
  try {
    //verificamos que no exista un usuario super en la Base de datos
    const userSuper = await prisma.user.findMany({
      where: {
        role: 'superAdmin',
      },
    })
    if (userSuper.length > 0) {
      return
    } else {
      //si no existe lo creamos
      const hashedPassword = await bcrypt.hash('superAdmin', 10)
      await prisma.user.create({
        data: {
          name: 'superAdmin',
          lastName: 'superAdmin',
          email: 'superadmin@gmail.com',
          phone: 'superAdmin',
          password: hashedPassword,
          address: 'superAdmin',
          role: 'superAdmin',
          companyName: {
            create: {
              name: 'superAdmin',
              type: 'superAdmin',
            },
          },
        },
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createSuperUser,
}
