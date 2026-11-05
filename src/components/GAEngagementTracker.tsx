"use client";

import { useEffect } from "react";

export default function GAEngagementTracker() {
  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    let firedScroll75 = false;
    const onScroll = () => {
      if (firedScroll75) return;
      const doc = document.documentElement;
      const scrolled = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (scrolled >= 0.75) {
        firedScroll75 = true;
        window.gtag?.("event", "scroll_depth_75", { page_path: window.location.pathname });
      }
    };

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const isExternal = /^https?:\/\//.test(href) && !href.includes(window.location.hostname);
      if (isExternal) {
        window.gtag?.("event", "outbound_click", { link_url: href });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
