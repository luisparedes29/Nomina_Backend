const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); // instancia de prisma

const generatePayroll = async (req, res) => {
    try {
        const { departmentId, companyId } = req.params
        const employees = await prisma.employee.findMany({
            where: {
              AND: [
                {
                  departmentId: departmentId,
                },
                {
                  companyId: companyId,
                },
              ],
            },
          })
          if (employees.length == 0) {
            return res.status(404).json({
              error: 'No se encontraron empleados registrados en ese departamento.',
            })
        }
        //si existen los devolvemos
        res.status(200).json({ employees: employees });
    } catch (error) {
        console.error('Error al crear nomina:', error);
        res.status(500).json({
            error: 'Hubo un error al crear nomina.',
        });
    }
};

const allPayrollsOfCompany = async (req, res) => {
    try {
        const payroll = await prisma.payroll.findMany({
            where: {
                companyId: req.params.companyId,
            },
        });
        if (payroll.length == 0) {
            return res.status(404).json({ error: 'Actualmente no se han generado nóminas para esta empresa' });
        }
        res.status(200).json({ payroll: payroll });
    } catch (error) {
        console.error('Ocurrió un error al intentar recuperar todas las nóminas de esta empresa:', error);
        res.status(500).json({
            error: 'Algo falló intentando buscar todas las nóminas de esta empresa',
        });
    }
};
const getOne = async (req, res) => {
    try {
        const id = req.params._id; // sacamos id de params (_id) y lo volvemos int
        const payroll = await prisma.payroll.findUnique({
            //Buscamos en lso payrolls (id es inherentemente unique)
            where: {
                id: id,
            },
        });
        res.status(200).json({ payroll: payroll }); // DATA
    } catch (error) {
        console.error('Error al buscar la nomina:', error);
        res.status(404).json({
            error: 'Error al intentar buscar nomina',
        });
    }
};

module.exports = { generatePayroll, allPayrollsOfCompany, getOne };
