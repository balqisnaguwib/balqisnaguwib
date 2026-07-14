import React, { useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'motion/react'
import { fadeUp, staggerContainer, inViewOnce, springHover } from '../motion/variants'
import {
  CheckCircle2,
  Construction,
  Calendar,
  Users,
  Zap,
  Target,
  Rocket,
  BarChart3,
  Play,
  Code2,
  ClipboardList,
  Trophy,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import './Projects.css'

// Map the emoji used in project metric data to Lucide icons (keeps the data
// declarative while rendering real SVGs).
const METRIC_ICONS: Record<string, LucideIcon> = {
  '👥': Users,
  '⚡': Zap,
  '🎯': Target,
  '🚀': Rocket,
  '✅': CheckCircle2,
  '📊': BarChart3,
  '🏆': Trophy,
}

const StatusIcon: React.FC<{ status: Project['status']; size?: number }> = ({ status, size = 15 }) => {
  if (status === 'completed') return <CheckCircle2 size={size} aria-hidden="true" />
  if (status === 'in-progress') return <Construction size={size} aria-hidden="true" />
  return <Calendar size={size} aria-hidden="true" />
}

const MetricIcon: React.FC<{ emoji: string; size?: number }> = ({ emoji, size = 16 }) => {
  const Icon = METRIC_ICONS[emoji] ?? Sparkles
  return <Icon size={size} aria-hidden="true" />
}

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
  const reduce = useReducedMotion()

  const projects: Project[] = [
    {
      id: 1,
      title: "Customizable AI Chatbot Builder System",
      description: "Multi-tenant SaaS platform enabling users to create and deploy custom AI chatbots with advanced features.",
      longDescription: "A comprehensive SaaS platform that democratizes AI chatbot creation. Users can build, customize, and deploy intelligent chatbots without technical expertise. The system features advanced RAG techniques, real-time analytics, and seamless integration capabilities.",
      technologies: ["React", "Next.js", "FastAPI", "Azure OpenAI", "JWT", "RAG", "MySQL"],
      date: "05.2025",
      status: 'completed',
      demoUrl: "/chathubx.mp4",
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
      demoUrl: "/perodua.mp4",
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
    if (/\.(mp4|webm|mov)$/i.test(url)) {
      openVideoModal(url)
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const openVideoModal = (videoUrl: string) => {
    const posterUrl = videoUrl.replace(/\.(mp4|webm|mov)$/i, '-poster.jpg')

    const modal = document.createElement('div')
    modal.className = 'video-modal'
    modal.setAttribute('role', 'dialog')
    modal.setAttribute('aria-modal', 'true')
    modal.setAttribute('aria-label', 'Project demo video')

    const content = document.createElement('div')
    content.className = 'video-modal-content'

    const closeBtn = document.createElement('button')
    closeBtn.className = 'video-modal-close'
    closeBtn.setAttribute('aria-label', 'Close video')
    closeBtn.textContent = '×'

    // H.264 MP4 plays across all modern browsers; the previous
    // "video/quicktime" .mov source did not play in Chrome/Firefox.
    const video = document.createElement('video')
    video.controls = true
    video.autoplay = true
    video.playsInline = true
    video.preload = 'metadata'
    video.poster = posterUrl
    video.src = videoUrl

    content.appendChild(closeBtn)
    content.appendChild(video)
    modal.appendChild(content)
    document.body.appendChild(modal)
    document.body.style.overflow = 'hidden'

    const closeModal = () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      if (modal.parentNode) document.body.removeChild(modal)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }

    document.addEventListener('keydown', onKey)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal()
    })
    closeBtn.addEventListener('click', closeModal)
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

        <m.div
          className="projects-grid"
          variants={reduce ? undefined : staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <m.div
              key={project.id}
              className="project-card"
              layout
              variants={reduce ? undefined : fadeUp}
              exit={reduce ? undefined : { opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
              whileHover={reduce ? undefined : { y: -10, scale: 1.02, transition: springHover }}
            >

              <div className="project-header">
                <div className="project-meta">
                  <div className="project-category">
                    {project.category.toUpperCase()}
                  </div>
                  <div className={`project-status status-${project.status}`}>
                    <StatusIcon status={project.status} />
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
                        <span className="metric-icon"><MetricIcon emoji={metric.icon} /></span>
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
                    <Play size={16} aria-hidden="true" /> Demo
                  </button>
                )}
                {project.githubUrl && (
                  <button 
                    className="btn btn-outline action-btn"
                    onClick={(e) => handleGithubClick(project.githubUrl!, e)}
                    title="View Source Code"
                  >
                    <Code2 size={16} aria-hidden="true" /> Code
                  </button>
                )}
                <button 
                  className="btn btn-secondary action-btn"
                  onClick={() => handleProjectClick(project)}
                  title="View Project Details"
                >
                  <ClipboardList size={16} aria-hidden="true" /> Details
                </button>
              </div>

            </m.div>
          ))}
          </AnimatePresence>
        </m.div>
      </div>

      <AnimatePresence>
      {selectedProject && (
        <m.div
          className="project-modal"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <m.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
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
                    <StatusIcon status={selectedProject.status} />
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
                    <Play size={16} aria-hidden="true" /> Demo
                  </button>
                )}
                {selectedProject.githubUrl && (
                  <button 
                    className="btn btn-outline"
                    onClick={(e) => handleGithubClick(selectedProject.githubUrl!, e)}
                  >
                    <Code2 size={16} aria-hidden="true" /> View Code
                  </button>
                )}
              </div>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{selectedProject.longDescription}</p>
              
              {selectedProject.metrics && (
                <div className="modal-metrics">
                  <h4><BarChart3 size={20} aria-hidden="true" />Project Metrics</h4>
                  <div className="metrics-grid">
                    {selectedProject.metrics.map((metric, idx) => (
                      <div key={idx} className="modal-metric-item">
                        <span className="metric-icon"><MetricIcon emoji={metric.icon} size={20} /></span>
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
                  <h4><Trophy size={20} aria-hidden="true" />Key Achievements</h4>
                  <ul>
                    {selectedProject.achievements.map((achievement, idx) => (
                      <li key={idx}>
                        <span className="achievement-bullet"><Trophy size={16} aria-hidden="true" /></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="modal-tech">
                <h4><Code2 size={20} aria-hidden="true" />Technologies Used</h4>
                <div className="tech-grid">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
      </AnimatePresence>
    </section>
  )
}

export default Projects