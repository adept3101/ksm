import Header from '../components/Header';
import Footer from '../components/Footer';
import './ProjectsPage.css';

const projects = [
  {
    id: 1,
    title: 'Промышленное здание',
    place: 'Промышленный объект',
    image: '/images/1_1_fon.jpg',
  },
  {
    id: 2,
    title: 'Складской комплекс',
    place: 'Складское строительство',
    image: '/images/1_2_fon.jpg',
  },
  {
    id: 3,
    title: 'Сельскохозяйственное здание',
    place: 'Сельскохозяйственный объект',
    image: '/images/3_1_fon.jpg',
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Header />

      <main className="projects-page">
        <section className="projects-page__intro">
          <p className="eyebrow">НАШ ОПЫТ</p>
          <h1>Наши проекты</h1>
          <p>
            Проектируем и строим промышленные, складские
            и сельскохозяйственные здания.
          </p>
        </section>

        <section className="projects-page__list" aria-label="Список проектов">
          {projects.map((project) => (
            <article className="projects-page__card" key={project.id}>
              <img
                src={project.image}
                alt={project.title}
                className="projects-page__image"
              />

              <div className="projects-page__info">
                <p className="projects-page__place">{project.place}</p>
                <h2>{project.title}</h2>
                <a href={`/projects/${project.id}`}>
                  Подробнее <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
