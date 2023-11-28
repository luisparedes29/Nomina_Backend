const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// * Obtener las percepciones por empleado *
const getAll = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    if (!employeeId) {
      return res
        .status(400)
        .json({ error: "Es obligatorio especificar el ID del empleado" });
    }

    // *Validacion de empleado existente*
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!existingEmployee) {
      return res.status(400).json({ error: "Empleado no encontrado" });
    }

    const perceptions = await prisma.perceptionData.findMany({
      where: {
        employeeId: employeeId
      },
      include: {
        perceptionName: true
      }
    })

    res.status(200).json({
      perceptions,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error al buscar el las percepciones del empleado");
  }
};

const createPerception = async (req, res) => {
  // TODO: fix this after fix the create payroll endpoint.
  try {
    const { name, amount, taxInformation, payrollID, companyID, employeeID } =
      req.body;
    if (!name || !amount || !taxInformation || !payrollName) {
      return res
        .status(400)
        .json({
          error:
            "Es necesario rellenar todos los campos para poder avanzar con el registro",
        });
    }
    const existingPerception = await prisma.perception.findFirst({
      where: {
        name,
        amount,
        taxInformation,
      },
    });
    if (existingPerception) {
      return res.status(400).json({ error: "Percepción ya resgistrado" });
    }
    const newPerception = await prisma.perception.create({
      data: {
        name,
        amount,
        taxInformation,
      },
    });
    res.status(200).json({ newPerception: newPerception });
  } catch (error) {
    console.error("Error al crear percepción:", error);
    res.status(500).json({
      error: "Hubo un error al crear percepción.",
    });
  }
};

const deleteOne = async (req, res) => {
  try {
    const id = parseInt(req.params._id);
    const deletePerception = await prisma.perception.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Se elimino correctamente" });
  } catch (error) {
    console.error("Error al eliminr percepción:", error);
    res.status(500).json({
      error: "Hubo un error al eliminar percepción.",
    });
  }
};

module.exports = { getAll, createPerception, deleteOne };
