import { Router } from 'express';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { requireAdmin } from '../middleware/auth';
import { config } from '../services/config';
import type { ResultSetHeader } from 'mysql2/promise';
import { pool, type Project } from '../services/db';

const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

const upload = multer({
  storage: multer.diskStorage({
    destination: config.uploadsDir,
    filename: (_req, file, cb) => cb(null, randomUUID() + EXT_BY_MIME[file.mimetype]),
  }),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype in EXT_BY_MIME) cb(null, true);
    else cb(new Error('Допустимы только JPG, PNG и WebP'));
  },
});

const schema = z.object({
  title: z.string().trim().min(1, 'Укажите название').max(150),
  place: z.string().trim().min(1, 'Укажите тип объекта').max(150),
});

function removeUploadedFile(image: string) {
  if (!image.startsWith('/uploads/')) return;
  fs.rm(path.join(config.uploadsDir, path.basename(image)), { force: true }, () => {});
}

export const projectsRouter = Router();

async function findProject(id: number): Promise<Project | undefined> {
  if (!Number.isInteger(id)) return undefined;
  const [rows] = await pool.query<Project[]>('SELECT * FROM projects WHERE id = ?', [id]);
  return rows[0];
}

projectsRouter.get('/', async (req, res) => {
  const limit = Math.min(Math.max(Math.trunc(Number(req.query.limit)) || 100, 1), 100);
  const [rows] = await pool.query<Project[]>('SELECT * FROM projects ORDER BY id DESC LIMIT ?', [limit]);
  res.json({ ok: true, projects: rows });
});

projectsRouter.post('/', requireAdmin, upload.single('image'), async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success || !req.file) {
    if (req.file) removeUploadedFile(`/uploads/${req.file.filename}`);
    res.status(400).json({
      ok: false,
      error: parsed.success ? 'Загрузите изображение' : parsed.error.issues[0]?.message,
    });
    return;
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO projects (title, place, image) VALUES (?, ?, ?)',
      [parsed.data.title, parsed.data.place, `/uploads/${req.file.filename}`],
    );
    res.status(201).json({ ok: true, project: await findProject(result.insertId) });
  } catch (err) {
    removeUploadedFile(`/uploads/${req.file.filename}`);
    throw err;
  }
});

projectsRouter.put('/:id', requireAdmin, upload.single('image'), async (req, res) => {
  const id = Number(req.params.id);
  const existing = await findProject(id);
  const parsed = schema.safeParse(req.body);

  if (!existing || !parsed.success) {
    if (req.file) removeUploadedFile(`/uploads/${req.file.filename}`);
    res.status(existing ? 400 : 404).json({
      ok: false,
      error: existing ? parsed.error?.issues[0]?.message : 'Проект не найден',
    });
    return;
  }

  const image = req.file ? `/uploads/${req.file.filename}` : existing.image;
  try {
    await pool.query('UPDATE projects SET title = ?, place = ?, image = ? WHERE id = ?', [
      parsed.data.title,
      parsed.data.place,
      image,
      id,
    ]);
  } catch (err) {
    if (req.file) removeUploadedFile(image);
    throw err;
  }
  if (req.file) removeUploadedFile(existing.image);

  res.json({ ok: true, project: await findProject(id) });
});

projectsRouter.delete('/:id', requireAdmin, async (req, res) => {
  const existing = await findProject(Number(req.params.id));
  if (!existing) {
    res.status(404).json({ ok: false, error: 'Проект не найден' });
    return;
  }
  await pool.query('DELETE FROM projects WHERE id = ?', [existing.id]);
  removeUploadedFile(existing.image);
  res.json({ ok: true });
});
