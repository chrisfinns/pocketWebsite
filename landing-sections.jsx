// Pocket landing page — data-viz components + sections.
// Dark instrument aesthetic. Uses the bound DS components where they fit and
// builds the brand's signature data visualizations (sweep lane, timing cloud,
// trend bars) as the hero imagery.
// Exports to window: PocketLanding.

const { useState, useEffect, useRef, useContext } = React;
const DS = window.PocketDesignSystem_184e86;
const { Button, Stat, Panel, BeatBars, Chip, MiniPattern, Segmented } = DS;
const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor } = window;

// ---- Energy: the kinetic feel of the whole page (tempo of the beat,
// how fast hits climb, how hot the glow runs). One expressive lever. ----
const ENERGY = {
  'laid-back': { spawnMs: 780, rise: 30, beatMs: 760, glow: 8,  bpm: 52,  flash: 0.7 },
  'steady':    { spawnMs: 520, rise: 46, beatMs: 520, glow: 12, bpm: 70,  flash: 0.85 },
  'driving':   { spawnMs: 320, rise: 70, beatMs: 340, glow: 20, bpm: 104, flash: 1 },
};
const EnergyCtx = React.createContext('steady');
function useEnergy() { return ENERGY[useContext(EnergyCtx)] || ENERGY.steady; }

// continuous grade color by |error| ms (green→amber→red), never bucketed
function gradeColor(ms) {
  const a = Math.min(Math.abs(ms), 50) / 50; // 0..1
  // green #46D98C → amber #D9C04E → red #D95E4E
  const lerp = (x, y, t) => Math.round(x + (y - x) * t);
  let r, g, b;
  if (a < 0.5) {
    const t = a / 0.5;
    r = lerp(0x46, 0xD9, t); g = lerp(0xD9, 0xC0, t); b = lerp(0x8C, 0x4E, t);
  } else {
    const t = (a - 0.5) / 0.5;
    r = lerp(0xD9, 0xD9, t); g = lerp(0xC0, 0x5E, t); b = lerp(0x4E, 0x4E, t);
  }
  return `rgb(${r},${g},${b})`;
}

