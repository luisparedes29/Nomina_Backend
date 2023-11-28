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

const createPerceptionName = async (req, res) => {
  try {
    // Obtener el nombre de la percepción desde el cuerpo de la petición
    const { name } = req.body

    // Validar que el nombre exista
    if (!name) {
      res.status(400).json({ message: 'El nombre de la percepción es requerido' })
      return
    }

    // Crear una nueva percepción 
    const perception = await prisma.perception.create({
      data: {
        name: name
      }
    })

    res.json(perception)
  } catch (error) {
    console.error("Error al crear el nombre de la percepción:", error);
    res.status(500).json({
      error: "Hubo un error al crear el nombre de la percepción.",
    });
  }
};

const createPerceptionData = async (req, res) => {
  try {
    const employeeId = req.params.employeeId
    const perceptionId = req.params.perceptionId

    if (!employeeId || !perceptionId) {
      return res.status(400).json({ message: 'Los ID del empleado y el ID de la percepcion son requeridos' })
    }

    const { amount, application, state } = req.body

    // Validar que los datos no estén vacíos
    if (!amount || !application || !state) {
      return res.status(400).json({ message: 'Todos los datos son requeridos' })
    }

    if (amount && typeof amount !== "number") {
      return res
        .status(400)
        .json({ error: "El monto se recibió en un formato que no es valido" });
    }

    // Buscar si el empleado ya tiene una perceptionData con el mismo perceptionId
    const existingPerceptionData = await prisma.perceptionData.findFirst({
      where: {
        employeeId: employeeId,
        perceptionId: perceptionId
      }
    })

    console.log('existingPerceptionData', existingPerceptionData)

    if (existingPerceptionData) {
      return res.status(400).json({ message: 'El empleado ya tiene una percepción con el mismo nombre' })
    }

    // Crear una nueva perceptionData y relacionarla con el empleado y la perceptionName
    const perceptionData = await prisma.perceptionData.create({
      data: {
        employeeId: employeeId,
        perceptionId: perceptionId,
        amount: amount,
        application: application,
        state: state
      },
      include: {
        perceptionName: true 
      }
    })

    res.json(perceptionData)
  } catch (error) {
    console.error("Error al crear los datos de la percepcion:", error);
    res.status(500).json({
      error: "Hubo un error al crear los datos de la percepción.",
    });
  }
};

const deleteOne = async (req, res) => {
  try {
    const perceptionDataId = req.params.perceptionDataId

    if (!perceptionDataId) {
      return res.status(400).json({ message: 'el ID de los datos de la percepcion es requerido' })
    }

    // Eliminar la perceptionData con ese id
    await prisma.perceptionData.delete({
      where: {
        id: perceptionDataId
      }
    })
  
    res.json({ message: "Datos de la percepcion eliminados correctamente."})
  } catch (error) {
    console.error("Error al eliminar los datos de la percepción:", error);
    res.status(500).json({
      error: "Hubo un error al eliminar los datos de la percepción.",
    });
  }
};

module.exports = { getAll, createPerceptionName, createPerceptionData, deleteOne };
