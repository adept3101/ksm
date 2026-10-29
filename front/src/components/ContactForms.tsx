export default function ContactForms() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert('Форма пока работает в демонстрационном режиме.');
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
            <textarea name="message" placeholder="Расскажите о задаче" required />
          </label>

          <button type="submit" className="btn-send">Отправить сообщение</button>

        </form>
      </div>
    </section>
  );
}
