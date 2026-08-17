import { useCallback } from 'react';
import { 
  Shield, Monitor, Search, BarChart3, History, 
  Sun, Lock, Activity, Layout, Smartphone, Camera, 
  Image, Aperture, Layers, ArrowUpRight 
} from 'lucide-react';
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
    subtitle: 'Cybersecurity Phishing & Heuristic Risk Analysis',
    badge: 'Security Tool',
    description: 'A cybersecurity-focused web application designed to analyze suspicious emails and URLs for phishing indicators, threat scoring, risk assessment, and simulated real-world SOC investigation workflows.',
    features: [
      { icon: <Search size={14} />, label: 'Phishing Detection Logic' },
      { icon: <Shield size={14} />, label: 'URL Risk Scoring' },
      { icon: <BarChart3 size={14} />, label: 'Interactive Scan Dashboard' },
      { icon: <History size={14} />, label: 'Investigation History' },
      { icon: <Sun size={14} />, label: 'Dark / Light Mode' },
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Phishing Analysis', 'SOC Workflows'],
    color: 'purple',
    icon: <Lock size={24} />,
    github: 'https://github.com/Faizlabs',
    live: 'https://email-threat-analyser.netlify.app/',
  },
  {
    title: 'CyberFlow Security Dashboard',
    subtitle: 'SOC Analytics & Real-Time Monitoring Interface',
    badge: 'Dashboard / Suite',
    description: 'A modern cybersecurity dashboard inspired by Security Operations Center (SOC) environments. Developed responsive analytics panels for threat monitoring, alerts, and live-styled security visualization.',
    features: [
      { icon: <Monitor size={14} />, label: 'SOC Monitoring Panels' },
      { icon: <Activity size={14} />, label: 'Real-Time Threat Alerts' },
      { icon: <Layout size={14} />, label: 'Modular TypeScript Architecture' },
      { icon: <Smartphone size={14} />, label: 'Fully Responsive UI' },
    ],
    tags: ['Vite', 'TypeScript', 'Tailwind CSS', 'React / UI', 'Security Analytics'],
    color: 'violet',
    icon: <Monitor size={24} />,
    github: 'https://github.com/Faizlabs',
    live: 'https://security-suite-nine.vercel.app/',
  },
  {
    title: 'Faiztheticss — Photography Portfolio',
    subtitle: 'Artistic Visual Gallery & Scroll Storytelling',
    badge: 'Creative Frontend',
    description: 'An artistic photography gallery organized by color collections (Amber, Rose, Azure, Noir, Prism) with immersive scroll-based storytelling, cinematic layouts, and responsive masonry grids.',
    features: [
      { icon: <Camera size={14} />, label: 'Color Collections (Amber, Rose, etc.)' },
      { icon: <Layers size={14} />, label: 'Scroll-Based Storytelling' },
      { icon: <Aperture size={14} />, label: 'Cinematic Visual Layouts' },
      { icon: <Image size={14} />, label: 'Responsive Masonry Grid' },
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Visual Storytelling', 'Masonry Grid'],
    color: 'cyan',
    icon: <Camera size={24} />,
    github: 'https://github.com/Faizlabs',
    live: 'https://faiztheticss.vercel.app/',
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
          <p className="section-label">Featured Projects</p>
          <h2 className="section-title">Built for Impact</h2>
          <p className="section-subtitle">
            A selection of cybersecurity tools, security monitoring dashboards, and creative frontend experiences.
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
              {/* Cursor-following radial spotlight */}
              <div className="projects__card-spotlight" />
              <div className={`projects__card-glow projects__card-glow--${project.color}`} />

              <div className="projects__card-body">
                {/* Header with Icon, Badge & Links */}
                <div className="projects__card-top">
                  <div className="projects__card-identity">
                    <div className={`projects__card-icon projects__card-icon--${project.color}`}>
                      {project.icon}
                    </div>
                    <div>
                      <span className="projects__badge">{project.badge}</span>
                      <h3 className="projects__card-title">{project.title}</h3>
                    </div>
                  </div>

                  <div className="projects__card-links">
                    <a 
                      href={project.github} 
                      className="projects__link" 
                      aria-label={`GitHub repo for ${project.title}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <GithubIcon />
                    </a>
                    <a 
                      href={project.live} 
                      className="projects__link projects__link--live" 
                      aria-label={`Live Demo for ${project.title}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <span className="projects__live-dot" />
                      <span>Live App</span>
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>

                <p className="projects__card-desc">{project.description}</p>

                {/* Feature Chips */}
                <div className="projects__features">
                  {project.features.map((f) => (
                    <div className={`projects__feature projects__feature--${project.color}`} key={f.label}>
                      {f.icon}
                      <span>{f.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="projects__tags">
                  {project.tags.map((tag) => (
                    <span className={`badge badge-${project.color}`} key={tag}>
                      {tag}
                    </span>
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
