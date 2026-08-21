import { certifications } from '../data/content';

/** Hides itself when the array is empty — an absent section beats a padded one. */
export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" aria-labelledby="certs-head">
      <h2 className="sechead mt" id="certs-head">Licenses &amp; certifications</h2>

      <div className="certgrid">
        {certifications.map((c) => (
          <article className="certcard" key={c.name}>
            <div className="certtop">
              <span className="certmark" aria-hidden="true">{c.mark}</span>
              <div className="certwho">
                <h3>{c.name}</h3>
                <div className="certissuer">{c.issuer}</div>
              </div>
            </div>
            <div className="certmeta">
              <span>{c.date}</span>
              {c.credentialId && <span className="certid">ID {c.credentialId}</span>}
            </div>
            <div className="certskills">
              {c.skills.map((s) => <span className="tag" key={s}>{s}</span>)}
            </div>
            {c.url && (
              <a className="plink" href={c.url} target="_blank" rel="noreferrer noopener">
                {c.url.startsWith('/') || c.url.includes('certificate') ? 'View certificate' : 'Verify credential'}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
