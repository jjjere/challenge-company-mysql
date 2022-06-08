import { createPool, PoolOptions } from "mysql2/promise";

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  salary: number;
};

class DBCompany {
  private readonly config: PoolOptions;
  private readonly configQuery: PoolOptions;
  constructor() {
    this.config = {
      host: process.env.BDD_HOST,
      user: process.env.BDD_USER,
      password: process.env.BDD_PASS,
    };

    this.configQuery = {
      ...this.config,
      database: "company",
    };
  }

  private async queryDB(query: string) {
    const pool = createPool(this.configQuery);
    try {
      const [rows] = await pool.query(query);
      const rowsFormated = await JSON.parse(JSON.stringify(rows));
      return rowsFormated;
    } catch (error) {
      console.log(error);
    } finally {
      await pool.end();
    }
  }

  async getNamesDatabases(): Promise<string[] | undefined> {
    const pool = createPool(this.config);
    const query = `SHOW DATABASES`;
    try {
      const [rows] = await pool.query(query);
      const rowsFormated: { Database: string }[] = await JSON.parse(
        JSON.stringify(rows)
      );
      const names = rowsFormated.map((row) => row.Database);
      return names;
    } catch (error) {
      console.log(error);
    } finally {
      await pool.end();
    }
  }

  async getCountEmployees(): Promise<number | undefined> {
    const query = `select count(*) as count from employee`;
    const rows: { count: number }[] = await this.queryDB(query);
    const count = rows[0].count;
    return count;
  }

  async getNumberOfFemaleEmployees(): Promise<number | undefined> {
    const query = ``;
    const rows: { count: number }[] = await this.queryDB(query);
    const count = rows[0].count;
    return count;
  }

  async getNumberOfMaleEmployees(): Promise<number | undefined> {
    const query = ``;
    const rows: { count: number }[] = await this.queryDB(query);
    const count = rows[0].count;
    return count;
  }

  async getFirstNames(): Promise<string[] | undefined> {
    const query = ``;
    const rows: { first_name: string }[] = await this.queryDB(query);
    const names = rows.map((row) => row.first_name);
    return names;
  }

  async getEmployeesWithSalary({
    minSalary = 0,
    maxSalary = Number.MAX_SAFE_INTEGER,
  }: {
    minSalary?: number;
    maxSalary?: number;
  }): Promise<Employee[] | undefined> {
    const query = ``;
    const rows: Employee[] = await this.queryDB(query);
    return rows;
  }

  async getEmployeeByName(name: string): Promise<Employee[] | undefined> {
    const query = ``;
    const rows: Employee[] = await this.queryDB(query);
    return rows;
  }
}

export default DBCompany;
