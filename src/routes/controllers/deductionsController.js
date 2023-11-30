const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

// * Obtener las deducciones por empleado *
const getAllDeductionsName = async (req, res) => {
  try {
    const deductionsName = await prisma.deductions.findMany({})

    res.status(200).json({
      deductionsName
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      error: "Hubo un error al momento de obtener las deducciones"
    })
  }
}

// * Obtener las deducciones por empleado *
const getAll = async (req, res) => {
  try {
    const employeeId = req.params.employeeId

    if (!employeeId) {
      return res
        .status(400)
        .json({ error: "Es obligatorio especificar el ID del empleado" })
    }

    // *Validacion de empleado existente*
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        id: employeeId
      }
    })

    if (!existingEmployee) {
      return res.status(400).json({ error: "Empleado no encontrado" })
    }

    const deductions = await prisma.deductionsData.findMany({
      where: {
        employeeId: employeeId
      },
      include: {
        deductionName: true
      }
    })

    res.status(200).json({
      deductions
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Error al buscar el las deducciones del empleado")
  }
}

// Crear un nuevo nombre de deduccion
const createDeductionName = async (req, res) => {
  try {
    // Obtener el nombre de la deducción desde el cuerpo de la petición
    const { name } = req.body

    // Validar que el nombre exista
    if (!name) {
      res.status(400).json({ error: "El nombre de la deducción es requerido" })
      return
    }

    const existingDeduction = await prisma.deductions.findUnique({
      where: { name }
    })
    if (existingDeduction) {
      return res
        .status(400)
        .json({ error: "El nombre para esa deduccion ya existe" })
    }

    // Crear una nueva deducción
    const deduction = await prisma.deductions.create({
      data: {
        name: name
      }
    })

    res.status(200).json({ deduction })
  } catch (error) {
    console.error("Error al crear el nombre de la deducción:", error)
    res.status(500).json({
      error: "Hubo un error al crear el nombre de la deducción."
    })
  }
}

// Crea los datos de una deduccion
const createDeductionData = async (req, res) => {
  try {
    const employeeId = req.params.employeeId
    const deductionId = req.params.deductionId

    if (!employeeId || !deductionId) {
      return res.status(400).json({
        error: "Los ID del empleado y el ID de la deduccion son requeridos"
      })
    }

    const { percentage, application, state } = req.body

    // Validar que los datos no estén vacíos
    if (!percentage || !application || !state) {
      return res.status(400).json({ error: "Todos los datos son requeridos" })
    }

    if (percentage && typeof percentage !== "number") {
      return res.status(400).json({
        error: "El porcentaje se recibió en un formato que no es valido"
      })
    }

    // Buscar si el empleado ya tiene una deductionsData con el mismo deductionId
    const existingDeductionData = await prisma.deductionsData.findFirst({
      where: {
        employeeId: employeeId,
        deductionId: deductionId
      }
    })

    if (existingDeductionData) {
      return res.status(400).json({
        error: "El empleado ya tiene una deducción con el mismo nombre"
      })
    }

    // Crear una nueva deductionData y relacionarla con el empleado y la deductionName
    const deductionData = await prisma.deductionsData.create({
      data: {
        employeeId: employeeId,
        deductionId: deductionId,
        percentage: percentage,
        application: application,
        state: state
      },
      include: {
        deductionName: true
      }
    })

    res.status(200).json({ deductionData })
  } catch (error) {
    console.error("Error al crear los datos de la deduccion:", error)
    res.status(500).json({
      error: "Hubo un error al crear los datos de la deducción."
    })
  }
}

// Edita solo los datos de una deduccion
const editDeductionData = async (req, res) => {
  try {
    const employeeId = req.params.employeeId
    const deductionDataId = req.params.deductionDataId

    const { percentage } = req.body

    if (!employeeId || !deductionDataId) {
      return res.status(400).json({
        error:
          "Los ID del empleado y el ID de los datos de la deduccion son requeridos"
      })
    }

    if (percentage && typeof percentage !== "number") {
      return res
        .status(400)
        .json({ error: "El monto se recibió en un formato que no es valido" })
    }

    // Buscar si existen los datos de la deduction
    const existingDeductionData = await prisma.deductionsData.findFirst({
      where: {
        id: deductionDataId,
        employeeId: employeeId
      }
    })

    if (!existingDeductionData) {
      return res
        .status(400)
        .json({ error: "La deduccion a editar no ha sido encontrada." })
    }

    const deductionToUpdate = {
      ...req.body
    }

    // Actualizar la deduction
    const deductionDataUpdated = await prisma.deductionsData.update({
      where: {
        id: deductionDataId,
        employeeId: employeeId
      },
      data: deductionToUpdate,
      include: {
        deductionName: true
      }
    })

    res.status(200).json({ deductionData: deductionDataUpdated })
  } catch (error) {
    console.error("Error al actualizar los datos de la deducción:", error)
    res.status(500).json({
      error: "Hubo un error al actualizar los datos de la deducción."
    })
  }
}

// Elimina los datos de una deduccion
const deleteOne = async (req, res) => {
  try {
    const { deductionDataId, employeeId } = req.params

    if (!deductionDataId) {
      return res
        .status(400)
        .json({ message: "el ID de los datos de la deduccion es requerido" })
    }
    if (!employeeId) {
      return res
        .status(400)
        .json({ message: "el ID del empleado de la deduccion es requerido" })
    }

    // Eliminar la deductionData con ese id
    await prisma.deductionsData.delete({
      where: {
        id: deductionDataId,
        employeeId
      }
    })

    res.json({ message: "Datos de la deduccion eliminados correctamente." })
  } catch (error) {
    console.error("Error al eliminar los datos de la deducción:", error)
    res.status(500).json({
      error: "Hubo un error al eliminar los datos de la deducción."
    })
  }
}

module.exports = {
  getAllDeductionsName,
  getAll,
  createDeductionName,
  createDeductionData,
  editDeductionData,
  deleteOne
}
