import React, { useState, useEffect } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { FolderGit2, Star, GitFork } from 'lucide-react'
import { fadeUp, staggerContainer, inViewOnce, springHover } from '../motion/variants'
import { GithubIcon } from './BrandIcons'
import './GitHubProjects.css'

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  homepage?: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
  size: number
  fork: boolean
}

const GitHubProjects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(6)
  const reduce = useReducedMotion()

  useEffect(() => {
    fetchGitHubRepos()
  }, [])

  const fetchGitHubRepos = async () => {
    try {
      setError(null)
      setLoading(true)
      const response = await fetch('https://api.github.com/users/balqisnaguwib/repos?type=public&sort=updated&per_page=100')

      if (!response.ok) {
        // The unauthenticated GitHub API is limited to 60 requests/hour/IP.
        if (response.status === 403 || response.status === 429) {
          throw new Error("GitHub's public API rate limit was hit. Please try again shortly, or view the profile directly on GitHub.")
        }
        throw new Error(`Couldn't load repositories (${response.status}). Please try again.`)
      }

      const data: GitHubRepo[] = await response.json()

      const filteredRepos = data
        .filter((repo) => !repo.fork)
        .sort((a, b) => {
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count
          }
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        })

      setRepos(filteredRepos)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      CSS: '#563d7c',
      HTML: '#e34c26',
      Go: '#00ADD8',
      Rust: '#dea584',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Dart: '#00B4AB'
    }
    return colors[language] || '#8b949e'
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const loadMore = () => {
    setDisplayCount(prev => prev + 6)
  }

  if (loading) {
    return (
      <section id="github-projects" className="section">
        <div className="container">
          <h2 className="section-title">Open Source Projects</h2>
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading repositories...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="github-projects" className="section">
        <div className="container">
          <h2 className="section-title">Open Source Projects</h2>
          <div className="error-message">
            <p>Unable to load repositories: {error}</p>
            <button onClick={fetchGitHubRepos} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="github-projects" className="section">
      <div className="container">
        <h2 className="section-title">Open Source Projects</h2>
        <p className="github-intro">
          Explore my public repositories and contributions on GitHub
        </p>
        
        <m.div
          className="github-repos-grid"
          variants={reduce ? undefined : staggerContainer(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {repos.slice(0, displayCount).map((repo) => (
            <m.a
              key={repo.id}
              className="repo-card"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${repo.name} repository on GitHub`}
              variants={reduce ? undefined : fadeUp}
              whileHover={reduce ? undefined : { y: -6, transition: springHover }}
            >
              <div className="repo-header">
                <div className="repo-name">
                  <span className="repo-icon"><FolderGit2 size={19} aria-hidden="true" /></span>
                  <h3>{repo.name}</h3>
                </div>
                <div className="repo-stats">
                  <span className="stat">
                    <span className="star-icon"><Star size={15} aria-hidden="true" /></span>
                    {repo.stargazers_count}
                  </span>
                  <span className="stat">
                    <span className="fork-icon"><GitFork size={15} aria-hidden="true" /></span>
                    {repo.forks_count}
                  </span>
                </div>
              </div>
              
              <p className="repo-description">{repo.description || 'No description available'}</p>
              
              {repo.topics && repo.topics.length > 0 && (
                <div className="repo-topics">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="topic-tag">{topic}</span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="topic-more">+{repo.topics.length - 3}</span>
                  )}
                </div>
              )}
              
              <div className="repo-footer">
                <div className="repo-meta">
                  {repo.language && (
                    <span className="language">
                      <span 
                        className="language-dot" 
                        style={{backgroundColor: getLanguageColor(repo.language)}}
                      ></span>
                      {repo.language}
                    </span>
                  )}
                  <span className="updated-date">
                    Updated {formatDate(repo.updated_at)}
                  </span>
                </div>
                
              </div>
            </m.a>
          ))}
        </m.div>

        {repos.length > displayCount && (
          <div className="load-more-section">
            <button 
              className="btn btn-outline load-more-btn"
              onClick={loadMore}
            >
              Load More Projects ({repos.length - displayCount} remaining)
            </button>
          </div>
        )}
        
        <div className="github-link-section">
          <a 
            href="https://github.com/balqisnaguwib"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary github-profile-btn"
          >
            <span className="github-icon"><GithubIcon size={20} /></span>
            View Full GitHub Profile
          </a>
        </div>
      </div>
    </section>
  )
}

export default GitHubProjects