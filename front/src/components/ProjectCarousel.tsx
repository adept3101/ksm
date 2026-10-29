const projects = [
  {
    title: 'Промышленное строительство',
    place: 'Промышленный объект',
    image: '/images/1_1_fon.jpg',
  },
  {
    title: 'Складские здания',
    place: 'Складской комплекс',
    image: '/images/1_2_fon.jpg',
  },
  {
    title: 'Сельскохозяйственные здания',
    place: 'Сельскохозяйственный объект',
    image: '/images/3_1_fon.jpg',
  },
];

export default function ProjectCarousel() {
  return (
    <section className="projects-section">
      <div className="section-heading">
        <p className="eyebrow">НАШИ РАБОТЫ</p>
        <h2>Реализованные проекты</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <img
              src={project.image}
              alt={project.title}
              onError={(event) => {
                event.currentTarget.style.visibility = 'hidden';
              }}
            />
            <div className="project-card__info">
              <h3>{project.title}</h3>
              <p>{project.place}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
