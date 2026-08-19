import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personality } from '../../data/portfolio';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const wordPositions = [
  { x: '0%',   y: '0%',   size: 'lg' },
  { x: '38%',  y: '8%',   size: 'xl' },
  { x: '2%',   y: '42%',  size: 'md' },
  { x: '42%',  y: '40%',  size: 'lg' },
  { x: '0%',   y: '76%',  size: 'xl' },
  { x: '40%',  y: '72%',  size: 'md' },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef   = useRef<HTMLDivElement>(null);
  const aboutRef   = useRef<HTMLDivElement>(null);
  const wordsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── INTRO PANEL: dramatic staggered word-by-word reveal ──
      const headingChars = introRef.current!.querySelectorAll('.about-intro__char');
      gsap.fromTo(headingChars,
        { y: '100%', opacity: 0, rotateX: -90 },
        {
          y: '0%', opacity: 1, rotateX: 0,
          stagger: 0.05, duration: 0.7, ease: 'back.out(1.6)',
          scrollTrigger: { trigger: introRef.current, start: 'top 70%' },
        }
      );

      gsap.fromTo('.about-intro__body',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.18, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: introRef.current, start: 'top 65%' },
        }
      );

      // Portrait: clip-path reveal (curtain from left)
      gsap.fromTo('.about-intro__portrait',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power4.inOut',
          scrollTrigger: { trigger: introRef.current, start: 'top 65%' },
        }
      );

      // ── ABOUT-ME PANEL ──
      gsap.fromTo('.about-me__portrait',
        { x: -100, opacity: 0, scale: 0.9 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: aboutRef.current, start: 'top 72%' },
        }
      );

      gsap.fromTo('.about-me__name',
        { x: 80, opacity: 0, skewX: -8 },
        {
          x: 0, opacity: 1, skewX: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: aboutRef.current, start: 'top 70%' },
        }
      );

      // Words: burst outward from center, then settle
      const words = wordsRef.current!.querySelectorAll<HTMLElement>('.about-word');
      words.forEach((word, i) => {
        gsap.fromTo(word,
          {
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 120,
            opacity: 0,
            scale: 0.4,
            rotate: (Math.random() - 0.5) * 20,
          },
          {
            x: 0, y: 0, opacity: 1, scale: 1, rotate: 0,
            duration: 1.1, delay: i * 0.1,
            ease: 'elastic.out(1, 0.6)',
            scrollTrigger: { trigger: wordsRef.current, start: 'top 70%' },
          }
        );
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const introText = 'GIỚI THIỆU';

  return (
    <section ref={sectionRef} className="about section-wrap" id="about" aria-label="About">

      {/* Panel 1 — dark burgundy */}
      <div ref={introRef} className="about-intro">
        <div className="about-intro__content">
          <div className="about-intro__text">
            {/* Split heading into chars for per-char animation */}
            <h2 className="about-intro__heading display-xl" aria-label={introText}>
              <span className="about-intro__chars">
                {introText.split('').map((ch, i) => (
                  <span key={i} className="about-intro__char" aria-hidden="true">
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </span>
            </h2>
            <div className="about-intro__stars">
              {[...Array(4)].map((_, i) => <span key={i} className="star-diamond-lt" />)}
            </div>
            <p className="about-intro__body">
              Tôi là Nguyễn Thị Mỹ Quỳnh — một Marketing Executive trẻ với đam mê kết nối
              con người, truyền tải cảm xúc và tạo ra những chiến dịch truyền thông có sức
              ảnh hưởng thực sự.
            </p>
            <p className="about-intro__body">
              Từ sự kiện âm nhạc đến nội dung mạng xã hội, tôi không chỉ tạo ra nội dung
              — tôi tạo ra kết nối.
            </p>
          </div>

          {/* Slide 2 portrait */}
          <div className="about-intro__portrait-wrap">
            <div className="about-intro__portrait">
              <img
                src="/slides/slide_2.png"
                alt="Nguyễn Thị Mỹ Quỳnh professional portrait"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2 — light, slide 3 style */}
      <div ref={aboutRef} className="about-me">
        <div className="about-me__inner">
          <div className="about-me__left">
            <div className="about-me__portrait">
              <img src="/slides/slide_3.png" alt="Tốt nghiệp Đại học Văn Lang" />
            </div>
          </div>
          <div className="about-me__right">
            <h2 className="about-me__heading">
              <span className="about-me__sub display-sm">About Me</span>
              <span className="about-me__name display-lg">Mỹ Quỳnh</span>
            </h2>
            <div className="about-me__stars">
              {[...Array(5)].map((_, i) => <span key={i} className="star-diamond-brg" />)}
            </div>

            <div ref={wordsRef} className="about-words" aria-label="Personality traits">
              {personality.map((p, i) => (
                <span
                  key={p.text}
                  className={`about-word about-word--${wordPositions[i].size}`}
                  style={{ left: wordPositions[i].x, top: wordPositions[i].y }}
                  title={p.en}
                >
                  {p.text}
                </span>
              ))}
            </div>

            <p className="about-me__body">
              Mỗi dự án là một cơ hội để tôi thể hiện sự sáng tạo, sự tỉ mỉ và nhiệt
              huyết — ba giá trị cốt lõi định hình cách tôi làm việc mỗi ngày.
            </p>
            <hr className="dashed-rule" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
