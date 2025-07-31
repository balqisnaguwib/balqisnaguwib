import React, { useState, useEffect } from 'react'
import './Hero.css'

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const titles = ['Full Stack AI Engineer', 'Python Developer', 'React.js Specialist', 'Machine Learning Engineer']
  
  useEffect(() => {
    let timeout: number
    const currentTitle = titles[currentIndex]
    
    if (displayText.length < currentTitle.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.slice(0, displayText.length + 1))
      }, 100)
    } else {
      timeout = setTimeout(() => {
        setDisplayText('')
        setCurrentIndex((prev) => (prev + 1) % titles.length)
      }, 2000)
    }
    
    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, titles])

  return (
    <section className="hero">
      <div className="animated-bg">
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title fade-in">
              Hi, I'm <span className="highlight">Balqis Naguwib</span>
            </h1>
            <div className="hero-subtitle slide-in-left">
              <span className="typing-prefix">I'm a </span>
              <span className="typing-text">{displayText}</span>
              <span className="typing-cursor">|</span>
            </div>
            <p className="hero-description slide-in-right">
              Full Stack AI Engineer with 2 years of professional experience developing 
              end-to-end AI solutions and scalable web applications. Specialized in Python, 
              FastAPI, React.js, and deep learning frameworks.
            </p>
            <div className="hero-cta fade-in">
              <a href="#contact" className="btn btn-primary">
                Get In Touch
              </a>
              <a href="/Balqis_Naguwib_Resume.pdf" className="btn btn-outline" download="Balqis_Naguwib_Resume.pdf" target="_blank" rel="noopener noreferrer">
                📄 Download Resume
              </a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="profile-container">
              <div className="profile-bg"></div>
              <div className="profile-frame">
                <div className="profile-placeholder">
                  <img src="/balqis-photo.png" alt="Balqis Naguwib" className="profile-photo" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">2+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5+</div>
            <div className="stat-label">Technologies Mastered</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero