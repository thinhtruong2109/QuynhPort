import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievements } from '../../data/portfolio';
import ImagePlaceholder from '../../components/ImageGrid/ImagePlaceholder';
import './Achievements.css';

gsap.registerPlugin(ScrollTrigger);

// Map each achievement to the real slide that showcases it
const ACHIEVEMENT_SLIDES: Record<string, string> = {
  chaching:   '/slides/slide_25.png',
  cinemaday:  '/slides/slide_26.png',
  prprize:    '/slides/slide_27.png',
  scholarship:'/slides/slide_28.png',
};

const Achievements: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading: massive slide-up + skew ──
      gsap.fromTo('.ach__heading',
        { y: 120, opacity: 0, skewY: 4, scale: 0.9 },
        {
          y: 0, opacity: 1, skewY: 0, scale: 1,
          duration: 1.3, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        }
      );

      // ── Achievement cards: cinematic staggered reveal ──
      gsap.utils.toArray<HTMLElement>('.ach-item').forEach((item, i) => {
        // Card itself: alternating left/right entrance
        const fromX = i % 2 === 0 ? -80 : 80;
        gsap.fromTo(item,
          { x: fromX, y: 60, opacity: 0, rotateY: i % 2 === 0 ? -8 : 8 },
          {
            x: 0, y: 0, opacity: 1, rotateY: 0,
            duration: 1.0, ease: 'expo.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: item, start: 'top 80%' },
          }
        );

        // Inner content cascade
        gsap.fromTo(
          item.querySelectorAll('.ach-item__subtitle, .ach-item__title, .ach-item__desc, .ach-item__img'),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.09, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 76%' },
          }
        );

        // Year ghost: scale-in from tiny
        gsap.fromTo(
          item.querySelector('.ach-item__year'),
          { scale: 0.3, opacity: 0 },
          {
            scale: 1, opacity: 0.1, duration: 1.2, ease: 'expo.out',
            scrollTrigger: { trigger: item, start: 'top 80%' },
          }
        );
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="achievements section-wrap" id="achievements" aria-label="Achievements">
      <div className="achievements__bg" aria-hidden="true" />
      <div className="ach__inner">
        <div className="ach__header">
          <div className="ach__eyebrow">Chapter 06</div>
          <h2 className="ach__heading display-xl">Thành Tựu</h2>
          <div className="ach__stars" aria-hidden="true">
            {[...Array(4)].map((_, i) => <span key={i} className="star-diamond-brg" />)}
          </div>
        </div>

        <div className="ach__grid">
          {achievements.map((item) => (
            <article key={item.id} className="ach-item">
              <div className="ach-item__year" aria-hidden="true">{item.year}</div>
              <div className="ach-item__detail">
                <div className="ach-item__subtitle">{item.subtitle}</div>
                <h3 className="ach-item__title">{item.title}</h3>
                <p className="ach-item__desc">{item.description}</p>
                {/* Real slide image if available, else placeholder */}
                <div className="ach-item__img">
                  {ACHIEVEMENT_SLIDES[item.id] ? (
                    <div className="ach-item__real-img">
                      <img
                        src={ACHIEVEMENT_SLIDES[item.id]}
                        alt={item.title}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder label="Ảnh dự án" aspectRatio="16/9" />
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
