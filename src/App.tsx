import { lazy, Suspense } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import { useScrollReveal } from './hooks/useScrollReveal'

// Above-the-fold (Header, Hero) load eagerly; everything below is code-split
// so the initial bundle stays lean.
const About = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const GitHubProjects = lazy(() => import('./components/GitHubProjects'))
const Skills = lazy(() => import('./components/Skills'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  useScrollReveal()

  return (
    <div className="App">
      <Header />
      <Hero />
      <Suspense fallback={<div style={{ minHeight: '40vh' }} aria-hidden="true" />}>
        <About />
        <Experience />
        <Projects />
        <GitHubProjects />
        <Skills />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
