import { useState } from 'react';
import { 
  Send, Mail, Terminal, MapPin, Check, Copy, 
  ExternalLink, Shield 
} from 'lucide-react';
import './Contact.css';

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TryHackMeIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('faizfarooqui855@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="section contact" id="contact">
      {/* Ambient background glow */}
      <div className="contact__ambient-glow" />

      <div className="container">
        <div className="section-header reveal">
          <p className="section-label">Initiate Handshake</p>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Whether you have an opportunity, project collaboration, or security inquiry, my inbox is always open.
          </p>
          <div className="glow-line" />
        </div>

        <div className="contact__grid">
          {/* Left Column: Terminal Contact Form */}
          <form 
            className="contact__form glass reveal-left" 
            action="https://formsubmit.co/faizfarooqui855@gmail.com" 
            method="POST" 
            id="contact-form"
          >
            {/* Configuration for FormSubmit */}
            <input type="hidden" name="_subject" value="New Portfolio Inquiry - Faiz Farooqui" />
            <input type="hidden" name="_template" value="box" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="contact__form-bar">
              <div className="contact__form-dots">
                <span className="contact__dot contact__dot--red" />
                <span className="contact__dot contact__dot--yellow" />
                <span className="contact__dot contact__dot--green" />
              </div>
              <span className="contact__form-title">
                <Terminal size={14} /> ~/faiz/send_transmission.sh
              </span>
              <span className="contact__form-secure">
                <Shield size={12} /> ENCRYPTED
              </span>
            </div>

            <div className="contact__form-body">
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-name">
                  <span className="contact__label-prompt">$</span> your_name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="contact__input"
                  placeholder="e.g. John Doe"
                  required
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-email">
                  <span className="contact__label-prompt">$</span> email_address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="contact__input"
                  placeholder="e.g. name@company.com"
                  required
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-subject">
                  <span className="contact__label-prompt">$</span> subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  className="contact__input"
                  placeholder="e.g. SOC Analyst Role / Collaboration"
                  required
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-message">
                  <span className="contact__label-prompt">$</span> payload_message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="contact__textarea"
                  placeholder="Write your transmission here..."
                  rows={4}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary contact__submit">
                <span>Transmit Message</span>
                <Send size={16} />
              </button>
            </div>
          </form>

          {/* Right Column: Direct Contact & Social Matrix */}
          <div className="contact__info reveal-right">
            
            {/* Quick Contact Cards */}
            <div className="contact__cards">
              
              {/* Email Card with Fast Copy */}
              <div className="contact__card glass glass-hover">
                <div className="contact__card-icon contact__card-icon--purple">
                  <Mail size={22} />
                </div>
                <div className="contact__card-details">
                  <span className="contact__card-label">Primary Email</span>
                  <a href="mailto:faizfarooqui855@gmail.com" className="contact__card-val">
                    faizfarooqui855@gmail.com
                  </a>
                </div>
                <button 
                  className="contact__copy-btn" 
                  onClick={copyEmail}
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                </button>
              </div>


              {/* Location Card */}
              <div className="contact__card glass glass-hover">
                <div className="contact__card-icon contact__card-icon--violet">
                  <MapPin size={22} />
                </div>
                <div className="contact__card-details">
                  <span className="contact__card-label">Location</span>
                  <span className="contact__card-val">
                    Mumbai, Maharashtra, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="contact__socials-grid">
              <a 
                href="https://www.linkedin.com/in/faizfarooqui" 
                className="contact__social-pill glass" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div className="contact__social-icon contact__social-icon--blue">
                  <LinkedinIcon />
                </div>
                <div className="contact__social-text">
                  <span className="contact__social-title">LinkedIn</span>
                  <span className="contact__social-sub">/in/faizfarooqui</span>
                </div>
                <ExternalLink size={14} className="contact__social-arrow" />
              </a>

              <a 
                href="https://github.com/Faizlabs" 
                className="contact__social-pill glass" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div className="contact__social-icon contact__social-icon--purple">
                  <GithubIcon />
                </div>
                <div className="contact__social-text">
                  <span className="contact__social-title">GitHub</span>
                  <span className="contact__social-sub">@Faizlabs</span>
                </div>
                <ExternalLink size={14} className="contact__social-arrow" />
              </a>

              <a 
                href="https://tryhackme.com/p/emptyowl" 
                className="contact__social-pill glass" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div className="contact__social-icon contact__social-icon--magenta">
                  <TryHackMeIcon />
                </div>
                <div className="contact__social-text">
                  <span className="contact__social-title">TryHackMe</span>
                  <span className="contact__social-sub">@emptyowl</span>
                </div>
                <ExternalLink size={14} className="contact__social-arrow" />
              </a>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
