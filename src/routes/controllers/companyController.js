const { PrismaClient } = require('@prisma/client');
const { deleteImage, uploadImageEvent } = require('../../helpers/cloudinary');
var fs = require('fs-extra');

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
        let { name, type, currency, country, logo } = req.body;
        if (!name || !type || !currency || !country) {
            return res.status(400).json({ error: 'Es necesario rellenar todos los campos para poder avanzar con el registro' });
        }
        const { path } = req.file;
        const existingCompany = await prisma.company.findFirst({
            where: { name },
        });
        if (existingCompany) {
            return res.status(400).json({ error: 'Empresa en existencia' });
        }
        
        console.log()
        if (path) {
            const result = await uploadImageEvent(path)
            await fs.unlink(path)
            logo = result.secure_url 
        }
        const newCompany = await prisma.company.create({
            data: {
                name,
                type,
                currency,
                country,
                logo
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

const editCompany = async (req, res) => {
    try {
        let path;
        if (!!req.file) {
            path = req.file.path;
        }
        const data = req.body;
        if (path !== undefined) {

            const item = await prisma.company.findUnique({
                where: {
                    id: req.params.id,
                },
            });
            console.log('1')
            await deleteImage(item.logo)
            console.log('2')

            const result = await uploadImageEvent(path)
            await fs.unlink(path)
            data.logo = result.secure_url 
            const company = await prisma.company.update({
                where: {
                    id: req.params.id,
                },
                data: data,
            })

            return res.status(200).json({ item: "The item has been edited" })
        }
        const company = await prisma.company.update({
            where: {
                id: req.params.id,
            },
            data: data,
        })
        res.status(200).json({ message: 'Se ha actualizado la informacion de la empresa de forma exitosa', newCompanyInfo: data });
    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).json('Ocurrió un error al actualizar la informacion de la empresa');
    }    
}

const deleteCompany = async (req, res) => {
    try {
        const company = await prisma.company.delete({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: 'Se ha eliminado la empresa de la base de datos' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: 'Hubo un error al intentar eliminar la empresa de la base de datos',
        });
    }
}

module.exports = { getAllCompanies, createCompany, getCompanyById, editCompany, deleteCompany };