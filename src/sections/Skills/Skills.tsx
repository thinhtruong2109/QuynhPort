import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../../data/portfolio';
import ImagePlaceholder from '../../components/ImageGrid/ImagePlaceholder';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading: dramatic vertical drop ──
      gsap.fromTo('.skills__heading',
        { y: -80, opacity: 0, scale: 1.15 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        }
      );

      // ── Skill words: typewriter stagger from left with flip ──
      gsap.utils.toArray<HTMLElement>('.skill-word').forEach((word, i) => {
        gsap.fromTo(word,
          { x: -60, opacity: 0, rotateY: -25 },
          {
            x: 0, opacity: 1, rotateY: 0,
            duration: 0.7, delay: i * 0.07, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: '.skills__words', start: 'top 75%' },
          }
        );
      });

      // ── Photos: scale up from below ──
      gsap.fromTo('.skills__photos > *',
        { y: 80, opacity: 0, scale: 0.85 },
        {
          y: 0, opacity: 1, scale: 1, stagger: 0.18, duration: 1.0, ease: 'expo.out',
          scrollTrigger: { trigger: '.skills__photos', start: 'top 78%' },
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="skills section-wrap" id="skills" aria-label="Skills">
      <div className="skills__bg" aria-hidden="true" />

      {/* Slide 5 as subtle side accent image */}
      <div
        className="skills__slide-accent"
        style={{ backgroundImage: 'url(/slides/slide_5.png)' }}
        aria-hidden="true"
      />

      <div className="skills__inner">
        <div className="skills__left">
          <h2 className="skills__heading display-xl">Kỹ<br />Năng</h2>
          <div className="skills__stars" aria-hidden="true">
            {[...Array(4)].map((_, i) => <span key={i} className="star-diamond-brg" />)}
          </div>
          <div className="skills__words" aria-label="Skill areas">
            {skills.map((skill) => (
              <span key={skill} className="skill-word">{skill}</span>
            ))}
          </div>
        </div>

        <div className="skills__photos">
          <div className="skills__real-img">
            <img src="/slides/slide_4.png" alt="Kỹ năng — Marketing" />
          </div>
          <ImagePlaceholder label="Ảnh sự kiện" aspectRatio="3/4" />
        </div>
      </div>
      <hr className="dashed-rule skills__rule" />
    </section>
  );
};

export default Skills;
