import { GraduationCap, Swords } from 'lucide-react';
import './Experience.css';

const experiences = [
  {
    role: 'Cybersecurity Self-Training',
    org: 'TryHackMe & Independent Labs',
    period: 'Ongoing',
    icon: <Swords size={14} />,
    points: [
      'Completing TryHackMe rooms covering SOC operations, threat analysis, and incident response',
      'Practicing OSINT techniques and phishing detection through hands-on challenges',
      'Building security-focused web applications that apply real-world cybersecurity concepts',
    ],
  },
  {
    role: 'BSc Computer Science',
    org: 'University — Student',
    period: 'Present',
    icon: <GraduationCap size={14} />,
    points: [
      'Focusing on cybersecurity, networking, and web development',
      'Developing projects combining modern frontend skills with security principles',
      'Studying vulnerability assessment, network security, and threat modeling',
    ],
  },
];

export default function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-label">Experience</p>
          <h2 className="section-title">My Journey</h2>
          <div className="glow-line" />
        </div>

        <div className="experience__timeline reveal">
          <div className="experience__line" />

          {experiences.map((exp) => (
            <div
              className="experience__item"
              key={exp.role}
            >
              <div className="experience__dot">
                {exp.icon}
              </div>

              <div className="experience__card glass glass-hover">
                <div className="experience__card-header">
                  <div>
                    <h3 className="experience__role">{exp.role}</h3>
                    <span className="experience__org">{exp.org}</span>
                  </div>
                  <span className="badge badge-green">{exp.period}</span>
                </div>
                <ul className="experience__points">
                  {exp.points.map((p, j) => (
                    <li className="experience__point" key={j}>
                      <span className="experience__point-marker" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
