const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

const getAllCompanies = async (req, res) => {
  const allCompanies = await prisma.company.findMany();
  res.json(allCompanies);
};

const createCompany = async (req, res) => {
  const newCompany = await prisma.company.create({
    data: req.body,
  });
  res.json(newCompany);
};

module.exports = { getAllCompanies, createCompany };
