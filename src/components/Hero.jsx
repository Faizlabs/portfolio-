import { useEffect, useState, useRef } from 'react';
import { ChevronDown, ExternalLink, Terminal, FileText, ArrowRight } from 'lucide-react';
import './Hero.css';

const roles = [
  'SOC Analyst',
  'Frontend Developer',
  'Threat Analyst',
  'Web Developer',
  'OSINT Researcher',
  'Security Tool Builder',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Trigger staged entrance animations
    setTimeout(() => setLoaded(true), 200);
  }, []);

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

      {/* Floating decorative elements */}
      <div className="hero__float hero__float--1" />
      <div className="hero__float hero__float--2" />
      <div className="hero__float hero__float--3" />
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

      <div className={`hero__content container ${loaded ? 'hero__content--loaded' : ''}`}>
        <div className="hero__badge badge badge-green hero__entrance hero__entrance--1">
          <Terminal size={14} />
          Open to Opportunities
        </div>

        <h1 className="hero__name hero__entrance hero__entrance--2">
          <span className="hero__greeting">Hi, I'm</span>
          <span className="hero__name-text">
            Faiz Farooqui
          </span>
        </h1>

        <div className="hero__role hero__entrance hero__entrance--3">
          <span className="hero__role-prefix">$&gt;&nbsp;</span>
          <span className="hero__role-text">{displayedText}</span>
          <span className="hero__cursor">|</span>
        </div>

        <p className="hero__desc hero__entrance hero__entrance--4">
          Computer Science graduate from University of Mumbai with a strong foundation in cybersecurity and modern web development.
          Building secure, real-world applications — from threat analysis tools to creative web experiences — while actively sharpening skills through TryHackMe and hands-on projects.
        </p>

        <div className="hero__actions hero__entrance hero__entrance--5">
          <button className="btn btn-primary hero__btn-primary" onClick={() => scrollTo('projects')}>
            <ExternalLink size={18} />
            View My Work
            <ArrowRight size={16} className="hero__btn-arrow" />
          </button>
          <a href="/resume%20main.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <FileText size={18} />
            Resume
          </a>
          <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
            Get In Touch
          </button>
        </div>

        <div className="hero__stats hero__entrance hero__entrance--6">
          <div className="hero__stat">
            <span className="hero__stat-value">3+</span>
            <span className="hero__stat-label">Projects Built</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">8.0</span>
            <span className="hero__stat-label">CGPI</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">3</span>
            <span className="hero__stat-label">Certifications</span>
          </div>
        </div>
      </div>

      <button className="hero__scroll" onClick={() => scrollTo('about')} aria-label="Scroll to about">
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
