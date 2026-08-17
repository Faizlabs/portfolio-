import {
  ShieldAlert, Search, Eye, Radio, Wifi, Bug, Globe, Database, Terminal, Cpu,
  Code2, Palette, FileCode, Braces, PenTool, Hexagon, Layers, Rocket, Server,
  MonitorCog, MapPin, Flame, GitBranch, Cloud, Lightbulb, MessageSquare,
  Users2, RefreshCw, BrainCircuit, CheckSquare
} from 'lucide-react';
import './Skills.css';

const skillCategories = [
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Defense',
    subtitle: 'Threat analysis, vulnerability assessment & SOC tooling',
    color: 'purple',
    skills: [
      { name: 'Threat Intelligence', icon: <Cpu size={18} /> },
      { name: 'OSINT', icon: <Eye size={18} /> },
      { name: 'Phishing Detection', icon: <Search size={18} /> },
      { name: 'SOC Fundamentals', icon: <Radio size={18} /> },
      { name: 'Vulnerability Assessment', icon: <Bug size={18} /> },
      { name: 'OWASP Top 10', icon: <Globe size={18} /> },
      { name: 'SIEM & Splunk', icon: <Database size={18} /> },
      { name: 'Kali Linux', icon: <Terminal size={18} /> },
      { name: 'Networking & Protocols', icon: <Wifi size={18} /> },
      { name: 'Incident Analysis', icon: <ShieldAlert size={18} /> },
    ],
  },
  {
    id: 'programming',
    title: 'Programming & Web Development',
    subtitle: 'Scalable frontend engineering & core languages',
    color: 'violet',
    skills: [
      { name: 'React', icon: <Hexagon size={18} /> },
      { name: 'TypeScript', icon: <Braces size={18} /> },
      { name: 'JavaScript (ES6+)', icon: <FileCode size={18} /> },
      { name: 'HTML5 Semantic Web', icon: <Code2 size={18} /> },
      { name: 'CSS3 / Modern Styling', icon: <Palette size={18} /> },
      { name: 'Python', icon: <PenTool size={18} /> },
      { name: 'REST APIs', icon: <Server size={18} /> },
      { name: 'Responsive Layouts', icon: <Layers size={18} /> },
    ],
  },
  {
    id: 'tools',
    title: 'Frameworks, Tools & Tooling',
    subtitle: 'Security auditing, build tools & cloud deployment',
    color: 'cyan',
    skills: [
      { name: 'Tailwind CSS', icon: <Layers size={18} /> },
      { name: 'Vite', icon: <Rocket size={18} /> },
      { name: 'Wireshark', icon: <MonitorCog size={18} /> },
      { name: 'Nmap', icon: <MapPin size={18} /> },
      { name: 'Burp Suite', icon: <Flame size={18} /> },
      { name: 'Git & GitHub', icon: <GitBranch size={18} /> },
      { name: 'VS Code', icon: <Code2 size={18} /> },
      { name: 'Vercel / Netlify', icon: <Cloud size={18} /> },
    ],
  },
  {
    id: 'core',
    title: 'Core Concepts & Engineering Soft Skills',
    subtitle: 'Problem solving, teamwork & security methodologies',
    color: 'magenta',
    skills: [
      { name: 'Problem Solving', icon: <Lightbulb size={18} /> },
      { name: 'Analytical Thinking', icon: <BrainCircuit size={18} /> },
      { name: 'Teamwork & Collaboration', icon: <Users2 size={18} /> },
      { name: 'Communication', icon: <MessageSquare size={18} /> },
      { name: 'Adaptability', icon: <RefreshCw size={18} /> },
      { name: 'Security Monitoring', icon: <CheckSquare size={18} /> },
    ],
  },
];

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-label">Technical Competencies</p>
          <h2 className="section-title">My Skills & Arsenal</h2>
          <p className="section-subtitle">
            Curated toolkit spanning cybersecurity analysis, secure software engineering, and modern web technologies.
          </p>
          <div className="glow-line" />
        </div>

        {/* All Domains Categories Grid directly rendered without filter buttons */}
        <div className="skills__grid">
          {skillCategories.map((cat, ci) => (
            <div 
              className={`skills__category glass reveal reveal-delay-${ci + 1}`} 
              key={cat.id}
            >
              <div className="skills__category-header">
                <div>
                  <h3 className="skills__category-title">{cat.title}</h3>
                  <p className="skills__category-subtitle">{cat.subtitle}</p>
                </div>
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
