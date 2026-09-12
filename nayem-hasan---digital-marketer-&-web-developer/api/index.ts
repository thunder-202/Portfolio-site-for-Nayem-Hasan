import type { IncomingMessage, ServerResponse } from 'http';
import app from '../server';

// Vercel Serverless Function entry point
// Bridges Vercel serverless requests directly to the full Express API application
export default function handler(req: IncomingMessage, res: ServerResponse) {
  return (app as any)(req, res);
}
