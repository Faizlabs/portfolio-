import { GraduationCap, ShieldAlert, Code2, Users, CheckCircle2, Terminal } from 'lucide-react';
import './About.css';

const highlights = [
  { 
    icon: <GraduationCap size={22} />, 
    label: 'Education', 
    title: 'BSc in Computer Science',
    desc: 'University of Mumbai (2023 – 2026) • CGPI: 8.00',
    color: 'purple'
  },
  { 
    icon: <ShieldAlert size={22} />, 
    label: 'Cybersecurity Focus', 
    title: 'SOC & Threat Intelligence',
    desc: 'Vulnerability assessment, OSINT, Nmap, Wireshark & SIEM labs',
    color: 'violet'
  },
  { 
    icon: <Code2 size={22} />, 
    label: 'Development', 
    title: 'Modern Web Engineering',
    desc: 'React, TypeScript, Vite, Tailwind CSS & real-time dashboard UI/UX',
    color: 'cyan'
  },
  { 
    icon: <Users size={22} />, 
    label: 'Extracurricular', 
    title: 'NSS Volunteer & Community',
    desc: 'Leadership, teamwork, social initiatives & community engagement',
    color: 'magenta'
  },
];

const pillars = [
  'Defensive Security & Incident Analysis',
  'TryHackMe Hands-on Security Labs',
  'Phishing Detection & Threat Scoring Tools',
  'Clean, Scalable React Architecture',
];

export default function About() {
  return (
    <section className="section about" id="about">
      {/* Ambient background glow */}
      <div className="about__ambient-orb" />

      <div className="container">
        <div className="section-header reveal">
          <p className="section-label">Identity & Mission</p>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate about defending digital systems and building intuitive, aesthetic software that solves real problems.
          </p>
          <div className="glow-line" />
        </div>

        <div className="about__grid">
          {/* Left: Terminal Console Card */}
          <div className="about__terminal glass reveal-left">
            <div className="about__terminal-bar">
              <div className="about__terminal-dots">
                <span className="about__dot about__dot--red" />
                <span className="about__dot about__dot--yellow" />
                <span className="about__dot about__dot--green" />
              </div>
              <div className="about__terminal-title">
                <Terminal size={14} />
                <span>~/faiz/profile_inspect.sh</span>
              </div>
              <span className="about__terminal-badge">LIVE REPO</span>
            </div>

            <div className="about__terminal-body">
              <div className="about__terminal-line">
                <span className="about__prompt">$</span>
                <span className="about__cmd">whoami</span>
              </div>
              <p className="about__terminal-output">
                Computer Science graduate from <strong>University of Mumbai</strong> with deep focus on 
                <strong> Cybersecurity, Threat Analysis, SOC Operations</strong>, and <strong>Modern Frontend Development</strong>.
              </p>

              <div className="about__terminal-line">
                <span className="about__prompt">$</span>
                <span className="about__cmd">cat background.txt</span>
              </div>
              <p className="about__terminal-output">
                Skilled in networking, vulnerability assessment, OSINT, and frontend engineering with React and modern CSS. 
                Passionate about hands-on learning through practical labs, TryHackMe, building real-world security tools, 
                and sharing cybersecurity insights on LinkedIn.
              </p>

              <div className="about__terminal-line">
                <span className="about__prompt">$</span>
                <span className="about__cmd">echo $CORE_CAPABILITIES</span>
              </div>
              <ul className="about__pillars">
                {pillars.map((pillar) => (
                  <li className="about__pillar-item" key={pillar}>
                    <CheckCircle2 size={15} className="about__pillar-icon" />
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>

              <div className="about__terminal-line">
                <span className="about__prompt">$</span>
                <span className="about__cursor">_</span>
              </div>
            </div>
          </div>

          {/* Right: Info Highlight Cards */}
          <div className="about__cards">
            {highlights.map((item, i) => (
              <div 
                className={`about__card glass glass-hover reveal-right reveal-delay-${i + 1}`} 
                key={item.label}
              >
                <div className={`about__card-icon about__card-icon--${item.color}`}>
                  {item.icon}
                </div>
                <div className="about__card-content">
                  <span className="about__card-label">{item.label}</span>
                  <h3 className="about__card-title">{item.title}</h3>
                  <p className="about__card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
