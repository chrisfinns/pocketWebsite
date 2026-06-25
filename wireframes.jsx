// Low-fi landing-page wireframes for Pocket (rhythm trainer).
// Grayscale + single green "beat" accent. Sketchy, structure-first.
// Exports to window: DirectionA, DirectionB, DirectionC.

const W = 980; // artboard content width

// ---- low-fi primitives ----------------------------------------------------
const ink = '#2b2b2b';
const faint = '#e7e7e4';
const mid = '#cfcfca';
const paper = '#fbfbf9';
const beat = '#3ec06a'; // the green beat — the ONLY color

const sketch = {
  border: `1.5px solid ${ink}`,
  borderRadius: 8,
};

function Block({ h = 80, w = '100%', label, fill = faint, dashed, style }) {
  return (
    <div style={{
      width: w, height: h, background: fill,
      border: dashed ? `1.5px dashed ${mid}` : `1.5px solid ${mid}`,
      borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#9a9a93', fontFamily: 'Caveat, cursive', fontSize: 20, ...style,
    }}>{label}</div>
  );
}

function Lines({ n = 3, w = '100%', gap = 9, lead = 11, last = '60%' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, width: w }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{
          height: lead, borderRadius: 4, background: mid,
          width: i === n - 1 ? last : '100%',
        }} />
      ))}
    </div>
  );
}

function Heading({ w = '70%', h = 26, n = 2 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ height: h, borderRadius: 5, background: ink, width: i === n - 1 ? '45%' : w }} />
      ))}
    </div>
  );
}

function Btn({ children, primary, w = 'auto' }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      height: 44, padding: '0 22px', width: w, borderRadius: 22,
      background: primary ? beat : 'transparent',
      border: primary ? 'none' : `1.5px solid ${ink}`,
      color: primary ? '#08240f' : ink, fontWeight: 600, fontSize: 15,
      fontFamily: 'Inter, sans-serif',
    }}>{children}</div>
  );
}

// the beat-bar motif — wireframe version of the brand's hero data-viz
function BeatBars({ active = 1, n = 4, h = 88 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: h }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{
          width: 16, height: i === active ? h : h * 0.5,
          borderRadius: 4,
          background: i === active ? beat : mid,
          boxShadow: i === active ? `0 0 0 4px ${beat}22` : 'none',
        }} />
      ))}
    </div>
  );
}

// annotation tag in handwritten font
function Tag({ children, style }) {
  return <div style={{
    position: 'absolute', fontFamily: 'Caveat, cursive', fontSize: 17,
    color: beat, fontWeight: 700, ...style,
  }}>{children}</div>;
}

function SectionLabel({ children }) {
  return <div style={{
    fontFamily: 'Caveat, cursive', fontSize: 22, color: '#b6b6ae',
    marginBottom: 14, letterSpacing: '.02em',
  }}>{children}</div>;
}

function Page({ children }) {
  return <div style={{
    width: W, background: paper, fontFamily: 'Inter, sans-serif',
    color: ink, position: 'relative',
  }}>{children}</div>;
}

// shared nav (logo + links + CTA) — "decide for me"
function Nav({ cta = 'Get Pocket' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 40px', borderBottom: `1.5px solid ${faint}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 12, height: 24, borderRadius: 3, background: beat }} />
        <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.04em' }}>pocket</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        {['Features', 'How it works', 'Pricing', 'FAQ'].map(t => (
          <div key={t} style={{ height: 9, width: t.length * 7, borderRadius: 4, background: mid }} />
        ))}
        <Btn primary>{cta}</Btn>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ padding: '40px', borderTop: `1.5px solid ${faint}`, display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 20, borderRadius: 3, background: beat }} />
          <div style={{ fontWeight: 700, letterSpacing: '-0.04em' }}>pocket</div>
        </div>
        <Lines n={2} w={180} last="80%" />
      </div>
      {['Product', 'Company', 'Legal'].map(c => (
        <div key={c} style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div style={{ height: 9, width: 60, borderRadius: 4, background: ink }} />
          {[0,1,2].map(i => <div key={i} style={{ height: 8, width: 80, borderRadius: 4, background: mid }} />)}
        </div>
      ))}
    </div>
  );
}

