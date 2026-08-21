import { useEffect, useRef } from 'react';
import { profile } from '../data/content';
import type { Openable, ThemeName } from '../types';
import Logo from './Logo';
import ProjectLinks from './ProjectLinks';

export function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="glow g1" /><div className="glow g2" /><div className="glow g3" />
      <div className="grid" />
    </div>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
        <line key={d} x1="12" y1="2.4" x2="12" y2="4.6" transform={`rotate(${d} 12 12)`} />
      ))}
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z" />
    </svg>
  );
}

interface TopBarProps {
  readonly theme: ThemeName;
  readonly onToggleTheme: () => void;
  readonly onOpenResume: () => void;
}

export function TopBar({ theme, onToggleTheme, onOpenResume }: TopBarProps) {
  return (
    <header className="topbar">
      <button className="who" id="homeBtn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top">
        <Logo />
        <span>
          <h1>{profile.name}</h1>
          <p>{profile.tagline}</p>
        </span>
      </button>

      <nav className="links" aria-label="Primary">
        <a className="hide-sm" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a className="hide-sm" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="resume" href="#" onClick={(e) => { e.preventDefault(); onOpenResume(); }}>Resume ↓</a>
        <a className="hire" href={`mailto:${profile.email}`}>Hire me</a>
        <button className="themebtn" onClick={onToggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </nav>
    </header>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  readonly item: Openable | null;
  readonly onClose: () => void;
}

/** Detail dialog with a real focus trap and restore-on-close. */
export function DetailModal({ item, onClose }: ModalProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!item) return;
    restoreTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const nodes = sheetRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      restoreTo.current?.focus();
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="modal on" role="presentation"
         onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet" ref={sheetRef} role="dialog" aria-modal="true"
           aria-labelledby="modal-title">
        <div className="bezel">
          <span className="dot" /><span className="dot" /><span className="dot" />
          {('file' in item ? item.file : '') || 'project_case_study.md'}
          <button className="closebtn" ref={closeRef} onClick={onClose} aria-label="Close">
            ESC
          </button>
        </div>
        <div className="sheet-body">
          <h2 id="modal-title">{item.title}</h2>
          <div className="tags">
            {item.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
          </div>
          {'stats' in item && (item as any).stats && (item as any).stats.length > 0 && (
            <div className="stats">
              {((item as any).stats as readonly (readonly [string, string])[]).map(([v, l]) => (
                <div className="stat" key={l}><b>{v}</b><span>{l}</span></div>
              ))}
            </div>
          )}
          <ul className="plist">
            {(('detail' in item ? item.detail : (item as any).bullets) as readonly string[]).map((p) => (
              <li key={p.slice(0, 40)}>{p}</li>
            ))}
          </ul>
          <ProjectLinks links={item.links} size="md" />
        </div>
      </div>
    </div>
  );
}

interface ResumeModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly resumeUrl: string;
}

export function ResumeModal({ open, onClose, resumeUrl }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal on" role="presentation" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet" style={{ width: 'min(900px, 95vw)', height: '85vh', display: 'flex', flexDirection: 'column' }}>
        <div className="bezel">
          <span className="dot" /><span className="dot" /><span className="dot" />
          Tushika-Garg-Resume.pdf
          <button className="closebtn" onClick={onClose} aria-label="Close">
            ESC
          </button>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', background: 'var(--panel-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontFamily: 'var(--disp)', fontSize: '18px', fontWeight: 500 }}>Resume Viewer</h3>
            <a className="plink" href={resumeUrl} download="Tushika-Garg-Resume.pdf" style={{ textDecoration: 'none' }}>
              Download PDF ↓
            </a>
          </div>
          <iframe
            src={resumeUrl}
            title="Tushika Garg Resume"
            style={{ width: '100%', flex: 1, border: '1px solid var(--line-2)', borderRadius: '8px', background: '#fff' }}
          />
        </div>
      </div>
    </div>
  );
}
