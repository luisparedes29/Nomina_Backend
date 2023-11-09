const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); // instancia de prisma

const createPayroll = async (req, res) => {
    try {
        const { employee, paymentPeriod, grossSalary, totalPerceptions, totalDeductions, netSalary, taxInformation, state, details, voucher, companyID, payrollEmployee, perception, deductions } = req.body // DATA
        if (!employee || !paymentPeriod || !grossSalary || !totalPerceptions || !totalDeductions || !netSalary || !taxInformation || !state || !details || !voucher || !Company_name) { // COMPROBAMOS DATA
            return res.status(400).json({ error: 'Es necesario rellenar todos los campos para poder avanzar con el registro' });
        }
        const existingPayroll = await prisma.payroll.findFirst({ // ENCUENTRA SIMILAR
            where: {

                employee,
                paymentPeriod,
                grossSalary,
                totalPerceptions,
                totalDeductions,
                netSalary,
                taxInformation,
                state,
                details,
                voucher

            }
        })
        if (existingPayroll) { // SI EXISTE
            return res.status(400).json({ error: 'Nomina ya resgistrado' });
        }
        const newPayroll = await prisma.payroll.create({ // CREA PAYRROLL CON LA SIGUINTE DATA:
            data: {
                employee,
                paymentPeriod,
                grossSalary,
                totalPerceptions,
                totalDeductions,
                netSalary,
                taxInformation,
                state,
                details,
                voucher,
                companyID,
                payrollEmployee,
                perception,
                deductions
            }
        })
        res.status(200).json({ newPayroll: newPayroll });
    } catch (error) {
        console.error('Error al crear nomina:', error);
        res.status(500).json({
            error: 'Hubo un error al crear nomina.',
        });
    }
}

const getAll = async (req, res) => {
    try {
        const allPayrolls = await prisma.payroll.findMany()
        if(allPayrolls.length == 0){
            return res.status(404).json({ message : "No se encontraron nominas registradas." })
        }
        res.status(200).json({allPayrolls: allPayrolls})
    } catch (error) {
        console.error('Error al buscar la nomina:', error);
        res.status(404).json({
            error: 'Error al intentar buscar nomina',
        });
    }

}

const getOne = async (req, res) => {
    try {
        const id = parseInt(req.params._id); // sacamos id de params (_id) y lo volvemos int
        const payroll = await prisma.payroll.findUnique({ //Buscamos en lso payrolls (id es inherentemente unique)
            where: {
                id: id
            }
        })
        res.status(200).json({ payroll: payroll }); // DATA
    } catch (error) {
        console.error('Error al buscar la nomina:', error);
        res.status(404).json({
            error: 'Error al intentar buscar nomina',
        });

    }
}

module.exports = { createPayroll, getAll, getOne }