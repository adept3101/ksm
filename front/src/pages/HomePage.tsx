import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCarousel from '../components/ProjectCarousel';
import ContactForms from '../components/ContactForms';

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <section className="hero-section">
          <div className="hero-section__content">
            <h1>
              Проектирование и строительство промышленных, складских и
              сельскохозяйственных зданий
            </h1>
            <a className="primary-button" href="#projects">
              Наши проекты
            </a>
          </div>
        </section>

        <div id="projects">
          <ProjectCarousel />
        </div>

        <ContactForms />
      </main>

      <Footer />
    </>
  );
}
