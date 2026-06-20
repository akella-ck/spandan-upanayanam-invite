export function FlowerSprig({ className = "", mirror = false }) {
  const transform = mirror ? "scale(-1 1) translate(-260 0)" : undefined;
  const blossoms = [
    [180, 54],
    [205, 94],
    [168, 122],
    [222, 156],
    [185, 194],
  ];

  return (
    <svg className={className} viewBox="0 0 260 280" fill="none" aria-hidden="true">
      <g transform={transform}>
        <path
          d="M42 256C83 199 119 151 164 38"
          stroke="#777D50"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M86 198c31-5 55-18 72-39M113 159c-28-4-51-15-69-34M140 101c-20-7-34-20-43-38" stroke="#777D50" strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" />
        {blossoms.map(([cx, cy]) => (
          <g key={`${cx}-${cy}`} opacity="0.82">
            <circle cx={cx} cy={cy} r="9" fill="#F4EAD0" stroke="#CDBB7D" strokeWidth="1" />
            <circle cx={cx - 8} cy={cy + 3} r="7" fill="#F8F1DD" stroke="#D7C68A" strokeWidth="0.8" />
            <circle cx={cx + 7} cy={cy + 5} r="7" fill="#EFE2BE" stroke="#CDBB7D" strokeWidth="0.8" />
            <circle cx={cx} cy={cy + 1} r="3" fill="#B7984E" opacity="0.45" />
          </g>
        ))}
      </g>
    </svg>
  );
}
