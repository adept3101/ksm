export default function Footer() {
  return (
    <footer className="site-footer">
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
      </div>

      <p className="site-footer__copyright">
        © {new Date().getFullYear()} КСМ
      </p>
    </footer>
  );
}
