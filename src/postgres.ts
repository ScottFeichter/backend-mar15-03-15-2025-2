import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const POSTGRES = new Pool({
  host: process.env.PG_DB_HOST,
  user: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_NAME,
  port: parseInt(process.env.PG_DB_PORT || '5432'),
});

export default POSTGRES;
