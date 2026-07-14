import React, { useState, useEffect } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { FileDown } from 'lucide-react'
import { fadeUp, staggerContainer, inViewOnce } from '../motion/variants'
import './Hero.css'

const TITLES = ['Full Stack AI Engineer', 'Python Developer', 'React.js Specialist', 'Machine Learning Engineer']

const STATS = [
  { value: '2+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Completed' },
  { value: '15+', label: 'Technologies Mastered' },
]

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    let timeout: number
    const currentTitle = TITLES[currentIndex]

    if (displayText.length < currentTitle.length) {
      timeout = window.setTimeout(() => {
        setDisplayText(currentTitle.slice(0, displayText.length + 1))
      }, 100)
    } else {
      timeout = window.setTimeout(() => {
        setDisplayText('')
        setCurrentIndex((prev) => (prev + 1) % TITLES.length)
      }, 2000)
    }

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex])

  // Reduced motion: collapse variants so everything renders in place.
  const container = reduce ? undefined : staggerContainer(0.1, 0.05)
  const item = reduce ? undefined : fadeUp

  return (
    <section id="hero" className="hero">
      <div className="animated-bg">
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <m.div
            className="hero-text"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <m.h1 className="hero-title" variants={item}>
              Hi, I'm <span className="highlight">Balqis Naguwib</span>
            </m.h1>
            <m.div className="hero-subtitle" variants={item}>
              <span className="typing-prefix">I'm a </span>
              <span className="typing-text">{displayText}</span>
              <span className="typing-cursor" aria-hidden="true">|</span>
            </m.div>
            <m.p className="hero-description" variants={item}>
              Full Stack AI Engineer with 2 years of professional experience developing
              end-to-end AI solutions and scalable web applications. Specialized in Python,
              FastAPI, React.js, and deep learning frameworks.
            </m.p>
            <m.div className="hero-cta" variants={item}>
              <a href="#contact" className="btn btn-primary">
                Get In Touch
              </a>
              <a
                href="/Balqis_Naguwib_Resume.pdf"
                className="btn btn-outline"
                download="Balqis_Naguwib_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileDown size={18} aria-hidden="true" />
                Download Resume
              </a>
            </m.div>
          </m.div>

          <m.div
            className="hero-visual"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="profile-container">
              <div className="profile-bg"></div>
              <div className="profile-frame">
                <div className="profile-placeholder">
                  <picture>
                    <source srcSet="/balqis-photo.webp" type="image/webp" />
                    <img
                      src="/balqis-photo.png"
                      alt="Balqis Naguwib"
                      className="profile-photo"
                      width={483}
                      height={516}
                      loading="eager"
                      decoding="async"
                      {...({ fetchpriority: 'high' } as Record<string, string>)}
                    />
                  </picture>
                </div>
              </div>
            </div>
          </m.div>
        </div>

        <m.div
          className="hero-stats"
          variants={reduce ? undefined : staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {STATS.map((stat) => (
            <m.div className="stat-item" key={stat.label} variants={item}>
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}

export default Hero
