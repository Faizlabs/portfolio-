import {
  ShieldAlert, Search, Eye, Radio, Wifi, Bug,
  MonitorCog, MapPin, Flame, Terminal, GitBranch,
  Code2, Palette, FileCode, Hexagon, Cloud, Rocket
} from 'lucide-react';
import './Skills.css';

const categories = [
  {
    title: 'Cybersecurity',
    color: 'green',
    skills: [
      { name: 'Threat Analysis', icon: <ShieldAlert size={20} /> },
      { name: 'Phishing Detection', icon: <Search size={20} /> },
      { name: 'OSINT', icon: <Eye size={20} /> },
      { name: 'SOC Fundamentals', icon: <Radio size={20} /> },
      { name: 'Network Security', icon: <Wifi size={20} /> },
      { name: 'Vulnerability Assessment', icon: <Bug size={20} /> },
    ],
  },
  {
    title: 'Tools',
    color: 'blue',
    skills: [
      { name: 'Wireshark', icon: <MonitorCog size={20} /> },
      { name: 'Nmap', icon: <MapPin size={20} /> },
      { name: 'Burp Suite', icon: <Flame size={20} /> },
      { name: 'Linux', icon: <Terminal size={20} /> },
      { name: 'Git & GitHub', icon: <GitBranch size={20} /> },
    ],
  },
  {
    title: 'Development',
    color: 'purple',
    skills: [
      { name: 'HTML', icon: <Code2 size={20} /> },
      { name: 'CSS', icon: <Palette size={20} /> },
      { name: 'JavaScript', icon: <FileCode size={20} /> },
      { name: 'React', icon: <Hexagon size={20} /> },
      { name: 'Tailwind CSS', icon: <Palette size={20} /> },
      { name: 'Vercel', icon: <Cloud size={20} /> },
      { name: 'Netlify', icon: <Rocket size={20} /> },
    ],
  },
];

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-label">Skills</p>
          <h2 className="section-title">My Arsenal</h2>
          <p className="section-subtitle">
            Tools and technologies in my security toolkit.
          </p>
          <div className="glow-line" />
        </div>

        <div className="skills__grid">
          {categories.map((cat, ci) => (
            <div className={`skills__category glass reveal reveal-delay-${ci + 1}`} key={cat.title}>
              <div className="skills__category-header">
                <div className={`skills__category-dot skills__category-dot--${cat.color}`} />
                <h3 className="skills__category-title">{cat.title}</h3>
                <span className={`badge badge-${cat.color}`}>{cat.skills.length}</span>
              </div>
              <div className="skills__list">
                {cat.skills.map((skill) => (
                  <div className={`skills__item skills__item--${cat.color}`} key={skill.name}>
                    <div className={`skills__item-icon skills__item-icon--${cat.color}`}>
                      {skill.icon}
                    </div>
                    <span className="skills__item-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
