import { Response, NextFunction } from 'express';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import { SERVER } from '../server';
import { Request, CSRFError } from '../types';

export const setupMiddleware = () => {
  SERVER.use(morgan('development'));
  SERVER.use(cookieParser());
  SERVER.use(express.json());


  SERVER.use(cors({
    origin: ['http://localhost:5555', 'http://127.0.0.1:5555', 'file://', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'XSRF-Token'],
    credentials: true
  }));


  // helmet helps set a variety of headers to better secure your app
  SERVER.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
  );



  const csrfProtection = csrf({
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : undefined,
      httpOnly: true
    }
  });

  SERVER.use(csrfProtection as express.RequestHandler);

  SERVER.use((err: CSRFError, req: Request, res: Response, next: NextFunction) => {
    if (err.code === 'EBADCSRFTOKEN') {
      res.status(403).json({ error: 'Invalid CSRF token' });
    } else {
      next(err);
    }
  });
};
