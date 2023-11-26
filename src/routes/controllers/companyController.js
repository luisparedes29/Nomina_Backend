const { PrismaClient } = require('@prisma/client');
const {matchedData} = require('express-validator')


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
        res.status(200).json({
            company: company,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: error
        });
    }
};

const createCompany = async (req, res) => {
    try {
        const { name, type } = req.body;
        console.log(req.body)
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
