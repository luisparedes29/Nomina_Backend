const { PrismaClient } = require("@prisma/client")
const {
  getSalary,
  getTotalPercepctions,
  getTotalDeductions
} = require("../../helpers/calculos")

const prisma = new PrismaClient() // instancia de prisma

// Crea la nomina
const generatePayroll = async (req, res) => {
  try {
    const { companyId } = req.params
    const {
      title,
      paymentPeriod,
      dateRange,
      arrayOfDepartments,
      arrayOfPerceps,
      arrayOfDeducs,
      state
    } = req.body

    let employees = await prisma.employee.findMany({
      where: {
        AND: [
          {
            departmentId: {
              in: arrayOfDepartments
            }
          },
          {
            companyId: companyId
          }
        ]
      }
    })
    if (employees.length == 0) {
      return res.status(404).json({
        error: "No se encontraron empleados registrados."
      })
    }

    const idEmployees = employees.map(employee => employee.id)

    const perceptions = await prisma.perceptionData.findMany({
      where: {
        AND: [
          {
            employeeId: {
              in: idEmployees
            }
          },
          {
            perceptionId: {
              in: arrayOfPerceps
            }
          }
        ]
      },
      include: {
        perceptionName: true
      }
    })

    // let employeesWithPercepctions = []

    const getPerceptionsOfEmployee = (emplo, arrayPercep) => {
      if (arrayPercep.length > 0) {
        return arrayPercep.filter(percep => percep.employeeId === emplo.id)
      }
      return []
    }
    if (perceptions.length >= 0) {
      employees = employees.map(employee => ({
        ...employee,
        perceptions: getPerceptionsOfEmployee(employee, perceptions)
      }))
    }

    const deductions = await prisma.deductionsData.findMany({
      where: {
        AND: [
          {
            employeeId: {
              in: idEmployees
            }
          },
          {
            deductionId: {
              in: arrayOfDeducs
            }
          }
        ]
      },
      include: {
        deductionName: true
      }
    })

    // let employeesWithDeductions = []

    const getDeductionsOfEmployee = (emplo, arrayPercep) => {
      if (arrayPercep.length > 0) {
        return arrayPercep.filter(percep => percep.employeeId === emplo.id)
      }
      return []
    }
    if (deductions.length >= 0) {
      employees = employees.map(employee => ({
        ...employee,
        deductions: getDeductionsOfEmployee(employee, deductions)
      }))
    }

    employees = employees.map(employee => {
      const salaryBase = getSalary(employee.baseSalary, paymentPeriod)
      const totalPercep = getTotalPercepctions(employee.perceptions)
      const totalDeduc = getTotalDeductions(employee.deductions)
      const grossSalary = salaryBase + totalPercep
      const netSalary =
        totalDeduc > 0
          ? grossSalary - (grossSalary * totalDeduc) / 100
          : grossSalary
      return {
        ...employee,
        grossSalary: parseFloat(grossSalary.toFixed(2)),
        netSalary: parseFloat(netSalary.toFixed(2))
      }
    })

    const payroll = await prisma.payroll.create({
      data: {
        title: title,
        paymentPeriod,
        companyId,
        dateRange,
        taxInformation: "Hola",
        details: "Hola",
        voucher: "Hola",
        state
      }
    })

    employeesPayroll = employees.map(employee => {
      const salaryBase = getSalary(employee.baseSalary, paymentPeriod)
      const totalPercep = getTotalPercepctions(employee.perceptions)
      const totalDeduc = getTotalDeductions(employee.deductions)
      const grossSalary = salaryBase + totalPercep
      const netSalary =
        totalDeduc > 0
          ? grossSalary - (grossSalary * totalDeduc) / 100
          : grossSalary
      return {
        employeeId: employee.id,
        payrollId: payroll.id,
        totalPerceptions: totalPercep,
        totalDeductions: totalDeduc,
        grossSalary: parseFloat(grossSalary.toFixed(2)),
        netSalary: parseFloat(netSalary.toFixed(2))
      }
    })

    const payrollEmployee = await prisma.payrollEmployee.createMany({
      data: employeesPayroll
    })

    //si existen los devolvemos
    res.status(200).json({ employees: employees, payroll })
  } catch (error) {
    console.error("Error al crear nomina:", error)
    res.status(500).json({
      error: "Hubo un error al crear nomina."
    })
  }
}

