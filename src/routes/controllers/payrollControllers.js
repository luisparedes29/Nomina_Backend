const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); // instancia de prisma

const createPayroll = async (req, res) => {
    try{
        const {Employee, Payment_period,  Gross_salary,Total_perceptions, Total_deductions, Net_salary, Tax_information, State,  Details, Voucher, Company_name,Company_ID, Payroll_Employee , Perception, Deductions} = req.body // DATA
        if(!Employee || !Payment_period || !Gross_salary || !Total_perceptions ||!Total_deductions || !Net_salary  || !Tax_information || !State || !Details ||  !Voucher  || !Company_name){ // COMPROBAMOS DATA
            return res.status(400).json({ error: 'Es necesario rellenar todos los campos para poder avanzar con el registro' });
        }
        const existingPayroll = await prisma.payroll.findFirst({ // ENCUENTRA SIMILAR
            where: {
                
                Employee, 
                Payment_period,  
                Gross_salary,
                Total_perceptions, 
                Total_deductions, 
                Net_salary, 
                Tax_information, 
                State,  
                Details, 
                Voucher

            }
        })
        if(existingPayroll){ // SI EXISTE
            return res.status(400).json({ error: 'Nomina ya resgistrado' });
        }
        const newPayroll = await prisma.payroll.create({ // CREA PAYRROLL CON LA SIGUINTE DATA:
            data:{
                Employee, 
                Payment_period,
                Gross_salary,
                Total_perceptions, 
                Total_deductions, 
                Net_salary, 
                Tax_information, 
                State,  
                Details, 
                Voucher,
                Company_name,
                Company_ID, 
                Payroll_Employee, 
                Perception, 
                Deductions
            }
        })
        res.status(200).json({ newPayroll: newPayroll });
    }catch (error) {
        console.error('Error al crear nomina:', error);
        res.status(500).json({
            error: 'Hubo un error al crear nomina.',
        });
    }
}

const getAll = async (req, res) => {
    const data = await prisma.payroll.findMany()
    res.json(data)
}

const getOne = async (req, res) => {
    try{
        const id = parseInt(req.params._id); // sacamos id de params (_id) y lo volvemos int
        const payroll = await prisma.payroll.findUnique({ //Buscamos en lso payrolls (id es inherentemente unique)
            where: {
                id : id
            }
        })
        res.status(200).json({ payroll : payroll }); // DATA
    }catch(error) {
        console.error('Error al buscar la nomina:', error);
        res.status(404).json({
            error: 'Nomina no encontrada.',
        });
        
    }
}

module.exports = { createPayroll, getAll, getOne }