import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
  csrfToken(): string;
}

export interface CSRFError extends Error {
  code?: string;
}

export interface TimeResult {
  now: Date;
}
