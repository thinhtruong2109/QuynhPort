import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education } from '../../data/portfolio';

import './Education.css';

gsap.registerPlugin(ScrollTrigger);

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Heading: massive skew + scale entrance
      gsap.fromTo('.edu__heading',
        { x: -140, opacity: 0, skewX: -10 },
        {
          x: 0, opacity: 1, skewX: 0, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        }
      );

      gsap.fromTo('.edu__cert-word',
        { x: 140, opacity: 0, skewX: 8 },
        {
          x: 0, opacity: 1, skewX: 0, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        }
      );

      // Timeline line draws down with scrub
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.edu__timeline', start: 'top 65%' },
        }
      );

      // Milestones: cascade + scale from left
      gsap.utils.toArray<HTMLElement>('.edu-milestone').forEach((m, i) => {
        gsap.fromTo(m,
          { x: -80, opacity: 0, scale: 0.88 },
          {
            x: 0, opacity: 1, scale: 1,
            duration: 0.85, delay: i * 0.15, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: '.edu__timeline', start: 'top 65%' },
          }
        );
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="education section-wrap" id="education" aria-label="Education">
      <div className="edu__bg" aria-hidden="true" />
      <div className="edu__inner">

        <div className="edu__header">
          <h2 className="edu__heading display-xl" aria-label="Học Vấn — Education">
            Học Vấn
          </h2>
          <div className="edu__stars" aria-hidden="true">
            {[...Array(7)].map((_, i) => <span key={i} className="star-diamond-brg" />)}
          </div>
        </div>

        {/* Timeline */}
        <div className="edu__timeline">
          <div ref={lineRef} className="edu__timeline-line" aria-hidden="true" />

          {education.map((item) => (
            <div key={item.id} className="edu-milestone" role="article">
              <div className="edu-milestone__dot" aria-hidden="true" />
              <div className="edu-milestone__card">
                <div className="edu-milestone__period">{item.period}</div>
                <h3 className="edu-milestone__name">{item.institution}</h3>
                <div className="edu-milestone__major">{item.major}</div>
                {item.gpa && (
                  <div className="edu-milestone__meta">
                    <span className="edu-milestone__label">GPA</span>
                    <span className="edu-milestone__value">{item.gpa}</span>
                  </div>
                )}
                <div className="edu-milestone__achievement">{item.achievement}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="edu__cert-word display-xl" aria-hidden="true">
          Chứng Chỉ
        </div>

      </div>
    </section>
  );
};

export default Education;
