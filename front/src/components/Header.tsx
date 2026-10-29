import './Header.css';

export default function Header() {
  return (
    <header className="site-header">
      <a className="site-header__logo" href="/" aria-label="На главную">
        <img src="/images/logo_chyornoe.png" alt="photos" className="logo"/> 
      </a>

      <nav className="site-header__nav" aria-label="Основная навигация">
        <a href="/">Главная</a>
        <a href="/projects">Проекты</a>
        <a href="/portfolio">Портфолио</a>
        <a href="/contacts">Контакты</a>
      </nav>
    </header>
  );
}
