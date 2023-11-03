const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const getAll = async (req, res) => {

}

const createDeduction = async (req, res) => {
    try {
        const { Name, Amount, Tax_information, Payroll_name, Payroll_ID, Company, Company_ID, Employee_name, Employee_ID } = req.body // Traemos esto del req
        if (!Name || !Amount || !Tax_information) {
            return res.status(400).json({ error: 'Es necesario rellenar todos los campos para poder avanzar con el registro' });
        }
        const existingDeduction = await prisma.deductions.findFirst({ // comprobamos si existen dentro de la tabla otro con el mismo nombre
            where: {
                Name
            }
        });

        if (existingDeduction) { // de existir
            return res.status(400).json({ error: 'Deducción ya registrada' });
        }

        const newDeduction = await prisma.deductions.create({ // crea
            data: {
                Name,
                Amount,
                Tax_information,
                Payroll_name, 
                Company, 
                Employee_name
            }
        });
        res.status(200).json({ newDeduction: newDeduction});
    } catch (error) {
        console.error('Error al crear deducción:', error);
        res.status(500).json({
            error: 'Hubo un error al deducción.'
        });
    }
}

const deleteDeduction = async (req, res) => {

}

module.exports = { createDeduction, deleteDeduction, getAll }