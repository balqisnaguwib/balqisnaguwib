import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import './Contact.css'

interface ContactItem {
  icon: React.ElementType
  label: string
  value: string
  link: string
}

const Contact: React.FC = () => {

  const contactInfo: ContactItem[] = [
    {
      icon: Mail,
      label: 'Email',
      value: 'balqisnaguwib@gmail.com',
      link: 'mailto:balqisnaguwib@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+60139892596',
      link: 'tel:+60139892596'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Sepang, Selangor, Malaysia',
      link: 'https://maps.google.com/?q=Sepang,Selangor,Malaysia'
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'linkedin.com/in/balqisnaguwib',
      link: 'https://linkedin.com/in/balqisnaguwib'
    },
    {
      icon: GithubIcon,
      label: 'GitHub',
      value: 'github.com/balqisnaguwib',
      link: 'https://github.com/balqisnaguwib'
    }
  ]

  return (
    <section id="contact" className="section dark-section">
      <div className="animated-bg">
        <div className="grid-bg"></div>
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
      </div>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Let's build something</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div className="contact-content">
          <div className="contact-info-section">
            <h3>Let's Connect</h3>
            <p>
              Ready to bring your AI ideas to life? I specialize in developing cutting-edge 
              AI solutions and scalable web applications. Let's discuss how we can work together.
            </p>
            
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : '_self'}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className={`contact-info-item fade-in`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="contact-icon"><info.icon size={24} aria-hidden={true} /></div>
                  <div className="contact-details">
                    <div className="contact-label">{info.label}</div>
                    <div className="contact-value">{info.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact