import React from 'react'
import './Contact.css'

const Contact: React.FC = () => {

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'balqisnaguwib@gmail.com',
      link: 'mailto:balqisnaguwib@gmail.com'
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+60139892596',
      link: 'tel:+60139892596'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Sepang, Selangor, Malaysia',
      link: 'https://maps.google.com/?q=Sepang,Selangor,Malaysia'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/balqisnaguwib',
      link: 'https://linkedin.com/in/balqisnaguwib'
    },
    {
      icon: '🐙',
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
        <h2 className="section-title" style={{color: 'white'}}>Get In Touch</h2>
        

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
                  <div className="contact-icon">{info.icon}</div>
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