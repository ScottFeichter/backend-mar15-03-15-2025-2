import logger from '@/utils/logger';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import {
  PG_DB_DIALECT,
  PG_DB_HOST,
  PG_DB_USERNAME,
  PG_DB_PASSWORD,
  PG_DB_NAME,
  PG_DB_PORT,
  NODE_ENV,
  JWT_ACCESS_TOKEN_SECRET,
} from '../config/env-module';

const SEQUELIZE = new Sequelize(
  PG_DB_NAME,      // database name
  PG_DB_USERNAME,  // username
  PG_DB_PASSWORD,  // password
  {
    dialect: (PG_DB_DIALECT as Dialect) || 'postgres',
    host: PG_DB_HOST,
    port: parseInt(PG_DB_PORT, 10), // Convert port to number
    timezone: '-04:00',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      underscored: true,
      freezeTableName: true,
    },
    pool: {
      min: 0,
      max: 5,
    },
    logQueryParameters: NODE_ENV === 'development',
    logging: (query, time) => {
      logger.info(time + 'ms' + ' ' + query);
    },
    benchmark: true
  }
);


export default SEQUELIZE;




// await SEQUELIZE.sync({ alter: true });:
// This will attempt to alter the tables to match the models.
// While alter: true is useful for development or certain situations,
// it may not be ideal for production because it can potentially cause unexpected schema changes.
// If you're deploying this to production, you may want to use migrations (with sequelize-cli) instead of directly syncing models.
// This would give you better control over database schema changes.


// export const initDatabase = async () => {
//   try {
//     await SEQUELIZE.authenticate();
//     console.log('Database connection established.');
//     await SEQUELIZE.sync({ alter: true });
//     console.log('Models synchronized.');

//     if (NODE_ENV !== 'production') {
//       const testUser = await User.findOne({
//         where: { email: 'test@example.com' }
//     });

//     if (!testUser) {
//       await User.create({
//         name: 'Test User',
//         email: 'test@example.com'
//       });
//       // console.log('Test user created successfully.');
//       logger.info('Test user created successfully.');
//     } else {
//       // console.log('Test user already exists.');
//       logger.info('Test user already exists.');
//     }
//   } catch (error) {
//     // console.error('Unable to connect to database:', error);
//     logger.error('Unable to connect to database:', error);
//   }
// };
