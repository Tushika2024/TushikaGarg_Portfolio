import { useEffect, useState, forwardRef, type ReactNode, type MutableRefObject } from 'react';
import {
  profile, skills, experience, projects, honours,
  education, extras, targetRoles,
} from '../data/content';
import type { Openable, CaseStudy } from '../types';
import { RocCurve, UmapScatter, SleepWave, Heatmap, EtlBar } from '../components/viz/Viz';
import ProjectLinks from '../components/ProjectLinks';

/* Photo, falling back to initials rather than a broken image. */
function Portrait() {
  const [broken, setBroken] = useState(false);
  if (broken) return <div className="portrait fallback" aria-hidden="true">TG</div>;
  return (
    <img className="portrait" src={profile.photo} alt={profile.name}
         width={104} height={104} loading="eager" onError={() => setBroken(true)} />
  );
}

interface SlabProps {
  readonly active: boolean;
  readonly reduced: boolean;
  readonly children: ReactNode;
}

function Slab({ active, reduced, children }: SlabProps) {
  const shown = active || reduced;
  return (
    <div className={`slab${shown ? ' on' : ''}`} aria-hidden={!shown}>
      {children}
    </div>
  );
}

function Bezel({ file, dots = 1 }: { readonly file: string; readonly dots?: number }) {
  return (
    <div className="bezel">
      {Array.from({ length: dots }, (_, i) => <span className="dot" key={i} />)}
      {file}
    </div>
  );
}

interface ScreenProps {
  readonly stage: number;
  readonly reduced: boolean;
  readonly file: string;
}

/* ══════════ LEFT — honours, skills, per-project stacks, LeetCode ══════════ */
export const LeftScreen = forwardRef<HTMLDivElement, ScreenProps>(
  ({ stage, reduced, file }, ref) => {
    const is = (i: number): boolean => stage === i;

    return (
      <div ref={ref} className="screen side" id="left">
      <Bezel file={file} />
      <div className="body">
        <Slab active={is(1)} reduced={reduced}>
          <div className="eyebrow">honours</div>
          {honours.map((h) => (
            <div className="honour" key={h.title}>
              <div className="honour-top">
                <span className="honour-title">{h.title}</span>
                <span className="honour-year">{h.year}</span>
              </div>
              <p>{h.detail}</p>
            </div>
          ))}
        </Slab>

        <Slab active={is(2)} reduced={reduced}>
          <div className="eyebrow">technical skills</div>
          {skills.map(([name, tag]) => (
            <div className="skillrow" key={name}><span>{name}</span><em>{tag}</em></div>
          ))}
        </Slab>

        {projects.map((p, i) => (
          <Slab key={p.key} active={is(i + 3)} reduced={reduced}>
            <div className="eyebrow">stack — {p.title.toLowerCase()}</div>
            {p.stack.map(([name, tag]) => (
              <div className="skillrow" key={name}><span>{name}</span><em>{tag}</em></div>
            ))}
            <div className="kv" style={{ marginTop: 20 }}>
              <b>{p.stackNote[0]}</b><br />{p.stackNote[1]}
            </div>
          </Slab>
        ))}

        <Slab active={is(projects.length + 3)} reduced={reduced}>
          <div className="eyebrow">problems solved</div>
          <div className="bignum">300+</div>
          <div className="submeta">DSA · LeetCode</div>
          <Heatmap />
          <a className="plink" style={{ marginTop: 14 }} href={profile.leetcode}
             target="_blank" rel="noreferrer">View LeetCode profile</a>
        </Slab>
      </div>
    </div>
  );
});

interface RightProps extends ScreenProps {
  readonly progress: MutableRefObject<number>;
  readonly onOpen: (item: Openable) => void;
}

/* ══════════ RIGHT — extras, project index, instruments, target roles ══════════ */
export const RightScreen = forwardRef<HTMLDivElement, RightProps>(
  ({ stage, reduced, file, progress, onOpen }, ref) => {
    const is = (i: number): boolean => stage === i;

    return (
      <div ref={ref} className="screen side" id="right">
      <Bezel file={file} />
      <div className="body">
        <Slab active={is(1)} reduced={reduced}>
          <div className="eyebrow">beyond code</div>
          {extras.map(([t, d]) => (
            <div className="kv" key={t}><b>{t}</b><br />{d}</div>
          ))}
        </Slab>

        <Slab active={is(2)} reduced={reduced}>
          <div className="eyebrow">projects — 03</div>
          {projects.map((p) => (
            <button className="projrow" key={p.key} onClick={() => onOpen(p)}>
              <b>{p.n}</b>
              <span><span className="pn">{p.title}</span><small>{p.blurb}</small></span>
              <span className="mv">{p.metric}</span>
            </button>
          ))}
          <div className="kv" style={{ marginTop: 14 }}>
            each opens in full<br />on the main screen
          </div>
        </Slab>

        <Slab active={is(3)} reduced={reduced}><RocCurve progress={progress} enabled={!reduced} /></Slab>
        <Slab active={is(4)} reduced={reduced}><UmapScatter progress={progress} enabled={!reduced} /></Slab>
        <Slab active={is(5)} reduced={reduced}><SleepWave progress={progress} enabled={!reduced} /></Slab>

        <Slab active={is(projects.length + 3)} reduced={reduced}>
          <div className="eyebrow">target roles</div>
          {targetRoles.map((r) => (
            <div className="want" key={r.n}>
              <u>{r.n}</u>
              <span><b>{r.title}</b><span>{r.note}</span></span>
            </div>
          ))}
          <div className="kv" style={{ marginTop: 12 }}>
            Internships and new grad<br />Patiala, India · open to remote
          </div>
        </Slab>
      </div>
    </div>
  );
});

