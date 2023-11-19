const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getAllDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      where: {
        companyId: req.params.id,
      },
    })
    res.status(200).json({ departments: departments })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Se ha producido un error al crear el departamento ')
  }
}

const createDepartment = async (req, res) => {
  try {
    const name = req.body.name
    const companyId = req.params.id

    await prisma.$transaction(async (tx) => {
      //validamos que no exista otro departamento con el mismo nombre
      const validateNameDepartment = await tx.department.findMany({
        where: {
          name: name,
          companyId: companyId,
        },
      })
      if (!validateNameDepartment[0]) {
        const newApartment = await tx.department.create({
          data: {
            name,
            companyId,
          },
        })
        res.status(200).json({ newApartment: newApartment })
      } else {
        throw new Error('Ya existe un departamento con ese nombre')
      }
    })
  } catch (error) {
    res.status(500).json({
      error:
        'Se ha producido un error al crear el departamento, ' + error.message,
    })
  }
}

const editDepartment = async (req, res) => {
  try {
    //usamos $transaction para poder realizar varias consultas dependiendo que ninguna falle
    await prisma.$transaction(async (tx) => {
      //validamos que no exista otro departamento con el mismo nombre
      const validateNameDepartment = await tx.department.findMany({
        where: {
          name: req.body.name,
          companyId: req.body.companyId,
        },
      })
      if (!validateNameDepartment[0]) {
        const department = await tx.department.update({
          where: {
            id: req.params.id,
            companyId: req.params.companyId,
          },
          data: {
            name: req.body.name,
            companyId: req.body.companyId,
          },
        })
        res
          .status(200)
          .json({ message: 'Se ha actualizado el departamento exitosamente' })
      } else {
        throw new Error('Ya existe un departamento con ese nombre')
      }
    })
  } catch (error) {
    res.status(500).json({
      error:
        'Se ha producido un error al actualizar el departamento, ' +
        error.message,
    })
  }
}

const deleteDepartment = async (req, res) => {
  try {
    const department = await prisma.department.delete({
      where: {
        companyId: req.params.companyId,
        id: req.params.id,
      },
    })
    res
      .status(200)
      .json({ message: 'Se ha borrado el departamento exitosamente' })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json('Se ha producido un error al intentar borrar el departamento ')
  }
}

module.exports = {
  getAllDepartments,
  createDepartment,
  editDepartment,
  deleteDepartment,
}
