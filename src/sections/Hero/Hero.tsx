import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { person } from '../../data/portfolio';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const creativeRef = useRef<HTMLDivElement>(null);
  const portfolioRef= useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const curtainRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // — CURTAIN LIFT (dramatic entrance) —
      const tl = gsap.timeline({ delay: 0.1 });

      // Start: solid red curtain covering everything
      gsap.set(curtainRef.current, { scaleY: 1, transformOrigin: 'bottom center' });
      gsap.set(overlayRef.current, { opacity: 0.85 });

      // 1. Curtain sweeps up with brutal force
      tl.to(curtainRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.2,
        ease: 'power4.inOut',
      });

      // 2. Overlay fades out as curtain lifts
      tl.to(overlayRef.current, { opacity: 0, duration: 0.6 }, '-=0.8');

      // 3. Content explodes in — staggered dramatic reveals
      tl.fromTo(creativeRef.current,
        { y: 80, opacity: 0, skewY: 4 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.8, ease: 'power4.out' },
        '-=0.4'
      );
      tl.fromTo(portfolioRef.current,
        { y: 140, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.9, ease: 'expo.out' },
        '-=0.65'
      );
      tl.fromTo(portraitRef.current,
        { x: 120, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out' },
        '-=0.7'
      );
      tl.fromTo(nameRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );
      tl.fromTo(titleRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.45'
      );
      tl.fromTo(taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // — SCROLL PARALLAX —
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(portfolioRef.current, { y: p * -70, opacity: 1 - p * 0.6 });
          gsap.set(portraitRef.current, { y: p * 50, scale: 1 + p * 0.04 });
          gsap.set(creativeRef.current, { y: p * -40, opacity: 1 - p });
          gsap.set(nameRef.current, { y: p * -30, opacity: 1 - p * 1.4 });
        },
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero section-wrap" id="hero" aria-label="Hero">
      {/* Dramatic curtain overlay (burgundy) */}
      <div ref={curtainRef} className="hero__curtain" aria-hidden="true" />
      <div ref={overlayRef} className="hero__overlay" aria-hidden="true" />

      {/* Slide 1 as full background reference */}
      <div
        className="hero__slide-bg"
        style={{ backgroundImage: 'url(/slides/slide_1.png)' }}
        role="img"
        aria-label="Portfolio background"
      />

      <div className="hero__content">
        <div className="hero__left">
          <div ref={creativeRef} className="hero__creative display-sm">Creative</div>
          <div ref={portfolioRef} className="hero__portfolio display-xl">Portfolio</div>

          <div ref={nameRef} className="hero__name">
            <span className="hero__name-text">{person.name}</span>
            <span className="hero__name-rule" aria-hidden="true" />
          </div>
          <div ref={titleRef} className="hero__title">{person.title}</div>
          <div ref={taglineRef} className="hero__tagline">
            <span className="hero__stars" aria-hidden="true">
              {[...Array(4)].map((_, i) => <span key={i} className="star-diamond" />)}
            </span>
            <span>{person.tagline}</span>
          </div>
        </div>

        <div ref={portraitRef} className="hero__portrait">
          <img
            src="/slides/slide_1.png"
            alt="Nguyễn Thị Mỹ Quỳnh — Marketing Executive"
            className="hero__portrait-img"
          />
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
