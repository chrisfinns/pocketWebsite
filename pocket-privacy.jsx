// Pocket Privacy policy. Drafted in Pocket's voice — placeholder, review before publishing.
// Exports to window: PocketPrivacy.

const { SubNav: SubNavPv, SubFooter: SubFooterPv, wrap: wrapPv, Eyebrow: EyebrowPv, PageHero: PageHeroPv } = window.PocketChrome;

const panelPv = { background: '#101317', border: '0.5px solid var(--stroke)', borderRadius: 'var(--r-lg)' };
const monoPv = { fontFamily: 'var(--font-mono)' };

function Clause({ id, title, children }) {
  return (
    <section id={id} style={{ paddingTop: 44, scrollMarginTop: 84 }}>
      <h2 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--text)' }}>{title}</h2>
      <div style={{ fontSize: 16, lineHeight: 1.62, color: 'var(--text-secondary)', maxWidth: 680 }}>{children}</div>
    </section>
  );
}

function PocketPrivacy() {
  return (
    <div style={{ background: 'linear-gradient(180deg,var(--bg-top),var(--bg-bottom))', minHeight: '100vh' }}>
      <SubNavPv />
      <PageHeroPv
        eyebrow="Privacy"
        title="Your playing stays yours."
        lede="Pocket grades timing on your device. It doesn't record your audio, and it doesn't sell anything about you. Here's exactly what that means."
        accent="var(--green)"
      />

      <div style={{ ...wrapPv, paddingTop: 8, paddingBottom: 96, maxWidth: 820 }}>
        {/* the short version */}
        <div style={{ ...panelPv, padding: 26, marginTop: 32 }}>
          <span style={{ ...monoPv, fontSize: 11, letterSpacing: 'var(--track-label)', color: 'var(--green)' }}>THE SHORT VERSION</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginTop: 16 }}>
            {[
              ['Audio is never recorded', 'The mic signal is analyzed for onsets in real time and discarded. No clip is saved or sent.'],
              ['Scores live on your device', 'Your sessions, bests, and trends are stored locally. Sync is opt-in.'],
              ['No ads, no data sale', 'Pocket is paid software. You are the customer, not the product.'],
              ['Minimal, anonymous analytics', 'Only opt-in crash logs and basic usage — never tied to who you are.'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ flex: '0 0 auto', width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', marginTop: 7, boxShadow: 'var(--glow-green)' }} />
                <div>
                  <div style={{ fontSize: 15.5, fontWeight: 600, color: 'var(--text)' }}>{k}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--muted)', marginTop: 3 }}>{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...monoPv, fontSize: 12.5, color: 'var(--dim)', marginTop: 30 }}>Last updated June 24, 2026 · placeholder copy — review with counsel before publishing</div>

        <Clause id="audio" title="Your audio and MIDI">
          When you use audio onset detection, Pocket reads the live microphone stream only to find the attack of each hit. That analysis happens entirely on your device, in the moment, and the audio is thrown away frame by frame. <strong style={{ color: 'var(--text)' }}>No recording of your playing is ever stored, uploaded, or transmitted.</strong> MIDI events are handled the same way — read for their timestamps, then gone. The microphone is used only while a practice session is active and you've granted permission.
        </Clause>

        <Clause id="store" title="What Pocket stores">
          Pocket keeps the things that make your progress meaningful: your sessions, the grooves you've built, your personal bests, and your tightness trend over time. By default this lives <strong style={{ color: 'var(--text)' }}>locally on your device</strong>. If you turn on iCloud sync, that data is stored in your own private iCloud container under your Apple ID — it is not visible to the developer.
        </Clause>

        <Clause id="analytics" title="Analytics and crash reports">
          Pocket can send anonymous, aggregated diagnostics — crash logs and coarse usage signals like "a session was started" — to help fix bugs and decide what to build next. These contain no recordings and nothing that identifies you, and they're <strong style={{ color: 'var(--text)' }}>opt-in</strong>. You can turn them off at any time in Settings, and Pocket works fully with them off.
        </Clause>

        <Clause id="payments" title="Purchases">
          Pocket is sold through the App Store and the Mac App Store. Payments, receipts, and refunds are handled by Apple under Apple's terms — the developer never sees your card details. A purchase confirmation may be used to validate your license; that's it.
        </Clause>

        <Clause id="third" title="Third parties">
          Pocket does not sell, rent, or trade your information. The only outside services involved are the platform infrastructure it runs on — Apple (App Store, optional iCloud) and, if you opt in, an analytics provider that receives only anonymized diagnostics. There are no advertising networks and no data brokers.
        </Clause>

        <Clause id="rights" title="Your choices">
          Because your data lives on your device (or your own iCloud), you're in control: delete a session, clear your history, or remove the app and it's gone with it. To disable sync or analytics, use Settings. For anything else — including questions about data you believe Pocket holds — just email me.
        </Clause>

        <Clause id="changes" title="Changes to this policy">
          If this policy changes in a way that matters, the app and this page will say so, and the "last updated" date above will move. Continuing to use Pocket after a change means you accept the updated policy.
        </Clause>

        <Clause id="contact" title="Questions">
          This is a one-developer app, and privacy questions reach me directly. Email <a href="mailto:support@pocketapp.io" style={{ color: 'var(--green)', textDecoration: 'none' }}>support@pocketapp.io</a> and you'll get a real answer.
        </Clause>
      </div>

      <SubFooterPv />
    </div>
  );
}

window.PocketPrivacy = PocketPrivacy;
