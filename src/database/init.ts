import SEQUELIZE from '../config/env-module';
import { User } from './models/User';

export const initDatabase = async () => {
  try {
    await SEQUELIZE.authenticate();
    console.log('Database connection established.');
    await SEQUELIZE.sync({ alter: true });
    console.log('Models synchronized.');

    const testUser = await User.findOne({
      where: { email: 'test@example.com' }
    });

    if (!testUser) {
      await User.create({
        name: 'Test User',
        email: 'test@example.com'
      });
      console.log('Test user created successfully.');
    } else {
      console.log('Test user already exists.');
    }
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
};
