import React from 'react'
import './About.css'

const About: React.FC = () => {
  return (
    <section id="about" className="section gradient-bg">
      <div className="animated-bg">
        <div className="grid-bg"></div>
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
      </div>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            <div className="about-intro fade-in">
              <p>
                I'm a passionate Full Stack AI Engineer with 2 years of professional experience 
                in developing cutting-edge AI solutions and scalable web applications. My journey 
                in technology is driven by a deep fascination with artificial intelligence and 
                its potential to transform industries.
              </p>
            </div>
            
            <div className="about-details slide-in-left">
              <h3>What I Do</h3>
              <ul className="about-list">
                <li>
                  <span className="list-icon">🤖</span>
                  Develop end-to-end AI solutions using Python, PyTorch, and TensorFlow
                </li>
                <li>
                  <span className="list-icon">🌐</span>
                  Build scalable web applications with React.js, Next.js, and FastAPI
                </li>
                <li>
                  <span className="list-icon">🔍</span>
                  Implement computer vision and NLP systems for real-world applications
                </li>
                <li>
                  <span className="list-icon">📊</span>
                  Create intelligent chatbots and RAG systems for enterprise clients
                </li>
              </ul>
            </div>
            
            <div className="about-journey slide-in-right">
              <h3>My Journey</h3>
              <p>
                Starting with a degree in Mechatronics Engineering from IIUM, I've evolved 
                into a specialized AI engineer. My academic excellence (CGPA: 3.34) and 
                recognition as the best final year project winner laid the foundation for 
                my professional career.
              </p>
              <p>
                Currently serving as Assistant Manager at Telekom Malaysia, I've successfully 
                deployed production-ready AI systems and built customizable SaaS platforms 
                that serve enterprise clients worldwide.
              </p>
            </div>
          </div>
          
          <div className="about-visual">
            <div className="about-card-grid">
              <div className="about-card card fade-in">
                <div className="card-icon">🎓</div>
                <h4>Education</h4>
                <p>Bachelor of Engineering (Mechatronics)</p>
                <small>International Islamic University Malaysia</small>
              </div>
              
              <div className="about-card card fade-in">
                <div className="card-icon">🏆</div>
                <h4>Achievements</h4>
                <p>Best Final Year Project</p>
                <small>Mechatronics Department 2023</small>
              </div>
              
              <div className="about-card card fade-in">
                <div className="card-icon">💼</div>
                <h4>Current Role</h4>
                <p>Assistant Manager, AI Model Engineer</p>
                <small>Telekom Malaysia</small>
              </div>
              
              <div className="about-card card fade-in">
                <div className="card-icon">🚀</div>
                <h4>Availability</h4>
                <p>Open for full-time opportunities</p>
                <small>Starting September 1st, 2025</small>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default About