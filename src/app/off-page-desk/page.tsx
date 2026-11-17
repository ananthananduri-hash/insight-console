import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Off-Page Desk",
  description:
    "A Notion system for off-page SEO: chase automation, a quality gate before outreach, and outcome reporting instead of activity tracking.",
};

const BUY_LINKS = {
  kreato: "https://kreato.co.in/anantha-nanduri/e63c117d-5865-4096-b666-e2a198496b6b",
  dodo: "https://checkout.dodopayments.com/buy/pdt_0Ns8DUR7cX0lR58Abru8O",
};

const FEATURES = [
  {
    title: "The daily engine",
    items: [
      "Items — every Earn, Claim, and Reclaim action, with automatic chase-due flags and escalation when something's gone quiet too long",
      "Today dashboard — what's due, who you're waiting on, today's wins, anything that just broke",
      "End-of-day update template — copy-paste-ready, built from what actually happened that day",
    ],
  },
  {
    title: "The quality layer most trackers skip",
    items: [
      "A quality score and floor on every opportunity, before outreach effort goes in",
      "Target URL and anchor-type planning, so links point at pages that sell",
      "Paid-link disclosure tracking, because undisclosed paid links are a link scheme",
    ],
  },
  {
    title: "The strategy layer",
    items: [
      "Content Assets — track original research and data campaigns on their own timeline",
      "Entity Authority — a quarterly checklist for reputation signals beyond links",
      "Outcomes — monthly reporting on quality referring domains, link retention, AI-answer citations, and referral sessions",
    ],
  },
];

function BuyButton({
  href,
  label,
  sublabel,
}: {
  href: string;
  label: string;
  sublabel: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hud-panel"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        padding: "18px 20px",
        textAlign: "center",
        color: "var(--text-primary)",
      }}
    >
      <span style={{ fontWeight: 600, fontSize: "15px" }}>{label}</span>
      <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{sublabel}</span>
    </a>
  );
}

export default function OffPageDeskPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <div className="section-label mb-6">
        PRODUCT <span className="rule" />
      </div>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(28px, 4vw, 40px)",
          lineHeight: 1.15,
          color: "var(--text-primary)",
          margin: "0 0 14px",
        }}
      >
        Off-Page Desk
      </h1>
      <p style={{ fontSize: "17px", lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: "32px", maxWidth: "60ch" }}>
        The off-page SEO system I run my own client work on — not a template designed to sell.
        Chase automation, a quality gate before any outreach, and outcome reporting instead of
        activity tracking.{" "}
        <Link href="/blog/building-the-off-page-desk" style={{ textDecoration: "underline", textDecorationColor: "var(--border-strong)" }}>
          Read the full case study →
        </Link>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
          marginBottom: "40px",
        }}
      >
        <BuyButton href={BUY_LINKS.kreato} label="Buy on Kreato" sublabel="₹5,999 · UPI, cards, netbanking" />
        <BuyButton href={BUY_LINKS.dodo} label="Buy via Dodo Payments" sublabel="$69 · global checkout" />
      </div>

      <div
        className="hud-prose prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight"
        style={{ maxWidth: "65ch" }}
      >
        <p>
          Off-page SEO doesn&apos;t fail because the work is hard. It fails because almost every
          action depends on someone outside your control — and the follow-up lives in someone&apos;s
          memory instead of a system. I built this for my own agency work after watching
          link-building programs stall on the same things every time: approvals nobody chased,
          links that went live and were never checked again, and an end-of-day report rebuilt by
          hand from email threads.
        </p>

        {FEATURES.map((section) => (
          <div key={section.title}>
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <h3>Who this is for</h3>
        <p>
          Solo SEO consultants and small agency teams running off-page work for at least one real
          client, who are tired of rebuilding status reports by hand and want a system that forces
          follow-up discipline instead of relying on memory.
        </p>

        <h3>What you get</h3>
        <p>
          One Notion template, duplicate into your own workspace, fully yours to edit. Two worked
          examples in the Items database show exactly how to use the activity log and follow-up
          structure. Every database has short instructions built in — no separate PDF to lose.
        </p>

        <h3>FAQ</h3>
        <p>
          <strong>Does this work for multiple clients?</strong> Built around one client&apos;s
          program per workspace — duplicate the template per client if you run several.
        </p>
        <p>
          <strong>Do I need a paid Notion plan?</strong> No, this runs on Notion&apos;s free plan.
        </p>
        <p>
          <strong>Is there a subscription?</strong> No — one-time purchase, free updates to this
          version going forward.
        </p>
        <p>
          <strong>Why two places to buy it?</strong> Same template, same price point adjusted per
          currency. Buy wherever is easiest for you — Kreato for UPI/Indian cards, Dodo Payments
          for everything else.
        </p>
      </div>
    </div>
  );
}
