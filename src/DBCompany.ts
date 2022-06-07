import { createPool, PoolOptions } from "mysql2/promise";
import { readFile, readFileSync } from "fs";
import { join } from "path";

export type Employee = {
  id: number;
  name: string;
  salary: number;
};

class DBCompany {
  private readonly config: PoolOptions;
  constructor() {
    this.config = {
      host: process.env.BDD_HOST,
      user: process.env.BDD_USER,
      password: process.env.BDD_PASS,
      database: "company",
    };
  }

  private async queryDB(query: string) {
    const pool = createPool(this.config);
    try {
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      console.log(error);
    } finally {
      await pool.end();
    }
  }

  async getEmployees(): Promise<Employee[]> {
    const rows = await this.queryDB("SELECT * FROM employee");
    const employees = await JSON.parse(JSON.stringify(rows));
    return employees;
  }
}

export const createDB = async () => {
  const config: PoolOptions = {
    host: process.env.BDD_HOST || "localhost",
    user: process.env.BDD_USER || "root",
    password: process.env.BDD_PASS || "newpass",
  };
  const pool = createPool(config);
  try {
    const employeeSql = readFileSync(
      join(__dirname, "../database/employee.sql"),
      {
        encoding: "utf-8",
      }
    );
    const rowsToInsertData = employeeSql.toString().split(";");
    rowsToInsertData.forEach(async (row) => {
      await pool.query(row);
    });
  } catch (error) {
    console.log(error);
  } finally {
    await pool.end();
  }
};

export const destroyDB = async () => {
  const config: PoolOptions = {
    host: process.env.BDD_HOST || "localhost",
    user: process.env.BDD_USER || "root",
    password: process.env.BDD_PASS || "newpass",
  };
  const pool = createPool(config);
  try {
    await pool.query(" DROP DATABASE IF EXISTS company; ");
  } catch (error) {
    console.log(error);
  } finally {
    await pool.end();
  }
};

export default DBCompany;