const sectionPad = { padding: '56px 40px' };

// =====================================================================
// DIRECTION A — Duolingo-style: spacious, friendly, alternating "sessions"
// =====================================================================
function DirectionA() {
  return (
    <Page>
      <Nav />
      {/* HERO: centered, big, friendly */}
      <div style={{ ...sectionPad, paddingTop: 72, paddingBottom: 72, textAlign: 'center', position: 'relative' }}>
        <Tag style={{ top: 30, right: 50 }}>big friendly hero ↑</Tag>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <div style={{ height: 38, width: 560, borderRadius: 6, background: ink }} />
            <div style={{ height: 38, width: 420, borderRadius: 6, background: ink }} />
          </div>
          <Lines n={2} w={460} last="70%" />
          <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
            <Btn primary w={190}>Start training free</Btn>
            <Btn w={150}>See how it works</Btn>
          </div>
          <div style={{ marginTop: 18 }}><BeatBars active={1} /></div>
        </div>
      </div>

      {/* alternating "sessions" — Duolingo's signature scroll */}
      <div style={{ ...sectionPad, background: '#f4f4f1', display: 'flex', flexDirection: 'column', gap: 64 }}>
        <SectionLabel>features as alternating "sessions" — generous whitespace</SectionLabel>
        {[0,1,2].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 56, flexDirection: i % 2 ? 'row-reverse' : 'row' }}>
            <Block h={220} w={360} dashed label="illustration / data-viz" fill={paper} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Heading w="80%" />
              <Lines n={3} last="55%" />
              <Btn>Learn more</Btn>
            </div>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS — 3 friendly steps */}
      <div style={{ ...sectionPad, position: 'relative' }}>
        <Tag style={{ top: 24, left: 40 }}>3 simple steps</Tag>
        <div style={{ height: 24, width: 260, borderRadius: 5, background: ink, margin: '20px auto 36px' }} />
        <div style={{ display: 'flex', gap: 24 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: beat, color: '#08240f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22, fontFamily: 'Inter' }}>{s}</div>
              <Block h={120} dashed fill={paper} />
              <Lines n={2} last="70%" />
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ ...sectionPad, background: '#f4f4f1' }}>
        <SectionLabel>social proof — player quotes</SectionLabel>
        <div style={{ display: 'flex', gap: 20 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ flex: 1, background: paper, ...sketch, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Lines n={3} last="50%" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: mid }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <div style={{ height: 8, width: 80, background: ink, borderRadius: 4 }} />
                  <div style={{ height: 7, width: 60, background: mid, borderRadius: 4 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={sectionPad}>
        <SectionLabel>FAQ — accordion</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ ...sketch, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ height: 10, width: 320, background: mid, borderRadius: 4 }} />
              <div style={{ fontSize: 22, color: mid }}>＋</div>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ ...sectionPad, textAlign: 'center', background: beat + '18' }}>
        <div style={{ height: 26, width: 380, background: ink, borderRadius: 5, margin: '0 auto 18px' }} />
        <Btn primary w={210}>Start training free</Btn>
      </div>
      <Footer />
    </Page>
  );
}

