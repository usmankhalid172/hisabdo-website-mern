"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p =
          max > 0 ? (doc.scrollTop || document.body.scrollTop) / max : 0;
        setProgress(Math.min(1, Math.max(0, p)));
        setVisible(p > 0.15);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div
          className="scroll-progress-bar"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <button
        className={`back-to-top ${visible ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up" aria-hidden="true"></i>
      </button>
    </>
  );
}
