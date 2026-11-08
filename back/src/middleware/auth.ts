import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../services/config.ts';

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  try {
    const payload = jwt.verify(token, config.admin.jwtSecret, { algorithms: ['HS256'] });
    if (typeof payload === 'object' && payload.role === 'admin') {
      next();
      return;
    }
  } catch {
  }
  res.status(401).json({ ok: false, error: 'Требуется вход' });
}
