import DBCompany from "../src/DBCompany";
import dotenv from "dotenv";

dotenv.config();

const db = new DBCompany();
describe("Test DB Company", () => {
  test("Deberian existir una base de datos llamada company", async () => {
    const databases = await db.getNamesDatabases();
    expect(databases).toContain("company");
  });

  test("Deberian existir 1000 empleados registrados", async () => {
    const cantidadEmpleados = await db.getCountEmployees();
    expect(cantidadEmpleados).toBe(1000);
  });
});

describe("Test database querys", () => {
  test("Deberian existir 484 empleadas", async () => {
    const cantidadEmpleados = await db.getNumberOfFemaleEmployees();
    expect(cantidadEmpleados).toBe(484);
  });

  test("Deberian existir 437 empleadas", async () => {
    const cantidadEmpleados = await db.getNumberOfMaleEmployees();
    expect(cantidadEmpleados).toBe(437);
  });

  test("Deberian existir 105 personas con salario menor a 75000", async () => {
    const empleados = await db.getEmployeesWithSalary({ maxSalary: 75000 });
    expect(empleados?.length).toBe(105);
  });

  test("Deberian existir 65 personas con salario mayor a 75000 y menor a 100000", async () => {
    const empleados = await db.getEmployeesWithSalary({
      minSalary: 75000,
      maxSalary: 100000,
    });
    expect(empleados?.length).toBe(65);
  });

  test("Deberia existir una lista con los nombres de todos los empleados", async () => {
    const names = await db.getFirstNames();
    expect(names?.length).toBe(1000);
  });

  test("Deberia existir al menos una persona llamada Kate", async () => {
    const employees = await db.getEmployeeByName("Kate");
    expect(employees?.length).toBeGreaterThan(0);
  });
});
