// Pocket Docs / Manual. Detection-method deep dive + loopback calibration.
// Exports to window: PocketDocs.

const { useState: useStateD, useEffect: useEffectD, useRef: useRefD } = React;
const DocsDS = window.PocketDesignSystem_184e86;
const { Button: ButtonD, Chip: ChipD, Stat: StatD } = DocsDS;
const { SubNav, SubFooter, wrap: wrapD, Eyebrow: EyebrowD, PageHero } = window.PocketChrome;

const panel = { background: '#101317', border: '0.5px solid var(--stroke)', borderRadius: 'var(--r-lg)' };
const mono = { fontFamily: 'var(--font-mono)' };

// ---------------------------------------------------------------------------
// VIZ: MIDI input — discrete, sample-accurate events on the grid
// ---------------------------------------------------------------------------
function MidiViz() {
  const cols = [0, 1, 2, 3];
  return (
    <div style={{ ...panel, padding: 18, height: 168, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <span style={{ ...mono, fontSize: 10, letterSpacing: 'var(--track-label)', color: 'var(--muted)' }}>MIDI · DISCRETE EVENTS</span>
      <div style={{ position: 'relative', flex: 1, marginTop: 12 }}>
        {/* grid lines */}
        {cols.map(i => (
          <div key={i} style={{ position: 'absolute', top: 0, bottom: 18, left: `${8 + i * 28}%`, width: 1, background: 'rgba(255,255,255,0.06)' }} />
        ))}
        {/* note-on markers — land exactly on grid, hair off */}
        {[[8, 0], [36, -3], [64, 2], [92, 0]].map(([l, off], i) => (
          <div key={i} style={{ position: 'absolute', bottom: 18, left: `calc(${l}% + ${off}px)`, width: 10, height: 10, marginLeft: -5, borderRadius: 2, background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }} />
        ))}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, height: 1, background: 'var(--green)', boxShadow: 'var(--glow-green)' }} />
      </div>
      <div style={{ ...mono, fontSize: 11, color: 'var(--green)', marginTop: 6 }}>+0 ms · sample-accurate</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// VIZ: Audio onset detection — waveform, transient picked at the attack
// ---------------------------------------------------------------------------
function OnsetViz() {
  const bars = useRefD(null);
  useEffectD(() => {
    const host = bars.current; if (!host) return;
    const N = 56, attackAt = 22;
    host.innerHTML = '';
    for (let i = 0; i < N; i++) {
      const env = i < attackAt ? 0.06 : Math.max(0.06, Math.exp(-(i - attackAt) * 0.18));
      const h = (4 + env * 56) * (0.7 + 0.6 * Math.abs(Math.sin(i * 1.7)));
      const b = document.createElement('div');
      const isAttack = i === attackAt;
      Object.assign(b.style, {
        flex: '1', height: Math.min(h, 64) + 'px', borderRadius: '1px',
        background: isAttack ? 'var(--green)' : (i < attackAt ? 'rgba(255,255,255,0.14)' : 'rgba(86,196,255,0.55)'),
        boxShadow: isAttack ? '0 0 8px var(--green)' : 'none',
      });
      host.appendChild(b);
    }
  }, []);
  return (
    <div style={{ ...panel, padding: 18, height: 168, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <span style={{ ...mono, fontSize: 10, letterSpacing: 'var(--track-label)', color: 'var(--muted)' }}>AUDIO · ONSET DETECTION</span>
      <div ref={bars} style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 70, marginTop: 12 }} />
      <div style={{ ...mono, fontSize: 11, color: 'var(--cyan)', marginTop: 6 }}>transient picked at the attack · ~±4 ms</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// VIZ: Loopback calibration — earbud speaker held to the iPhone mic so Pocket
// learns the click's round-trip latency and can cancel it during play.
// ---------------------------------------------------------------------------
function LoopbackDiagram() {
  const arcRef = useRefD(null);
  useEffectD(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const g = arcRef.current; if (!g) return;
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = ((t - start) % 1600) / 1600;
      [...g.children].forEach((c, i) => {
        const local = (p + i * 0.33) % 1;
        c.setAttribute('r', String(8 + local * 46));
        c.setAttribute('opacity', String(0.5 * (1 - local)));
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ ...panel, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ ...mono, fontSize: 11, letterSpacing: 'var(--track-label)', color: 'var(--muted)' }}>LOOPBACK CALIBRATION</span>
        <span style={{ ...mono, fontSize: 11, color: 'var(--green)' }}>step 1 of 1 · ~3 s</span>
      </div>

      <svg viewBox="0 0 520 240" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* earbud (left) — driver + stem */}
        <g>
          <circle cx="96" cy="120" r="30" fill="#181B1F" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
          <circle cx="96" cy="120" r="13" fill="#0E1013" stroke="rgba(86,196,255,0.6)" strokeWidth="1.5" />
          <rect x="86" y="146" width="20" height="40" rx="9" fill="#181B1F" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
          {/* emitted sound arcs */}
          <g ref={arcRef} transform="translate(126,120)" fill="none" stroke="var(--cyan)" strokeWidth="2">
            <circle r="14" opacity="0.5" />
            <circle r="28" opacity="0.32" />
            <circle r="42" opacity="0.16" />
          </g>
          <text x="96" y="208" textAnchor="middle" fill="var(--muted)" style={{ ...mono, fontSize: '11px' }}>earbud plays the click</text>
        </g>

        {/* measurement line */}
        <line x1="180" y1="120" x2="360" y2="120" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="4 5" />
        <text x="270" y="108" textAnchor="middle" fill="var(--green)" style={{ ...mono, fontSize: '13px' }}>round-trip 42 ms</text>

        {/* iPhone (right) with mic */}
        <g>
          <rect x="392" y="56" width="92" height="170" rx="20" fill="#121417" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          <rect x="402" y="70" width="72" height="120" rx="8" fill="#0A0B0D" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          {/* on-screen pocket line */}
          <line x1="402" y1="130" x2="474" y2="130" stroke="var(--green)" strokeWidth="2" opacity="0.9" />
          <circle cx="430" cy="118" r="4" fill="var(--cyan)" />
          {/* mic */}
          <circle cx="438" cy="210" r="5" fill="#0E1013" stroke="var(--green)" strokeWidth="1.5" />
          <text x="438" y="240" textAnchor="middle" fill="var(--muted)" style={{ ...mono, fontSize: '11px' }}>mic listens back</text>
        </g>
      </svg>

      <p style={{ marginTop: 6, fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-secondary)' }}>
        On iPhone, hold one earbud up to the mic and tap calibrate. Pocket plays a short click, hears it come back, and measures the <span style={{ color: 'var(--green)' }}>round-trip latency</span> — then aligns the grid and cancels the click so only <em>your</em> playing is graded.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Layout primitives
// ---------------------------------------------------------------------------
const SECTIONS = [
  ['start', 'Getting started'],
  ['input', 'Input methods'],
  ['midi', 'MIDI input'],
  ['audio', 'Audio onset detection'],
  ['loopback', 'Loopback calibration'],
  ['choosing', 'Which to use'],
  ['scoring', 'How scoring works'],
];

function DocSection({ id, title, accent, children }) {
  return (
    <section id={id} style={{ paddingTop: 56, scrollMarginTop: 84 }}>
      <EyebrowD color={accent || 'var(--cyan)'}>{title}</EyebrowD>
      {children}
    </section>
  );
}

function H3({ children }) {
  return <h2 style={{ margin: '0 0 14px', fontSize: 30, lineHeight: 1.12, letterSpacing: '-0.02em', fontWeight: 700, color: 'var(--text)' }}>{children}</h2>;
}
function P({ children, style }) {
  return <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 680, ...style }}>{children}</p>;
}

function Sidebar() {
  const [active, setActive] = useStateD('start');
  useEffectD(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-72px 0px -65% 0px' });
    SECTIONS.forEach(([id]) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <aside style={{ position: 'sticky', top: 84, alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ ...mono, fontSize: 10, letterSpacing: 'var(--track-label)', color: 'var(--dim)', marginBottom: 12, paddingLeft: 12 }}>ON THIS PAGE</div>
      {SECTIONS.map(([id, label]) => {
        const on = active === id;
        return (
          <a key={id} href={'#' + id} style={{
            fontSize: 13.5, textDecoration: 'none', padding: '7px 12px', borderRadius: 'var(--r-md)',
            color: on ? 'var(--text)' : 'var(--text-secondary)',
            background: on ? 'var(--green-soft)' : 'transparent',
            borderLeft: on ? '2px solid var(--green)' : '2px solid transparent',
          }}>{label}</a>
        );
      })}
    </aside>
  );
}

function MethodCard({ tag, tagColor, title, viz, best, notes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {viz}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ ...mono, fontSize: 10, letterSpacing: 'var(--track-label)', color: tagColor }}>{tag}</span>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, color: 'var(--text)' }}>{title}</h3>
        </div>
        <div style={{ ...mono, fontSize: 12.5, color: 'var(--green)', marginBottom: 10 }}>best for: {best}</div>
        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {notes.map((n, i) => <li key={i} style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--text-secondary)' }}>{n}</li>)}
        </ul>
      </div>
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ ...mono, flex: '0 0 auto', width: 34, height: 34, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--green-soft)', border: '0.5px solid rgba(70,217,140,0.4)', color: 'var(--green)', fontSize: 14 }}>{n}</div>
      <div>
        <div style={{ fontSize: 16.5, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{title}</div>
        <P style={{ fontSize: 15 }}>{children}</P>
      </div>
    </div>
  );
}

function PocketDocs() {
  return (
    <div style={{ background: 'linear-gradient(180deg,var(--bg-top),var(--bg-bottom))', minHeight: '100vh' }}>
      <SubNav />
      <PageHero
        eyebrow="Docs · Manual"
        title="How Pocket hears you."
        lede="Pocket grades timing two ways — MIDI and audio onset detection. This is how each works, when to reach for which, and how to calibrate loopback on iPhone."
        accent="var(--cyan)"
      />

      <div style={{ ...wrapD, display: 'grid', gridTemplateColumns: '220px 1fr', gap: 56, paddingTop: 8, paddingBottom: 96 }}>
        <Sidebar />
        <div>
          <DocSection id="start" title="Getting started" accent="var(--green)">
            <H3>Three taps to your first score.</H3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 22, maxWidth: 700 }}>
              <Step n="1" title="Pick a groove">Choose a pattern from the library — quarter pulse, off-beats, swung 8ths — or load your own. The pattern sets the subdivision grid Pocket grades you against.</Step>
              <Step n="2" title="Choose your input">Connect a MIDI device, or let Pocket listen through the mic. On iPhone with the built-in speaker, run loopback calibration first (below).</Step>
              <Step n="3" title="Press play and lock in">Play along. Each hit lands on the sweep lane and folds into your timing cloud. Your score is the level you held and how tight you stayed.</Step>
            </div>
          </DocSection>

          <DocSection id="input" title="Input methods" accent="var(--cyan)">
            <H3>Two ways to grade a hit.</H3>
            <P>Every grade comes from a timestamp: the exact moment your note landed, compared to where the grid said it should. Pocket gets that timestamp one of two ways — and the method you choose changes how tight the resolution is.</P>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, marginTop: 30 }}>
              <MethodCard
                tag="METHOD A" tagColor="var(--cyan)" title="MIDI input" viz={<MidiViz />}
                best="keyboards · e-drums · pad controllers"
                notes={[
                  'Note-on events carry their own timestamp — no detection guesswork.',
                  'Sample-accurate: resolution is limited only by your interface, not the room.',
                  'Immune to acoustic noise, bleed, and speaker loopback entirely.',
                ]}
              />
              <MethodCard
                tag="METHOD B" tagColor="var(--green)" title="Audio onset detection" viz={<OnsetViz />}
                best="acoustic drums · guitar · vocals · claps"
                notes={[
                  'Pocket watches the mic signal and picks the transient — the attack of each hit.',
                  'Works with anything that makes a sound; no special gear needed.',
                  'A touch softer in resolution (~±4 ms) and sensitive to the room and the click bleeding into the mic.',
                ]}
              />
            </div>
          </DocSection>

          <DocSection id="midi" title="MIDI input" accent="var(--cyan)">
            <H3>The precise one.</H3>
            <P>When a MIDI note arrives, it already knows when it happened. Pocket reads that timestamp straight off the event and compares it to the host clock — there's nothing to detect and nothing to guess. This is the tightest grade Pocket can give, and it never has to think about the room.</P>
            <div style={{ ...panel, padding: 20, marginTop: 20, maxWidth: 680, display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              <StatD label="RESOLUTION" value="sample-accurate" color="var(--green)" />
              <StatD label="LATENCY SOURCE" value="interface only" color="var(--text)" />
              <StatD label="ROOM NOISE" value="ignored" color="var(--cyan)" />
            </div>
            <P style={{ marginTop: 16 }}>Reach for MIDI whenever you can. If you're on a keyboard, an electronic kit, or a pad controller, this is the mode that shows your real time.</P>
          </DocSection>

          <DocSection id="audio" title="Audio onset detection" accent="var(--green)">
            <H3>The everywhere one.</H3>
            <P>Acoustic instruments don't send MIDI — so Pocket listens. It runs the mic signal through an onset detector that finds the sharp rise at the start of each hit (the attack) and stamps that moment as your note. A snare crack, a guitar pluck, a hand clap: each has a transient Pocket can lock onto.</P>
            <P style={{ marginTop: 14 }}>It's remarkably good, but it's reading a sound wave in a real room. Reflections, background noise, and — most importantly on iPhone — the metronome click leaking out the speaker and back into the mic can all blur the attack. That last one is what loopback calibration solves.</P>
          </DocSection>

          <DocSection id="loopback" title="Loopback calibration" accent="var(--purple)">
            <H3>Teaching Pocket to ignore its own click.</H3>
            <P style={{ marginBottom: 22 }}>On iPhone, the click plays out the same device that's listening. The mic hears your playing <em>and</em> the click bouncing back a few milliseconds late — which would smear your grade. Calibration measures that round-trip so Pocket can align the grid and subtract the click.</P>
            <LoopbackDiagram />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 22, maxWidth: 720 }}>
              <div style={{ ...panel, padding: 18 }}>
                <div style={{ ...mono, fontSize: 11, color: 'var(--green)', marginBottom: 8 }}>RECOMMENDED · earbuds</div>
                <P style={{ fontSize: 14.5 }}>Wear earbuds and the click never reaches the mic — no loopback, cleanest grade. Calibration still aligns output latency in one tap.</P>
              </div>
              <div style={{ ...panel, padding: 18 }}>
                <div style={{ ...mono, fontSize: 11, color: 'var(--cyan)', marginBottom: 8 }}>OK · speaker + mic</div>
                <P style={{ fontSize: 14.5 }}>Using the built-in speaker works once calibrated. Keep the volume moderate and the room quiet so the click stays cleanly subtractable.</P>
              </div>
            </div>
          </DocSection>

          <DocSection id="choosing" title="Which to use" accent="var(--text)">
            <H3>Pick by what you play.</H3>
            <div style={{ ...panel, overflow: 'hidden', marginTop: 18, maxWidth: 720 }}>
              {[
                ['You play keys, e-drums, or pads', 'MIDI', 'var(--cyan)', 'tightest possible grade'],
                ['Acoustic drums or percussion', 'Audio onset', 'var(--green)', 'great with a quiet room'],
                ['Guitar, bass, or vocals', 'Audio onset', 'var(--green)', 'transient-rich, locks well'],
                ['iPhone, no earbuds', 'Audio + calibration', 'var(--purple)', 'run loopback first'],
                ['Loud or echoey space', 'MIDI if possible', 'var(--cyan)', 'audio struggles with bleed'],
              ].map(([scenario, method, col, note], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', padding: '15px 20px', borderTop: i ? '0.5px solid var(--stroke)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 15.5, color: 'var(--text)' }}>{scenario}</div>
                    <div style={{ ...mono, fontSize: 12, color: 'var(--dim)', marginTop: 2 }}>{note}</div>
                  </div>
                  <span style={{ ...mono, fontSize: 13, color: col, whiteSpace: 'nowrap' }}>{method}</span>
                </div>
              ))}
            </div>
          </DocSection>

          <DocSection id="scoring" title="How scoring works" accent="var(--green)">
            <H3>Level held × how tight.</H3>
            <P>Pocket doesn't give you a vague "good job." Every hit graded continuously green (0 ms) → amber → red (≥50 ms). Across a session, those grades become four readouts:</P>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18, marginTop: 22, maxWidth: 680 }}>
              {[
                ['BIAS', 'Do you rush or drag? The average signed error — +ms late, −ms early.', 'var(--text)'],
                ['σ', 'Consistency. How spread out your hits are, in ms. Smaller is tighter.', 'var(--cyan)'],
                ['TIGHT', 'The share of hits that landed inside the pocket window.', 'var(--green)'],
                ['Lvl · %', 'Your score: the guidance level you held, times how tight you stayed there.', 'var(--purple)'],
              ].map(([l, d, col]) => (
                <div key={l} style={{ ...panel, padding: 18 }}>
                  <div style={{ ...mono, fontSize: 12, letterSpacing: 'var(--track-label)', color: col, marginBottom: 8 }}>{l}</div>
                  <P style={{ fontSize: 14.5 }}>{d}</P>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 30 }}>
              <ButtonD variant="primary" size="lg" icon="▶">Get Pocket — $29</ButtonD>
            </div>
          </DocSection>
        </div>
      </div>

      <SubFooter />
    </div>
  );
}

window.PocketDocs = PocketDocs;
