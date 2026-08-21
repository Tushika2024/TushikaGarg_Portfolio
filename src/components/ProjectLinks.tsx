import type { ProjectLink } from '../types';



interface Props {
  readonly links: readonly ProjectLink[];
  readonly size?: 'sm' | 'md';
}

export function ProjectLinks({ links, size = 'sm' }: Props) {
  if (links.length === 0) return null;

  return (
    <span className={`plinks ${size}`}>
      {links.map((l) => {
        if (l.url === '#') {
          return (
            <span key={l.kind} className="plink disabled" title="Not public yet">
              {l.label}
            </span>
          );
        }
        return (
          <a key={l.kind} className="plink" href={l.url} target="_blank"
             rel="noreferrer noopener" onClick={(e) => e.stopPropagation()}>
            {l.label}
          </a>
        );
      })}
    </span>
  );
}

export default ProjectLinks;
