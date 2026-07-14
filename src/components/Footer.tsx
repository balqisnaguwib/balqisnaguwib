import React from 'react'
import { Mail, MapPin, Phone, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import './Footer.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/balqisnaguwib',
      icon: <LinkedinIcon size={20} aria-hidden={true} />
    },
    {
      name: 'GitHub',
      url: 'https://github.com/balqisnaguwib',
      icon: <GithubIcon size={20} aria-hidden={true} />
    },
    {
      name: 'Email',
      url: 'mailto:balqisnaguwib@gmail.com',
      icon: <Mail size={20} aria-hidden="true" />
    }
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-shapes">
          <div className="footer-shape footer-shape-1"></div>
          <div className="footer-shape footer-shape-2"></div>
          <div className="footer-shape footer-shape-3"></div>
        </div>
      </div>
      
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3 className="footer-name">Balqis Naguwib</h3>
              <p className="footer-tagline">Full Stack AI Engineer</p>
              <p className="footer-description">
                Passionate about creating innovative AI solutions and scalable web applications 
                that make a real-world impact.
              </p>
            </div>
            
            <div className="footer-links">
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="footer-section">
                <h4>Connect</h4>
                <div className="social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      title={social.name}
                    >
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-name">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="footer-section">
                <h4>Contact Info</h4>
                <div className="contact-details">
                  <p><MapPin size={16} aria-hidden="true" /> Sepang, Selangor, Malaysia</p>
                  <p><Phone size={16} aria-hidden="true" /> +60139892596</p>
                  <p><Mail size={16} aria-hidden="true" /> balqisnaguwib@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="footer-bottom-content">
              <p className="copyright">
                © {currentYear} Balqis Naguwib. All rights reserved.
              </p>
              <p className="footer-note">
                Built with React & TypeScript • Designed with{' '}
                <Heart size={14} aria-hidden="true" className="heart-icon" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer