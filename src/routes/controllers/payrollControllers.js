const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient() // instancia de prisma

const createPayroll = async (req, res) => {
  try {
    //recibimos por parametro el ID del departamento y compañia
    const { departmentId, companyId } = req.params
    //Buscamos todos los empleados que coincidan con esos valores
    const employees = await prisma.employee.findMany({
      where: {
        departmentId: departmentId,
        companyId: companyId,
      },
    })
    if (employees.length == 0) {
      return res.status(404).json({
        error: 'No se encontraron empleados registrados en ese departamento.',
      })
    }
    //si existen los devolvemos
    res.status(200).json({ employees: employees })
  } catch (error) {
    console.error('Error al crear nomina:', error)
    res.status(500).json({
      error: 'Hubo un error al crear nomina.',
    })
  }
}

const getAll = async (req, res) => {
  try {
    const allPayrolls = await prisma.payroll.findMany()
    if (allPayrolls.length == 0) {
      return res
        .status(404)
        .json({ message: 'No se encontraron nominas registradas.' })
    }
    res.status(200).json({ allPayrolls: allPayrolls })
  } catch (error) {
    console.error('Error al buscar la nomina:', error)
    res.status(404).json({
      error: 'Error al intentar buscar nomina',
    })
  }
}

const getOne = async (req, res) => {
  try {
    const id = parseInt(req.params._id) // sacamos id de params (_id) y lo volvemos int
    const payroll = await prisma.payroll.findUnique({
      //Buscamos en lso payrolls (id es inherentemente unique)
      where: {
        id: id,
      },
    })
    res.status(200).json({ payroll: payroll }) // DATA
  } catch (error) {
    console.error('Error al buscar la nomina:', error)
    res.status(404).json({
      error: 'Error al intentar buscar nomina',
    })
  }
}

module.exports = { createPayroll, getAll, getOne }
