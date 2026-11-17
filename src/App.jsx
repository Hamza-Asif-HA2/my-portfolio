import { useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import SelectedWork from './components/SelectedWork';
import ProjectViewer from './components/ProjectViewer';
import { Intro, Services, Journey, Contact } from './components/Sections';
import { projects } from './data';

export default function App() {
  const [active, setActive] = useState(0);

  const open = (i) => {
    setActive(i);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWork projects={projects} onOpen={open} />
        <ProjectViewer projects={projects} active={active} setActive={setActive} />
        <Intro />
        <Services />
        <Journey />
      </main>
      <Contact />
    </>
  );
}
