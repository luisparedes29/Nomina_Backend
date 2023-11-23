const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// * Obtener las percepciones por empleado *
const getPerceptionByEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const companyId = req.params.companyId;

    if (!employeeId) {
      return res.status(400).json({ error: "Es obligatorio especificar el ID del empleado" });
    }
    if (!companyId) {
      return res.status(400).json({ error: "Es obligatorio especificar el ID de la empresa" });
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

    const perception = await prisma.perception.findUnique({
      where: {
        employeeId,
        companyId,
      },
    });

    res.status(200).json({
      perception,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error al buscar el las percepciones del empleado");
  }
};

// * Endpoint para editar una percepcion existente *
const editPerception = async (req, res) => {
  try {
    const { amount } = req.body;
    const perceptionId = req.params.perceptionId;
    const employeeId = req.params.employeeId;

    const perceptionExist = await prisma.perception.findFirst({
      where: {
        id: perceptionId,
        employeeId: employeeId,
      },
    });

    if (!perceptionExist) {
      return res
        .status(400)
        .json({ error: "La percepcion no se ha encontrado" });
    }

    if (amount && typeof amount !== "number") {
      return res
        .status(400)
        .json({ error: "El monto se recibió en un formato que no es valido" });
    }

    const perceptionToUpdate = {
      ...req.body,
    };

    await prisma.perception.update({
      where: {
        id: perceptionId,
        employeeId: employeeId,
      },
      data: perceptionToUpdate,
    });
    res.status(200).json({
      message: "Se ha actualizado la información de la percepcion exitosamente",
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send(
        "Se ha producido un error al intentar actualizar la información de la percepcion"
      );
  }
};

const createPerception = async (req, res) => {
  try {
    const { name, amount, taxInformation, payrollId, companyId, employeeId } =
      req.body;
    if (
      !name ||
      !amount ||
      !taxInformation ||
      !payrollId ||
      !companyId ||
      !employeeId
    ) {
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
        payrollId,
        companyId,
        employeeId,
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
    const id = parseInt(req.params.id);
    await prisma.perception.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Se elimino correctamente" });
  } catch (error) {
    console.error("Error al eliminar percepción:", error);
    res.status(500).json({
      error: "Hubo un error al eliminar percepción.",
    });
  }
};

module.exports = {
  getPerceptionByEmployee,
  createPerception,
  editPerception,
  deleteOne,
};
