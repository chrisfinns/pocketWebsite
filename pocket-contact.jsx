// Pocket Contact / Support. Solo-dev tone; swap the placeholder email.
// Exports to window: PocketContact.

const ContactDS = window.PocketDesignSystem_184e86;
const { Button: ButtonCt } = ContactDS;
const { SubNav: SubNavCt, SubFooter: SubFooterCt, wrap: wrapCt, Eyebrow: EyebrowCt, PageHero: PageHeroCt } = window.PocketChrome;

const SUPPORT_EMAIL = 'support@pocketapp.io'; // ← swap for your real public-facing alias
const panelCt = { background: '#101317', border: '0.5px solid var(--stroke)', borderRadius: 'var(--r-lg)' };
const monoCt = { fontFamily: 'var(--font-mono)' };

function ContactCard({ tag, tagColor, title, children, action }) {
  return (
    <div style={{ ...panelCt, padding: 26, display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      <span style={{ ...monoCt, fontSize: 11, letterSpacing: 'var(--track-label)', color: tagColor }}>{tag}</span>
      <h3 style={{ margin: 0, fontSize: 21, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text)' }}>{title}</h3>
      <div style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-secondary)', flex: 1 }}>{children}</div>
      {action}
    </div>
  );
}

function PocketContact() {
  return (
    <div style={{ background: 'linear-gradient(180deg,var(--bg-top),var(--bg-bottom))', minHeight: '100vh' }}>
      <SubNavCt />
      <PageHeroCt
        eyebrow="Contact · Support"
        title="One developer. Real replies."
        lede="Pocket is built and maintained by one person. There's no ticket queue and no bot — just email me, and you'll hear back from the human who writes the code."
        accent="var(--green)"
      />

      <div style={{ ...wrapCt, paddingTop: 40, paddingBottom: 96 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <ContactCard
            tag="EMAIL" tagColor="var(--green)" title="Get in touch"
            action={<a href={'mailto:' + SUPPORT_EMAIL} style={{ textDecoration: 'none' }}><ButtonCt variant="primary" icon="▶">Email {SUPPORT_EMAIL}</ButtonCt></a>}
          >
            The fastest way to reach me. Bug reports, feature ideas, refund questions — all the same inbox. I read every message.
          </ContactCard>

          <ContactCard
            tag="RESPONSE TIME" tagColor="var(--cyan)" title="When you'll hear back"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
              {[['Most emails', '1–2 business days'], ['Bugs that block practice', 'same day when I can'], ['Feature requests', 'logged, replied to honestly']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 10, borderBottom: '0.5px solid var(--stroke)' }}>
                  <span style={{ fontSize: 14.5, color: 'var(--text-secondary)' }}>{k}</span>
                  <span style={{ ...monoCt, fontSize: 13, color: 'var(--text)', textAlign: 'right' }}>{v}</span>
                </div>
              ))}
            </div>
          </ContactCard>
        </div>

        {/* what to include */}
        <div style={{ ...panelCt, padding: 28, marginTop: 24 }}>
          <span style={{ ...monoCt, fontSize: 11, letterSpacing: 'var(--track-label)', color: 'var(--purple)' }}>HELP ME HELP YOU</span>
          <h3 style={{ margin: '12px 0 6px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--text)' }}>What to include in a bug report</h3>
          <p style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: 640, marginTop: 0 }}>A few details turn a "huh, weird" into a fix. No need for all of them — whatever you've got.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginTop: 18, maxWidth: 760 }}>
            {[
              ['Device & OS', 'e.g. iPhone 15, iOS 18.2 · or MacBook Air, macOS 15'],
              ['Input method', 'MIDI device, or audio onset through which mic'],
              ['What you expected', 'and what actually happened instead'],
              ['Steps to reproduce', 'the shorter the path to the bug, the faster the fix'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ flex: '0 0 auto', width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', marginTop: 8, boxShadow: 'var(--glow-green)' }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{k}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--muted)', marginTop: 2 }}>{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* other links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 24 }}>
          {[
            ['Read the docs first', 'Detection methods, calibration, and scoring are all explained.', 'Open docs →', 'docs.html', 'var(--cyan)'],
            ['Privacy questions', 'What Pocket records, what it doesn\u2019t, and where it lives.', 'Read privacy →', 'privacy.html', 'var(--green)'],
            ['Feature requests', 'Tell me the groove or readout you wish existed. I keep a list.', 'Email me →', 'mailto:' + SUPPORT_EMAIL, 'var(--purple)'],
          ].map(([t, d, cta, href, col]) => (
            <a key={t} href={href} style={{ ...panelCt, padding: 22, textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 16.5, fontWeight: 600, color: 'var(--text)' }}>{t}</div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)', flex: 1 }}>{d}</div>
              <div style={{ ...monoCt, fontSize: 13, color: col }}>{cta}</div>
            </a>
          ))}
        </div>
      </div>

      <SubFooterCt />
    </div>
  );
}

window.PocketContact = PocketContact;
