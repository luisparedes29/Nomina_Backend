const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// * Obtener las percepciones por empleado *
const getAllPerceptionsName = async (req, res) => {
  try {
    const perceptionsName = await prisma.perception.findMany({})

    res.status(200).json({
      perceptionsName,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Hubo un error al momento de obtener las percepciones",
    })
  }
};

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

// Crear un nuevo nombre de Percepcion
const createPerceptionName = async (req, res) => {
  try {
    // Obtener el nombre de la percepción desde el cuerpo de la petición
    const { name } = req.body

    // Validar que el nombre exista
    if (!name) {
      res.status(400).json({ error: 'El nombre de la percepción es requerido' })
      return
    }

    const existingPerception = await prisma.perception.findUnique({
      where: { name }
    })
    if (existingPerception) {
      return res
        .status(400)
        .json({ error: 'El nombre para esa percepcion ya existe' })
    }

    // Crear una nueva percepción 
    const perception = await prisma.perception.create({
      data: {
        name: name
      }
    })

    res.status(200).json({perception})
  } catch (error) {
    console.error("Error al crear el nombre de la percepción:", error);
    res.status(500).json({
      error: "Hubo un error al crear el nombre de la percepción.",
    });
  }
};

// Creo que no será necesario 
const editPerceptionName = async (req, res) => {
  try {
    // Obtener el nombre de la percepción desde el cuerpo de la petición
    const { name } = req.body

    const perceptionId = req.params.perceptionId

    if (!perceptionId) {
      return res.status(400).json({ message: 'el ID del nombre de la percepcion es requerido' })
    }

    // Validar que el nombre exista
    if (!name) {
      res.status(400).json({ message: 'El nombre de la percepción es requerido' })
      return
    }

    // Buscar si existe la percepction
    const existingPerceptionName = await prisma.perception.findFirst({
      where: {
        id: perceptionId,
      }
    })

    if (!existingPerceptionName) {
      return res.status(400).json({ message: 'La percepcion a editar no ha sido encontrada.' })
    }

    // Actualizar la percepction
    const perceptionUpdated = await prisma.perception.update({
      where: {
        id: perceptionId,
      },
      data: {
        name,
      }
    })

    res.json(perceptionUpdated)
  } catch (error) {
    console.error("Error al actualizar el nombre de la percepción:", error);
    res.status(500).json({
      error: "Hubo un error al actualizar el nombre de la percepción.",
    });
  }
};

// Edita solo los datos de una percepcion
const editPerceptionData = async (req, res) => {
  try {
    const employeeId = req.params.employeeId
    const perceptionDataId = req.params.perceptionDataId

    const {
      amount,
    } = req.body

    if (!employeeId || !perceptionDataId) {
      return res.status(400).json({ error: 'Los ID del empleado y el ID de los datos de la percepcion son requeridos' })
    }

    if (amount && typeof amount !== "number") {
      return res
        .status(400)
        .json({ error: "El monto se recibió en un formato que no es valido" });
    }

    // Buscar si existen los datos de la percepction
    const existingPerceptionData = await prisma.perceptionData.findFirst({
      where: {
        id: perceptionDataId,
        employeeId: employeeId,
      }
    })

    if (!existingPerceptionData) {
      return res.status(400).json({ error: 'La percepcion a editar no ha sido encontrada.' })
    }

    const perceptionToUpdate = {
      ...req.body,
    }

    // Actualizar la percepction
    const perceptionDataUpdated = await prisma.perceptionData.update({
      where: {
        id: perceptionDataId,
        employeeId: employeeId,
      },
      data: perceptionToUpdate,
      include: {
        perceptionName: true 
      }
    })

    res.status(200).json({ perceptionData: perceptionDataUpdated })
  } catch (error) {
    console.error("Error al actualizar los datos de la percepción:", error);
    res.status(500).json({
      error: "Hubo un error al actualizar los datos de la percepción.",
    });
  }
};

// Crea los datos de una percepcion
const createPerceptionData = async (req, res) => {
  try {
    const employeeId = req.params.employeeId
    const perceptionId = req.params.perceptionId

    if (!employeeId || !perceptionId) {
      return res.status(400).json({ error: 'Los ID del empleado y el ID de la percepcion son requeridos' })
    }

    const { amount, application, state } = req.body

    // Validar que los datos no estén vacíos
    if (!amount || !application || !state) {
      return res.status(400).json({ error: 'Todos los datos son requeridos' })
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

    if (existingPerceptionData) {
      return res.status(400).json({ error: 'El empleado ya tiene una percepción con el mismo nombre' })
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

    res.status(200).json({ perceptionData })
  } catch (error) {
    console.error("Error al crear los datos de la percepcion:", error);
    res.status(500).json({
      error: "Hubo un error al crear los datos de la percepción.",
    });
  }
};

// Elimina los datos de una percepcion
const deleteOne = async (req, res) => {
  try {
    const { perceptionDataId, employeeId} = req.params

    if (!perceptionDataId) {
      return res.status(400).json({ message: 'el ID de los datos de la percepcion es requerido' })
    }
    if (!employeeId) {
      return res.status(400).json({ message: 'el ID del empleado de la percepcion es requerido' })
    }

    // Eliminar la perceptionData con ese id
    await prisma.perceptionData.delete({
      where: {
        id: perceptionDataId,
        employeeId
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

module.exports = { getAllPerceptionsName, getAll, createPerceptionName, createPerceptionData, editPerceptionName, editPerceptionData, deleteOne };
