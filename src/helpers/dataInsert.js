// app.js

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const saltRounds = 10

async function createCompany(companyData, usersData, departmentData, employeeData) {
  try {
    let empresa = await prisma.company.findMany()
    if (empresa.length > 1) {
      return
    } else {
      // Crear la empresa
      empresa = await prisma.company.create({
        data: {
          ...companyData
        }
      })

      // Crear usuarios relacionados con la empresa
      const usuarios = await Promise.all(
        usersData.map(async (userData) => {
          const hashedPassword = await bcrypt.hash(userData.password, saltRounds)

          return prisma.user.create({
            data: {
              ...userData,
              companyId: empresa.id,
              password: hashedPassword // Guarda la contraseña hasheada en la base de datos
            }
          })
        })
      )

      // Crear el departamento relacionado con la empresa
      const departamento = await prisma.department.create({
        data: {
          ...departmentData,
          companyId: empresa.id
        }
      })

      // Crear el empleado relacionado con la empresa
      const empleado = await prisma.employee.create({
        data: {
          ...employeeData,
          departmentId: departamento.id,
          companyId: empresa.id
        }
      })

      console.log('Empresa creada:', empresa)
      console.log('Usuarios creados:', usuarios)
      console.log('Departamento creado:', departamento)
      console.log('Empleado creado:', empleado)
    }
  } catch (error) {
    console.error('Error al crear la empresa:', error)
  }
}

// Datos para la primera empresa
const companyData1 = {
  name: 'Apple Inc.',
  type: 'Electronicos',
  currency: 'USD',
  country: 'USA'
}

const usersData1 = [
  {
    name: 'Cody',
    lastName: 'Wiggs',
    email: 'cowiggs@gmail.com',
    phone: '393172112',
    address: '04 Novick Alley',
    password: 'bQ3(9T%b|o8_)r<',
    role: 'rol'
  },
  {
    name: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@gmail.com',
    phone: '555123456',
    address: '123 Main St',
    password: 'secure_password',
    role: 'usuario_regular'
  },
  {
    name: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@gmail.com',
    phone: '777987654',
    address: '456 Oak St',
    password: 'strong_password',
    role: 'usuario_regular'
  }
]

const departmentData1 = { name: 'Logística' }

const employeeData1 = {
  name: 'John',
  lastName: 'Doe',
  identityCard: 12312221,
  birthdate: new Date('1990-01-01'),
  gender: 'Masculino',
  condition: 'Activo',
  address: '123 Main St',
  phone: '987654321',
  email: 'john.doe@company.com',
  bankAccount: '123456789',
  civilStatus: 'Soltero',
  startDate: new Date('2023-01-01'),
  charge: 'Gerente',
  baseSalary: 50000
}


// Datos para la segunda empresa
const companyData2 = {
  name: 'MASECA',
  type: 'Alimentos',
  currency: 'Bolivares',
  country: 'Venezuela'
}

const usersData2 = [
  {
    name: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@email.com',
    phone: '987654321',
    address: 'Calle Principal 123',
    password: 'clave_segura',
    role: 'usuario_regular'
  },
  {
    name: 'Maria',
    lastName: 'Gutierrez',
    email: 'maria.gutierrez@email.com',
    phone: '555987654',
    address: '789 Maple St',
    password: 'segura_clave',
    role: 'usuario_regular'
  },
  {
    name: 'Pedro',
    lastName: 'Rodriguez',
    email: 'pedro.rodriguez@email.com',
    phone: '111222333',
    address: '987 Pine St',
    password: 'contraseña_segura',
    role: 'usuario_regular'
  }
]

const departmentData2 = { name: 'Ventas' }

