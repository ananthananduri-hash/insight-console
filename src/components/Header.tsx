import Link from "next/link";
import ConsoleClock from "@/components/ConsoleClock";

const NAV = [
  { href: "/blog", label: "All Posts" },
  { href: "/blog?pillar=analytics", label: "Analytics" },
  { href: "/blog?pillar=career", label: "Career" },
  { href: "/blog?pillar=healthcare", label: "Healthcare" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="statusbar">
      <div className="statusbar-group">
        <span>
          <span className="dot" />
          <Link href="/" style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.04em" }}>
            MEASURED NOTES
          </Link>
        </span>
        <nav>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="statusbar-group">
        <span>
          <span className="label">LOCAL&nbsp;</span>
          <ConsoleClock />
        </span>
      </div>
    </header>
  );
}
