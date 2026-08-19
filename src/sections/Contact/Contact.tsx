import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { person } from '../../data/portfolio';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact__title', {
        y: 80, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from('.contact__info-item', {
        x: -30, opacity: 0, stagger: 0.14, duration: 0.75, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact__info', start: 'top 75%' },
      });
      gsap.from('.contact__portrait', {
        x: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from('.contact__tagline', {
        y: 20, opacity: 0, duration: 0.8, delay: 0.4,
        scrollTrigger: { trigger: '.contact__tagline', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="contact section-wrap" id="contact" aria-label="Contact">
      <div className="contact__bg" aria-hidden="true" />

      {/* Pink top stripe */}
      <div className="contact__stripe" aria-hidden="true" />

      <div className="contact__inner">
        <div className="contact__left">
          <h2 className="contact__title display-xl">
            Contact<br />Me
          </h2>

          <div className="contact__info" aria-label="Contact information">
            <a
              href={`tel:${person.contact.phone}`}
              className="contact__info-item"
              aria-label={`Phone: ${person.contact.phone}`}
            >
              <span className="contact__info-icon"><PhoneIcon /></span>
              <span className="contact__info-text">
                <span className="contact__info-label">Số điện thoại</span>
                <span className="contact__info-value">{person.contact.phone}</span>
              </span>
            </a>

            <a
              href={`https://${person.contact.linkedin}`}
              className="contact__info-item"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn: ${person.contact.linkedin}`}
            >
              <span className="contact__info-icon"><LinkedInIcon /></span>
              <span className="contact__info-text">
                <span className="contact__info-label">LinkedIn</span>
                <span className="contact__info-value">{person.contact.linkedin}</span>
              </span>
            </a>

            <a
              href={`mailto:${person.contact.email}`}
              className="contact__info-item"
              aria-label={`Email: ${person.contact.email}`}
            >
              <span className="contact__info-icon"><EmailIcon /></span>
              <span className="contact__info-text">
                <span className="contact__info-label">Email</span>
                <span className="contact__info-value">{person.contact.email}</span>
              </span>
            </a>
          </div>
        </div>

        {/* Portrait (slide 34 style) */}
        <div className="contact__portrait" aria-label="Portrait of Nguyễn Thị Mỹ Quỳnh" />
      </div>

      {/* Bottom tagline */}
      <div className="contact__tagline">
        <div className="contact__tagline-stars" aria-hidden="true">
          {[...Array(4)].map((_, i) => <span key={i} className="star-diamond-lt" />)}
        </div>
        <span>Cảm ơn Anh/Chị vì đã ghé qua</span>
        <span className="contact__tagline-heart" aria-hidden="true">♥</span>
      </div>
    </section>
  );
};

export default Contact;
