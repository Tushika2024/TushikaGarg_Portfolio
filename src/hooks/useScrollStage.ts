import { useEffect, useRef, useState, type RefObject, type MutableRefObject } from 'react';
import type { Stage } from '../types';

export const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
export const seg = (p: number, a: number, b: number): number => clamp((p - a) / (b - a), 0, 1);
export const ease = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

/** True when the visitor asked for less motion, or the viewport can't hold a 3D rig. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 1060)
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const check = (): void => setReduced(mq.matches || window.innerWidth < 1060);
    mq.addEventListener('change', check);
    window.addEventListener('resize', check, { passive: true });
    return () => {
      mq.removeEventListener('change', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  return reduced;
}

export interface ScrollState {
  /** Live 0-to-1 progress, in a ref so frames don't re-render the tree. */
  readonly progress: MutableRefObject<number>;
  /** Index into STAGES - the only piece that is state (about 7 renders total). */
  readonly stage: number;
}

export function useScrollProgress(
  trackRef: RefObject<HTMLElement>,
  stages: readonly Stage[],
  enabled: boolean
): ScrollState {
  const progress = useRef<number>(0);
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;

    const loop = (): void => {
      const el = trackRef.current;
      if (el) {
        const span = el.offsetHeight - window.innerHeight;
        const p = clamp(-el.getBoundingClientRect().top / (span || 1), 0, 1);
        progress.current = p;

        let idx = 0;
        for (let i = 0; i < stages.length; i++) {
          const s = stages[i];
          if (s && p >= s.start) idx = i;
        }
        setStage((prev) => (prev === idx ? prev : idx));
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [trackRef, stages, enabled]);

  return { progress, stage };
}

/** Runs a callback every frame with current progress - for imperative style writes. */
export function useFrame(
  fn: (p: number) => void,
  progress: MutableRefObject<number>,
  enabled: boolean
): void {
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const loop = (): void => {
      fn(progress.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fn, progress, enabled]);
}
