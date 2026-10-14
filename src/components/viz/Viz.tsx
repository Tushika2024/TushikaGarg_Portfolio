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

/* ── CITY-AI: a vehicle's path lights up camera by camera ────────────── */
const CAMS: readonly (readonly [number, number])[] = [
  [18, 30], [52, 18], [90, 34], [128, 20], [170, 30],
  [30, 72], [70, 64], [108, 80], [150, 70], [182, 88],
  [20, 118], [60, 108], [100, 126], [140, 116], [178, 128],
];
/** Indices into CAMS, in the order the tracked vehicle passes them. */
const ROUTE: readonly number[] = [10, 5, 6, 2, 7, 8, 13, 14];

export function TrajectoryTrace({ progress, enabled }: VizProps) {
  const path = useRef<SVGPathElement>(null);
  const wrap = useRef<SVGSVGElement>(null);
  const acc = useRef<HTMLSpanElement>(null);
  const length = useRef(0);

  const d = useMemo(
    () => ROUTE.map((i, k) => {
      const c = CAMS[i];
      return c ? `${k === 0 ? 'M' : 'L'}${c[0]},${c[1]}` : '';
    }).join(' '),
    []
  );

  useEffect(() => {
    const el = path.current;
    if (!el) return;
    length.current = el.getTotalLength();
    el.style.strokeDasharray = String(length.current);
    el.style.strokeDashoffset = enabled ? String(length.current) : '0';
  }, [enabled]);

  useFrame(
    useCallback((p: number) => {
      const t = ease(seg(p, 0.54, 0.64));
      if (path.current) path.current.style.strokeDashoffset = String(length.current * (1 - t));
      wrap.current?.querySelectorAll<SVGCircleElement>('circle[data-hop]').forEach((el) => {
        const k = Number(el.dataset.hop);
        el.setAttribute('fill', t >= k / (ROUTE.length - 1) - 0.001 ? 'var(--amber)' : 'var(--line-2)');
      });
      if (acc.current) acc.current.textContent = (69.1 + 21.3 * t).toFixed(1);
    }, []),
    progress,
    enabled
  );

  return (
    <>
      <div className="eyebrow">trajectory · 30-camera grid</div>
      <svg ref={wrap} viewBox="0 0 200 145" style={{ width: '100%', height: 145 }} role="img"
           aria-label="A vehicle's path traced across city cameras">
        <path ref={path} d={d} fill="none" stroke="var(--amber)" strokeWidth="1.8"
              strokeLinejoin="round" strokeLinecap="round" />
        {CAMS.map(([cx, cy], i) => {
          const hop = ROUTE.indexOf(i);
          return hop >= 0
            ? <circle key={i} cx={cx} cy={cy} r="4" data-hop={hop}
                      fill={enabled ? 'var(--line-2)' : 'var(--amber)'} />
            : <circle key={i} cx={cx} cy={cy} r="2.6" fill="var(--blue)" opacity="0.45" />;
        })}
      </svg>
      <div className="vizcap">
        <span style={{ color: 'var(--amber)' }} aria-hidden="true">■</span>{' '}
        plate accuracy <span ref={acc}>{enabled ? '69.1' : '90.4'}</span>% · 8-frame voting
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
