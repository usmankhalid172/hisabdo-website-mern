import JsonLd from './JsonLd';
import { faqSchema } from '../lib/seo';

export default function FaqSection({ faqs, title = 'Frequently Asked Questions' }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <JsonLd data={faqSchema(faqs)} />
      <h2>{title}</h2>
      <div className="section-divider" />
      <div className="faq-list">
        {faqs.map(({ q, a }) => (
          <details className="faq-item" key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
