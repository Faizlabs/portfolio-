import { useEffect, useState, useRef } from 'react';
import { ChevronDown, ExternalLink, Terminal, FileText } from 'lucide-react';
import './Hero.css';

const roles = [
  'SOC Analyst',
  'Threat Analyst',
  'OSINT Researcher',
  'Security Tool Builder',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      if (displayedText.length < currentRole.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 40);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 500);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayedText, isDeleting, roleIndex]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero__bg-grid" />
      <div className="hero__content container">
        <div className="hero__badge badge badge-green">
          <Terminal size={14} />
          Open to Opportunities
        </div>

        <h1 className="hero__name">
          <span className="hero__greeting">Hi, I'm</span>
          <span className="hero__name-text">
            Faiz Farooqui
          </span>
        </h1>

        <div className="hero__role">
          <span className="hero__role-prefix">$&gt;&nbsp;</span>
          <span className="hero__role-text">{displayedText}</span>
          <span className="hero__cursor">|</span>
        </div>

        <p className="hero__desc">
          BSc Computer Science student passionate about cybersecurity, threat hunting, and security engineering.
          Building real-world security tools while developing skills in SOC operations, OSINT, and application security.
        </p>

        <div className="hero__actions">
          <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
            <ExternalLink size={18} />
            View My Work
          </button>
          <a href="/resume%20main.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <FileText size={18} />
            Resume
          </a>
          <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
            Get In Touch
          </button>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">2+</span>
            <span className="hero__stat-label">Security Projects</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">BSc</span>
            <span className="hero__stat-label">Computer Science</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">THM</span>
            <span className="hero__stat-label">TryHackMe Learner</span>
          </div>
        </div>
      </div>

      <button className="hero__scroll" onClick={() => scrollTo('about')} aria-label="Scroll to about">
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
