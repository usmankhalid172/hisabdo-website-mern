"use client";
import { useEffect, useRef, useState } from "react";

/**
 * CountUp — animates a number from 0 to `end` when scrolled into view.
 * Non-numeric values ("Offline-first", "24/7") render as-is.
 */
export default function CountUp({
  end,
  duration = 1400,
  suffix = "",
  className = "",
}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  const numeric = typeof end === "number" || /^\d+(\.\d+)?$/.test(String(end));

  useEffect(() => {
    if (!numeric) return;
    const node = ref.current;
    if (!node) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(Number(end));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const target = Number(end);
            const t0 = performance.now();
            const tick = (now) => {
              const p = Math.min((now - t0) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(target * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, numeric]);

  if (!numeric) {
    return (
      <strong
        ref={ref}
        className={className}
        style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
      >
        {end}
      </strong>
    );
  }

  return (
    <strong ref={ref} className={className}>
      {value}
      {suffix}
    </strong>
  );
}
