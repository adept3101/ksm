import 'dotenv/config';
import path from 'node:path';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Не задана переменная окружения ${name}`);
  return value;
}

const jwtSecret = required('JWT_SECRET');
if (jwtSecret.length < 32) {
  throw new Error('JWT_SECRET должен быть не короче 32 символов');
}

export const config = {
  port: Number(process.env.PORT ?? 3000),
  corsOrigins: (process.env.FRONTEND_URL ?? 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim()),
  smtp: {
    host: required('SMTP_HOST'),
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_SECURE ?? 'true') === 'true',
    user: required('SMTP_USER'),
    pass: required('SMTP_PASS'),
  },
  mail: {
    from: required('MAIL_FROM'),
    to: required('MAIL_TO'),
  },
  admin: {
    password: required('ADMIN_PASSWORD'),
    jwtSecret,
  },
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: required('DB_USER'),
    password: process.env.DB_PASSWORD ?? '',
    database: required('DB_NAME'),
  },
  uploadsDir: path.resolve(process.env.UPLOADS_DIR ?? 'uploads'),
};
