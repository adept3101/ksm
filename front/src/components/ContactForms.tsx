import { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error'

const API_URL = import.meta.env.VITE_API_URL ?? '';

export default function ContactForms() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState(''); 

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus('sending');
    setErrorText('');

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? 'Не удалось отправить сообщение');
      }

      form.reset();
      setStatus('success');
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : 'Что-то пошло не так');
      setStatus('error');
    }
  }

  return (
    <section className="contact-section">
      <div className="section-heading">
        <p className="eyebrow">СВЯЖИТЕСЬ С НАМИ</p>
        <h2>Обсудим ваш проект</h2>
      </div>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Написать нам</h3>
          <label>
            Ваше имя
            <input name="name" placeholder="Как к вам обращаться?" required />
          </label>
          <label>
            Электронная почта
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </label>
          <label>
            Сообщение
            <textarea name="message" placeholder="Расскажите о задаче" maxLength={5000} required />
          </label>

          {/*<button type="submit" className="btn-send">Отправить сообщение</button> */}

          {/* Honeypot: скрыт от людей, боты его заполняют */}
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px' }}
          />

          <button
            type="submit"
            className="btn-send"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Отправляем…' : 'Отправить сообщение'}
          </button>

          {status === 'success' && (
            <p role="status">Спасибо! Сообщение отправлено, мы скоро свяжемся с вами.</p>
          )}
          {status === 'error' && <p role="alert">{errorText}</p>}

        </form>
      </div>
    </section>
  );
}
