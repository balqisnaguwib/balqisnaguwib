import React, { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { animate, stagger } from 'animejs'
import { FileDown, ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer } from '../motion/variants'
import { useShowcase } from '../hooks/useShowcase'
import './Hero.css'

// Heavy WebGL pieces are code-split and only mount on capable desktops.
const ShaderBackdrop = lazy(() => import('./ShaderBackdrop'))
const LiquidMetalRing = lazy(() => import('./LiquidMetalRing'))

const TITLES = ['Full Stack AI Engineer', 'Python Developer', 'React.js Specialist', 'Machine Learning Engineer']
const NAME = 'Balqis Naguwib'
const STATS = [
  { value: '2+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '15+', label: 'Technologies' },
]

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const reduce = useReducedMotion()
  const showcase = useShowcase()
  const nameRef = useRef<HTMLSpanElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const [heroInView, setHeroInView] = useState(true)

  // Unmount the heavy shader once the hero scrolls away, so the WebGL render
  // loop stops eating GPU while the rest of the page scrolls.
  useEffect(() => {
    if (!showcase || !heroRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { rootMargin: '0px 0px -40% 0px' },
    )
    io.observe(heroRef.current)
    return () => io.disconnect()
  }, [showcase])

  // Rotating role typewriter
  useEffect(() => {
    let timeout: number
    const currentTitle = TITLES[currentIndex]
    if (displayText.length < currentTitle.length) {
      timeout = window.setTimeout(() => setDisplayText(currentTitle.slice(0, displayText.length + 1)), 90)
    } else {
      timeout = window.setTimeout(() => {
        setDisplayText('')
        setCurrentIndex((prev) => (prev + 1) % TITLES.length)
      }, 1900)
    }
    return () => clearTimeout(timeout)
  }, [displayText, currentIndex])

  // anime.js: letters of the name cascade up with a stagger
  useEffect(() => {
    if (reduce || !nameRef.current) return
    const chars = nameRef.current.querySelectorAll('.hero-char')
    const anim = animate(chars, {
      opacity: [0, 1],
      translateY: [44, 0],
      duration: 900,
      delay: stagger(45, { start: 250 }),
      ease: 'out(4)',
    })
    return () => {
      try {
        anim.revert()
      } catch {
        /* noop */
      }
    }
  }, [reduce])

  const container = reduce ? undefined : staggerContainer(0.09, 0.05)
  const item = reduce ? undefined : fadeUp

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-backdrop">
        {showcase && heroInView && (
          <Suspense fallback={null}>
            <ShaderBackdrop />
          </Suspense>
        )}
        <div className="hero-veil" />
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
      </div>

      <div className="container">
        <div className="hero-content">
          <m.div className="hero-text" variants={container} initial="hidden" animate="visible">
            <m.div className="eyebrow" variants={item}>
              Full-Stack AI Engineer · Open to work
            </m.div>

            <m.h1 className="hero-title" variants={item}>
              <span className="hero-greet">Hi, I&apos;m</span>
              <span className="highlight" ref={nameRef}>
                {NAME.split('').map((ch, i) => (
                  <span
                    key={i}
                    className="hero-char"
                    style={{ display: 'inline-block', opacity: reduce ? 1 : 0 }}
                  >
                    {ch === ' ' ? ' ' : ch}
                  </span>
                ))}
              </span>
            </m.h1>

            <m.div className="hero-subtitle" variants={item}>
              <span className="typing-prefix">Building </span>
              <span className="typing-text">{displayText}</span>
              <span className="typing-cursor" aria-hidden="true">
                |
              </span>
            </m.div>

            <m.p className="hero-description" variants={item}>
              I build end-to-end AI systems and scalable web apps — Python, FastAPI, React, and
              deep learning — turning models into products people actually use.
            </m.p>

            <m.div className="hero-cta" variants={item}>
              <a href="#contact" className="btn btn-primary">
                Get In Touch
                <ArrowRight size={18} aria-hidden="true" />
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
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="profile-container">
              {showcase ? (
                <Suspense fallback={<div className="profile-bg"></div>}>
                  <LiquidMetalRing />
                </Suspense>
              ) : (
                <div className="profile-bg"></div>
              )}
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
          variants={reduce ? undefined : staggerContainer(0.12, 0.4)}
          initial="hidden"
          animate="visible"
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
