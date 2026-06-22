import { GraduationCap, Target, Swords } from 'lucide-react';
import './About.css';

const highlights = [
  { icon: <GraduationCap size={20} />, label: 'Education', value: 'BSc Computer Science — CGPI 8.00' },
  { icon: <Target size={20} />, label: 'Focus', value: 'Cybersecurity & Frontend Development' },
  { icon: <Swords size={20} />, label: 'Certifications', value: 'Cisco Ethical Hacker, TryHackMe' },
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
                Computer Science graduate with strong interest in cybersecurity, threat analysis, and SOC operations.
                Skilled in networking, vulnerability assessment, OSINT, and modern web development.
                Passionate about hands-on learning through TryHackMe, real-world projects, and sharing insights on LinkedIn.
              </p>
              <div className="about__terminal-line">
                <span className="about__prompt">$</span>
                <span className="about__cmd">echo $FOCUS</span>
              </div>
              <p className="about__terminal-output about__terminal-output--accent">
                SOC Analysis • Threat Intelligence • OSINT • React • Frontend Development
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
