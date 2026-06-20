export function Section({ children, className = "", id }) {
  return (
    <section id={id} className={`relative min-h-screen overflow-hidden px-6 py-24 sm:px-10 lg:px-16 ${className}`}>
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-7xl flex-col justify-center">
        {children}
      </div>
    </section>
  );
}
