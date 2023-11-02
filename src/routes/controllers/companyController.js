const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

const getAllCompanies = async (req, res) => {
  const allCompanies = await prisma.company.findMany();
  res.json(allCompanies);
};

const createCompany = async (req, res) => {
  try {
    const { Name, Type, User, Setting, Periodicity, Payroll, Payroll_Employee, Perception, Receipt, Deductions } = req.body
    if (!Name || !Type) {
      return res.status(400).json({ error: 'Es necesario rellenar todos los campos para poder avanzar con el registro' });
    }
    const existingCompany = await prisma.company.findFirst({
      where: { Name }
    });
    if (existingCompany) {
      return res.status(400).json({ error: 'Empresa en existencia' });
    }
    const newCompany = await prisma.company.create({
      data: {
        Name,
        Type,
        User,
        Setting,
        Periodicity,
        Payroll,
        Payroll_Employee,
        Perception,
        Receipt,
        Deductions
      }
    });
    res.status(200).json(newCompany);
  } catch (error) {
    console.error('Error al crear empresa:', error);
        res.status(500).json({
            error: 'Hubo un error al crear la empresa.',
        });
  }
};

module.exports = { getAllCompanies, createCompany };