// ---------------------------------------------------------------------------
// HERO SWEEP LANE — live: hits spawn at the pocket line and drift smoothly
// upward (rAF, time-based) graded by timing, fading as they rise.
// ---------------------------------------------------------------------------
function SweepLane({ height = 360, readout = true, nowLine = true }) {
  const compact = height <= 150;
  const hostRef = useRef(null);
  const reduced = useRef(false);

  // vertical % position for a timing error: early (neg) → top, late (pos) → bottom
  const yPct = (err) => 50 + Math.max(-1, Math.min(1, err / 70)) * 40;
  const NOW_PAD = 14;       // px from right edge where "now" sits

  // build one dot+stem element anchored at vertical center, at the "now" column
  function makeHit(err, c) {
    const wrap = document.createElement('div');
    Object.assign(wrap.style, {
      position: 'absolute', top: 0, bottom: 0, width: '0px',
      willChange: 'transform, opacity',
    });
    const y = yPct(err);
    const stem = document.createElement('div');
    const top = Math.min(50, y), h = Math.abs(y - 50);
    Object.assign(stem.style, {
      position: 'absolute', left: '-0.5px', width: '1.5px',
      top: top + '%', height: h + '%', background: c, opacity: '0.5',
    });
    const dot = document.createElement('div');
    const d = compact ? 9 : 13;
    Object.assign(dot.style, {
      position: 'absolute', left: '0', top: y + '%',
      width: d + 'px', height: d + 'px', borderRadius: '50%', background: c,
      transform: 'translate(-50%,-50%)', boxShadow: `0 0 12px ${c}`,
    });
    wrap.appendChild(stem); wrap.appendChild(dot);
    return wrap;
  }

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const host = hostRef.current;
    if (!host) return;
    const layer = host.querySelector('[data-hits]');
    const readNum = host.querySelector('[data-read-num]');

    // ---- reduced motion: static representative scatter, no loop ----
    if (reduced.current) {
      const W = host.clientWidth;
      for (let i = 0; i < 14; i++) {
        const err = Math.sin(i * 1.9) * 34;
        const el = makeHit(err, gradeColor(err));
        el.style.transform = `translateX(${(W - NOW_PAD) * (0.06 + i / 15)}px)`;
        el.style.opacity = '0.85';
        layer.appendChild(el);
      }
      const last = Math.sin(13 * 1.9) * 34;
      if (readNum) { readNum.textContent = (last >= 0 ? '+' : '') + Math.round(last); readNum.style.color = gradeColor(last); }
      return;
    }

    // ---- live: hits spawn at "now" (right) and drift left ----
    const DRIFT = 74;         // px per second leftward
    const SPAWN_MS = 520;     // a hit every beat
    const FADE = 70;          // px from left edge where opacity reaches 0
    let hits = [];            // {x, born, el}
    let raf, lastSpawn = 0, running = true;

    function spawn(now) {
      const err = (Math.random() - 0.5) * 70 * (0.45 + Math.random() * 0.65);
      const c = gradeColor(err);
      const el = makeHit(err, c);
      layer.appendChild(el);
      hits.push({ x: host.clientWidth - NOW_PAD, born: now, prev: now, el });
      if (readNum) { readNum.textContent = (err >= 0 ? '+' : '') + Math.round(err); readNum.style.color = c; }
    }

    function frame(now) {
      if (!running) return;
      if (now - lastSpawn >= SPAWN_MS) { spawn(now); lastSpawn = now; }
      hits = hits.filter(h => {
        h.x -= DRIFT * (now - h.prev) / 1000;
        h.prev = now;
        if (h.x < -16) { h.el.remove(); return false; }
        const age = now - h.born;
        const fadeIn = Math.min(1, age / 120);
        const fadeOut = Math.max(0, Math.min(1, h.x / FADE));
        h.el.style.transform = `translateX(${h.x.toFixed(1)}px)`;
        h.el.style.opacity = String(fadeIn * (0.32 + 0.68 * fadeOut));
        return true;
      });
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => { running = false; cancelAnimationFrame(raf); hits.forEach(h => h.el.remove()); };
  }, []);

  // scrolling groove grid — vertical notches that mark the beat (brand cyan, not purple)
  const gridRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const g = gridRef.current; if (!g) return;
    const anim = g.animate(
      [{ backgroundPositionX: '0px' }, { backgroundPositionX: '-148px' }],
      { duration: 2080, iterations: Infinity, easing: 'linear' }
    );
    return () => anim.cancel();
  }, []);

  return (
    <div ref={hostRef} style={{
      position: 'relative', height, borderRadius: 'var(--r-xl)',
      background: 'linear-gradient(180deg,#101317,#0b0d10)',
      border: '0.5px solid var(--stroke)', overflow: 'hidden',
    }}>
      {/* soft pocket band — the in-the-pocket window (centered horizontally) */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: '40%', bottom: '40%', background: 'linear-gradient(180deg,transparent,rgba(70,217,140,0.10),transparent)' }} />
      {/* scrolling groove grid — vertical beat notches, cyan */}
      <div ref={gridRef} style={{
        position: 'absolute', left: 0, right: 0, top: '34%', bottom: '34%',
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(86,196,255,0.42) 0 2px, transparent 2px 74px)',
      }} />
      {/* ±ms tick lines — labeled, instrument-like */}
      {[[-25, '25%'], [25, '75%']].map(([ms, top]) => (
        <div key={ms} style={{ position: 'absolute', left: 0, right: 0, top, height: 1, borderTop: '1px dashed rgba(255,255,255,0.10)' }}>
          {!compact && <span style={{ position: 'absolute', top: 4, left: 14, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--dim)' }}>{Math.abs(ms)} ms</span>}
        </div>
      ))}
      {/* center pocket line — always green, bright */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 2, marginTop: -1, background: 'var(--green)', boxShadow: 'var(--glow-green)' }} />
      {/* "now" line at the right edge */}
      {nowLine && <div style={{ position: 'absolute', top: 0, bottom: 0, right: NOW_PAD, width: 2, background: 'rgba(255,255,255,0.22)' }} />}
      {/* early / late edge labels */}
      {!compact && <span style={{ position: 'absolute', top: 32, left: 14, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>early ↑</span>}
      {!compact && <span style={{ position: 'absolute', bottom: '6%', left: 14, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>late ↓</span>}
      <div style={{ position: 'absolute', top: 12, left: 14, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 'var(--track-label)', color: 'var(--muted)' }}>SWEEP LANE</div>
      <div style={{ position: 'absolute', top: 12, right: NOW_PAD + 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 'var(--track-label)', color: 'var(--dim)' }}>early ↑ / late ↓ · now →</div>
      {/* hit layer — populated imperatively for smooth rAF motion */}
      <div data-hits style={{ position: 'absolute', inset: 0 }} />
      {/* live last-hit readout */}
      {readout && <div style={{ position: 'absolute', bottom: compact ? 8 : 12, right: NOW_PAD + 10, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span data-read-num style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 20 : 28, color: 'var(--green)' }}>+0</span>
        <span data-read-ms style={{ fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 12, color: 'var(--muted)' }}>ms</span>
      </div>}
    </div>
  );
}

// pulsing live beat-bar row (the metronome, on-brand)
function LiveBeat() {
  const cfg = useEnergy();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const iv = setInterval(() => setActive(a => (a + 1) % 4), cfg.beatMs);
    return () => clearInterval(iv);
  }, [cfg.beatMs]);
  return <BeatBars beats={4} active={active} flash={cfg.flash} />;
}

// ---------------------------------------------------------------------------
// PRACTICE HERO — the app's REAL primary timing view: a live "LAST HIT" ms
// readout with verdict, pulsing beat bars, and the BIAS / σ / TIGHT trio.
// The sweep lane rides along underneath as a bonus.
// ---------------------------------------------------------------------------
function verdictOf(ms) {
  if (Math.abs(ms) <= 15) return 'in the pocket';
  return ms < 0 ? 'early' : 'late';
}

function PracticeHero() {
  const cfg = useEnergy();
  const [s, setS] = useState({ beat: -1, ms: null, bias: 0, sigma: 0, tight: 0 });
  const hist = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hist.current = [4, -8, 2, 11, -3, 6, -12, 1, 9, -5, 3, 7];
      const arr = hist.current, mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      const sigma = Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length);
      setS({ beat: 0, ms: 3, bias: Math.round(mean), sigma: Math.round(sigma), tight: Math.round(100 * arr.filter(x => Math.abs(x) <= 15).length / arr.length) });
      return;
    }
    let beat = -1;
    const iv = setInterval(() => {
      beat = (beat + 1) % 4;
      const err = Math.round((Math.random() - 0.46) * 64 * (0.5 + Math.random() * 0.6));
      hist.current = [...hist.current, err].slice(-32);
      const arr = hist.current;
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      const sigma = Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length);
      setS({
        beat, ms: err,
        bias: Math.round(mean), sigma: Math.round(sigma),
        tight: Math.round(100 * arr.filter(x => Math.abs(x) <= 15).length / arr.length),
      });
    }, cfg.beatMs);
    return () => clearInterval(iv);
  }, [cfg.beatMs]);

  const c = s.ms == null ? 'var(--dim)' : gradeColor(s.ms);

  return (
    <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '0.5px solid var(--stroke-strong)', background: 'linear-gradient(180deg,#121417,#0c0e11)', boxShadow: 'var(--shadow-pop)' }}>
      {/* titlebar — reads as the real macOS app */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 34, padding: '0 14px', background: 'var(--bar)', borderBottom: '0.5px solid var(--stroke)' }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map(d => <span key={d} style={{ width: 11, height: 11, borderRadius: '50%', background: d }} />)}
        <span style={{ flex: 1, textAlign: 'center', fontSize: 12.5, color: 'var(--muted)', fontWeight: 500 }}>Practice</span>
        <span style={{ fontSize: 13, color: 'var(--dim)' }}>⚙</span>
      </div>

      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BeatBars beats={4} active={s.beat} flash={cfg.flash} />

        {/* the centerpiece: LAST HIT */}
        <div style={{ textAlign: 'center', padding: '14px 0 6px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 'var(--track-label)', color: 'var(--muted)' }}>LAST HIT</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 64, lineHeight: 1.05, fontWeight: 500, color: c, transition: 'color .25s var(--ease)' }}>
            {s.ms == null ? '—' : (s.ms >= 0 ? '+' : '') + s.ms}
            <span style={{ fontSize: 22, color: 'var(--muted)' }}> ms</span>
          </div>
          <div style={{ fontSize: 14, color: c, transition: 'color .25s var(--ease)' }}>{s.ms == null ? 'play a note to begin' : verdictOf(s.ms)}</div>
        </div>

        {/* stat trio */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[['BIAS', s.ms == null ? '—' : (s.bias >= 0 ? '+' : '') + s.bias + ' ms', 'var(--text)'],
            ['σ', s.ms == null ? '—' : '±' + s.sigma + ' ms', 'var(--cyan)'],
            ['TIGHT', s.ms == null ? '—' : s.tight + '%', 'var(--green)']].map(([l, v, col]) => (
            <div key={l} style={{ flex: 1, textAlign: 'center', padding: '12px 8px', borderRadius: 'var(--r-md)', background: 'var(--fill-faint)', border: '0.5px solid var(--stroke)' }}>
              <div style={{ fontSize: 10, letterSpacing: 'var(--track-label)', color: 'var(--muted)' }}>{l}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 19, color: col, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* BONUS: the sweep lane rides along underneath */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 'var(--track-label)', color: 'var(--purple)' }}>+ BONUS</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 'var(--track-label)', color: 'var(--dim)' }}>SWEEP LANE</span>
          </div>
          <SweepLane height={120} readout={false} nowLine={false} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DISTRIBUTION CLOUD — static feature viz
// ---------------------------------------------------------------------------
function TimingCloud() {
  const pts = Array.from({ length: 70 }).map((_, i) => {
    const g = (Math.sin(i * 12.9898) * 43758.5) % 1;
    const r = Math.abs(g);
    const err = (r - 0.5) * 60 + 4; // slight rush bias
    return { x: 50 + (err / 60) * 60, y: 30 + ((Math.cos(i * 4.1) + 1) / 2) * 40, err };
  });
  return (
    <div style={{ position: 'relative', height: 240, borderRadius: 'var(--r-lg)', background: '#101317', border: '0.5px solid var(--stroke)', overflow: 'hidden' }}>
      {/* σ band + pocket band */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '32%', right: '32%', border: '0.5px solid rgba(43,212,230,0.25)', borderTop: 'none', borderBottom: 'none', background: 'rgba(43,212,230,0.04)' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '44%', right: '44%', background: 'linear-gradient(90deg,transparent,rgba(70,217,140,0.10),transparent)' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, marginLeft: -1, background: 'var(--green)', opacity: 0.85 }} />
      {pts.map((p, i) => (
        <div key={i} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: 7, height: 7, borderRadius: '50%', background: gradeColor(p.err), opacity: 0.8, transform: 'translate(-50%,-50%)' }} />
      ))}
      <div style={{ position: 'absolute', top: 12, left: 14, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 'var(--track-label)', color: 'var(--muted)' }}>TIMING DISTRIBUTION</div>
      <div style={{ position: 'absolute', bottom: 10, left: '32%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--cyan)' }}>−σ</div>
      <div style={{ position: 'absolute', bottom: 10, left: '68%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--cyan)' }}>+σ</div>
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--green)' }}>0</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TREND BARS — history / progress viz (climbing tightness)
// ---------------------------------------------------------------------------
function TrendBars() {
  const vals = [38, 41, 40, 47, 52, 49, 58, 63, 61, 69, 74, 78];
  const max = 80;
  return (
    <div style={{ position: 'relative', height: 240, borderRadius: 'var(--r-lg)', background: '#101317', border: '0.5px solid var(--stroke)', padding: '40px 18px 18px', display: 'flex', alignItems: 'flex-end', gap: 8 }}>
      <div style={{ position: 'absolute', top: 12, left: 14, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 'var(--track-label)', color: 'var(--muted)' }}>TIGHTNESS TREND · % TIGHT</div>
      {vals.map((v, i) => (
        <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, borderRadius: 'var(--r-sm) var(--r-sm) 2px 2px', background: i >= vals.length - 2 ? 'var(--green)' : 'linear-gradient(180deg,var(--cyan),rgba(43,212,230,0.25))', boxShadow: i === vals.length - 1 ? 'var(--glow-green)' : 'none' }} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// GUIDANCE LADDER — help fades as you climb Lvl 1→6; score = Lvl N · % tight
// ---------------------------------------------------------------------------
function GuidanceLadder() {
  const levels = [
    ['L1', 'Play-along', 6],
    ['L2', 'Groove quieter', 5],
    ['L3', 'Pulse only', 3],
    ['L4', 'Pulse on 1 & 3', 2],
    ['L5', 'Downbeat only', 1],
    ['L6', 'Adaptive · solo', 0],
  ];
  const here = 2; // current level (L3)
  return (
    <div style={{ position: 'relative', borderRadius: 'var(--r-lg)', background: '#101317', border: '0.5px solid var(--stroke)', padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 'var(--track-label)', color: 'var(--muted)' }}>GUIDANCE</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 'var(--track-label)', color: 'var(--dim)' }}>HELP FADES ↓</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {levels.map(([id, name, help], i) => {
          const active = i === here;
          return (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '7px 10px', borderRadius: 'var(--r-md)', background: active ? 'var(--green-soft)' : 'var(--fill-faint)', border: active ? '0.5px solid rgba(70,217,140,0.4)' : '0.5px solid transparent' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, width: 22, color: active ? 'var(--green)' : 'var(--muted)' }}>{id}</span>
              <span style={{ fontSize: 13, flex: 1, color: active ? 'var(--text)' : 'var(--text-secondary)' }}>{name}</span>
              {/* help meter — 6 pips, lit ones are the help still given */}
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: 6 }).map((_, p) => (
                  <span key={p} style={{ width: 7, height: 7, borderRadius: 2, background: p < help ? 'var(--cyan)' : 'var(--fill-soft)', opacity: p < help ? (active ? 1 : 0.55) : 1 }} />
                ))}
              </div>
              {active && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)', width: 64, textAlign: 'right' }}>57% tight</span>}
              {!active && <span style={{ width: 64 }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------
const wrap = { maxWidth: 1120, margin: '0 auto', padding: '0 32px' };

function Nav() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,11,13,0.72)', backdropFilter: 'blur(14px)', borderBottom: '0.5px solid var(--stroke)' }}>
      <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <img src={(window.__resources && window.__resources.wordmark) || 'assets/wordmark-pocket-dark.svg'} alt="pocket" style={{ height: 22 }} />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {[['Features', '#features'], ['How it works', '#how'], ['Reviews', '#reviews'], ['FAQ', '#faq']].map(([t, h]) => (
            <a key={t} href={h} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>{t}</a>
          ))}
          <Button variant="primary" icon="▶">Get Pocket</Button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const cfg = useEnergy();
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ ...wrap, paddingTop: 76, paddingBottom: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 'var(--r-pill)', background: 'var(--green-soft)', border: '0.5px solid rgba(70,217,140,0.3)', marginBottom: 22 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: 'var(--glow-green)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)', letterSpacing: '0.02em' }}>see if you rush or drag</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 60, lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 700, color: 'var(--text)' }}>
            find the<br />pocket.
          </h1>
          <p style={{ marginTop: 22, fontSize: 19, lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 440 }}>
            Pocket listens to every note you play and grades your timing to the millisecond. Stop guessing if you rush or drag — <span style={{ color: 'var(--green)' }}>lock the green beat</span> and feel it.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 30, alignItems: 'center' }}>
            <Button variant="primary" size="lg" icon="▶">Get Pocket — $29</Button>
            <Button variant="plain" accent="var(--text-secondary)">Watch the demo</Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 28 }}>
            <LiveBeat />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--dim)' }}>{cfg.bpm} BPM · 1/4 · MIDI + Audio</span>
          </div>
        </div>
        <PracticeHero />
      </div>
    </section>
  );
}

