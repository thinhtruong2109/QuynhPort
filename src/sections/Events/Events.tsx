import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { events } from '../../data/portfolio';
import ImagePlaceholder from '../../components/ImageGrid/ImagePlaceholder';
import './Events.css';

gsap.registerPlugin(ScrollTrigger);

const Events: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Heading reveal — dramatic
      gsap.fromTo('.events__heading',
        { y: 100, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: '.events__head', start: 'top 75%' } }
      );

      // Horizontal scroll: animate the track position driven by pin scrub
      const horizontalAnim = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 120),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth * 0.85}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Individual panel text reveals inside the pinned scroll
      gsap.utils.toArray<HTMLElement>('.event-panel').forEach((panel) => {
        gsap.from(panel.querySelectorAll('.event-panel__text > *'), {
          y: 30, opacity: 0, stagger: 0.1, duration: 0.7,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalAnim,
            start: 'left 70%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const gridLabels = ['Ảnh sự kiện', 'Ảnh dự án', 'Ảnh hậu trường', 'Ảnh cá nhân'];

  const panelImageCounts: Record<string, number> = {
    chidep: 4, uyenlinh: 2, buoctronghoa: 3, shield: 2,
  };

  // Use real slide images as the primary panel image
  const panelSlides: Record<string, string> = {
    chidep:       '/slides/slide_14.png',
    uyenlinh:     '/slides/slide_16.png',
    buoctronghoa: '/slides/slide_18.png',
    shield:       '/slides/slide_22.png',
  };

  return (
    <section ref={sectionRef} className="events section-wrap" id="events" aria-label="Events">

      <div className="events__head">
        <div className="events__head-inner">
          <h2 className="events__heading display-xl">Sự Kiện</h2>
          <p className="events__subhead">Scroll to explore →</p>
        </div>
      </div>

      {/* Pinned horizontal gallery */}
      <div className="events__gallery-wrap">
        <div ref={trackRef} className="events__track">
          {events.map((event) => {
            const count = panelImageCounts[event.id] ?? 2;
            return (
              <div key={event.id} className="event-panel" id={`event-${event.id}`}>
                <div className="event-panel__inner">
                  <div className="event-panel__text">
                    <div className="event-panel__role">{event.role}</div>
                    <div className="event-panel__stars" aria-hidden="true">
                      {[...Array(4)].map((_, i) => <span key={i} className="star-diamond-lt" />)}
                    </div>
                    <h3 className="event-panel__title display-lg">{event.title}</h3>
                    <div className="event-panel__subtitle display-sm">{event.subtitle}</div>
                    <div className="event-panel__period">{event.period}</div>
                    <hr className="dashed-rule event-panel__rule" />
                    <p className="event-panel__desc">{event.description}</p>
                  </div>

                  <div className="event-panel__grid">
                    {/* Real slide image first */}
                    {panelSlides[event.id] && (
                      <div className="event-panel__real-img">
                        <img src={panelSlides[event.id]} alt={event.title} />
                      </div>
                    )}
                    {/* Placeholder grid for remaining */}
                    {Array.from({ length: Math.min(count - 1, 3) }).map((_, idx) => (
                      <ImagePlaceholder
                        key={idx}
                        label={gridLabels[idx + 1] ?? 'Ảnh dự án'}
                        aspectRatio="4/3"
                      />
                    ))}
                  </div>
                </div>

                {/* Large ghost background title */}
                <div className="event-panel__bg-title" aria-hidden="true">{event.title}</div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default Events;
