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

describe("Test table employee", () => {
  test("Deberian existir 484 empleadas", async () => {
    const cantidadEmpleados = await db.getNumberOfFemaleEmployees();
    expect(cantidadEmpleados).toBe(484);
  });

  test("Deberian existir 437 empleadas", async () => {
    const cantidadEmpleados = await db.getNumberOfMaleEmployees();
    expect(cantidadEmpleados).toBe(437);
  });
});
