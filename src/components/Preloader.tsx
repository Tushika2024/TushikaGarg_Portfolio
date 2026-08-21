import { useCallback, useEffect, useState } from 'react';
import Logo from './Logo';

const KEY = 'tg-seen';
const DURATION = 1350;

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

function markSeen(): void {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* preloader will simply show again */
  }
}

/**
 * Draws the monogram once per session, then fades out.
 *
 * It is an overlay over an already-rendered page, never a gate — a slow
 * connection or a JS error can't leave a visitor staring at a blank screen.
 * Skips on click or keypress, and doesn't run under reduced motion.
 */
export function Preloader() {
  const [done, setDone] = useState<boolean>(
    () =>
      alreadySeen() ||
      (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );

  const finish = useCallback(() => setDone(true), []);

  useEffect(() => {
    if (done) return;
    markSeen();
    const t = window.setTimeout(finish, DURATION);
    const onKey = (): void => finish();
    window.addEventListener('keydown', onKey, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [done, finish]);

  return (
    <div id="preload" className={done ? 'done' : ''} onClick={finish} aria-hidden="true">
      <Logo size={96} animated />
      <div className="pl-skip">click to skip</div>
    </div>
  );
}

export default Preloader;
