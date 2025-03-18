import { setupMiddleware } from './middlewares/setup-middleware';
import { setupRoutes } from './routes/setup-routes';
import SEQUELIZE from './database/sequelize';
import express, { Application } from 'express';
import { PG_DB_PORT, SERVER_PORT } from './config/env-module';

console.log("NODE_ENV at runtime: ", process.env.NODE_ENV);


export const SERVER: Application = express();


const start = async () => {
  try {
    setupMiddleware();
    setupRoutes();

    // Authenticate the Sequelize instance to ensure the DB connection is successful
    await SEQUELIZE.authenticate();


    SERVER.listen(SERVER_PORT, () => {
      console.log("");
      console.log(`✅ RESULT: Server is running on port ${SERVER_PORT}`);
      console.log("");
    });
  } catch (error) {
    console.log("");
    console.error('❌ RESULT: Failed to start server:', error);
    process.exit(1);
  }
};

start();
