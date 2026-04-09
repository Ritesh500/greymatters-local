import { useState } from 'react';
import Head from 'next/head';
import { getContent } from '@/lib/content';

// ─── Section components ───────────────────────────────────────────────────────

function HeroSection({ content }) {
  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {content.badge && (
          <span className="inline-block bg-red-600/20 text-red-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-red-600/30">
            {content.badge}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          {content.heading}
          {content.headingHighlight && (
            <> <span className="text-red-400">{content.headingHighlight}</span></>
          )}
        </h1>
        {content.description && (
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">{content.description}</p>
        )}
        {content.primaryBtn && (
          <a
            href={content.primaryBtnHref || '#'}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            {content.primaryBtn}
          </a>
        )}
      </div>
    </section>
  );
}

function TextSection({ content }) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {content.eyebrow && (
          <p className="text-red-600 text-sm font-semibold uppercase tracking-wide mb-2">{content.eyebrow}</p>
        )}
        {content.title && (
          <h2 className="text-3xl font-bold text-slate-900 mb-6">{content.title}</h2>
        )}
        <div className="space-y-4">
          {(content.paragraphs || []).map((p, i) => (
            <p key={i} className="text-slate-600 leading-relaxed">{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardsSection({ content }) {
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {content.eyebrow && (
          <p className="text-red-600 text-sm font-semibold uppercase tracking-wide mb-2 text-center">{content.eyebrow}</p>
        )}
        {content.title && (
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">{content.title}</h2>
        )}
        {content.description && (
          <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">{content.description}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(content.items || []).map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              {item.icon && <span className="text-3xl mb-3 block">{item.icon}</span>}
              <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection({ content }) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {content.eyebrow && (
          <p className="text-red-600 text-sm font-semibold uppercase tracking-wide mb-2 text-center">{content.eyebrow}</p>
        )}
        {content.title && (
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">{content.title}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {(content.items || []).map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl font-bold text-red-600 mb-1">{item.value}</p>
              <p className="text-slate-600 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ content }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        {content.eyebrow && (
          <p className="text-red-600 text-sm font-semibold uppercase tracking-wide mb-2 text-center">{content.eyebrow}</p>
        )}
        {content.title && (
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">{content.title}</h2>
        )}
        <div className="space-y-3">
          {(content.items || []).map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{item.q}</span>
                <span className="text-slate-400 flex-shrink-0 text-xs">{openIdx === i ? '▲' : '▼'}</span>
              </button>
              {openIdx === i && (
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABannerSection({ content }) {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-red-600 to-red-700 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">
          {content.heading}
          {content.headingHighlight && (
            <> <span className="text-red-200">{content.headingHighlight}</span></>
          )}
        </h2>
        {content.description && (
          <p className="text-red-100 mb-8 max-w-xl mx-auto">{content.description}</p>
        )}
        {content.primaryBtn && (
          <a
            href={content.primaryBtnHref || '#'}
            className="inline-block bg-white text-red-600 hover:bg-red-50 font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            {content.primaryBtn}
          </a>
        )}
      </div>
    </section>
  );
}

const SECTION_COMPONENTS = {
  hero: HeroSection,
  text: TextSection,
  cards: CardsSection,
  stats: StatsSection,
  faq: FAQSection,
  cta: CTABannerSection,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DynamicPage({ page }) {
  return (
    <>
      <Head>
        <title>{page.metaTitle || page.title}</title>
        {page.metaDescription && <meta name="description" content={page.metaDescription} />}
      </Head>
      {(page.sections || []).map(section => {
        const Component = SECTION_COMPONENTS[section.type];
        return Component ? <Component key={section.id} content={section.content || {}} /> : null;
      })}
    </>
  );
}

export async function getServerSideProps({ params }) {
  const data = getContent('custompages');
  const pages = data.pages || [];
  const page = pages.find(p => p.slug === params.slug);
  if (!page) return { notFound: true };
  return { props: { page } };
}
