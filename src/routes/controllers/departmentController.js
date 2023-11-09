const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllDepartments = async (req, res) => {
    try {
        const departments = await prisma.department.findMany();
        res.status(200).json({ departments: departments });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Se ha producido un error al crear el departamento ');
    }
};

const createDepartment = async (req, res) => {
    try {
        const { name, companyId } = req.body;
        const newApartment = await prisma.department.create({
            data: {
                name,
                companyId,
            },
        });
        res.status(200).json({ newApartment: newApartment });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Se ha producido un error al crear el departamento ');
    }
};

const editDepartment = async (req, res) => {
    try {
        const department = await prisma.department.update({
            where: {
                id: req.params.id,
            },
            data: {
                name: req.body.name,
                companyId: req.body.companyId,
            },
        });
        res.status(200).json({ message: 'Se ha actualizado el departamento exitosamente' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Se ha producido un error al intentar actualizar el departamento ');
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const department = await prisma.department.delete({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: 'Se ha borrado el departamento exitosamente' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Se ha producido un error al intentar borrar el departamento ');
    }
};

module.exports = { getAllDepartments, createDepartment, editDepartment, deleteDepartment }