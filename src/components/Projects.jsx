import { useCallback } from 'react';
import { ExternalLink, Shield, Monitor, Search, BarChart3, History, Sun, Lock, Activity, Layout, Smartphone } from 'lucide-react';
import './Projects.css';

const GithubIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projects = [
  {
    title: 'Email & URL Threat Analyzer',
    description: 'Detects phishing attempts, analyzes URL risk levels, and visualizes threat data through an interactive dashboard with scan history tracking.',
    features: [
      { icon: <Search size={14} />, label: 'Phishing Detection' },
      { icon: <Shield size={14} />, label: 'URL Risk Analysis' },
      { icon: <BarChart3 size={14} />, label: 'Threat Intelligence Dashboard' },
      { icon: <History size={14} />, label: 'Scan History' },
      { icon: <Sun size={14} />, label: 'Dark/Light Mode' },
    ],
    tags: ['React', 'JavaScript', 'API Integration', 'Security'],
    color: 'green',
    github: 'https://github.com/Faizlabs',
    live: 'https://email-threat-analyser.netlify.app/',
  },
  {
    title: 'CyberFlow Security Suite',
    description: 'Modern cybersecurity dashboard for monitoring threats and managing security events with real-time data visualization and a responsive interface.',
    features: [
      { icon: <Monitor size={14} />, label: 'Security Dashboard' },
      { icon: <Activity size={14} />, label: 'Threat Monitoring' },
      { icon: <Layout size={14} />, label: 'Modern Cybersecurity UI' },
      { icon: <Smartphone size={14} />, label: 'Responsive Design' },
    ],
    tags: ['React', 'CSS', 'UI/UX', 'Dashboard'],
    color: 'blue',
    github: 'https://github.com/Faizlabs',
    live: 'https://security-suite-nine.vercel.app/',
  },
];

export default function Projects() {
  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const card = e.currentTarget;
    card.style.setProperty('--mouse-x', '50%');
    card.style.setProperty('--mouse-y', '50%');
  }, []);

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-label">Projects</p>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">
            Security tools built to solve real-world problems.
          </p>
          <div className="glow-line" />
        </div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <div
              className={`projects__card glass reveal reveal-delay-${i + 1}`}
              key={project.title}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Cursor-following spotlight */}
              <div className="projects__card-spotlight" />
              <div className={`projects__card-glow projects__card-glow--${project.color}`} />

              <div className="projects__card-body">
                <div className="projects__card-header">
                  <div className={`projects__card-icon projects__card-icon--${project.color}`}>
                    <Lock size={22} />
                  </div>
                  <div className="projects__card-links">
                    <a href={project.github} className="projects__link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                      <GithubIcon />
                    </a>
                    <a href={project.live} className="projects__link projects__link--live" aria-label="Live Demo" target="_blank" rel="noopener noreferrer">
                      <span className="projects__live-dot" />
                      <ExternalLink size={18} />
                      <span>Live</span>
                    </a>
                  </div>
                </div>

                <h3 className="projects__card-title">{project.title}</h3>
                <p className="projects__card-desc">{project.description}</p>

                <div className="projects__features">
                  {project.features.map((f) => (
                    <div className={`projects__feature projects__feature--${project.color}`} key={f.label}>
                      {f.icon}
                      <span>{f.label}</span>
                    </div>
                  ))}
                </div>

                <div className="projects__tags">
                  {project.tags.map((tag) => (
                    <span className={`badge badge-${project.color}`} key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