// =====================================================================
// DIRECTION B — Anki-style: clean, dense, feature-list driven, utilitarian
// =====================================================================
function DirectionB() {
  return (
    <Page>
      <Nav cta="Download" />
      {/* HERO: split — copy left, app screenshot right */}
      <div style={{ ...sectionPad, display: 'flex', gap: 48, alignItems: 'center', position: 'relative' }}>
        <Tag style={{ top: 22, left: 40 }}>split hero · screenshot-led</Tag>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Heading w="95%" n={2} h={30} />
          <Lines n={3} last="65%" />
          <div style={{ display: 'flex', gap: 12 }}>
            <Btn primary w={150}>Download</Btn>
            <Btn w={130}>Documentation</Btn>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            {['mac','iOS','MIDI','Audio'].map(t => (
              <div key={t} style={{ padding: '6px 12px', border: `1.5px solid ${mid}`, borderRadius: 14, fontSize: 13, color: '#9a9a93', fontFamily: 'Caveat' }}>{t}</div>
            ))}
          </div>
        </div>
        <Block h={300} w={420} dashed label="app screenshot (dark UI)" fill="#111316" style={{ color: '#666', borderColor: '#333' }} />
      </div>

      {/* trust bar */}
      <div style={{ padding: '20px 40px', background: '#f4f4f1', display: 'flex', justifyContent: 'center', gap: 40, alignItems: 'center' }}>
        {[0,1,2,3,4].map(i => <div key={i} style={{ height: 16, width: 90, background: mid, borderRadius: 4 }} />)}
      </div>

      {/* FEATURES — dense 2-col grid, Anki-style */}
      <div style={sectionPad}>
        <SectionLabel>features — dense, scannable grid</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: i === 0 ? beat : faint, flexShrink: 0, border: `1.5px solid ${mid}` }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                <div style={{ height: 12, width: '60%', background: ink, borderRadius: 4 }} />
                <Lines n={2} last="80%" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS — horizontal numbered strip */}
      <div style={{ ...sectionPad, background: '#f4f4f1' }}>
        <SectionLabel>how it works — compact numbered row</SectionLabel>
        <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
          {[1,2,3,4].map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', border: `1.5px solid ${ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{s}</div>
                  <div style={{ height: 10, width: 70, background: ink, borderRadius: 4 }} />
                </div>
                <Lines n={2} w="80%" last="60%" />
              </div>
              {i < 3 && <div style={{ width: 30, height: 1.5, background: mid, marginTop: 15 }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* data-viz feature highlight */}
      <div style={{ ...sectionPad, display: 'flex', gap: 48, alignItems: 'center' }}>
        <Block h={200} w={440} dashed label="sweep lane / timing cloud" fill="#111316" style={{ color: '#666', borderColor: '#333' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Heading w="80%" />
          <Lines n={3} last="55%" />
          <div style={{ display: 'flex', gap: 20, marginTop: 4 }}>
            {['BIAS','σ','TIGHT'].map(t => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#b6b6ae', letterSpacing: '.08em' }}>{t}</div>
                <div style={{ height: 16, width: 50, background: mid, borderRadius: 4 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS — compact row */}
      <div style={{ ...sectionPad, background: '#f4f4f1' }}>
        <SectionLabel>reviews</SectionLabel>
        <div style={{ display: 'flex', gap: 16 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ flex: 1, background: paper, ...sketch, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ color: beat, fontSize: 13 }}>★★★★★</div>
              <Lines n={3} last="60%" />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ — 2-col compact */}
      <div style={sectionPad}>
        <SectionLabel>FAQ</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 40px' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, borderBottom: `1.5px solid ${faint}`, paddingBottom: 14 }}>
              <div style={{ height: 10, width: '70%', background: ink, borderRadius: 4 }} />
              <Lines n={2} last="70%" />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </Page>
  );
}

// =====================================================================
// DIRECTION C — Instrument/data-led: dark hero, the data-viz IS the hero
// =====================================================================
function DirectionC() {
  return (
    <Page>
      {/* dark instrument hero */}
      <div style={{ background: '#0a0b0d', padding: '0 0 64px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 12, height: 24, borderRadius: 3, background: beat }} />
            <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.04em', color: '#fff' }}>pocket</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
            {['Features', 'How it works', 'Pricing', 'FAQ'].map(t => (
              <div key={t} style={{ height: 9, width: t.length * 7, borderRadius: 4, background: '#2c2f34' }} />
            ))}
            <Btn primary>Get Pocket</Btn>
          </div>
        </div>
        <Tag style={{ top: 90, right: 60 }}>data-viz IS the hero ↓</Tag>
        <div style={{ textAlign: 'center', padding: '48px 40px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <div style={{ height: 40, width: 600, borderRadius: 6, background: '#e9e9e6' }} />
            <div style={{ height: 40, width: 440, borderRadius: 6, background: '#e9e9e6' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            {[0,1].map(i => <div key={i} style={{ height: 11, width: i ? 300 : 420, background: '#3a3d42', borderRadius: 4 }} />)}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 4 }}>
            <Btn primary w={170}>Find your pocket</Btn>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 44, padding: '0 22px', borderRadius: 22, border: `1.5px solid #3a3d42`, color: '#cfcfca', fontWeight: 600, fontSize: 15 }}>Watch demo</div>
          </div>
        </div>
        {/* hero sweep-lane mock */}
        <div style={{ margin: '12px 40px 0', height: 240, background: '#121417', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 14, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: beat, boxShadow: `0 0 16px ${beat}` }} />
          {/* scattered hits */}
          {Array.from({ length: 22 }).map((_, i) => {
            const off = (Math.sin(i * 1.7) * 40);
            return <div key={i} style={{ position: 'absolute', left: `calc(50% + ${off}px)`, top: 20 + i * 9, width: 8, height: 8, borderRadius: '50%', background: Math.abs(off) < 12 ? beat : Math.abs(off) < 28 ? '#e0b23c' : '#d65b4a' }} />;
          })}
          <div style={{ position: 'absolute', top: 12, left: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#6b6f76', letterSpacing: '.08em' }}>SWEEP LANE</div>
        </div>
      </div>

      {/* stat strip */}
      <div style={{ padding: '28px 40px', display: 'flex', justifyContent: 'space-around', borderBottom: `1.5px solid ${faint}` }}>
        {[['+3 ms','BIAS'],['±12 ms','σ'],['57%','TIGHT'],['70 BPM','TEMPO']].map(([v,l]) => (
          <div key={l} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 700, color: l === 'TIGHT' ? beat : ink }}>{v}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#b6b6ae', letterSpacing: '.1em' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* FEATURES — editorial, large */}
      <div style={sectionPad}>
        <SectionLabel>features — editorial, one big claim each</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {[0,1].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 56, flexDirection: i % 2 ? 'row-reverse' : 'row' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Heading w="85%" h={28} />
                <Lines n={3} last="55%" />
              </div>
              <Block h={220} w={380} dashed label="data-viz panel (dark)" fill="#111316" style={{ color: '#666', borderColor: '#333' }} />
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ ...sectionPad, background: '#0a0b0d' }}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, color: '#5a5d63', marginBottom: 20 }}>how it works — on dark</div>
        <div style={{ display: 'flex', gap: 24 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex: 1, background: '#121417', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', color: beat, fontWeight: 700 }}>0{s}</div>
              <div style={{ height: 12, width: '70%', background: '#e9e9e6', borderRadius: 4 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[0,1,2].map(j => <div key={j} style={{ height: 9, width: j === 2 ? '50%' : '100%', background: '#2c2f34', borderRadius: 4 }} />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={sectionPad}>
        <SectionLabel>what players say</SectionLabel>
        <div style={{ display: 'flex', gap: 20 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ flex: 1, ...sketch, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Lines n={3} last="55%" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: mid }} />
                <div style={{ height: 8, width: 90, background: ink, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ ...sectionPad, background: '#f4f4f1' }}>
        <SectionLabel>FAQ</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ background: paper, ...sketch, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ height: 10, width: 340, background: mid, borderRadius: 4 }} />
              <div style={{ fontSize: 20, color: mid }}>›</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '64px 40px', textAlign: 'center', background: '#0a0b0d' }}>
        <div style={{ margin: '0 auto 14px', display: 'flex', justifyContent: 'center' }}><BeatBars active={1} /></div>
        <div style={{ height: 26, width: 360, background: '#e9e9e6', borderRadius: 5, margin: '8px auto 20px' }} />
        <Btn primary w={210}>Find your pocket</Btn>
      </div>
      <Footer />
    </Page>
  );
}

Object.assign(window, { DirectionA, DirectionB, DirectionC });
