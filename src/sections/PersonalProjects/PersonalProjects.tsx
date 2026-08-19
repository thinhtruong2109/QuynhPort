import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalProjects } from '../../data/portfolio';
import ImagePlaceholder from '../../components/ImageGrid/ImagePlaceholder';
import './PersonalProjects.css';

gsap.registerPlugin(ScrollTrigger);

const PersonalProjects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pp__heading', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from('.pp-card', {
        y: 50, opacity: 0, stagger: 0.18, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.pp__cards', start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="personal-projects section-wrap" id="projects" aria-label="Personal Projects">
      <div className="pp__inner">
        <div className="pp__header">
          <div className="pp__stars" aria-hidden="true">
            {[...Array(4)].map((_, i) => <span key={i} className="star-diamond-lt" />)}
          </div>
          <h2 className="pp__heading display-xl">Dự Án<br />Cá Nhân</h2>
        </div>

        <div className="pp__cards">
          {personalProjects.map((proj) => (
            <article key={proj.id} className="pp-card">
              <div className="pp-card__image">
                <ImagePlaceholder label="Ảnh dự án" aspectRatio="16/9" />
              </div>
              <div className="pp-card__text">
                <h3 className="pp-card__title">{proj.title}</h3>
                <div className="pp-card__subtitle">{proj.subtitle}</div>
                <p className="pp-card__desc">{proj.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalProjects;
