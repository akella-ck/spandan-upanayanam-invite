export function BananaLeaves({ className = "", mirror = false }) {
  const transform = mirror ? "scale(-1 1) translate(-520 0)" : undefined;

  return (
    <svg className={className} viewBox="0 0 520 720" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="leafMain" x1="67" x2="382" y1="0" y2="681" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34452F" />
          <stop offset="0.52" stopColor="#667149" />
          <stop offset="1" stopColor="#9B9663" />
        </linearGradient>
        <linearGradient id="leafSoft" x1="17" x2="319" y1="44" y2="573" gradientUnits="userSpaceOnUse">
          <stop stopColor="#52613F" />
          <stop offset="1" stopColor="#B0A16F" />
        </linearGradient>
      </defs>
      <g transform={transform} opacity="0.9">
        <path
          d="M-42 17C83 24 213 88 348 208 221 213 101 171-12 80c-14-12-24-33-30-63Z"
          fill="url(#leafMain)"
          opacity="0.75"
        />
        <path d="M-19 49c104 31 206 82 306 151" stroke="#D5C489" strokeOpacity="0.42" strokeWidth="3" />
        <path
          d="M-54 177C72 151 207 179 352 260 226 298 98 281-32 210c-16-9-23-20-22-33Z"
          fill="url(#leafSoft)"
          opacity="0.66"
        />
        <path d="M-22 193c120 8 232 31 336 69" stroke="#E0CF98" strokeOpacity="0.35" strokeWidth="3" />
        <path
          d="M-47 361c105-48 234-57 386-26C240 412 119 433-24 397c-19-5-27-17-23-36Z"
          fill="url(#leafMain)"
          opacity="0.58"
        />
        <path d="M-11 376c116-27 222-38 318-33" stroke="#E1CF97" strokeOpacity="0.3" strokeWidth="3" />
        <path
          d="M-39 531c92-65 211-95 358-89-85 91-194 134-327 129-23-1-33-14-31-40Z"
          fill="url(#leafSoft)"
          opacity="0.42"
        />
        <path d="M1 543c101-48 194-78 280-91" stroke="#E7D6A1" strokeOpacity="0.25" strokeWidth="3" />
      </g>
    </svg>
  );
}
