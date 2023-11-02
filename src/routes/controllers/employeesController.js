const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { createToken } = require('./jwtCreate');

const prisma = new PrismaClient(); // instancia de prisma

const createEmployee = async (req, res) => {
    try {
        const { Name, Last_name, Start_date, Birthdate, Gender, Email, Phone, Civil_status, Address, Charge, Department, Base_salary, Payroll_Employee, Receipt, Perception, Deductions, CI} = req.body;
        if (!Name || !Last_name || !CI || !Birthdate || !Gender || !Address || !Phone || !Email || !Civil_status || !Start_date || !Charge || !Department || !Base_salary ) {
            return res.status(400).json({ error: 'Es necesario rellenar todos los campos para poder avanzar con el registro' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return res.status(400).json({ error: 'El correo electronico no es valido' });
        }
        const existingEmployee = await prisma.employee.findUnique({
            where: {  
                Email
            }
        });

        if (existingEmployee) {
            return res.status(400).json({ error: 'Empleado ya resgistrado' });
        }
        if(Phone.toString().split('').length > 9){
            return res.status(400).json({error: 'Teléfono invalido.' })
        }
        const newEmployee = await prisma.employee.create({
            data: {
                Name,
                Last_name,
                CI,
                Birthdate,
                Gender,
                Address,
                Phone,
                Email,
                Civil_status,
                Start_date,
                Charge,
                Department,
                Base_salary,
                Payroll_Employee,
                Receipt,
                Perception,
                Deductions
            },
        });
        res.status(200).json({ newEmployee: newEmployee });
    } catch (error) {
        console.error('Error al crear empleado:', error);
        res.status(500).json({
            error: 'Hubo un error al crear empleado.',
        });
    }
}   

const allEmployees = async(req, res) => {
    const data = await prisma.Employee.findMany()
    res.json(data)
}

const deleteOne = async (req, res) => {
    const id = parseInt(req.params._id);
    const data = await prisma.employee.delete({
        where : {id : id}
    })
    res.send("Eliminado empleado de id " + id)
}

module.exports = {createEmployee, allEmployees, deleteOne};
