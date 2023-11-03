const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const getAll = async (req, res) => {
    try {
        const perceptions = await prisma.perception.findMany()
        console.log(perceptions.length)
        if (perceptions.length == 0) {
            return res.status(404).json({ error: 'No se encuentran perpecepciones registradas' });
        }
        return res.status(200).json({ perceptions: perceptions })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Hubo un error al buscar percepciones" })
    }
}

const createPerception = async (req, res) => {
    try {
        const {
            Name,
            Amount,
            Tax_information,
            Payroll_name,
            Payroll_ID,
            Company,
            Company_ID,
            Employee_name,
            Employee_ID } = req.body;
        if (!Name || !Amount || !Tax_information || !Payroll_name || !Company || !Employee_name) {
            return res.status(400).json({ error: 'Es necesario rellenar todos los campos para poder avanzar con el registro' });
        }
        const existingPerception = await prisma.perception.findFirst({
            where: {
                Name,
                Amount,
                Tax_information
            }
        })
        if (existingPerception) {
            return res.status(400).json({ error: 'Percepción ya resgistrado' });
        }
        const newPerception = await prisma.perception.create({
            data: {
                Name,
                Amount,
                Tax_information,
                Payroll_name,
                Company,
                Employee_name
            }
        })
        res.status(200).json({ newPerception: newPerception });
    } catch (error) {
        console.error('Error al crear percepción:', error);
        res.status(500).json({
            error: 'Hubo un error al crear percepción.',
        });
    }
}

const deleteOne = async (req, res) => {
    try {
        const id = parseInt(req.params._id);
        const deletePerception = await prisma.perception.delete({
            where: {
                id: id
            }
        })
        res.status(200).json({ message: "Se elimino correctamente"});
    } catch (error) {
        console.error('Error al eliminr percepción:', error);
        res.status(500).json({
            error: 'Hubo un error al eliminar percepción.',
        });
    }
}

module.exports = { getAll, createPerception, deleteOne }