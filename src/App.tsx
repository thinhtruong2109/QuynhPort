import React from 'react';
import './styles/global.css';

import Navigation from './components/Navigation/Navigation';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';

import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Education from './sections/Education/Education';
import Skills from './sections/Skills/Skills';
import Career from './sections/Career/Career';
import Events from './sections/Events/Events';
import Achievements from './sections/Achievements/Achievements';
import PersonalProjects from './sections/PersonalProjects/PersonalProjects';
import AcademicProjects from './sections/AcademicProjects/AcademicProjects';
import Contact from './sections/Contact/Contact';

const App: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <Navigation />

      <main id="main-content" className="story-container">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Career />
        <Events />
        <Achievements />
        <PersonalProjects />
        <AcademicProjects />
        <Contact />
      </main>
    </>
  );
};

export default App;
