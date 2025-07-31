import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    fetchGitHubRepos()
  }, [])

  const fetchGitHubRepos = async () => {
    try {
      const response = await fetch('https://api.github.com/users/balqisnaguwib/repos?type=public&sort=updated')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`)
      }
      
      const data: GitHubRepo[] = await response.json()
      console.log('GitHub API Response:', data)
      
      // Less strict filtering - just filter out forks
      const filteredRepos = data
        .filter(repo => !repo.fork)
        .sort((a, b) => {
          // Sort by stars first, then by update date
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count
          }
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        })
      
      console.log('Filtered repos:', filteredRepos)
      setRepos(filteredRepos)
    } catch (err) {
      console.error('GitHub API Error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
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

  const handleRepoClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
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
        <p className="section-subtitle">
          Explore my public repositories and contributions on GitHub
        </p>
        
        <div className="github-repos-grid">
          {repos.slice(0, displayCount).map((repo, index) => (
            <div 
              key={repo.id} 
              className="repo-card fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => handleRepoClick(repo.html_url)}
            >
              <div className="repo-header">
                <div className="repo-name">
                  <span className="repo-icon">📁</span>
                  <h3>{repo.name}</h3>
                </div>
                <div className="repo-stats">
                  <span className="stat">
                    <span className="star-icon">⭐</span>
                    {repo.stargazers_count}
                  </span>
                  <span className="stat">
                    <span className="fork-icon">🔗</span>
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
            </div>
          ))}
        </div>
        
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
            <span className="github-icon">🐙</span>
            View Full GitHub Profile
          </a>
        </div>
      </div>
    </section>
  )
}

export default GitHubProjects