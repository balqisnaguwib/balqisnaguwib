import React, { useState } from 'react'
import {
  Globe,
  Server,
  BrainCircuit,
  Wrench,
  GraduationCap,
  ClipboardList,
  Zap,
  Code2,
  Trophy,
  Star,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './Skills.css'

interface SkillCategory {
  title: string
  icon: LucideIcon
  skills: string[]
}

interface Certification {
  name: string
  issuer: string
  date: string
  icon: LucideIcon
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0)

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: Globe,
      skills: [
        "React.js",
        "Next.js", 
        "TypeScript",
        "JavaScript",
        "HTML/CSS",
        "Angular",
        "Tailwind CSS",
        "Bootstrap"
      ]
    },
    {
      title: "Backend Development",
      icon: Server,
      skills: [
        "Python",
        "FastAPI",
        "Node.js",
        "REST APIs",
        "MySQL",
        "PostgreSQL",
        "C/C++",
        "Express.js"
      ]
    },
    {
      title: "AI/Machine Learning",
      icon: BrainCircuit,
      skills: [
        "PyTorch",
        "TensorFlow",
        "LangChain",
        "Computer Vision",
        "Natural Language Processing",
        "YOLOv8",
        "Scikit-Learn",
        "Pandas",
        "NumPy",
        "OpenCV"
      ]
    },
    {
      title: "Tools & Platforms",
      icon: Wrench,
      skills: [
        "Power Platform",
        "Power BI",
        "Microsoft 365",
        "Azure OpenAI",
        "Git",
        "Docker",
        "AWS",
        "VS Code",
        "Jupyter Notebook",
        "Postman"
      ]
    }
  ]

  const certifications: Certification[] = [
    {
      name: "AI Engineering Professional Certificate",
      issuer: "IBM",
      date: "03.2024",
      icon: GraduationCap
    },
    {
      name: "Project Management Specialization",
      issuer: "Google",
      date: "05.2024",
      icon: ClipboardList
    },
    {
      name: "Certification of Registration of Graduate Engineer",
      issuer: "BEM",
      date: "10.2023",
      icon: Zap
    }
  ]

  const ActiveIcon = skillCategories[activeCategory].icon

  return (
    <section id="skills" className="section gradient-bg">
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
        <div className="section-head">
          <span className="eyebrow">My toolkit</span>
          <h2 className="section-title">Skills & Expertise</h2>
        </div>

        <div className="skills-content">
          <div className="skills-categories">
            {skillCategories.map((category, index) => (
              <button
                key={index}
                className={`category-btn ${activeCategory === index ? 'active' : ''}`}
                onClick={() => setActiveCategory(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCategory(index);
                  }
                }}
                aria-pressed={activeCategory === index}
                aria-label={`View ${category.title} skills`}
                type="button"
              >
                <span className="category-icon" aria-hidden="true">
                  <category.icon size={24} aria-hidden={true} />
                </span>
                <span className="category-title">{category.title}</span>
              </button>
            ))}
          </div>

          <div className="skills-display">
            <div className="skills-header fade-in">
              <h3>
                <span className="skill-icon" aria-hidden="true">
                  <ActiveIcon size={26} aria-hidden={true} />
                </span>
                {skillCategories[activeCategory].title}
              </h3>
            </div>
            
            <div className="skills-grid">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div key={skill} className={`skill-item fade-in`} style={{animationDelay: `${index * 0.1}s`}}>
                  <span className="skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="certifications-section">
          <h3 className="certifications-title">Professional Certifications</h3>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className={`certification-card card fade-in`} style={{animationDelay: `${index * 0.2}s`}}>
                <div className="cert-icon" aria-hidden="true">
                  <cert.icon size={26} aria-hidden={true} />
                </div>
                <div className="cert-content">
                  <h4 className="cert-name">{cert.name}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <span className="cert-date">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-summary">
          <div className="summary-stats">
            <div className="stat-card">
              <div className="stat-icon" aria-hidden="true">
                <Code2 size={26} aria-hidden={true} />
              </div>
              <div className="stat-content">
                <div className="stat-number">15+</div>
                <div className="stat-label">Technologies</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" aria-hidden="true">
                <Trophy size={26} aria-hidden={true} />
              </div>
              <div className="stat-content">
                <div className="stat-number">3</div>
                <div className="stat-label">Certifications</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" aria-hidden="true">
                <Star size={26} aria-hidden={true} />
              </div>
              <div className="stat-content">
                <div className="stat-number">90%</div>
                <div className="stat-label">Avg Proficiency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills