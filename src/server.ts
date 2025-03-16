import { setupMiddleware } from './middlewares/setup-middleware';
import { setupRoutes } from './routes/setup-routes';
import { initDatabase } from './database/init';
import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const SERVER: Application = express();
export const port = process.env.SERVER_PORT || 5555;

const start = async () => {
  try {
    setupMiddleware();
    setupRoutes();
    await initDatabase();

    SERVER.listen(port, () => {
      console.log("");
      console.log(`✅ RESULT: Server is running on port ${port}`);
      console.log("");
    });
  } catch (error) {
    console.log("");
    console.error('❌ RESULT: Failed to start server:', error);
    process.exit(1);
  }
};

start();
