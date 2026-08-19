import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { academicProjects } from '../../data/portfolio';
import ImagePlaceholder from '../../components/ImageGrid/ImagePlaceholder';
import './AcademicProjects.css';

gsap.registerPlugin(ScrollTrigger);

const AcademicProjects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ap__heading', {
        x: -60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from('.ap__sub-heading', {
        x: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      gsap.utils.toArray<HTMLElement>('.ap-project').forEach((proj, i) => {
        gsap.from(proj, {
          y: 50, opacity: 0, duration: 0.85,
          delay: i * 0.07,
          ease: 'power2.out',
          scrollTrigger: { trigger: proj, start: 'top 80%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="academic-projects section-wrap" id="academic" aria-label="Academic Projects">
      <div className="ap__bg" aria-hidden="true" />
      <div className="ap__inner">
        <div className="ap__header">
          <h2 className="ap__heading display-xl">Dự Án Học Thuật</h2>
          <span className="ap__sub-heading display-lg">Tiêu Biểu</span>
          <div className="ap__stars" aria-hidden="true">
            {[...Array(4)].map((_, i) => <span key={i} className="star-diamond-brg" />)}
          </div>
        </div>

        {academicProjects.map((proj, idx) => (
          <article
            key={proj.id}
            className={`ap-project ap-project--${idx % 2 === 0 ? 'even' : 'odd'}`}
          >
            <div className="ap-project__text">
              <h3 className="ap-project__title">{proj.title}</h3>
              <p className="ap-project__desc">{proj.description}</p>
            </div>
            <div className="ap-project__grid">
              {Array.from({ length: Math.min(proj.imageCount, 3) }).map((_, i) => (
                <ImagePlaceholder
                  key={i}
                  label={i === 0 ? 'Ảnh dự án' : 'Ảnh dự án'}
                  aspectRatio="4/3"
                />
              ))}
            </div>
          </article>
        ))}

        <hr className="dashed-rule ap__rule" />
      </div>
    </section>
  );
};

export default AcademicProjects;
