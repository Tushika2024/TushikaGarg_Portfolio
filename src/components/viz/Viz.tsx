import { useCallback, useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { seg, ease, useFrame } from '../../hooks/useScrollStage';

interface VizProps {
  readonly progress: MutableRefObject<number>;
  readonly enabled: boolean;
}

/* ── ROC curve drawing itself, AUC counting 0.50 → 0.82 ─────────────── */
export function RocCurve({ progress, enabled }: VizProps) {
  const path = useRef<SVGPathElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const length = useRef(0);

  useEffect(() => {
    const el = path.current;
    if (!el) return;
    length.current = el.getTotalLength();
    el.style.strokeDasharray = String(length.current);
    el.style.strokeDashoffset = enabled ? String(length.current) : '0';
  }, [enabled]);

  useFrame(
    useCallback((p: number) => {
      const t = ease(seg(p, 0.41, 0.51));
      if (path.current) path.current.style.strokeDashoffset = String(length.current * (1 - t));
      if (label.current) label.current.textContent = (0.5 + 0.32 * t).toFixed(2);
    }, []),
    progress,
    enabled
  );

  return (
    <>
      <div className="eyebrow">roc curve — holdout</div>
      <svg viewBox="0 0 200 128" style={{ width: '100%', height: 120 }} role="img"
           aria-label="ROC curve reaching an area under curve of 0.82">
        <line x1="16" y1="112" x2="188" y2="112" stroke="var(--line-2)" strokeWidth="1" />
        <line x1="16" y1="112" x2="16" y2="8" stroke="var(--line-2)" strokeWidth="1" />
        <line x1="16" y1="112" x2="188" y2="8" stroke="var(--line-2)" strokeWidth="1" strokeDasharray="3 3" />
        <path ref={path} d="M16,112 C46,58 62,34 92,24 C122,15 150,11 188,8"
              fill="none" stroke="var(--blue)" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <div className="auc">
        <span ref={label}>{enabled ? '0.50' : '0.82'}</span>
        <small>ROC-AUC</small>
      </div>
    </>
  );
}

/* ── UMAP scatter: 268 mislabels flare red as you scroll ─────────────── */
interface Point { readonly cx: number; readonly cy: number; readonly bad: boolean }

export function UmapScatter({ progress, enabled }: VizProps) {
  const wrap = useRef<SVGSVGElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  const points = useMemo<readonly Point[]>(() => {
    const centres: readonly (readonly [number, number])[] = [[55, 45], [135, 50], [80, 110], [150, 105]];
    const out: Point[] = [];
    for (let i = 0; i < 170; i++) {
      const c = centres[i % 4];
      if (!c) continue;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.6) * 26;
      out.push({
        cx: c[0] + Math.cos(angle) * r,
        cy: c[1] + Math.sin(angle) * r * 0.8,
        bad: r > 19 && Math.random() > 0.45,
      });
    }
    return out;
  }, []);

  const badCount = useMemo(() => points.filter((p) => p.bad).length, [points]);

  useFrame(
    useCallback((p: number) => {
      const t = ease(seg(p, 0.54, 0.64));
      const nodes = wrap.current?.querySelectorAll<SVGCircleElement>('circle[data-bad="1"]');
      nodes?.forEach((el, k) => {
        el.setAttribute('opacity', t > (k / badCount) * 0.9 ? '0.9' : '0');
      });
      if (count.current) count.current.textContent = String(Math.round(268 * t));
    }, [badCount]),
    progress,
    enabled
  );

  return (
    <>
      <div className="eyebrow">umap · 14k corpus</div>
      <svg ref={wrap} viewBox="0 0 200 150" style={{ width: '100%', height: 150 }} role="img"
           aria-label="UMAP scatter plot with 268 mislabelled samples highlighted">
        {points.map((pt, i) => (
          <circle key={i} cx={pt.cx.toFixed(1)} cy={pt.cy.toFixed(1)} r="2"
                  data-bad={pt.bad ? '1' : '0'}
                  fill={pt.bad ? 'var(--red)' : 'var(--blue)'}
                  opacity={pt.bad ? (enabled ? 0 : 0.9) : 0.55} />
        ))}
      </svg>
      <div className="vizcap">
        <span style={{ color: 'var(--red)' }} aria-hidden="true">■</span>{' '}
        <span ref={count}>{enabled ? 0 : 268}</span> flagged mislabels · 82% precision
      </div>
    </>
  );
}

/* ── Wearable sleep signal ───────────────────────────────────────────── */
export function SleepWave({ progress, enabled }: VizProps) {
  const path = useRef<SVGPathElement>(null);
  const length = useRef(0);

  useEffect(() => {
    const el = path.current;
    if (!el) return;
    length.current = el.getTotalLength();
    el.style.strokeDasharray = String(length.current);
    el.style.strokeDashoffset = enabled ? String(length.current) : '0';
  }, [enabled]);

  useFrame(
    useCallback((p: number) => {
      if (path.current) {
        path.current.style.strokeDashoffset = String(length.current * (1 - ease(seg(p, 0.67, 0.77))));
      }
    }, []),
    progress,
    enabled
  );

  return (
    <>
      <div className="eyebrow">wearable sleep signal</div>
      <svg viewBox="0 0 200 120" style={{ width: '100%', height: 120 }} role="img"
           aria-label="Wearable sleep sensor waveform">
        <line x1="0" y1="60" x2="200" y2="60" stroke="var(--line-2)" strokeWidth="1" strokeDasharray="2 4" />
        <path ref={path} fill="none" stroke="var(--green)" strokeWidth="1.8"
              d="M0,60 Q12,24 24,60 T48,60 Q60,14 72,60 T96,60 Q108,32 120,60 T144,60 Q156,20 168,60 T192,60" />
      </svg>
      <div className="kv"><b>ROC-AUC 0.75 · F1 0.84</b><br />raw sensor → decision-ready features</div>
    </>
  );
}

/* ── LeetCode-style contribution heatmap ─────────────────────────────── */
export function Heatmap() {
  const cells = useMemo<readonly string[]>(
    () =>
      Array.from({ length: 100 }, () => {
        const r = Math.random();
        return r > 0.72 ? 'var(--heat-3)'
             : r > 0.45 ? 'var(--heat-2)'
             : r > 0.25 ? 'var(--heat-1)'
             : 'var(--heat-0)';
      }),
    []
  );
  return (
    <div className="heat" aria-hidden="true">
      {cells.map((bg, i) => <i key={i} style={{ background: bg }} />)}
    </div>
  );
}

/* ── ETL progress bar for the internship stage ───────────────────────── */
export function EtlBar({ progress, enabled }: VizProps) {
  const bar = useRef<HTMLDivElement>(null);

  useFrame(
    useCallback((p: number) => {
      if (bar.current) bar.current.style.width = `${100 * ease(seg(p, 0.28, 0.38))}%`;
    }, []),
    progress,
    enabled
  );

  return (
    <div className="etltrack">
      <div className="etlfill" ref={bar} style={{ width: enabled ? 0 : '100%' }} />
    </div>
  );
}
