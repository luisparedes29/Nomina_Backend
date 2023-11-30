const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt')

const sendInitData = async () => {
  try {
    //verificamos que no exista ninguna empresa en la Base de datos
    const existingCompany = await prisma.company.findMany()

    if (existingCompany.length > 0) {
      return
    } else {
      const companiesData = [
        {
          name: "TechCorp",
          type: "Tecnología",
          currency: "$",
          country: "Estados Unidos"
        },
        {
          name: "FinanzasGlobal",
          type: "Finanzas",
          currency: "DM",
          country: "Alemania"
        },
        {
          name: "EcoSolutions",
          type: "Sostenibilidad",
          currency: "£",
          country: "Reino Unido"
        },
        {
          name: "InnoTech",
          type: "Innovación",
          currency: "¥",
          country: "Japón"
        },
        {
          name: "HealthCare Ltd.",
          type: "Salud",
          currency: "$",
          country: "Canadá"
        }
      ]
      // Insertar empresas y obtener los IDs
      const companyIds = [];
      for (const company of companiesData) {
        const createdCompany = await prisma.company.create({
          data: company,
        });

        companyIds.push(createdCompany.id);
      }

      console.log('Empresas insertadas correctamente.');

      const existingUser = await prisma.user.findMany()

      if (existingUser.length > 0) {
        return
      } else {
        // Datos de usuarios
        const usersData = [
          { name: 'Admin1', lastName: 'AdminLastName1', email: 'admin1@example.com', phone: '123456789', address: 'Dirección 1', password: await bcrypt.hash('password', 10), role: 'admin', companyId: companyIds[0] },
          { name: 'Admin2', lastName: 'AdminLastName2', email: 'admin2@example.com', phone: '234567890', address: 'Dirección 2', password: await bcrypt.hash('password', 10), role: 'admin', companyId: companyIds[1] },
          { name: 'User1', lastName: 'UserLastName1', email: 'user1@example.com', phone: '345678901', address: 'Dirección 3', password: await bcrypt.hash('password', 10), role: 'user', companyId: companyIds[2] },
          { name: 'User2', lastName: 'UserLastName2', email: 'user2@example.com', phone: '456789012', address: 'Dirección 4', password: await bcrypt.hash('password', 10), role: 'user', companyId: companyIds[3] },
          { name: 'Admin3', lastName: 'AdminLastName3', email: 'admin3@example.com', phone: '567890123', address: 'Dirección 5', password: await bcrypt.hash('password', 10), role: 'admin', companyId: companyIds[4] },
          { name: 'User3', lastName: 'UserLastName3', email: 'user3@example.com', phone: '678901234', address: 'Dirección 6', password: await bcrypt.hash('password', 10), role: 'user', companyId: companyIds[0] },
          { name: 'User4', lastName: 'UserLastName4', email: 'user4@example.com', phone: '789012345', address: 'Dirección 7', password: await bcrypt.hash('password', 10), role: 'user', companyId: companyIds[1] },
        ];

        // Insertar usuarios
        for (const user of usersData) {
          await prisma.user.create({
            data: user,
          });
        }

        console.log('Usuarios insertados correctamente.');

        const existingDepartment = await prisma.department.findMany()

        if (existingDepartment.length > 0) {
          return
        } else {
          // Datos de departamentos específicos por tipo de empresa
          const departmentsData = [
            { name: 'Desarrollo de Software', companyId: companyIds[0] },
            { name: 'Investigación y Desarrollo', companyId: companyIds[0] },
            { name: 'Contabilidad', companyId: companyIds[1] },
            { name: 'Finanzas Corporativas', companyId: companyIds[1] },
            { name: 'Gestión Ambiental', companyId: companyIds[2] },
            { name: 'Responsabilidad Social Corporativa', companyId: companyIds[2] },
            { name: 'Innovación Tecnológica', companyId: companyIds[3] },
            { name: 'Investigación Científica', companyId: companyIds[3] },
            { name: 'Salud Preventiva', companyId: companyIds[4] },
            { name: 'Investigación Médica', companyId: companyIds[4] },
          ];

          // Insertar departamentos
          for (const department of departmentsData) {
            await prisma.department.create({
              data: department,
            });
          }

          console.log('Departamentos insertados correctamente.');

          const existingEmployee = await prisma.employee.findMany()

          if (existingEmployee.length > 0) {
            return
          } else {
            // Datos de empleados
            const employeesData = [];

            for (const companyId of companyIds) {
              const departments = await prisma.department.findMany({ where: { companyId } });

              for (const department of departments) {
                const numEmployees = faker.number.int({ min: 20, max: 40 });

                for (let i = 0; i < numEmployees; i++) {
                  const employee = {
                    name: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    identityCard: faker.number.int({ min: 1000000, max: 9999999 }),
                    birthdate: faker.date.past({30: '2000-01-01'}),
                    gender: faker.helpers.arrayElement(['Masculino', 'Femenino']),
                    condition: faker.helpers.arrayElement(['Fijo', 'Contratado', 'Jubilado', 'Incapacitado']),
                    address: faker.location.streetAddress(),
                    phone: faker.phone.number(),
                    email: faker.internet.email(),
                    bankAccount: faker.finance.accountNumber(),
                    civilStatus: faker.helpers.arrayElement(['Soltero/a', 'Casado/a', 'Viudo/a', 'Divorciado/a']),
                    startDate: faker.date.past({1: '2023-11-01'}),
                    charge: faker.person.jobTitle(),
                    baseSalary: parseFloat(faker.finance.amount(20000, 80000, 2)),
                    departmentId: department.id,
                    companyId,
                  };

                  employeesData.push(employee);
                }
              }
            }

            // Insertar empleados
            for (const employee of employeesData) {
              await prisma.employee.create({
                data: employee,
              });
            }

            console.log('Empleados insertados correctamente.');
            
            const existingPercetion = await prisma.perception.findMany()

            if (existingPercetion.length > 0) {
              return
            } else {
              // Nombres de percepciones de Venezuela
              const venezuelaPerceptionsNames = [
                'Bono de Alimentación',
                'Bono de Transporte',
                'Bono de Salud',
                'Bono de Productividad',
                'Bono de Navidad',
                'Prima Vacacional',
                'Subsidio de Educación',
                'Estímulo por Antigüedad',
              ];

              // Insertar nombres de percepciones de Venezuela
              const venezuelaPerceptions = await Promise.all(venezuelaPerceptionsNames.map(async (name) => {
                return await prisma.perception.create({
                  data: { name },
                });
              }));

              console.log('Percepciones de Venezuela insertadas correctamente.');

              const existingDeduction = await prisma.deductions.findMany()

              if (existingDeduction.length > 0) {
                return
              } else {
                // Nombres de deducciones de Venezuela
                const venezuelaDeductionsNames = [
                  'Seguro Social',
                  'Fondo de Pensiones',
                  'Seguro de Salud',
                  'Impuesto sobre la Renta',
                  'Fondo de Vivienda',
                  'Aporte Sindical',
                  'Deducción de Uniforme',
                  'Préstamos Personales',
                ];

                // Insertar nombres de deducciones de Venezuela
                const venezuelaDeductions = await Promise.all(venezuelaDeductionsNames.map(async (name) => {
                  return await prisma.deductions.create({
                    data: { name },
                  });
                }));

                console.log('Deducciones de Venezuela insertadas correctamente.');

                // Datos de PerceptionData y DeductionsData
                const perceptionsData = [];
                const deductionData = [];

                for (const companyId of companyIds) {
                  const employees = await prisma.employee.findMany({ where: { companyId } });

                  for (const employee of employees) {
                    const employeePerceptionData = [];
                    const employeeDeductionsData = [];

                    // Asignar 4 filas de PerceptionData a cada empleado
                    for (let i = 0; i < 4; i++) {
                      const randomPerception = faker.helpers.arrayElement(venezuelaPerceptions);

                      employeePerceptionData.push({
                        employeeId: employee.id,
                        amount: parseFloat(faker.finance.amount(10, 100, 2)),
                        application: faker.helpers.arrayElement(['Aplica', 'No Aplica']),
                        state: faker.helpers.arrayElement(['Activo', 'Inactivo']),
                        perceptionId: randomPerception.id,
                      });
                    }

                    // Asignar 3 filas de DeductionsData a cada empleado
                    for (let i = 0; i < 3; i++) {
                      const randomDeduction = faker.helpers.arrayElement(venezuelaDeductions);

                      employeeDeductionsData.push({
                        employeeId: employee.id,
                        percentage: parseFloat(faker.finance.amount(1, 20, 2)),
                        application: faker.helpers.arrayElement(['Aplica', 'No Aplica']),
                        state: faker.helpers.arrayElement(['Activo', 'Inactivo']),
                        deductionId: randomDeduction.id,
                      });
                    }

                    perceptionsData.push(...employeePerceptionData);
                    deductionData.push(...employeeDeductionsData);
                  }
                }

                // Insertar datos de PerceptionData y DeductionsData
                await prisma.perceptionData.createMany({
                  data: perceptionsData,
                });
                // Insertar datos de PerceptionData y DeductionsData
                await prisma.deductionsData.createMany({
                  data: deductionData,
                });

                console.log('Datos de PerceptionData y DeductionsData asociados a empleados correctamente.');
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error al insertar datos:", error)
  }
}

module.exports = {
  sendInitData,
}