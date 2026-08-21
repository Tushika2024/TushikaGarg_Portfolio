interface Props {
  readonly size?: number;
  /** Adds the `pl-*` classes that drive the preloader draw-on animation. */
  readonly animated?: boolean;
}

/**
 * A "T" whose crossbar doubles as a plot axis, with three points scattered
 * around a fitted line. Monogram at 34px, regression at a second glance.
 */
export function Logo({ size = 34, animated = false }: Props) {
  const p = animated ? 'pl-' : 'logo-';
  return (
    <span className="logo" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 40 40" width={size} height={size}>
        <rect className={`${p}plate`} x="0.75" y="0.75" width="38.5" height="38.5" rx="10" />
        <line className={`${p}bar`} x1="9" y1="13.5" x2="31" y2="13.5" />
        <line className={`${p}stem`} x1="20" y1="13.5" x2="20" y2="31" />
        <line className={`${p}fit`} x1="10.5" y1="29" x2="29.5" y2="19.5" />
        <circle className={`${p}pt`} cx="13" cy="27" r="1.7" />
        <circle className={`${p}pt`} cx="26.5" cy="22.5" r="1.7" />
        <circle className={`${p}pt accent`} cx="29.5" cy="19" r="1.7" />
      </svg>
    </span>
  );
}

export default Logo;
