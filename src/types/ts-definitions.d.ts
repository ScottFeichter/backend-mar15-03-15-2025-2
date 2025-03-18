// Exporting necessary interfaces from the combined file
export interface TimeResult {
  now: Date;
}

export interface CSRFError extends Error {
  code?: string;
}


export interface Request extends Express.Request {
  csrfToken(): string;
}

// No need for a custom interface if you're just using default Express functionality.
// Create a custom interface if you need to add custom methods, properties, or functionality to the Response object:

// import { Response as ExpressResponse } from 'express';

// // Extend the Express Response to include custom methods
// declare module 'express-serve-static-core' {
//   interface Response {
//     sendSuccess: (data: any, message?: string) => void;
//     sendError: (error: any, message?: string) => void;
//   }
// }

//------------------------------------------------------------------------------

// Augment the express module to add `context` to the Request interface
import { JwtPayload } from 'jsonwebtoken';
import * as Express from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;  // or number, depending on your DB
      username: string;
      email: string;
    };
    context?: JwtPayload;
  }
}


//------------------------------------------------------------------------------

// Define types for Sequelize models (adjust based on your actual models)
import { Model, DataTypes, Sequelize } from 'sequelize';

// Example for a User model
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


//------------------------------------------------------------------------------


// Type for a User record returned by Sequelize
export type UserRecord = UserAttributes & { createdAt: Date; updatedAt: Date };


//------------------------------------------------------------------------------

// Custom error types
export interface CustomError extends Error {
  statusCode?: number;
  details?: string;
}

export class NotFoundError extends Error implements CustomError {
  public statusCode = 404;
  public details: string;

  constructor(message: string, details: string) {
    super(message);
    this.details = details;
  }
}

export class BadRequestError extends Error implements CustomError {
  public statusCode = 400;
  public details: string;

  constructor(message: string, details: string) {
    super(message);
    this.details = details;
  }
}


//------------------------------------------------------------------------------

// types for environment variables
// env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PG_DB_HOST: string;
      PG_DB_PORT: string;
      PG_DB_USERNAME: string;
      PG_DB_PASSWORD: string;
      PG_DB_NAME: string;
      JWT_ACCESS_TOKEN_SECRET: string;
      JWT_REFRESH_TOKEN_SECRET: string;
      SERVER_PORT: string;
      BASE_URL: string;
      NODE_ENV: string;
    }
  }
}

//------------------------------------------------------------------------------

// Define a type for API responses
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  error?: any;
}

// Example usage for a User API response
export interface UserApiResponse extends ApiResponse<UserAttributes> {}


//------------------------------------------------------------------------------


// Define a type for the logging middleware
import { Request, Response, NextFunction } from 'express';

export type LoggingMiddleware = (req: Request, res: Response, next: NextFunction) => void;


//------------------------------------------------------------------------------

// Define the shape of your JWT payload
export interface JwtPayload {
  userId: string;  // or number, depending on your DB
  username: string;
  email: string;
  iat: number;     // issued at
  exp: number;     // expiration time
}


//------------------------------------------------------------------------------

// Database Transaction Types
import { Transaction } from 'sequelize';

export type DatabaseTransaction = Transaction;


//------------------------------------------------------------------------------

// Types for Session or Cookie Data
export interface SessionData {
  userId: string;
  token: string;
  expires: string;
}

//------------------------------------------------------------------------------


// HOW TO IMPORT:

// import { Request, CSRFError, TimeResult } from './path/to/ts-definitions';

// // Now you can use these types as usual
// const myRequest: Request = ...;
// const csrfError: CSRFError = new Error('CSRF Error');
