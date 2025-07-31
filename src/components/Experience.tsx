import React, { useState } from 'react'
import './Experience.css'

interface ExperienceItem {
  id: number
  title: string
  company: string
  location: string
  duration: string
  description: string[]
  current?: boolean
  technologies: string[]
  achievements: string[]
  companyLogo?: string
}

const Experience: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)
  
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Assistant Manager, AI Model Engineer",
      company: "Telekom Malaysia",
      location: "Cyberjaya, Selangor",
      duration: "05.2025 - Present",
      current: true,
      description: [
        "Leading AI model development and implementation for enterprise solutions",
        "Building scalable AI chatbot platforms with multi-tenant architecture",
        "Developing semantic RAG systems for e-commerce applications"
      ],
      technologies: ["FastAPI", "React", "Next.js", "Angular", "MySQL", "Azure OpenAI", "JWT", "Docker"],
      achievements: [
        "Built customizable AI chatbot SaaS platform serving multiple enterprise clients",
        "Implemented multi-tenant architecture with embeddable widgets",
        "Developed real-time document management capabilities for RAG systems",
        "Led cross-functional team of 5 developers and data scientists"
      ],
      companyLogo: "🏢"
    },
    {
      id: 2,
      title: "Assistant Manager, IT and Digital",
      company: "Telekom Malaysia",
      location: "Bangsar, Kuala Lumpur",
      duration: "07.2024 – 04.2025",
      description: [
        "Strategic procurement and contract management for IT infrastructure",
        "Digital transformation initiatives and vendor management",
        "Cost optimization and supply chain efficiency improvements"
      ],
      technologies: ["Project Management", "Digital Strategy", "Vendor Management", "Cost Analysis"],
      achievements: [
        "Reduced IT procurement costs by 25% through strategic vendor negotiations",
        "Streamlined digital service delivery processes",
        "Managed multi-million dollar IT infrastructure contracts",
        "Implemented cost-effective supply chain solutions"
      ],
      companyLogo: "🏢"
    },
    {
      id: 3,
      title: "Junior AI Engineer",
      company: "MISHU Sdn Bhd",
      location: "Bukit Jalil, Kuala Lumpur",
      duration: "02.2024 – 01.2025",
      description: [
        "Developed AI-powered call agents for business automation",
        "Built intelligent chatbots for WhatsApp Business integration",
        "Automated CRM and business process workflows"
      ],
      technologies: ["VAPI", "FastAPI", "Next.js", "LangChain", "OpenAI API", "NLP", "Power Automate", "Zapier"],
      achievements: [
        "Improved sales team efficiency by 40% with AI call agent",
        "Successfully integrated AI chatbot with WhatsApp Business API",
        "Automated complex workflows between HubSpot, ChatDaddy, and Flowise",
        "Reduced manual processing time by 60% through automation"
      ],
      companyLogo: "🚀"
    },
    {
      id: 4,
      title: "AI Specialist Apprentice",
      company: "Aerodyne Group",
      location: "Cyberjaya, Selangor",
      duration: "08.2023 – 01.2024",
      description: [
        "Computer vision model development for industrial applications",
        "Dataset curation and machine learning model training",
        "Business intelligence and data visualization solutions"
      ],
      technologies: ["YOLOv8", "PyTorch", "Computer Vision", "CVAT", "Roboflow", "Power BI", "Python"],
      achievements: [
        "Achieved 95% accuracy in defect detection for electric pole inspection",
        "Curated and annotated 10,000+ images for training datasets",
        "Created interactive Power BI dashboards for real-time monitoring",
        "Reduced manual inspection time by 70% through automation"
      ],
      companyLogo: "🛸"
    }
  ]

  return (
    <section id="experience" className="section">
      <div className="animated-bg">
        <div className="wave-bg"></div>
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
      </div>
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        
        <div className="experience-journey">
          <div className="journey-path">
            <div className="path-line"></div>
            {experiences.slice().reverse().map((exp, index) => (
              <div key={exp.id} className="journey-node" style={{left: `${(index * 25) + 12.5}%`}}>
                <div className="node-dot">
                  <span className="node-icon">{exp.companyLogo}</span>
                </div>
                <div className="node-label">{exp.company}</div>
                <div className="node-year">{exp.duration.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`experience-card card fade-in`}
              style={{animationDelay: `${index * 0.2}s`}}
              onMouseEnter={() => setSelectedExperience(exp.id)}
              onMouseLeave={() => setSelectedExperience(null)}
            >
              {exp.current && (
                <div className="current-badge">
                  <span className="badge-icon">⚡</span>
                  Current Position
                </div>
              )}
              
              <div className="card-header">
                <div className="company-info">
                  <div className="company-logo">{exp.companyLogo}</div>
                  <div className="company-details">
                    <h3 className="job-title">{exp.title}</h3>
                    <div className="company-name">{exp.company}</div>
                  </div>
                </div>
                <div className="job-meta">
                  <div className="duration">{exp.duration}</div>
                  <div className="location">📍 {exp.location}</div>
                </div>
              </div>

              <div className="card-content">
                <div className="job-description">
                  {exp.description.map((item, idx) => (
                    <div key={idx} className="description-item">
                      <span className="item-bullet">▶</span>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="technologies-section">
                  <h4 className="section-subtitle">Technologies Used</h4>
                  <div className="tech-tags">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className={`achievements-section ${selectedExperience === exp.id ? 'expanded' : ''}`}>
                  <h4 className="section-subtitle">Key Achievements</h4>
                  <div className="achievements-list">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="achievement-item">
                        <span className="achievement-icon">🏆</span>
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="experience-index">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="expand-indicator">
                  {selectedExperience === exp.id ? '↑' : '↓'}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Experience