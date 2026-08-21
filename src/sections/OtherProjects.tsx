import { otherProjects } from '../data/content';
import type { Openable } from '../types';

interface Props {
  readonly onOpen: (item: Openable) => void;
}

export function OtherProjects({ onOpen }: Props) {
  if (otherProjects.length === 0) return null;

  return (
    <section id="other-projects" aria-labelledby="other-projects-head" style={{ marginBottom: '60px' }}>
      <h2 className="sechead" id="other-projects-head">
        Other projects
      </h2>

      <div className="certgrid">
        {otherProjects.map((p) => (
          <article className="certcard" key={p.key}>
            <div className="certtop">
              <span className="certmark" aria-hidden="true">{p.n}</span>
              <div className="certwho">
                <h3>{p.title}</h3>
                <div className="certissuer">{p.blurb}</div>
              </div>
            </div>
            <div className="certmeta">
              <span>{p.period}</span>
            </div>
            <div className="certskills" style={{ marginTop: '4px' }}>
              {p.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            <div className="plinks" style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button className="plink" onClick={() => onOpen(p)}>
                Full case study →
              </button>
              {p.links.map((l) => (
                <a className="plink" href={l.url} target="_blank" rel="noreferrer noopener" key={l.url}>
                  {l.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OtherProjects;
