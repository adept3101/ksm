export default function Footer() {
  return (
    <footer className="site-footer" id="contacts">
      <div>
        <img src="/images/logo_Beloe.png" className="logo"/> 
      </div>

      <div>
        <h3>Навигация</h3>
        <a href="/projects">Проекты</a>
        <a href="/portfolio">Портфолио</a>
        <a href="/contacts">Контакты</a>
      </div>

      <div>
        <h3>Контакты</h3>
        <p>Свяжитесь с нами для обсуждения проекта</p>
        <p>konturstroymontag@yandex.ru</p>
        <p>8(960)320-24-29</p>
        <p>8(927)094-02-79</p>
        <p>г.Пенза ул.Байдукова 65</p>
      </div>

      <p className="site-footer__copyright">
        © {new Date().getFullYear()} КСМ
      </p>
    </footer>
  );
}
