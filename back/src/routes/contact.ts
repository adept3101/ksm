import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { sendContactMail } from '../services/mailer.ts';

const schema = z.object({
  name: z.string().trim().min(1, 'Укажите имя').max(100),
  email: z.string().trim().email('Некорректная почта').max(200),
  message: z.string().trim().min(1, 'Введите сообщение').max(5000),
  website: z.string().optional(), // honeypot: настоящие пользователи его не заполняют
});

// не более 5 отправок с одного IP за 15 минут
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Слишком много запросов, попробуйте позже' },
});

export const contactRouter = Router();

contactRouter.post('/', limiter, async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: parsed.error.issues[0]?.message ?? 'Некорректные данные',
    });
    return;
  }

  const { website, ...data } = parsed.data;

  // бот заполнил скрытое поле — делаем вид, что всё хорошо
  if (website) {
    res.json({ ok: true });
    return;
  }

  try {
    await sendContactMail(data);
    res.json({ ok: true });
  } catch (err) {
    console.error('Ошибка отправки письма:', err);
    res.status(500).json({ ok: false, error: 'Не удалось отправить сообщение' });
  }
});
