"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <Link href="/" className="logo">HisabDo</Link>

      <button
        className={`hamburger${open ? " open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-menu${open ? " open" : ""}`}>
        <nav>
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/xicteksystems" onClick={() => setOpen(false)}>Company</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <Link href="/careers" onClick={() => setOpen(false)}>Careers</Link>
          <Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