function ProofStrip() {
  const stats = [['12k+', 'players in the pocket'], ['<5 ms', 'grading resolution'], ['4.9★', 'on the App Store'], ['180+', 'grooves & patterns']];
  return (
    <section style={{ borderTop: '0.5px solid var(--stroke)', borderBottom: '0.5px solid var(--stroke)', background: 'var(--bar)' }}>
      <div style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, padding: '26px 32px' }}>
        {stats.map(([v, l], i) => (
          <div key={l} style={{ textAlign: 'center', borderLeft: i ? '0.5px solid var(--stroke)' : 'none' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 30, color: i === 0 ? 'var(--green)' : 'var(--text)', fontWeight: 500 }}>{v}</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const sectionStyle = { ...wrap, paddingTop: 88, paddingBottom: 88 };
function Eyebrow({ children, color = 'var(--cyan)' }) {
  return <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color, marginBottom: 14 }}>{children}</div>;
}
function H2({ children }) {
  return <h2 style={{ margin: 0, fontSize: 38, lineHeight: 1.1, letterSpacing: '-0.025em', fontWeight: 700, color: 'var(--text)' }}>{children}</h2>;
}
function Body({ children, style }) {
  return <p style={{ fontSize: 16.5, lineHeight: 1.55, color: 'var(--text-secondary)', ...style }}>{children}</p>;
}

function Features() {
  const rows = [
    {
      eyebrow: 'The sweep lane', accent: 'var(--cyan)',
      title: 'Every hit, placed in real time.',
      body: 'Play along and each note lands on the lane — above the line if you rushed, below if you dragged. The center is always green: that\u2019s the pocket. You see exactly where your time lives.',
      stats: [['LAST HIT', '+3 ms', 'var(--green)'], ['INPUT', 'MIDI · Audio', 'var(--text)']],
      viz: <SweepLane height={240} />,
    },
    {
      eyebrow: 'Timing distribution', accent: 'var(--green)',
      title: 'See your timing, not just hear it.',
      body: 'Every session folds into a timing cloud. Pocket reads your bias (do you rush or drag?), your consistency (σ), and the share of hits that landed tight — the numbers a metronome can never tell you.',
      stats: [['BIAS', '+3 ms', 'var(--text)'], ['σ', '±12 ms', 'var(--cyan)'], ['TIGHT', '57%', 'var(--green)']],
      viz: <TimingCloud />,
    },
    {
      eyebrow: 'Grooves & patterns', accent: 'var(--purple)',
      title: 'A groove for every feel.',
      body: 'Quarter pulse, off-beats, swung 8ths, clave, your own custom patterns — load any groove and Pocket grades you against its subdivision grid. Build a library and chase your best % on each.',
      patterns: true,
      viz: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: 240, justifyContent: 'center', padding: 18, borderRadius: 'var(--r-lg)', background: '#101317', border: '0.5px solid var(--stroke)' }}>
          {[[0, 4, 8, 12], [2, 6, 10, 14], [0, 3, 6, 8, 11, 14]].map((on, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Chip accent="var(--purple)" star={[27, 41, 18][i]}>{['Quarter pulse', 'Off-beats', 'Swung 8ths'][i]}</Chip>
              <div style={{ flex: 1 }}><MiniPattern onsets={on} /></div>
            </div>
          ))}
        </div>
      ),
    },
    {
      eyebrow: 'Guidance & scoring', accent: 'var(--purple)',
      title: 'The help fades as you lock it in.',
      body: 'Start at Level 1 with the groove and a steady metronome under you. As your timing tightens, climb the ladder — the groove drops back first, then the pulse thins out: clicks on 1 and 3, then just the downbeat, then nothing at all. By the top you\u2019re holding it solo. Your score is the level you reached and how tight you stayed: chase a higher Lvl · % on every groove.',
      stats: [['CURRENT', 'Lvl 3', 'var(--purple)'], ['HELD AT', '57% tight', 'var(--green)'], ['NEXT', 'Lvl 4', 'var(--text)']],
      viz: <GuidanceLadder />,
    },
    {
      eyebrow: 'History & progress', accent: 'var(--cyan)',
      title: 'Watch your pocket tighten.',
      body: 'Pocket logs every session and tracks your tightness trend over time. The bars climb as your σ shrinks — progress you can actually read, measured in milliseconds.',
      stats: [['BEST', 'Lvl 3 · 57%', 'var(--green)'], ['STREAK', '14 days', 'var(--text)']],
      viz: <TrendBars />,
    },
  ];
  return (
    <section id="features">
      <div style={sectionStyle}>
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 64px' }}>
          <Eyebrow>Features</Eyebrow>
          <H2>The metronome tells you the beat. Pocket tells you how close you were.</H2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 72 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
              <div style={{ order: i % 2 ? 2 : 1 }}>
                <Eyebrow color={r.accent}>{r.eyebrow}</Eyebrow>
                <H2>{r.title}</H2>
                <Body style={{ marginTop: 16, marginBottom: 22 }}>{r.body}</Body>
                {r.stats && (
                  <div style={{ display: 'flex', gap: 28 }}>
                    {r.stats.map(([l, v, c]) => (
                      <div key={l}>
                        <div style={{ fontSize: 10, letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: 'var(--muted)' }}>{l}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: c, marginTop: 4 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ order: i % 2 ? 1 : 2 }}>{r.viz}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ['01', 'Pick a groove', 'Load a quarter pulse, a swung pattern, or build your own in the editor. Set your tempo and subdivision.'],
    ['02', 'Press play & play along', 'Connect MIDI or just use your mic. Pocket\u2019s onset detection catches every note you play in time with the click.'],
    ['03', 'Read your timing', 'Each hit drops on the lane and folds into your distribution. Watch bias, σ, and % tight update live, then fade the help as you lock it in.'],
  ];
  return (
    <section id="how" style={{ background: 'linear-gradient(180deg,#080a0c,#0a0b0d)', borderTop: '0.5px solid var(--stroke)', borderBottom: '0.5px solid var(--stroke)' }}>
      <div style={sectionStyle}>
        <div style={{ marginBottom: 48 }}>
          <Eyebrow color="var(--green)">How it works</Eyebrow>
          <H2>Three steps to a tighter pocket.</H2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {steps.map(([n, t, b]) => (
            <Panel key={n} pad={24} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, color: 'var(--green)', fontWeight: 500 }}>{n}</div>
              <div style={{ fontSize: 19, fontWeight: 600, color: 'var(--text)' }}>{t}</div>
              <Body style={{ fontSize: 15, margin: 0 }}>{b}</Body>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const quotes = [
    ['Genuinely changed how I practice. I always thought I had good time — turns out I rush every fill by 15 ms. Now I can see it and fix it.', 'Maya R.', 'Session drummer'],
    ['The millisecond readout is addictive. Chasing a tighter σ feels like a video game, except it actually makes me a better player.', 'Devin K.', 'Bassist, producer'],
    ['Every other metronome just clicks at you. Pocket shows you the why. The timing cloud after a session is worth the price alone.', 'Tomás L.', 'Guitar teacher'],
  ];
  return (
    <section id="reviews">
      <div style={sectionStyle}>
        <div style={{ marginBottom: 48 }}>
          <Eyebrow color="var(--purple)">Reviews</Eyebrow>
          <H2>Players don't go back to a plain click.</H2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {quotes.map(([q, name, role], i) => (
            <Panel key={i} pad={24} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ color: 'var(--green)', fontSize: 14, letterSpacing: 2 }}>★★★★★</div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: 'var(--text)' }}>{q}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,var(--cyan),var(--purple))', opacity: 0.85 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{role}</div>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, open, onClick }) {
  return (
    <div style={{ borderBottom: '0.5px solid var(--stroke)' }}>
      <button onClick={onClick} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '20px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', gap: 20 }}>
        <span style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)' }}>{q}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: open ? 'var(--green)' : 'var(--muted)', transition: 'transform var(--dur) var(--ease)', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: 'hidden', transition: 'max-height var(--dur-slow) var(--ease)' }}>
        <p style={{ margin: 0, padding: '0 4px 22px', fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: 680 }}>{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
    ['Do I need a MIDI instrument?', 'No. Pocket works with MIDI for sample-accurate input, but its audio onset detection lets you use any acoustic or electric instrument through your mic — drums, guitar, piano, anything with an attack.'],
    ['How accurate is the grading?', 'Pocket grades every hit against the subdivision grid to within 5 ms, synced to the host clock. The timing color is continuous — green at 0 ms, sliding to amber and red as your error grows — never rounded into buckets.'],
    ['What does "in the pocket" actually measure?', 'Three things: your bias (whether you consistently rush or drag, in ms), your σ (how consistent your timing is hit-to-hit), and your % tight (the share of hits that landed inside the pocket window).'],
    ['Is it a one-time purchase?', 'Yes — $29 buys Pocket outright, no subscription. That includes the full groove library, the pattern editor, and unlimited session history.'],
    ['What platforms does it run on?', 'Pocket is native on macOS today, with iOS coming next. Your session history and custom grooves sync across both.'],
  ];
  return (
    <section id="faq" style={{ background: 'var(--bar)', borderTop: '0.5px solid var(--stroke)' }}>
      <div style={{ ...sectionStyle, maxWidth: 820 }}>
        <div style={{ marginBottom: 36 }}>
          <Eyebrow>FAQ</Eyebrow>
          <H2>Questions, answered.</H2>
        </div>
        <div>
          {items.map(([q, a], i) => (
            <FAQItem key={i} q={q} a={a} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ ...sectionStyle, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}><LiveBeat /></div>
        <h2 style={{ margin: '0 auto', fontSize: 46, lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 700, color: 'var(--text)', maxWidth: 640 }}>
          Stop counting. Start feeling the <span style={{ color: 'var(--green)' }}>pocket</span>.
        </h2>
        <Body style={{ maxWidth: 480, margin: '20px auto 32px', textAlign: 'center' }}>
          One-time $29. The full groove library, the pattern editor, and every millisecond of your timing.
        </Body>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <Button variant="primary" size="lg" icon="▶">Get Pocket — $29</Button>
          <Button variant="bordered">See it in action</Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    ['Explore', [['Features', '#features'], ['How it works', '#how'], ['FAQ', '#faq']]],
    ['Support', [['Docs', 'Pocket Docs.html'], ['Contact', 'Pocket Contact.html'], ['Privacy', 'Pocket Privacy.html']]],
  ];
  return (
    <footer style={{ borderTop: '0.5px solid var(--stroke)', background: 'var(--bg-bottom)' }}>
      <div style={{ ...wrap, padding: '48px 32px 36px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 32 }}>
        <div>
          <img src={(window.__resources && window.__resources.wordmark) || 'assets/wordmark-pocket-dark.svg'} alt="pocket" style={{ height: 22, marginBottom: 14 }} />
          <p style={{ fontSize: 13.5, color: 'var(--muted)', maxWidth: 240, lineHeight: 1.5 }}>The rhythm trainer that grades your timing to the millisecond. Find the pocket. Lock the green beat.</p>
        </div>
        {cols.map(([h, links]) => (
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

// ---- Tweaks: three expressive levers that reshape the whole feel ----
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "energy": "steady",
  "atmosphere": "studio",
  "accent": "#2BD4E6"
}/*EDITMODE-END*/;

// surface moods — override the near-black palette + glow weight
const ATMOSPHERES = {
  studio:   { '--bg-top': '#0A0B0D', '--bg-bottom': '#06070A', '--panel': '#121417', '--panel-raised': '#181B1F', '--bar': '#0E1013', '--stroke': 'rgba(255,255,255,0.08)' },
  blackout: { '--bg-top': '#000000', '--bg-bottom': '#000000', '--panel': '#0A0A0B', '--panel-raised': '#101012', '--bar': '#050506', '--stroke': 'rgba(255,255,255,0.10)' },
  slate:    { '--bg-top': '#12161D', '--bg-bottom': '#0C0F15', '--panel': '#1A1F28', '--panel-raised': '#222834', '--bar': '#10141B', '--stroke': 'rgba(255,255,255,0.10)' },
};

function PocketLanding() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply atmosphere + structural accent by overriding root CSS vars.
  // the pocket green is sacred and never touched.
  useEffect(() => {
    const root = document.documentElement;
    const atmo = ATMOSPHERES[t.atmosphere] || ATMOSPHERES.studio;
    Object.entries(atmo).forEach(([k, v]) => root.style.setProperty(k, v));
    root.style.setProperty('--cyan', t.accent);
    root.style.setProperty('--cyan-soft', t.accent + '24');
  }, [t.atmosphere, t.accent]);

  return (
    <EnergyCtx.Provider value={t.energy}>
      <div style={{ background: 'linear-gradient(180deg,var(--bg-top),var(--bg-bottom))', minHeight: '100vh' }}>
        <Nav />
        <Hero />
        <ProofStrip />
        <Features />
        <HowItWorks />
        <Reviews />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Energy" hint="The kinetic tempo of the whole page — beat speed, how fast hits climb, how hot the glow runs." />
        <TweakRadio label="Feel" value={t.energy}
          options={['laid-back', 'steady', 'driving']}
          onChange={(v) => setTweak('energy', v)} />

        <TweakSection label="Atmosphere" hint="The surface mood, from balanced studio to a pitch-black stage." />
        <TweakRadio label="Mood" value={t.atmosphere}
          options={['studio', 'blackout', 'slate']}
          onChange={(v) => setTweak('atmosphere', v)} />

        <TweakSection label="Structure accent" hint="Recolors the cyan structure ramp — eyebrows, σ, trend bars. The pocket green never changes." />
        <TweakColor label="Accent" value={t.accent}
          options={['#2BD4E6', '#A974FF', '#0A84FF', '#E0B23C']}
          onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </EnergyCtx.Provider>
  );
}

window.PocketLanding = PocketLanding;
