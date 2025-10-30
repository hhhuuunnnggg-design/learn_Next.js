import mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var mysqlPool: ReturnType<typeof mysql.createPool> | undefined;
}

const connectionString = process.env.DATABASE_URL;

// Debug: log connection string (xóa dòng này sau khi fix)
if (!connectionString) {
  console.error("⚠️  DATABASE_URL is not defined in environment variables!");
  console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes('DB') || k.includes('DATABASE')));
}

const pool =
  global.mysqlPool ||
  (connectionString
    ? // Use connection URI directly (mysql2 supports passing a string)
      mysql.createPool(connectionString)
    : mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
      }));

if (process.env.NODE_ENV !== "production") global.mysqlPool = pool;

export default pool;
