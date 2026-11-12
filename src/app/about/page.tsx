import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "A scientist's decade in pharma R&D, meeting a second career built from scratch in marketing analytics.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <div className="section-label mb-6">
        ABOUT <span className="rule" />
      </div>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "32px",
          color: "var(--text-primary)",
          margin: "0 0 24px",
        }}
      >
        About
      </h1>
      <div className="hud-prose" style={{ maxWidth: "65ch" }}>
        <p>
          I&apos;m Anantha Nanduri (
          <a href="https://www.linkedin.com/in/ananthananduri/">LinkedIn</a>
          ). Before I was anything else, I was a scientist. For about a
          decade I worked in research and development across pharmaceutical
          companies, at Apotex, Dr. Reddy&apos;s, Biocon, and the United
          States Pharmacopeia. That work was never a cakewalk. I worked on
          complex drugs and peptides like liraglutide, calcitonin,
          glatiramer, vasopressin, and desmopressin, the unglamorous and
          exacting science that has to be right before anything reaches a
          patient. While I was at Apotex, I gave an FDA auditor a live demo
          on dissolution testing. That is the kind of scrutiny this field
          runs on.
        </p>
        <p>
          Then 2024 happened and I became a mom, and the scientist had to
          make room for a role that needed more of my time than a lab
          schedule could give back. I spent a while just figuring out what
          came next. And then, a little like Harry finding out he had been a
          wizard all along, it turned out the answer had been in front of
          me. Bazinga: I could do marketing. I leaned into it completely,
          specializing in SEO across on page, off page, digital PR, and the
          newer disciplines of AEO and GEO.
        </p>
        <p>
          I am not just writing about that specialization here. This site is
          built on it. The GA4 setup, the Core Web Vitals monitoring, the
          consent handling, the technical SEO and AEO work, I built all of it
          myself, on this exact blog, as the proof of work rather than a
          claim of it.
        </p>
        <p>
          Insight Console is where I&apos;m chronicling that journey, a
          scientist&apos;s decade in pharma R&amp;D meeting a second career
          built from scratch in marketing analytics. The three threads of
          this blog, analytics, career, and healthcare, aren&apos;t a content
          strategy I picked for SEO reasons. They&apos;re literally the three
          parts of my own story. If you want to see the work rather than
          just read about it, start with the{" "}
          <Link href="/blog?pillar=analytics">analytics posts</Link>.
        </p>
      </div>
    </div>
  );
}
