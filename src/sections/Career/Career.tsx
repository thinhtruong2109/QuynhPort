import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { career } from '../../data/portfolio';
import ImagePlaceholder from '../../components/ImageGrid/ImagePlaceholder';
import './Career.css';

gsap.registerPlugin(ScrollTrigger);

// Map career IDs to the closest real slide image we have
const ROLE_SLIDES: Record<string, string> = {
  shield:    '/slides/slide_22.png',   // Shield collaborator
  buoctronghoa: '/slides/slide_18.png',
  uyenlinh:  '/slides/slide_16.png',
  chidep:    '/slides/slide_14.png',
  onegroup:  '/slides/slide_10.png',
  nagico:    '/slides/slide_7.png',
};

const Career: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── OVERVIEW heading: dramatic slide + scale ──
      gsap.fromTo('.career__overview-title',
        { y: 100, opacity: 0, scale: 0.85 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: '.career__overview', start: 'top 68%' },
        }
      );

      // ── Timeline dots: stagger in from bottom ──
      gsap.fromTo('.career-timeline__item',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(1.3)',
          scrollTrigger: { trigger: '.career-timeline', start: 'top 75%' },
        }
      );

      // ── Each role card: split entrance ──
      gsap.utils.toArray<HTMLElement>('.career-role').forEach((role, idx) => {
        const isEven = idx % 2 === 0;

        // Company name: big horizontal slide
        gsap.fromTo(role.querySelector('.career-role__company'),
          { x: isEven ? -120 : 120, opacity: 0, skewX: isEven ? -6 : 6 },
          {
            x: 0, opacity: 1, skewX: 0, duration: 1.1, ease: 'expo.out',
            scrollTrigger: { trigger: role, start: 'top 72%' },
          }
        );

        // Sub-content: cascade up
        gsap.fromTo(
          role.querySelectorAll('.career-role__sub-title, .career-role__period, .career-role__desc, .career-metrics'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: role, start: 'top 68%' },
          }
        );

        // Media: scale + fade from right/left
        gsap.fromTo(role.querySelectorAll('.career-role__media > *'),
          { x: isEven ? 80 : -80, opacity: 0, scale: 0.92 },
          {
            x: 0, opacity: 1, scale: 1,
            stagger: 0.12, duration: 0.95, ease: 'expo.out',
            scrollTrigger: { trigger: role, start: 'top 68%' },
          }
        );

        // Parallax on the slide image inside each role
        const img = role.querySelector<HTMLElement>('.career-role__img');
        if (img) {
          gsap.to(img, {
            y: '-12%',
            ease: 'none',
            scrollTrigger: {
              trigger: role,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }
      });

      // ── Count-up metrics ──
      document.querySelectorAll<HTMLElement>('.career-metric__val').forEach((el) => {
        ScrollTrigger.create({
          trigger: el, start: 'top 80%',
          onEnter: () => {
            const raw = el.dataset.value || '';
            const num = parseInt(raw.replace(/\D/g, ''), 10);
            const suffix = raw.replace(/[\d]/g, '');
            const obj = { n: 0 };
            gsap.to(obj, {
              n: num, duration: 2.2, ease: 'expo.out',
              onUpdate: () => { el.textContent = Math.round(obj.n) + suffix; },
            });
          },
          once: true,
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="career section-wrap" id="career" aria-label="Career Journey">

      {/* Overview — dark slide 6 style */}
      <div className="career__overview">
        <div className="career__overview-inner">
          <div className="career__overview-label">Hành Trình Nghề Nghiệp</div>
          <h2 className="career__overview-title display-xl">
            Tổng Quan<br />Kinh Nghiệm
          </h2>

          {/* Horizontal timeline */}
          <div className="career-timeline" role="list" aria-label="Career timeline">
            {[...career].reverse().map((item) => (
              <div key={item.id} className="career-timeline__item" role="listitem">
                <div className="career-timeline__dot" />
                <div className="career-timeline__period">{item.period}</div>
                <div className="career-timeline__name">{item.shortName}</div>
                <div className="career-timeline__role">{item.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual role sections */}
      {career.map((item, idx) => (
        <div
          key={item.id}
          className={`career-role career-role--${idx % 2 === 0 ? 'even' : 'odd'}`}
          id={`career-${item.id}`}
        >
          <div className="career-role__inner">
            <div className="career-role__text">
              <div className="career-role__company display-lg">{item.shortName}</div>
              <div className="career-role__sub-title">{item.role}</div>
              <div className="career-role__period">{item.period}</div>
              <hr className="dashed-rule" />
              <p className="career-role__desc">{item.description}</p>

              {item.metrics && (
                <div className="career-metrics" aria-label="Performance metrics">
                  {item.metrics.map((m) => (
                    <div key={m.label} className="career-metric">
                      <div
                        className="career-metric__val"
                        data-value={m.value}
                        aria-label={`${m.value} ${m.label}`}
                      >
                        {m.value}
                      </div>
                      <div className="career-metric__label">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="career-role__media">
              {/* Real slide image */}
              {ROLE_SLIDES[item.id] && (
                <div className="career-role__img-wrap">
                  <img
                    className="career-role__img"
                    src={ROLE_SLIDES[item.id]}
                    alt={`${item.shortName} — ${item.role}`}
                  />
                </div>
              )}
              {/* Placeholder grid for extra images */}
              {Array.from({ length: Math.min((item.imageCount ?? 2) - 1, 2) }).map((_, i) => (
                <ImagePlaceholder
                  key={i}
                  label={i === 0 ? 'Ảnh dự án' : 'Ảnh hậu trường'}
                  aspectRatio="16/9"
                />
              ))}
            </div>
          </div>

          <div className="career-role__stars" aria-hidden="true">
            {[...Array(4)].map((_, i) => <span key={i} className="star-diamond-brg" />)}
          </div>
        </div>
      ))}

    </section>
  );
};

export default Career;
