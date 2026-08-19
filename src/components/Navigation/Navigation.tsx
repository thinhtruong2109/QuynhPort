import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Navigation.css';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'About',        href: '#about' },
  { label: 'Journey',      href: '#career' },
  { label: 'Events',       href: '#events' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Contact',      href: '#contact' },
];

const Navigation: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Fade in nav after hero
    gsap.set(nav, { opacity: 0, y: -24 });
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top 80%',
      onEnter:     () => gsap.to(nav, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
      onLeaveBack: () => gsap.to(nav, { opacity: 0, y: -24, duration: 0.4 }),
    });

    // Active link highlight
    const linkEls = nav.querySelectorAll<HTMLAnchorElement>('.nav__link');
    navLinks.forEach(({ href }, i) => {
      const target = document.querySelector(href);
      if (!target) return;
      ScrollTrigger.create({
        trigger: target,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter:     () => setActive(i, linkEls),
        onEnterBack: () => setActive(i, linkEls),
      });
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  const setActive = (idx: number, links: NodeListOf<HTMLAnchorElement>) => {
    links.forEach((l, i) => l.classList.toggle('nav__link--active', i === idx));
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} className="nav" aria-label="Main navigation">
      <div className="nav__inner">
        <span className="nav__logo" aria-label="Mỹ Quỳnh Portfolio">MQ</span>
        <ul className="nav__links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav__link"
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
