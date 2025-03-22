import { createPool, Pool, PoolOptions } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const poolOptions: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export class Database {
  private static pool: Pool;

  private constructor() {}

  public static getConnection(): Pool {
    if (!this.pool) {
      this.pool = createPool(poolOptions);
    }

    return this.pool;
  }
}
