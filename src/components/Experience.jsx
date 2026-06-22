import { GraduationCap, Swords, Code2, Award, Users, ExternalLink } from 'lucide-react';
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
      'Exploring penetration testing methodologies and threat detection workflows',
    ],
  },
  {
    role: 'Web Development Projects',
    org: 'Freelance & Personal',
    period: 'Ongoing',
    icon: <Code2 size={14} />,
    points: [
      'Designing and developing responsive web applications with React, Vite, and modern CSS',
      'Created Faiztheticss — an artistic photography portfolio with immersive scroll-based storytelling',
      'Building cybersecurity dashboards and tools with interactive data visualization',
    ],
  },
  {
    role: 'BSc Computer Science',
    org: 'University of Mumbai — CGPI 8.00',
    period: '2023 – 2026',
    icon: <GraduationCap size={14} />,
    points: [
      'Studied cybersecurity, networking, and modern web development',
      'Developed projects combining frontend engineering with security principles',
      'Covered vulnerability assessment, network security, and full-stack fundamentals',
    ],
  },
  {
    role: 'Certifications',
    org: 'Cisco & TryHackMe',
    period: 'Earned',
    icon: <Award size={14} />,
    points: [
      { text: 'Cisco Networking Academy — Ethical Hacker', link: '/certs/Ethical_Hacker_certificate_emptyempty387-gmail-com_551cf969-5934-4b01-b062-7db132a980fa.pdf' },
      { text: 'Cisco Networking Academy — Introduction to Cybersecurity', link: '/certs/Introduction_to_Cybersecurity_certificate_emptyempty387-gmail-com_f3f2b63f-3559-4ca8-9bce-893a744584ba.pdf' },
      { text: 'TryHackMe — Pre Security & Cybersecurity 101', link: '/certs/THM-QJJAKFH4Q9.pdf' },
      { text: 'Faiz Farooqui Certificate', link: '/certs/Faiz_Farooqui_Certificate (1).pdf' },
    ],
  },
  {
    role: 'NSS Volunteer',
    org: 'National Service Scheme',
    period: 'Active',
    icon: <Users size={14} />,
    points: [
      'Participated in community service and social awareness initiatives',
      'Organized events and campaigns in collaboration with team members',
      'Developed leadership, teamwork, and communication skills through volunteer work',
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
                      {typeof p === 'string' ? (
                        p
                      ) : (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="experience__cert-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                          <span style={{ textDecoration: 'underline' }}>{p.text}</span>
                          <ExternalLink size={12} style={{ color: 'var(--accent-green)' }} />
                        </a>
                      )}
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
