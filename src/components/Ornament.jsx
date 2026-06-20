export function OmMark({ className = "" }) {
  return (
    <div className={`font-devanagari text-[clamp(4rem,12vw,11rem)] leading-none ${className}`} aria-hidden="true">
      ॐ
    </div>
  );
}

export function Hairline({ className = "" }) {
  return <div className={`h-px w-full bg-gradient-to-r from-transparent via-bronze/45 to-transparent ${className}`} />;
}
