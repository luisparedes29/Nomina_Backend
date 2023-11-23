const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// * Obtener las deducciones por empleado *
const getDeductionsByEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    if (!employeeId) {
      return res.status(400).json({ error: "Es obligatorio especificar el ID del empleado" });
    }

    // *Validacion de empleado existente*
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        id: employeeId
      },
    })

    if (!existingEmployee) {
      return res.status(400).json({ error: 'Empleado no encontrado' })
    }

    const deductions = await prisma.deductions.findUnique({
      where: {
        employeeId: employeeId,
      },
    })

    res.status(200).json({
      deductions,
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Error al obtener las deducciones del empleado')
  }
}

// * Endpoint para editar una deduccion existente *
const editDeduction = async (req, res) => {
  try {
    const {
      amount,
    } = req.body
    const deductionId = req.params.id;

    const deductionExist = await prisma.deductions.findFirst({
      where: {
        id: deductionId,
      },
    });

    if (!deductionExist) {
      return res.status(400).json({ error: "La deduccion no se ha encontrado" });
    }

    if (amount && typeof amount !== "number") {
      return res
        .status(400)
        .json({ error: 'El monto se recibió en un formato que no es valido' })
    }

    const deductionToUpdate = {
      ...req.body,
    }

    await prisma.employee.update({
      where: {
        id: req.params.id,
      },
      data: deductionToUpdate,
    })
    res.status(200).json({
      message: 'Se ha actualizado la información de la deducción exitosamente',
    })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .send(
        'Se ha producido un error al intentar actualizar la información de la deducción'
      )
  }
}

const createDeduction = async (req, res) => {
  try {
    const { payrollId, companyId, employeeId } = req.params
    const { name, amount, taxInformation } =
      req.body; // Traemos esto del req. PD: Por los ID es que vamos a hacer la conexion con las otras tablas para las relaciones respectivas
    if (!name || !amount || !taxInformation || !payrollId || !companyId || !employeeId) {
      return res
        .status(400)
        .json({
          error:
            "Es necesario rellenar todos los campos para poder avanzar con el registro",
        });
    }
    const existingDeduction = await prisma.deductions.findFirst({
      // comprobamos si existen dentro de la tabla otro con el mismo nombre
      where: {
        name,
      },
    });

    if (existingDeduction) {
      return res.status(400).json({ error: "Deducción ya registrada" });
    }

    const newDeduction = await prisma.deductions.create({
      data: {
        name,
        amount,
        taxInformation,
        payrollId,
        companyId,
        employeeId,
      },
    });
    res.status(200).json({ newDeduction: newDeduction });
  } catch (error) {
    console.error("Error al crear deducción:", error);
    res.status(500).json({
      error: "Hubo un error al crear la deducción.",
    });
  }
};

const deleteDeduction = async (req, res) => {
  try {
    const deductionId = req.params.id;
    const employeeId = req.params.employeeId;

    if (!deductionId) {
      return res.status(400).json({ error: "Es obligatorio especificar el ID de la deducción" });
    }

    await prisma.deductions.delete({
      where: {
        id: deductionId,
        employeeId: employeeId,
      },
    })
    res.status(200).json({ message: 'Se ha borrado la deducción exitosamente' })
  } catch (error) {
    console.error('Error al eliminar la deducción: ', error.message);
    res
      .status(500)
      .send('Se ha producido un error al intentar borrar la deducción')
  }
};

module.exports = { createDeduction, editDeduction, deleteDeduction, getDeductionsByEmployee };
