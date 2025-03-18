import { Pool } from 'pg';
import {
  PG_DB_HOST,
  PG_DB_USERNAME,
  PG_DB_PASSWORD,
  PG_DB_NAME,
  PG_DB_PORT,
} from './config/env-module';


// Create PostgreSQL connection pool
const POSTGRES = new Pool({
  host: PG_DB_HOST,
  user: PG_DB_USERNAME,
  password: PG_DB_PASSWORD,
  database: PG_DB_NAME,
  port: parseInt(PG_DB_PORT || '5432'),
});


// log when db succesfully established or throw error
POSTGRES.on('connect', () => {
  console.log('Connected to the PostgreSQL database.');
});

POSTGRES.on('error', (err) => {
  console.error('Error with the PostgreSQL connection:', err);
});



export default POSTGRES;
