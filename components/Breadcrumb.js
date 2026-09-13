import Link from 'next/link';
import JsonLd from './JsonLd';
import { breadcrumbSchema } from '../lib/seo';

export default function Breadcrumb({ items }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" style={{ padding: '12px 0 0', fontSize: '14px', opacity: 0.7 }}>
        {items.map((item, i) => (
          <span key={item.path}>
            {i > 0 && <span style={{ margin: '0 6px' }}>›</span>}
            {i < items.length - 1 ? (
              <Link href={item.path}>{item.name}</Link>
            ) : (
              <span>{item.name}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