// Devuelve todas las nominas de una empresa
const allPayrollsOfCompany = async (req, res) => {
  try {
    const payrollsOpen = await prisma.payroll.findMany({
      where: {
        companyId: req.params.companyId,
        state: "Abierta"
      }
    })
    const payrollsClosed = await prisma.payroll.findMany({
      where: {
        companyId: req.params.companyId,
        state: "Cerrada"
      }
    })
    res.status(200).json({ payrollsOpen, payrollsClosed })
  } catch (error) {
    console.error(
      "Ocurrió un error al intentar recuperar todas las nóminas de esta empresa:",
      error
    )
    res.status(500).json({
      error: "Algo falló intentando buscar todas las nóminas de esta empresa"
    })
  }
}

// Devuelve una nomina por ID
const getOne = async (req, res) => {
  try {
    const { id, companyId } = req.params // sacamos id de params (_id) y lo volvemos int
    const payroll = await prisma.payroll.findUnique({
      //Buscamos en lso payrolls (id es inherentemente unique)
      where: {
        id,
        companyId
      }
    })

    const employees = await prisma.payrollEmployee.findMany({
      where: {
        payrollId: payroll.id
      },
      include: {
        employeeName: true
      }
    })
    res.status(200).json({ payroll: { ...payroll, employees } }) // DATA
  } catch (error) {
    console.error("Error al buscar la nomina:", error)
    res.status(404).json({
      error: "Error al intentar buscar nomina"
    })
  }
}

// Elimina un empleado de una nomina
const deleteEmployee = async (req, res) => {
  try {
    const { payrollId, employeeId } = req.params

    if (!payrollId) {
      return res
        .status(400)
        .json({ message: "el ID de la nomina es requerido" })
    }
    if (!employeeId) {
      return res
        .status(400)
        .json({ message: "el ID del empleado de la nomina es requerido" })
    }

    // Eliminar el empleado con ese id de la nomina
    await prisma.payrollEmployee.delete({
      where: {
        id: payrollId,
        employeeId
      }
    })

    res
      .status(200)
      .json({ message: "Empleado eliminado de la nomina correctamente." })
  } catch (error) {
    console.error("Error al eliminar el empleado de la nomina:", error)
    res.status(500).json({
      error: "Hubo un error al eliminar el empleado de la nomina."
    })
  }
}

// Elimina una nomina
const deletePayroll = async (req, res) => {
  try {
    const { payrollId, companyId } = req.params

    if (!payrollId) {
      return res
        .status(400)
        .json({ message: "el ID de la nomina es requerido" })
    }
    if (!companyId) {
      return res
        .status(400)
        .json({ message: "el ID de la empresa de la nomina es requerido" })
    }

    // Eliminar la nomina con ese id
    await prisma.payroll.delete({
      where: {
        id: payrollId,
        companyId,
        NOT: {
          state: "Cerrada"
        }
      }
    })

    res.status(200).json({ message: "Nomina y datos eliminado correctamente." })
  } catch (error) {
    console.error("Error al eliminar la nomina:", error)
    res.status(500).json({
      error: "Hubo un error al eliminar la nomina."
    })
  }
}

// Modifica el estado de una nomina
const updateStatePayroll = async (req, res) => {
  try {
    const { payrollId, companyId } = req.params
    const { state } = req.body

    if (!payrollId) {
      return res
        .status(400)
        .json({ message: "el ID de la nomina es requerido" })
    }
    if (!companyId) {
      return res
        .status(400)
        .json({ message: "el ID de la empresa de la nomina es requerido" })
    }

    // *Validacion de nomina existente*
    const existingPayroll = await prisma.payroll.findUnique({
      where: {
        id: payrollId,
        companyId
      }
    })
    if (!existingPayroll) {
      return res
        .status(400)
        .json({ message: "No se ha encontrado un nomina con este ID" })
    }
    if (existingPayroll.state === "Cerrada") {
      return res
        .status(400)
        .json({ message: "Esta nomina no puede ser modificada" })
    }

    // Modificar el estado de la nomina con ese id
    await prisma.payroll.update({
      where: {
        id: payrollId,
        companyId,
        NOT: {
          state: "Cerrada"
        }
      },
      data: {
        state
      }
    })

    res
      .status(200)
      .json({ message: "Estado de la nomina modificado correctamente." })
  } catch (error) {
    console.error("Error al modificar el estado de la nomina:", error)
    res.status(500).json({
      error: "Hubo un error al modificar el estado de la nomina."
    })
  }
}

module.exports = {
  generatePayroll,
  allPayrollsOfCompany,
  getOne,
  deleteEmployee,
  deletePayroll,
  updateStatePayroll
}
