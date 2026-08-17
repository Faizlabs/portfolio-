import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container">
        <a href="#home" className="navbar__logo" onClick={() => handleClick('#home')}>
          <div className="navbar__logo-icon">
            <Terminal size={17} />
          </div>
          <span className="navbar__logo-text">Faiz<span className="navbar__logo-dot">.</span></span>
          <span className="navbar__logo-tag">SOC / DEV</span>
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
              >
                {link.label}
                {activeSection === link.href.slice(1) && <span className="navbar__link-glow" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button
            className="navbar__toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ transitionDelay: `${i * 0.05}s` }}>
              <a
                href={link.href}
                className={`navbar__mobile-link ${activeSection === link.href.slice(1) ? 'navbar__mobile-link--active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
              >
                <span className="navbar__mobile-index">0{i + 1}</span>
                <span className="navbar__mobile-text">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
