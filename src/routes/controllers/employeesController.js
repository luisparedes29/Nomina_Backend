const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient() // instancia de prisma

const createEmployee = async (req, res) => {
  try {
    const companyId = req.params.companyId
    const departmentId = req.params.departmentId
    const {
      name,
      lastName,
      startDate,
      birthdate,
      gender,
      email,
      phone,
      civilStatus,
      address,
      charge,
      baseSalary,
      identityCard,
    } = req.body
    if (
      !name ||
      !lastName ||
      !identityCard ||
      !birthdate ||
      !gender ||
      !address ||
      !phone ||
      !email ||
      !civilStatus ||
      !startDate ||
      !charge ||
      !baseSalary ||
      !departmentId ||
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
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        email,
      },
    })

    if (existingEmployee) {
      return res.status(400).json({ error: 'Empleado ya resgistrado' })
    }
    if (phone.toString().split('').length > 9) {
      return res.status(400).json({ error: phone.toString().split('').length })
    }
    const newEmployee = await prisma.employee.create({
      data: {
        name,
        lastName,
        identityCard,
        birthdate: new Date(birthdate),
        gender,
        address,
        phone,
        email,
        civilStatus,
        startDate: new Date(startDate),
        charge,
        baseSalary,
        departmentId,
        companyId,
      },
    })
    res.status(200).json({ newEmployee: newEmployee })
  } catch (error) {
    console.error('Error al crear empleado:', error)
    res.status(500).json({
      error: 'Hubo un error al crear empleado.',
    })
  }
}

const allEmployees = async (req, res) => {
  try {
    const employees = await prisma.Employee.findMany()
    if (employees.length == 0) {
      return res
        .status(404)
        .json({ error: 'No se encuentran empleados registrados' })
    }
    res.status(200).json({ employees: employees })
  } catch (error) {
    console.error('Error al encontrar empleados:', error)
    res.status(500).json({
      error: 'Hubo un error al encontrar los empleados.',
    })
  }
}

const getEmployeeById = async (req, res) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: req.params.id,
      },
    })
    if (!employee) {
      return res.status(404).json({ error: 'El empleado no existe' })
    }
    res.status(200).json({
      employee: employee,
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Error al buscar el empleado')
  }
}

const editEmployee = async (req, res) => {
  try {
    const {
      name,
      lastName,
      startDate,
      birthdate,
      gender,
      email,
      phone,
      civilStatus,
      address,
      charge,
      baseSalary,
      identityCard,
    } = req.body
    if (
      !name ||
      !lastName ||
      !identityCard ||
      !birthdate ||
      !gender ||
      !address ||
      !phone ||
      !email ||
      !civilStatus ||
      !startDate ||
      !charge ||
      !baseSalary
    ) {
      return res.status(400).json({
        error:
          'Es necesario rellenar todos los campos para poder avanzar con el registro',
      })
    }
    // *Validacion de empleado existente*
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        email,
      },
    })

    if (!existingEmployee) {
      return res.status(400).json({ error: 'Empleado no encontrado' })
    }

    // *Validacion de campos*
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: 'El correo electronico no es valido' })
    }

    if (phone.toString().split('').length > 9) {
      return res.status(400).json({ error: phone.toString().split('').length })
    }

    await prisma.employee.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        lastName,
        identityCard,
        birthdate: new Date(birthdate),
        gender,
        address,
        phone,
        email,
        civilStatus,
        startDate: new Date(startDate),
        charge,
        baseSalary,
      },
    })
    res.status(200).json({
      message: 'Se ha actualizado la información del empleado exitosamente',
    })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .send(
        'Se ha producido un error al intentar actualizar la información del empleado'
      )
  }
}

const deleteEmployee = async (req, res) => {
  try {
    const employee = await prisma.employee.delete({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json({ message: 'Se ha borrado al empleado exitosamente' })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .send('Se ha producido un error al intentar borrar al empleado')
  }
}

module.exports = {
  createEmployee,
  allEmployees,
  getEmployeeById,
  editEmployee,
  deleteEmployee,
}
