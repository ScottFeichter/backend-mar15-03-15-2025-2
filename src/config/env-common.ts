const { config } = require('dotenv');

console.log(config({ path: '.env/.env.example'}));
console.log('Database Password:', process.env.PG_DB_PASSWORD);

type DatabaseConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: 'postgres';
};

const development: DatabaseConfig = {
  username: String(process.env.PG_DB_USER || 'postgres'),
  password: String(process.env.PG_DB_PASSWORD || ''), // Ensure it's a string
  database: String(process.env.PG_DB_NAME || 'db_postgres'),
  host: String(process.env.PG_DB_HOST || 'localhost'),
  port: parseInt(String(process.env.PG_DB_PORT || '5432'), 10),
  dialect: 'postgres',
};

const test: DatabaseConfig = {
  username: String(process.env.PG_DB_USER || 'postgres'),
  password: String(process.env.PG_DB_PASSWORD || ''),
  database: String(process.env.PG_DB_NAME_TEST || 'db_postgres_test'),
  host: String(process.env.PG_DB_HOST || 'localhost'),
  port: parseInt(String(process.env.PG_DB_PORT || '5432'), 10),
  dialect: 'postgres',
};

const production: DatabaseConfig = {
  username: String(process.env.PG_DB_USER || 'postgres'),
  password: String(process.env.PG_DB_PASSWORD || ''),
  database: String(process.env.PG_DB_NAME || 'db_postgres'),
  host: String(process.env.PG_DB_HOST || 'localhost'),
  port: parseInt(String(process.env.PG_DB_PORT || '5432'), 10),
  dialect: 'postgres',
};

export = { development, test, production };
