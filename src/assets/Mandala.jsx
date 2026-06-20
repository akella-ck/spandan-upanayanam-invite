export function Mandala({ className = "" }) {
  const petals = Array.from({ length: 16 }, (_, index) => index * 22.5);

  return (
    <svg className={className} viewBox="0 0 420 420" fill="none" aria-hidden="true">
      <circle cx="210" cy="210" r="172" stroke="currentColor" strokeWidth="1" />
      <circle cx="210" cy="210" r="112" stroke="currentColor" strokeWidth="1" />
      <circle cx="210" cy="210" r="52" stroke="currentColor" strokeWidth="1.2" />
      {petals.map((rotation) => (
        <path
          key={rotation}
          d="M210 74c19 34 19 67 0 102-19-35-19-68 0-102Z"
          stroke="currentColor"
          strokeWidth="1"
          transform={`rotate(${rotation} 210 210)`}
        />
      ))}
      <path d="M210 181c22 19 22 39 0 58-22-19-22-39 0-58Z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="210" cy="210" r="9" fill="currentColor" />
    </svg>
  );
}
