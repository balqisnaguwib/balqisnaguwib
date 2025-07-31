import React, { useState } from 'react'
import './Projects.css'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: string[]
  date: string
  achievements?: string[]
  category: 'ai' | 'web' | 'ml'
  status: 'completed' | 'in-progress' | 'planned'
  demoUrl?: string
  githubUrl?: string
  images?: string[]
  metrics?: {
    label: string
    value: string
    icon: string
  }[]
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "Customizable AI Chatbot Builder System",
      description: "Multi-tenant SaaS platform enabling users to create and deploy custom AI chatbots with advanced features.",
      longDescription: "A comprehensive SaaS platform that democratizes AI chatbot creation. Users can build, customize, and deploy intelligent chatbots without technical expertise. The system features advanced RAG techniques, real-time analytics, and seamless integration capabilities.",
      technologies: ["React", "Next.js", "FastAPI", "Azure OpenAI", "JWT", "RAG", "MySQL"],
      date: "05.2025",
      status: 'completed',
      demoUrl: "chathubx.mov",
      achievements: [
        "Multi-tenant architecture supporting unlimited clients",
        "JWT authentication with role-based access control", 
        "RAG techniques for intelligent knowledge base management",
        "Real-time usage monitoring and chat log analytics",
        "AI-powered dashboard with insights and recommendations",
        "Embeddable widget for seamless website integration"
      ],
      metrics: [
        { label: "Active Users", value: "500+", icon: "👥" },
        { label: "Response Time", value: "<2s", icon: "⚡" },
        { label: "Accuracy", value: "95%", icon: "🎯" }
      ],
      category: 'ai'
    },
    {
      id: 2,
      title: "AI-Powered Invoice Data Extraction System",
      description: "Scalable system achieving consistent 30-second processing times with superior accuracy over traditional OCR methods.",
      longDescription: "Revolutionary invoice processing system that leverages advanced computer vision models to extract data with unprecedented speed and accuracy. Built for automotive industry clients requiring high-volume document processing.",
      technologies: ["React", "Next.js", "FastAPI", "Computer Vision", "MySQL", "OCR"],
      date: "05.2025",
      status: 'completed',
      demoUrl: "perodua.mov",
      achievements: [
        "Consistent 30-second processing time for all invoice types",
        "Superior accuracy compared to traditional OCR methods",
        "Scalable architecture handling thousands of documents daily",
        "Secure MySQL database with encrypted data storage",
        "RESTful API design for easy third-party integration"
      ],
      metrics: [
        { label: "Processing Speed", value: "30s", icon: "🚀" },
        { label: "Accuracy Rate", value: "98%", icon: "✅" },
        { label: "Daily Volume", value: "1000+", icon: "📊" }
      ],
      category: 'ai'
    },
    {
      id: 3,
      title: "Crack Characterization using ML & Optimization",
      description: "Award-winning final year project achieving 85.16% accuracy in crack depth characterization using advanced ML techniques.",
      longDescription: "Innovative research project that combines machine learning with optimization techniques to characterize material cracks. The system uses Support Vector Machine with Particle Swarm Optimization to achieve high accuracy in defect analysis.",
      technologies: ["Python", "SVM", "Particle Swarm Optimization", "K-Fold Cross Validation", "Pandas", "Signal Processing"],
      date: "07.2023",
      status: 'completed',
      demoUrl: "https://drive.google.com/file/d/1Oo_0VFrhYqLiFSNGlV1hv2y1wgm-MCLe/preview",
      githubUrl: "https://github.com/balqisnaguwib/Crack-Characterization-Using-ECT-and-PSO-SVR",
      achievements: [
        "Best Overall Final Year Project - Mechatronics Department",
        "85.16% accuracy in crack depth characterization",
        "Novel combination of SVM with PSO optimization",
        "Real-time defect analysis capabilities",
        "User-friendly software interface for industrial use"
      ],
      metrics: [
        { label: "Accuracy", value: "85.16%", icon: "🎯" },
        { label: "Award", value: "Best Project", icon: "🏆" },
        { label: "Processing", value: "Real-time", icon: "⚡" }
      ],
      category: 'ml'
    },
    {
      id: 4,
      title: "Portfolio Website with React-Bits Design",
      description: "Modern portfolio website built with React, TypeScript, and sophisticated animations inspired by react-bits.",
      longDescription: "A professional portfolio website showcasing modern web development practices with sophisticated animations, responsive design, and interactive elements. Built using React, TypeScript, and CSS with react-bits inspired design patterns.",
      technologies: ["React", "TypeScript", "CSS", "Vite", "Responsive Design"],
      date: "07.2025",
      status: 'completed',
      githubUrl: "https://github.com/balqisnaguwib/balqisnaguwib",
      achievements: [
        "Fully responsive design for all devices",
        "Advanced CSS animations and micro-interactions",
        "TypeScript for type-safe development",
        "Optimized performance and SEO",
        "Modern react-bits inspired component library"
      ],
      metrics: [
        { label: "Performance", value: "98/100", icon: "⚡" },
        { label: "Responsive", value: "100%", icon: "📱" },
        { label: "Animations", value: "20+", icon: "✨" }
      ],
      category: 'web'
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const filterOptions = [
    { value: 'all', label: 'All Projects', count: projects.length },
    { value: 'ai', label: 'AI Solutions', count: projects.filter(p => p.category === 'ai').length },
    { value: 'ml', label: 'Machine Learning', count: projects.filter(p => p.category === 'ml').length },
    { value: 'web', label: 'Web Development', count: projects.filter(p => p.category === 'web').length }
  ]

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const handleDemoClick = (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (url.toLowerCase().endsWith('.mov') || url.toLowerCase().endsWith('.mp4')) {
      openVideoModal(url)
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const openVideoModal = (videoUrl: string) => {
    const modal = document.createElement('div')
    modal.className = 'video-modal'
    modal.innerHTML = `
      <div class="video-modal-content">
        <button class="video-modal-close">&times;</button>
        <video controls autoplay muted style="width: 100%; max-width: 800px; height: auto;">
          <source src="${videoUrl}" type="video/quicktime">
          <source src="${videoUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    `
    
    document.body.appendChild(modal)
    
    const closeModal = () => {
      document.body.removeChild(modal)
    }
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal()
    })
    
    modal.querySelector('.video-modal-close')?.addEventListener('click', closeModal)
  }

  const handleGithubClick = (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="section dark-section">
      <div className="animated-bg">
        <div className="floating-elements">
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
        </div>
      </div>
      <div className="container">
        <h2 className="section-title" style={{color: 'white'}}>Featured Projects</h2>
        
        <div className="project-filters">
          {filterOptions.map((filter) => (
            <button
              key={filter.value}
              className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label} <span className="filter-count">({filter.count})</span>
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card fade-in`} 
              style={{animationDelay: `${index * 0.2}s`}}
            >

              <div className="project-header">
                <div className="project-meta">
                  <div className="project-category">
                    {project.category.toUpperCase()}
                  </div>
                  <div className={`project-status status-${project.status}`}>
                    {project.status === 'completed' && '✅'}
                    {project.status === 'in-progress' && '🚧'}
                    {project.status === 'planned' && '📅'}
                    {project.status.replace('-', ' ')}
                  </div>
                </div>
                <div className="project-date">{project.date}</div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                {project.metrics && (
                  <div className="project-metrics">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="metric-item">
                        <span className="metric-icon">{metric.icon}</span>
                        <span className="metric-value">{metric.value}</span>
                        <span className="metric-label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="project-tech">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="project-actions">
                {project.demoUrl && (
                  <button 
                    className="btn btn-primary action-btn"
                    onClick={(e) => handleDemoClick(project.demoUrl!, e)}
                    title="View Demo"
                  >
                    🚀 Demo
                  </button>
                )}
                {project.githubUrl && (
                  <button 
                    className="btn btn-outline action-btn"
                    onClick={(e) => handleGithubClick(project.githubUrl!, e)}
                    title="View Source Code"
                  >
                    💻 Code
                  </button>
                )}
                <button 
                  className="btn btn-secondary action-btn"
                  onClick={() => handleProjectClick(project)}
                  title="View Project Details"
                >
                  📋 Details
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="project-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={closeModal}
              title="Close Modal"
            >
              ×
            </button>
            
            <div className="modal-header">
              <div className="modal-title-section">
                <h2>{selectedProject.title}</h2>
                <div className="modal-meta">
                  <span className="modal-category">{selectedProject.category.toUpperCase()}</span>
                  <span className="modal-date">{selectedProject.date}</span>
                  <span className={`modal-status status-${selectedProject.status}`}>
                    {selectedProject.status === 'completed' && '✅'}
                    {selectedProject.status === 'in-progress' && '🚧'}
                    {selectedProject.status === 'planned' && '📅'}
                    {selectedProject.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="modal-actions">
                {selectedProject.demoUrl && (
                  <button 
                    className="btn btn-primary"
                    onClick={(e) => handleDemoClick(selectedProject.demoUrl!, e)}
                  >
                    🚀 Demo
                  </button>
                )}
                {selectedProject.githubUrl && (
                  <button 
                    className="btn btn-outline"
                    onClick={(e) => handleGithubClick(selectedProject.githubUrl!, e)}
                  >
                    💻 View Code
                  </button>
                )}
              </div>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{selectedProject.longDescription}</p>
              
              {selectedProject.metrics && (
                <div className="modal-metrics">
                  <h4>Project Metrics</h4>
                  <div className="metrics-grid">
                    {selectedProject.metrics.map((metric, idx) => (
                      <div key={idx} className="modal-metric-item">
                        <span className="metric-icon">{metric.icon}</span>
                        <div className="metric-details">
                          <span className="metric-value">{metric.value}</span>
                          <span className="metric-label">{metric.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedProject.achievements && (
                <div className="modal-achievements">
                  <h4>Key Achievements</h4>
                  <ul>
                    {selectedProject.achievements.map((achievement, idx) => (
                      <li key={idx}>
                        <span className="achievement-bullet">🏆</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="modal-tech">
                <h4>Technologies Used</h4>
                <div className="tech-grid">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects