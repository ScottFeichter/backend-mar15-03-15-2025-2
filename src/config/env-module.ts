import { Sequelize } from 'sequelize-typescript';
import { User } from '../database/models/User';  // Import the User model
import dotenv from 'dotenv';
dotenv.config();

export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

const SEQUELIZE = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_DB_HOST,
  username: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_NAME,
  port: parseInt(process.env.PG_DB_PORT || '5432'),
  logging: false,
  models: [User],
});

export default SEQUELIZE;
