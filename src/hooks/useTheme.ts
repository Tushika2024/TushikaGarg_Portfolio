import { useCallback, useEffect, useState } from 'react';
import type { ThemeName } from '../types';

const KEY = 'tg-theme';

function read(): ThemeName | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null; // private mode or file://
  }
}

function write(v: ThemeName): void {
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* theme simply won't persist */
  }
}

/** Light by default - a portfolio opened at 11am in an office shouldn't be a black screen. */
function initial(): ThemeName {
  if (typeof window === 'undefined') return 'light';
  return read() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

export interface ThemeApi {
  readonly theme: ThemeName;
  readonly toggle: () => void;
}

export function useTheme(): ThemeApi {
  const [theme, setTheme] = useState<ThemeName>(initial);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    write(theme);
  }, [theme]);

  // Follow the OS only until the visitor expresses a preference.
  useEffect(() => {
    if (read()) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent): void => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return { theme, toggle };
}
