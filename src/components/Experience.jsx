import { GraduationCap, Swords, Code2, Award, Users, ExternalLink } from 'lucide-react';
import './Experience.css';

const experiences = [
  {
    role: 'Cybersecurity Self-Training & SOC Labs',
    org: 'TryHackMe & Independent Research',
    period: 'Ongoing',
    badge: 'Security',
    icon: <Swords size={16} />,
    color: 'purple',
    points: [
      'Completing TryHackMe rooms covering SOC operations, threat analysis, incident response, and triage',
      'Practicing OSINT techniques and heuristic phishing detection through hands-on challenge rooms',
      'Exploring penetration testing methodologies, Nmap network mapping, and threat detection workflows',
    ],
  },
  {
    role: 'Modern Web Engineering & Tool Development',
    org: 'Independent & Project Engineering',
    period: 'Ongoing',
    badge: 'Development',
    icon: <Code2 size={16} />,
    color: 'violet',
    points: [
      'Designing and building high-performance web applications with React, TypeScript, Vite, and modern CSS',
      'Engineered Email & URL Threat Analyzer for client-side phishing detection and risk scoring',
      'Created Faiztheticss photography portfolio with immersive scroll-based storytelling & masonry grid',
    ],
  },
  {
    role: 'Bachelor of Science in Computer Science',
    org: 'Mahendra Pratap Sharada Prasad Singh College of Science, Arts & Commerce (University of Mumbai)',
    period: '2023 – 2026',
    badge: 'CGPI: 8.00',
    icon: <GraduationCap size={16} />,
    color: 'cyan',
    points: [
      'Core coursework in computer networking, operating systems, database management, and web technologies',
      'Hands-on laboratory training in vulnerability assessment, software development, and algorithms',
      'Consistently maintained an academic CGPI score of 8.00',
    ],
  },
  {
    role: 'Verified Industry Certifications',
    org: 'Cisco Networking Academy & TryHackMe',
    period: 'Verified',
    badge: 'Credentials',
    icon: <Award size={16} />,
    color: 'magenta',
    points: [
      { text: 'Cisco Networking Academy — Ethical Hacker', link: '/certs/Ethical_Hacker_certificate_emptyempty387-gmail-com_551cf969-5934-4b01-b062-7db132a980fa.pdf' },
      { text: 'Cisco Networking Academy — Introduction to Cybersecurity', link: '/certs/Introduction_to_Cybersecurity_certificate_emptyempty387-gmail-com_f3f2b63f-3559-4ca8-9bce-893a744584ba.pdf' },
      { text: 'TryHackMe — Pre Security & Cybersecurity 101', link: '/certs/THM-QJJAKFH4Q9.pdf' },
      { text: 'Faiz Farooqui Professional Certificate', link: '/certs/Faiz_Farooqui_Certificate (1).pdf' },
    ],
  },
  {
    role: 'National Service Scheme (NSS) — Volunteer',
    org: 'University Community Outreach Program',
    period: 'Active',
    badge: 'Community',
    icon: <Users size={16} />,
    color: 'green',
    points: [
      'Actively participated in community service, social welfare campaigns, and awareness drives',
      'Collaborated with student leadership teams to organize events, logistics, and campaigns',
      'Developed essential soft skills: leadership, public communication, adaptability, and teamwork',
    ],
  },
];

export default function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-label">Milestones & Journey</p>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">
            A chronological timeline of my academic background, technical training, verified certifications, and leadership roles.
          </p>
          <div className="glow-line" />
        </div>

        <div className="experience__timeline reveal">
          <div className="experience__line" />

          {experiences.map((exp) => (
            <div
              className={`experience__item experience__item--${exp.color}`}
              key={exp.role}
            >
              {/* Timeline Node Dot */}
              <div className={`experience__dot experience__dot--${exp.color}`}>
                {exp.icon}
              </div>

              {/* Glass Milestone Card */}
              <div className="experience__card glass glass-hover">
                <div className="experience__card-header">
                  <div>
                    <span className="experience__badge-tag">{exp.badge}</span>
                    <h3 className="experience__role">{exp.role}</h3>
                    <span className="experience__org">{exp.org}</span>
                  </div>
                  <span className={`badge badge-${exp.color}`}>{exp.period}</span>
                </div>

                <ul className="experience__points">
                  {exp.points.map((p, j) => (
                    <li className="experience__point" key={j}>
                      <span className={`experience__point-marker experience__point-marker--${exp.color}`} />
                      {typeof p === 'string' ? (
                        <span>{p}</span>
                      ) : (
                        <a 
                          href={p.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="experience__cert-link"
                        >
                          <span className="experience__cert-text">{p.text}</span>
                          <ExternalLink size={13} className="experience__cert-icon" />
                          <span className="experience__cert-view">View PDF</span>
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
