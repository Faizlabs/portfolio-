import { GraduationCap, Target, Swords } from 'lucide-react';
import './About.css';

const highlights = [
  { icon: <GraduationCap size={20} />, label: 'Education', value: 'BSc Computer Science — Completed' },
  { icon: <Target size={20} />, label: 'Focus', value: 'SOC Analysis, OSINT & Web Security' },
  { icon: <Swords size={20} />, label: 'Training', value: 'TryHackMe Rooms & Hands-on Labs' },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-label">About</p>
          <h2 className="section-title">Who I Am</h2>
          <div className="glow-line" />
        </div>

        <div className="about__grid">
          {/* Terminal Card */}
          <div className="about__terminal glass reveal-left">
            <div className="about__terminal-bar">
              <div className="about__terminal-dots">
                <span className="about__dot about__dot--red" />
                <span className="about__dot about__dot--yellow" />
                <span className="about__dot about__dot--green" />
              </div>
              <span className="about__terminal-title">~/faiz/about.sh</span>
            </div>
            <div className="about__terminal-body">
              <div className="about__terminal-line">
                <span className="about__prompt">$</span>
                <span className="about__cmd">whoami</span>
              </div>
              <p className="about__terminal-output">
                BSc Computer Science student passionate about cybersecurity, threat hunting, and security engineering.
                Building real-world security tools while developing skills in SOC operations, OSINT, and application security.
              </p>
              <div className="about__terminal-line">
                <span className="about__prompt">$</span>
                <span className="about__cmd">echo $FOCUS</span>
              </div>
              <p className="about__terminal-output about__terminal-output--accent">
                SOC Analysis • Threat Intelligence • OSINT • Web Security
              </p>
              <div className="about__terminal-line">
                <span className="about__prompt">$</span>
                <span className="about__cursor">|</span>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="about__info">
            {highlights.map((item, i) => (
              <div className={`about__card glass glass-hover reveal-right reveal-delay-${i + 1}`} key={item.label}>
                <div className="about__card-icon">
                  {item.icon}
                </div>
                <div className="about__card-content">
                  <span className="about__card-label">{item.label}</span>
                  <span className="about__card-value">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
