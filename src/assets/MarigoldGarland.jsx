export function MarigoldGarland({ className = "", vertical = false }) {
  const flowers = Array.from({ length: 9 }, (_, index) => index);
  const transform = vertical ? "rotate(90 210 30) translate(0 -180)" : undefined;

  return (
    <svg className={className} viewBox="0 0 420 72" fill="none" aria-hidden="true">
      <g transform={transform}>
        <path d="M24 35c76 14 142 14 198 0s114-14 174 0" stroke="#B7984E" strokeOpacity="0.38" strokeWidth="2" />
        {flowers.map((flower) => {
          const cx = 32 + flower * 44;
          const cy = flower % 2 === 0 ? 36 : 31;

          return (
            <g key={flower} transform={`translate(${cx} ${cy})`}>
              {Array.from({ length: 10 }, (_, petal) => (
                <ellipse
                  key={petal}
                  cx="0"
                  cy="-10"
                  rx="5"
                  ry="10"
                  fill={petal % 2 === 0 ? "#D6A33D" : "#C58B2F"}
                  opacity="0.72"
                  transform={`rotate(${petal * 36})`}
                />
              ))}
              <circle r="7" fill="#9F6F25" opacity="0.75" />
              <circle r="3" fill="#F1D07A" opacity="0.9" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
