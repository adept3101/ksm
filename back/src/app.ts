import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './services/config.ts';
import { verifyMailer } from './services/mailer.ts';
import { contactRouter } from './routes/contact.ts'

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
// }));
app.set('trust proxy', 1); // нужно для корректного IP за nginx/прокси (rate limit)
app.use(helmet());

app.use(cors({
  origin: config.corsOrigins, methods: ['POST']
}));

app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend is running',
  });
});

app.use('/api/contact', contactRouter);
app.use((_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  
});