interface CenterProps extends ScreenProps {
  readonly progress: MutableRefObject<number>;
  readonly onOpen: (item: Openable) => void;
  readonly kanha: CaseStudy;
}

/* ══════════ CENTER — hero, background, internship, projects, contact ══════════ */
export function CenterScreen({ stage, reduced, file, progress, onOpen, kanha }: CenterProps) {
  const is = (i: number): boolean => stage === i;
  const typedHtml = useTypewriter(!reduced);

  return (
    <div className="screen" id="main">
      <Bezel file={file} dots={3} />
      <div className="body">
        <Slab active={is(0)} reduced={reduced}>
          <div className="herorow">
            <div className="heroleft">
              <div className="repl" id="typed" aria-hidden="true" dangerouslySetInnerHTML={{ __html: typedHtml }} />
              <h1 className="name">{profile.name}</h1>
              <p className="roleline">
                Software Engineer <em>|</em> Data &amp; ML
              </p>
              <p className="rolesub">{profile.roleSub}</p>
              <p className="role">
                {profile.headline[0]}<br />{profile.headline[1]}
              </p>
            </div>
            <div className="heroportrait"><Portrait /></div>
          </div>
        </Slab>

        <Slab active={is(1)} reduced={reduced}>
          <div className="eyebrow">background</div>
          <div className="ptitle sm">{education.school}</div>
          <div className="pmeta">{education.degree} · {education.period}</div>
          <div className="bgrow">
            {education.stats.map(([v, l]) => (
              <div className="bgstat" key={l}><b>{v}</b><span>{l}</span></div>
            ))}
          </div>
          <p className="bgnote">{education.note}</p>
          {education.prior && <div className="kv">{education.prior}</div>}
        </Slab>

        <Slab active={is(2)} reduced={reduced}>
          <div className="eyebrow">experience · {experience.period.toLowerCase()}</div>
          <div className="ptitle sm">{experience.role}</div>
          <div className="pmeta">{experience.org}</div>
          <div className="pipeline">
            {experience.pipeline.map((r) => (
              <div key={r.cmd}>
                <span style={{ color: `var(--${r.colour})` }}>{r.cmd}</span>
                {'  '}{r.arg}{'  '}<span className="dim">{r.out}</span>
              </div>
            ))}
          </div>
          <EtlBar progress={progress} enabled={!reduced} />
          <div className="rowactions">
            <button className="morebtn" onClick={() => onOpen(kanha)}>Read the full case →</button>
            <ProjectLinks links={kanha.links} />
          </div>
        </Slab>

        {projects.map((p, i) => (
          <Slab key={p.key} active={is(i + 3)} reduced={reduced}>
            <div className="eyebrow">project {p.n} / 03</div>
            <div className="ptitle">{p.title}</div>
            <div className="pmeta">{p.period}</div>
            <ul className="plist">
              {p.bullets.map((b) => <li key={b.slice(0, 30)}>{b}</li>)}
            </ul>
            <div className="rowactions">
              <button className="morebtn" onClick={() => onOpen(p)}>Full case study →</button>
              <ProjectLinks links={p.links} />
            </div>
          </Slab>
        ))}

        <Slab active={is(projects.length + 3)} reduced={reduced}>
          <div className="eyebrow">get in touch</div>
          <div className="bigline">Build the model.<br /><span>Then explain it.</span></div>
          <div className="contactlines">
            {profile.email}<br />{profile.phone}<br />
            github.com/Tushika2024<br />linkedin.com/in/tushika-garg
          </div>
        </Slab>
      </div>
    </div>
  );
}

/** Types the import line character-by-character, matching the HTML typewriter logic. */
function useTypewriter(enabled: boolean): string {
  const bootHtml = '<span class="k">from</span> tushika <span class="k">import</span> <span class="s">portfolio</span><br><span class="k">&gt;&gt;&gt;</span> portfolio.render()';
  const [html, setHtml] = useState(enabled ? '' : bootHtml);

  useEffect(() => {
    if (!enabled) return;
    let step = 0;
    const iv = setInterval(() => {
      step++;
      if (step >= 18) {
        clearInterval(iv);
        setHtml(bootHtml);
      } else {
        setHtml(bootHtml.slice(0, Math.round(bootHtml.length * step / 18)));
      }
    }, 50);
    return () => clearInterval(iv);
  }, [enabled]);

  return html;
}