const employeeData2 = [
  {
    name: 'Carlos',
    lastName: 'Gómez',
    identityCard: 987654321,
    birthdate: new Date('1985-05-15'),
    gender: 'Masculino',
    condition: 'Activo',
    address: 'Avenida Principal 456',
    phone: '555123456',
    email: 'carlos.gomez@empresa.com',
    bankAccount: 'CuentaBancaria 987654',
    civilStatus: 'Casado',
    startDate: new Date('2022-03-10'),
    charge: 'Analista de Datos',
    baseSalary: 60000
  }
  // {
  //   name: 'Ana',
  //   lastName: 'López',
  //   identityCard: 123456789,
  //   birthdate: new Date('1990-08-20'),
  //   gender: 'Femenino',
  //   condition: 'Activo',
  //   address: 'Calle Secundaria 789',
  //   phone: '555987654',
  //   email: 'ana.lopez@empresa.com',
  //   bankAccount: '98765432198765432198',
  //   civilStatus: 'Soltera',
  //   startDate: new Date('2021-12-05'),
  //   charge: 'Desarrollador Frontend',
  //   baseSalary: 70000
  // },
  // {
  //   name: 'Laura',
  //   lastName: 'Martínez',
  //   identityCard: 999888777,
  //   birthdate: new Date('1995-04-08'),
  //   gender: 'Femenino',
  //   condition: 'Activo',
  //   address: 'Avenida Central 789',
  //   phone: '555999888',
  //   email: 'laura.martinez@empresa.com',
  //   bankAccount: '44443333222211110000',
  //   civilStatus: 'Soltera',
  //   startDate: new Date('2022-08-20'),
  //   charge: 'Diseñador Gráfico',
  //   baseSalary: 65000
  // },
  // {
  //   name: 'Javier',
  //   lastName: 'Torres',
  //   identityCard: 333222111,
  //   birthdate: new Date('1993-12-10'),
  //   gender: 'Masculino',
  //   condition: 'Activo',
  //   address: 'Avenida Central 123',
  //   phone: '555333222',
  //   email: 'javier.torres@empresa.com',
  //   bankAccount: '55556666777788889999',
  //   civilStatus: 'Soltero',
  //   startDate: new Date('2022-11-15'),
  //   charge: 'Ingeniero de Software',
  //   baseSalary: 75000
  // },
  // {
  //   name: 'Isabel',
  //   lastName: 'Gutiérrez',
  //   identityCard: 888777666,
  //   birthdate: new Date('1992-06-25'),
  //   gender: 'Femenino',
  //   condition: 'Activo',
  //   address: 'Calle del Centro 456',
  //   phone: '555888777',
  //   email: 'isabel.gutierrez@empresa.com',
  //   bankAccount: '44445555666677778888',
  //   civilStatus: 'Soltera',
  //   startDate: new Date('2023-02-18'),
  //   charge: 'Especialista en Recursos Humanos',
  //   baseSalary: 72000
  // },
  // {
  //   name: 'Alejandro',
  //   lastName: 'Díaz',
  //   identityCard: 222333444,
  //   birthdate: new Date('1989-03-12'),
  //   gender: 'Masculino',
  //   condition: 'Activo',
  //   address: 'Avenida Central 789',
  //   phone: '555222333',
  //   email: 'alejandro.diaz@empresa.com',
  //   bankAccount: '99998888777766665555',
  //   civilStatus: 'Casado',
  //   startDate: new Date('2022-09-05'),
  //   charge: 'Analista de Sistemas',
  //   baseSalary: 68000
  // },
  // {
  //   name: 'Gabriela',
  //   lastName: 'Ramírez',
  //   identityCard: 111222333,
  //   birthdate: new Date('1994-10-15'),
  //   gender: 'Femenino',
  //   condition: 'Activo',
  //   address: 'Avenida Principal 789',
  //   phone: '555111222',
  //   email: 'gabriela.ramirez@empresa.com',
  //   bankAccount: '77776666555544443333',
  //   civilStatus: 'Soltera',
  //   startDate: new Date('2022-06-08'),
  //   charge: 'Analista Financiero',
  //   baseSalary: 75000
  // },
  // {
  //   name: 'Ricardo',
  //   lastName: 'Martínez',
  //   identityCard: 444555666,
  //   birthdate: new Date('1986-12-01'),
  //   gender: 'Masculino',
  //   condition: 'Activo',
  //   address: 'Calle del Norte 123',
  //   phone: '555444555',
  //   email: 'ricardo.martinez@empresa.com',
  //   bankAccount: '22221111000099998888',
  //   civilStatus: 'Casado',
  //   startDate: new Date('2023-03-20'),
  //   charge: 'Consultor de Negocios',
  //   baseSalary: 80000
  // },
  // {
  //   name: 'Verónica',
  //   lastName: 'Sánchez',
  //   identityCard: 666777888,
  //   birthdate: new Date('1991-07-30'),
  //   gender: 'Femenino',
  //   condition: 'Activo',
  //   address: 'Calle Sur 456',
  //   phone: '555666777',
  //   email: 'veronica.sanchez@empresa.com',
  //   bankAccount: '33334444555566667777',
  //   civilStatus: 'Casada',
  //   startDate: new Date('2022-04-12'),
  //   charge: 'Analista de Marketing',
  //   baseSalary: 70000
  // },
  // {
  //   name: 'Eduardo',
  //   lastName: 'García',
  //   identityCard: 999000111,
  //   birthdate: new Date('1987-02-18'),
  //   gender: 'Masculino',
  //   condition: 'Activo',
  //   address: 'Avenida Central 789',
  //   phone: '555999000',
  //   email: 'eduardo.garcia@empresa.com',
  //   bankAccount: '88887777666655554444',
  //   civilStatus: 'Soltero',
  //   startDate: new Date('2022-11-05'),
  //   charge: 'Ingeniero de Proyectos',
  //   baseSalary: 76000
  // }
]

createCompany(companyData1, usersData1, departmentData1, employeeData1)
createCompany(companyData2, usersData2, departmentData2, employeeData2)
