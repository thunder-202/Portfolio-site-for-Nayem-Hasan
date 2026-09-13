import app from '../server';

// Catch-all Vercel Serverless Function entry point for /api/*
export default function handler(req: any, res: any) {
  return app(req, res);
}
