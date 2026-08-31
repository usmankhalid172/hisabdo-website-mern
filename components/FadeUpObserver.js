"use client";
import { useEffect } from "react";

/**
 * FadeUpObserver — global fallback that reveals every `.fade-up`
 * element via IntersectionObserver (for pages not yet migrated to Reveal).
 * Include once (e.g. in SiteShell) so `.fade-up` elements animate in.
 */
export default function FadeUpObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".fade-up");
    if (!nodes.length) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      nodes.forEach((n) => n.classList.add("reveal-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
  return null;
}
