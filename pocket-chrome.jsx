// Shared chrome for Pocket sub-pages (Docs, Contact, Privacy).
// Dark instrument aesthetic, matched to the landing page.
// Exports to window: PocketChrome { SubNav, SubFooter, wrap, Eyebrow, PageHero }.

const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;
const ChromeDS = window.PocketDesignSystem_184e86;
const { Button: ButtonC } = ChromeDS;

const wrap = { maxWidth: 1120, margin: '0 auto', padding: '0 32px' };
const wordmarkSrc = () => (window.__resources && window.__resources.wordmark) || 'assets/wordmark-pocket-dark.svg';

const NAV_LINKS = [
  ['Features', 'Pocket Landing Page.html#features'],
  ['How it works', 'Pocket Landing Page.html#how'],
  ['Docs', 'Pocket Docs.html'],
  ['Contact', 'Pocket Contact.html'],
];

function SubNav() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,11,13,0.72)', backdropFilter: 'blur(14px)', borderBottom: '0.5px solid var(--stroke)' }}>
      <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="Pocket Landing Page.html" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={wordmarkSrc()} alt="pocket" style={{ height: 22 }} />
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {NAV_LINKS.map(([t, h]) => (
            <a key={t} href={h} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>{t}</a>
          ))}
          <ButtonC variant="primary" icon="▶">Get Pocket</ButtonC>
        </nav>
      </div>
    </header>
  );
}

const FOOTER_COLS = [
  ['Explore', [['Features', 'Pocket Landing Page.html#features'], ['How it works', 'Pocket Landing Page.html#how'], ['FAQ', 'Pocket Landing Page.html#faq']]],
  ['Support', [['Docs', 'Pocket Docs.html'], ['Contact', 'Pocket Contact.html'], ['Privacy', 'Pocket Privacy.html']]],
];

function SubFooter() {
  return (
    <footer style={{ borderTop: '0.5px solid var(--stroke)', background: 'var(--bg-bottom)' }}>
      <div style={{ ...wrap, padding: '48px 32px 36px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 32 }}>
        <div>
          <a href="Pocket Landing Page.html"><img src={wordmarkSrc()} alt="pocket" style={{ height: 22, marginBottom: 14 }} /></a>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', maxWidth: 240, lineHeight: 1.5 }}>The rhythm trainer that grades your timing to the millisecond. Find the pocket. Lock the green beat.</p>
        </div>
        {FOOTER_COLS.map(([h, links]) => (
          <div key={h}>
            <div style={{ fontSize: 11, letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>{h}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(([l, href]) => <a key={l} href={href} style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>{l}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ ...wrap, padding: '18px 32px', borderTop: '0.5px solid var(--stroke)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12.5, color: 'var(--dim)' }}>© 2026 Pocket. Native SwiftUI.</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--dim)' }}>find the pocket → lock the green beat</span>
      </div>
    </footer>
  );
}

function Eyebrow({ children, color = 'var(--cyan)' }) {
  return <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color, marginBottom: 14 }}>{children}</div>;
}

// page masthead: eyebrow + big title + lede, on the dark gradient
function PageHero({ eyebrow, title, lede, accent }) {
  return (
    <section style={{ borderBottom: '0.5px solid var(--stroke)' }}>
      <div style={{ ...wrap, paddingTop: 64, paddingBottom: 48 }}>
        <Eyebrow color={accent}>{eyebrow}</Eyebrow>
        <h1 style={{ margin: 0, fontSize: 48, lineHeight: 1.04, letterSpacing: '-0.03em', fontWeight: 700, color: 'var(--text)', maxWidth: 760 }}>{title}</h1>
        {lede && <p style={{ marginTop: 20, fontSize: 18.5, lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 620 }}>{lede}</p>}
      </div>
    </section>
  );
}

window.PocketChrome = { SubNav, SubFooter, wrap, Eyebrow, PageHero };
