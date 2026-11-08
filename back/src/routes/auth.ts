import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createHash, timingSafeEqual } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { config } from '../services/config';

const schema = z.object({ password: z.string().min(1).max(200) });

// защита от перебора пароля: 10 попыток с одного IP за 15 минут
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Слишком много попыток, попробуйте позже' },
});

const sha256 = (s: string) => createHash('sha256').update(s).digest();

export const authRouter = Router();

authRouter.post('/login', limiter, (req, res) => {
  const parsed = schema.safeParse(req.body);
  // сравниваем хэши одинаковой длины, чтобы не выдавать длину пароля по времени ответа
  const ok =
    parsed.success && timingSafeEqual(sha256(parsed.data.password), sha256(config.admin.password));

  if (!ok) {
    res.status(401).json({ ok: false, error: 'Неверный пароль' });
    return;
  }

  const token = jwt.sign({ role: 'admin' }, config.admin.jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '12h',
  });
  res.json({ ok: true, token });
});
