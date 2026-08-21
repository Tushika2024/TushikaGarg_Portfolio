import { profile, availability } from '../data/content';

/** Closing block: availability badge, CTA, contact cards, link columns, bottom bar. */
export function Contact() {
  const year = new Date().getFullYear();
  const tel = profile.phone.replace(/\s/g, '');

  return (
    <section className="contact" id="contact" aria-labelledby="contact-head">
      <div className="wrap">
        <div className="contact-top">
          <span className="foot-badge">
            <span className="pulse" aria-hidden="true" />
            Available for internships and new grad roles
          </span>

          <h2 className="contact-head" id="contact-head">
            Let&rsquo;s build<br /><em>something together.</em>
          </h2>

          <p className="contact-blurb">
            Open to software engineering, backend, data, and machine learning positions.
            Email is fastest- tell me what you&rsquo;re working on and I&rsquo;ll reply to everything.
          </p>

          <a className="contact-mail" href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>

        <div className="contact-cards">
          <a className="ccard" href={`mailto:${profile.email}`}>
            <span className="lab">Email</span><b>{profile.email}</b><span>Usually within a day</span>
          </a>
          <a className="ccard" href={`tel:${tel}`}>
            <span className="lab">Phone</span><b>{profile.phone}</b><span>India · IST</span>
          </a>
          <a className="ccard" href={profile.linkedin} target="_blank" rel="noreferrer">
            <span className="lab">LinkedIn</span><b>tushika-garg-84a488318</b><span>Connect or message</span>
          </a>
          <a className="ccard" href={profile.github} target="_blank" rel="noreferrer">
            <span className="lab">GitHub</span><b>Tushika2024</b><span>Code and contributions</span>
          </a>
        </div>

        <div className="foot-cols">
          <div className="foot-col">
            <h3>Elsewhere</h3>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
          </div>
          <div className="foot-col">
            <h3>On this page</h3>
            <a href="#other-projects">Other projects</a>
            <a href="#faq">FAQ</a>
            <a href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
          </div>
          <div className="foot-col">
            <h3>Status</h3>
            {availability.map(([c, t]) => (
              <span className="foot-status" key={t}>
                <i style={{ background: `var(--${c})` }} aria-hidden="true" />{t}
              </span>
            ))}
          </div>
        </div>

        <div className="foot-bar">
          <span>© {year} {profile.name}</span>
          <span>Built with {'\u2764\uFE0F'}. Hare Krishna.</span>
        </div>
      </div>
    </section>
  );
}

export default Contact;
