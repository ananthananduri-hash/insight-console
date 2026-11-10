export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[color:var(--border)]">
      <div
        className="mx-auto max-w-3xl px-6 py-6 flex flex-wrap justify-between gap-2"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-tertiary)",
        }}
      >
        <span>Insight Console &mdash; analytics, career, healthcare</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
