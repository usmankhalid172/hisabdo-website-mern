"use client";

import Link from "next/link";
import { useState } from "react";

const PRODUCTS = [
  { label: "Expense Tracker", href: "/expense-tracker-app" },
  { label: "Expense Management", href: "/expense-management-app" },
  { label: "Khata Book", href: "/khata-book-app" },
  { label: "Digital Khata Book", href: "/digital-khata-book" },
  { label: "Udhar Management", href: "/udhar-management-app" },
  { label: "Customer Ledger", href: "/customer-ledger-app" },
  { label: "Shopkeeper Accounting", href: "/shopkeeper-accounting-app" },
  { label: "Small Business Accounting", href: "/small-business-accounting-app" },
  { label: "Business Ledger", href: "/business-ledger-app" },
  { label: "Hisab Kitab App", href: "/hisab-kitab-app" },
];

const RESOURCES = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "About the App", href: "/about-app" },
];

export default function Navigation() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link href="/">HisabDo</Link>
      </div>
      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li
          className="nav-dropdown"
          onMouseEnter={() => setProductsOpen(true)}
          onMouseLeave={() => setProductsOpen(false)}
        >
          <button
            className="nav-dropdown-btn"
            aria-expanded={productsOpen}
            aria-haspopup="true"
            onClick={() => setProductsOpen((v) => !v)}
          >
            Products <i className="fas fa-chevron-down" style={{ fontSize: '10px', marginLeft: '4px' }} />
          </button>
          {productsOpen && (
            <ul className="nav-dropdown-menu" role="menu">
              {PRODUCTS.map((p) => (
                <li key={p.href} role="menuitem">
                  <Link href={p.href} onClick={() => setProductsOpen(false)}>{p.label}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li
          className="nav-dropdown"
          onMouseEnter={() => setResourcesOpen(true)}
          onMouseLeave={() => setResourcesOpen(false)}
        >
          <button
            className="nav-dropdown-btn"
            aria-expanded={resourcesOpen}
            aria-haspopup="true"
            onClick={() => setResourcesOpen((v) => !v)}
          >
            Resources <i className="fas fa-chevron-down" style={{ fontSize: '10px', marginLeft: '4px' }} />
          </button>
          {resourcesOpen && (
            <ul className="nav-dropdown-menu" role="menu">
              {RESOURCES.map((r) => (
                <li key={r.href} role="menuitem">
                  <Link href={r.href} onClick={() => setResourcesOpen(false)}>{r.label}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/careers">Careers</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
