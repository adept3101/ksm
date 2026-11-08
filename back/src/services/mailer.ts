import nodemailer from 'nodemailer';
import { config } from './config.ts';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: { user: config.smtp.user, pass: config.smtp.pass },
});

export async function verifyMailer(): Promise<void> {
  await transporter.verify();
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function sendContactMail({ name, email, message }: ContactPayload) {
  const safeName = name.replace(/[\r\n]+/g, ' ');

  await transporter.sendMail({
    from: config.mail.from,
    to: config.mail.to,
    replyTo: { name: safeName, address: email },
    subject: `Новое сообщение с сайта от ${safeName}`,
    text: `Имя: ${safeName}\nEmail: ${email}\n\n${message}`,
    html: `
      <h2>Новое сообщение с сайта</h2>
      <p><b>Имя:</b> ${escapeHtml(safeName)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Сообщение:</b></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `,
  });
}
