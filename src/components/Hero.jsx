import { useEffect, useState, useRef } from 'react';
import { 
  ChevronDown, ArrowRight, ShieldCheck, Mail, Sparkles
} from 'lucide-react';
import './Hero.css';

const roles = [
  'SOC & Threat Analyst',
  'Cybersecurity Specialist',
  'Frontend Engineer (React)',
  'OSINT Researcher',
  'Web Security Practitioner',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 150);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      if (displayedText.length < currentRole.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, 70);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (displayedText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 35);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 400);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayedText, isDeleting, roleIndex]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      {/* Ambient ambient glow orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />
      <div className="hero__grid-pattern" />

      <div className={`hero__container container ${loaded ? 'hero__container--loaded' : ''}`}>
        <div className="hero__content">
          
          {/* Luxury Status Badge */}
          <div className="hero__badge badge badge-purple hero__entrance hero__entrance--1">
            <span className="hero__badge-pulse" />
            <ShieldCheck size={14} className="hero__badge-icon" />
            <span>Cybersecurity Specialist & Modern Web Engineer</span>
            <Sparkles size={12} className="hero__badge-sparkle" />
          </div>

          {/* Grand Heading */}
          <h1 className="hero__heading hero__entrance hero__entrance--2">
            <span className="hero__greeting">Portfolio of</span>
            <span className="hero__name">Faiz Farooqui</span>
          </h1>

          {/* Interactive Role Typewriter */}
          <div className="hero__role hero__entrance hero__entrance--3">
            <span className="hero__role-prompt">&gt;</span>
            <span className="hero__role-text">{displayedText}</span>
            <span className="hero__cursor">_</span>
          </div>

          {/* Bio Description */}
          <p className="hero__desc hero__entrance hero__entrance--4">
            Computer Science graduate from <strong>University of Mumbai</strong> (CGPI: 8.00) specializing in 
            <strong> defensive security, SOC operations</strong>, threat intelligence, and 
            <strong> modern frontend engineering</strong> with React. Building secure real-world tools and elegant web experiences.
          </p>

          {/* Luxury Action Buttons */}
          <div className="hero__actions hero__entrance hero__entrance--5">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              <span>Explore Projects</span>
              <ArrowRight size={17} />
            </button>

            <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
              <Mail size={16} />
              <span>Get in Touch</span>
            </button>
          </div>

          {/* Key Metrics Glass Capsule */}
          <div className="hero__quick-stats hero__entrance hero__entrance--6">
            <div className="hero__quick-stat">
              <span className="hero__quick-value">8.00</span>
              <span className="hero__quick-label">CGPI Score</span>
            </div>
            <div className="hero__quick-divider" />
            <div className="hero__quick-stat">
              <span className="hero__quick-value">3+</span>
              <span className="hero__quick-label">Featured Projects</span>
            </div>
            <div className="hero__quick-divider" />
            <div className="hero__quick-stat">
              <span className="hero__quick-value">4+</span>
              <span className="hero__quick-label">Certifications</span>
            </div>
            <div className="hero__quick-divider" />
            <div className="hero__quick-stat">
              <span className="hero__quick-value">Mumbai</span>
              <span className="hero__quick-label">Location, IN</span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button className="hero__scroll" onClick={() => scrollTo('about')} aria-label="Scroll to about section">
        <ChevronDown size={22} />
      </button>
    </section>
  );
}
