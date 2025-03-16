import { Response } from 'express';
import { QueryTypes } from 'sequelize';
import { Request, TimeResult } from '../types';
import { User } from '../database/models/User';
import SEQUELIZE from '../config/env-module';
import { SERVER } from '../server';

export const setupRoutes = () => {
  SERVER.get('/', async (req: Request, res: Response) => {
    try {
      await SEQUELIZE.authenticate();
      const [results] = await SEQUELIZE.query<TimeResult>('SELECT NOW()', {
        raw: true,
        type: QueryTypes.SELECT
      });
      res.json({
        message: 'PostgreSQL connected with Sequelize!',
        time: results.now
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database connection failed' });
    }
  });

  SERVER.post('/users', async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });

  SERVER.get('/users', async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  SERVER.get('/api/csrf/restore', (req: Request, res: Response) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.status(200).json({ message: 'CSRF token restored' });
  });
};
