const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

const getAllCompanies = async (req, res) => {
    try {
        const allCompanies = await prisma.company.findMany();
        if (allCompanies.length == 0) {
            return res.status(404).json({ error: 'No se encuentran empresas registradas' });
        }
        res.status(200).json({ allCompanies: allCompanies });
    } catch (error) {
        console.error('Error al buscar empresas:', error);
        res.status(500).json({
            error: 'Hubo un error al buscar empresas disponibles.',
        });
    }
};

const getCompanyById = async (req, res) => {
    try {
        const company = await prisma.company.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!company) {
            return res.status(404).json({ error: 'La empresa no existe' });
        }
        res.status(200).json({
            company: company,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al buscar la empresa');
    }
};

const createCompany = async (req, res) => {
    try {
        const { name, type } = req.body;
        if (!name || !type) {
            return res.status(400).json({ error: 'Es necesario rellenar todos los campos para poder avanzar con el registro' });
        }
        const existingCompany = await prisma.company.findFirst({
            where: { name },
        });
        if (existingCompany) {
            return res.status(400).json({ error: 'Empresa en existencia' });
        }
        const newCompany = await prisma.company.create({
            data: {
                name,
                type,
            },
        });
        res.status(200).json({ newCompany: newCompany });
    } catch (error) {
        console.error('Error al crear empresa:', error);
        res.status(500).json({
            error: 'Hubo un error al crear la empresa.',
        });
    }
};

module.exports = { getAllCompanies, createCompany, getCompanyById };
