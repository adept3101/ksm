import mysql from 'mysql2/promise';
import type { RowDataPacket } from 'mysql2/promise';
import { config } from './config';

export interface Project extends RowDataPacket {
  id: number;
  title: string;
  place: string;
  image: string;
  created_at: Date;
}

export const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
});
