/* @ds-bundle: {"format":3,"namespace":"PocketDesignSystem_184e86","components":[{"name":"BeatBars","sourcePath":"components/core/BeatBars.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"MiniPattern","sourcePath":"components/core/MiniPattern.jsx"},{"name":"Panel","sourcePath":"components/core/Panel.jsx"},{"name":"Segmented","sourcePath":"components/core/Segmented.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"}],"sourceHashes":{"components/core/BeatBars.jsx":"be51a514cd9f","components/core/Button.jsx":"d92444c6fb45","components/core/Chip.jsx":"b336585d2972","components/core/MiniPattern.jsx":"dbcb8cc5219c","components/core/Panel.jsx":"7a2f2f1e8b05","components/core/Segmented.jsx":"f64bfb829135","components/core/Stat.jsx":"d8a28425f908","ui_kits/pocket-mac/App.jsx":"e77732827078","ui_kits/pocket-mac/HistoryPane.jsx":"77ad70700702","ui_kits/pocket-mac/PatternsPane.jsx":"47a9d38e436c","ui_kits/pocket-mac/PracticePane.jsx":"70c4f2fa89bf","ui_kits/pocket-mac/data.js":"bfa3dd812964"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PocketDesignSystem_184e86 = window.PocketDesignSystem_184e86 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/BeatBars.jsx
try { (() => {
/**
 * BeatBars — the live beat indicator: a row of thin bars, the active beat lit
 * cyan (or rose during count-in), the rest a faint fill. The brand motif in its
 * simplest UI form. `active` is the lit index; `flash` (0–1) sets its brightness.
 */
function BeatBars({
  beats = 4,
  active = -1,
  flash = 1,
  countIn = false,
  height = 6,
  style = {}
}) {
  const lit = countIn ? 'var(--rose)' : 'var(--cyan)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      ...style
    }
  }, Array.from({
    length: beats
  }).map((_, i) => {
    const on = i === active;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        height,
        borderRadius: 3,
        background: on ? lit : 'var(--fill-soft)',
        opacity: on ? 0.4 + 0.6 * flash : 1,
        boxShadow: on && !countIn ? 'var(--glow-cyan)' : 'none',
        transition: 'opacity var(--dur-fast) var(--ease)'
      }
    });
  }));
}
Object.assign(__ds_scope, { BeatBars });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BeatBars.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Pocket button. Variants mirror the app: `primary` is the green transport
 * action (with glow), `bordered` is the standard tinted-stroke button, `plain`
 * is a label-only control. `accent` tints bordered/plain (cyan default).
 */
function Button({
  children,
  variant = 'bordered',
  accent = 'var(--cyan)',
  icon,
  disabled = false,
  size = 'md',
  style = {},
  ...rest
}) {
  const pads = size === 'sm' ? '5px 10px' : size === 'lg' ? '10px 18px' : '7px 13px';
  const fs = size === 'sm' ? 12 : size === 'lg' ? 15 : 13;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    fontFamily: 'var(--font-ui)',
    fontSize: fs,
    fontWeight: 500,
    lineHeight: 1,
    borderRadius: 'var(--r-sm)',
    padding: pads,
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background var(--dur-fast) var(--ease), opacity var(--dur-fast)',
    border: '0.5px solid transparent',
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: 'var(--green)',
      color: 'var(--on-green)',
      fontWeight: 600,
      boxShadow: 'var(--glow-green)'
    },
    bordered: {
      background: 'color-mix(in srgb, ' + accent + ' 14%, transparent)',
      color: accent,
      borderColor: 'color-mix(in srgb, ' + accent + ' 30%, transparent)'
    },
    plain: {
      background: 'transparent',
      color: accent
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    disabled: disabled
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: fs + 2
    }
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Chip / badge — the purple "groove" chip (with optional ★ best %), the cyan
 * AUTO badge, and the magenta "Lvl" tags. Pill with tinted fill + edge stroke.
 */
function Chip({
  children,
  accent = 'var(--purple)',
  star,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1,
      padding: '5px 11px',
      borderRadius: 'var(--r-pill)',
      color: accent,
      background: 'color-mix(in srgb, ' + accent + ' 16%, transparent)',
      border: '0.5px solid color-mix(in srgb, ' + accent + ' 30%, transparent)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children, star != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--green)',
      fontFamily: 'var(--font-mono)'
    }
  }, "\u2605 ", star, "%") : null);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/MiniPattern.jsx
try { (() => {
/**
 * MiniPattern — a non-interactive glance at a rhythm pattern: one row of 16
 * sixteenth-cells per bar, beat columns faintly brighter, onsets filled purple.
 * A tiny step sequencer (the Patterns library preview).
 */
function MiniPattern({
  onsets = [],
  bars = 1,
  stepsPerBar = 16,
  stepsPerBeat = 4,
  accent = 'var(--purple)',
  cellHeight = 16,
  style = {}
}) {
  const set = new Set(onsets);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      ...style
    }
  }, Array.from({
    length: bars
  }).map((_, bar) => /*#__PURE__*/React.createElement("div", {
    key: bar,
    style: {
      display: 'flex',
      gap: 2
    }
  }, Array.from({
    length: stepsPerBar
  }).map((_, i) => {
    const on = set.has(bar * stepsPerBar + i);
    const isBeat = i % stepsPerBeat === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        height: cellHeight,
        borderRadius: 'var(--r-cell)',
        background: on ? accent : isBeat ? 'var(--fill-beat)' : 'var(--fill-faint)'
      }
    });
  }))));
}
Object.assign(__ds_scope, { MiniPattern });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MiniPattern.jsx", error: String((e && e.message) || e) }); }

// components/core/Panel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Panel — the standard Pocket surface: panel fill, hairline stroke, 12–16px
 * radius. Wraps stats, lanes, cards. The base building block of every pane.
 */
function Panel({
  children,
  pad = 14,
  radius = 12,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--panel)',
      border: '0.5px solid var(--stroke)',
      borderRadius: radius,
      padding: pad,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Panel.jsx", error: String((e && e.message) || e) }); }

// components/core/Segmented.jsx
try { (() => {
/**
 * Segmented control — the app's 1/4 · 1/8 · 1/16 and MIDI/Audio/Both pickers.
 * Selected segment fills system blue; unselected are muted. Pill-grouped on a
 * faint track.
 */
function Segmented({
  options = [],
  value,
  onChange = () => {},
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 2,
      gap: 2,
      background: 'var(--fill-faint)',
      borderRadius: 'var(--r-sm)',
      border: '0.5px solid var(--stroke)',
      ...style
    }
  }, options.map(opt => {
    const val = typeof opt === 'string' ? opt : opt.value;
    const label = typeof opt === 'string' ? opt : opt.label;
    const sel = val === value;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      onClick: () => onChange(val),
      style: {
        fontFamily: 'var(--font-ui)',
        fontSize: 13,
        fontWeight: 500,
        padding: '4px 12px',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        color: sel ? '#fff' : 'var(--text-secondary)',
        background: sel ? 'var(--blue)' : 'transparent',
        transition: 'background var(--dur-fast) var(--ease)'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { Segmented });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Segmented.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
/**
 * Stat readout — tracked uppercase label over a mono value, on a panel cell.
 * The BIAS / σ / TIGHT row and History summary cards. `color` tints the value
 * (green for tight, cyan for data). `center` for the summary-card layout.
 */
function Stat({
  label,
  value,
  color = 'var(--text)',
  center = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: center ? 6 : 3,
      alignItems: center ? 'center' : 'flex-start',
      flex: 1,
      padding: center ? '16px 12px' : '10px 12px',
      background: 'var(--panel)',
      border: '0.5px solid var(--stroke)',
      borderRadius: 'var(--r-md)',
      ...style
    }
  }, center ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 26,
      fontWeight: 500,
      color
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      letterSpacing: 'var(--track-label)',
      textTransform: 'uppercase',
      color: 'var(--muted)'
    }
  }, label)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      letterSpacing: 'var(--track-label)',
      textTransform: 'uppercase',
      color: 'var(--muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 20,
      color
    }
  }, value)));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pocket-mac/App.jsx
try { (() => {
// App shell — macOS window chrome + sidebar nav routing the three panes.
const {
  Chip
} = window.PocketDesignSystem_184e86;
function Sidebar({
  section,
  setSection
}) {
  const items = [{
    id: 'practice',
    label: 'Practice',
    icon: '△'
  }, {
    id: 'patterns',
    label: 'Patterns',
    icon: '▦'
  }, {
    id: 'history',
    label: 'History',
    icon: '◷'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200,
      background: 'rgba(14,16,19,0.6)',
      borderRight: '0.5px solid var(--stroke)',
      padding: '12px 10px',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      padding: '4px 8px 12px',
      color: 'var(--muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cyan)'
    }
  }, "\u25B3"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500
    }
  }, "Pocket")), items.map(it => {
    const sel = section === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => setSection(it.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 10px',
        marginBottom: 2,
        border: 'none',
        borderRadius: 7,
        cursor: 'pointer',
        textAlign: 'left',
        background: sel ? 'var(--cyan-soft)' : 'transparent',
        color: sel ? 'var(--cyan)' : 'var(--text-secondary)',
        fontSize: 14,
        fontWeight: sel ? 500 : 400
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16
      }
    }, it.icon), it.label);
  }));
}
function App() {
  const [section, setSection] = React.useState('practice');
  const [model, setModelRaw] = React.useState({
    sub: '1/4',
    input: 'MIDI',
    grid: '1/8',
    bars: '1 bar',
    bpm: 70,
    playing: false,
    beat: 0,
    lastMs: null,
    bias: 0,
    sigma: 0,
    tight: 0,
    pattern: window.POCKET_PATTERNS.foundations.patterns[2] // Quarter pulse
  });
  const setModel = patch => setModelRaw(m => ({
    ...m,
    ...patch
  }));

  // Beat clock + simulated hits while playing.
  React.useEffect(() => {
    if (!model.playing) return;
    const spb = 60000 / model.bpm;
    const id = setInterval(() => {
      setModelRaw(m => {
        const beat = (m.beat + 1) % 4;
        const ms = Math.round((Math.random() * 2 - 1) * 22);
        return {
          ...m,
          beat,
          lastMs: ms,
          bias: Math.round(ms * 0.4),
          sigma: 8 + Math.round(Math.random() * 10),
          tight: 30 + Math.round(Math.random() * 30)
        };
      });
    }, spb);
    return () => clearInterval(id);
  }, [model.playing, model.bpm]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      background: 'linear-gradient(var(--bg-top), var(--bg-bottom))'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    section: section,
    setSection: setSection
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, section === 'practice' && /*#__PURE__*/React.createElement(window.PracticePane, {
    model: model,
    setModel: setModel,
    goPatterns: () => setSection('patterns')
  }), section === 'patterns' && /*#__PURE__*/React.createElement(window.PatternsPane, {
    model: model,
    setModel: setModel
  }), section === 'history' && /*#__PURE__*/React.createElement(window.HistoryPane, null)));
}
window.PocketApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pocket-mac/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pocket-mac/HistoryPane.jsx
try { (() => {
// History pane — trend, personal bests, recent sessions. Recreated from MacHistoryPane.
const {
  Stat,
  Chip,
  Panel,
  Button
} = window.PocketDesignSystem_184e86;
function HistoryPane() {
  const trend = window.POCKET_TREND;
  const bests = window.POCKET_BESTS;
  const sessions = window.POCKET_SESSIONS;
  const maxTrend = Math.max(...trend, 1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflow: 'auto',
      background: 'var(--bg)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 500,
      color: 'var(--text)'
    }
  }, "History"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "bordered",
    accent: "var(--muted)",
    icon: "\uD83D\uDDD1"
  }, "Clear")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "SESSIONS",
    value: "23",
    center: true
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "AVG TIGHT",
    value: "45%",
    color: "var(--cyan)",
    center: true
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "BEST",
    value: "L3 \xB7 57%",
    color: "var(--green)",
    center: true
  })), /*#__PURE__*/React.createElement(Panel, {
    pad: 16,
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: '1px',
      color: 'var(--muted)',
      marginBottom: 10
    }
  }, "TIGHTNESS TREND"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 6,
      height: 120
    }
  }, trend.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: Math.max(4, t / maxTrend * 100),
      background: 'rgba(70,217,140,0.85)',
      borderRadius: 3
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      color: 'var(--dim)'
    }
  }, t))))), /*#__PURE__*/React.createElement(Panel, {
    pad: 16,
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: '1px',
      color: 'var(--muted)',
      marginBottom: 6
    }
  }, "PERSONAL BESTS"), bests.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text)'
    }
  }, b.name), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--purple)',
      fontWeight: 500
    }
  }, "Lvl ", b.lvl), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--green)'
    }
  }, b.tight, "% tight"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--dim)'
    }
  }, "\xB7 ", b.bpm, " BPM")))), /*#__PURE__*/React.createElement(Panel, {
    pad: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: '1px',
      color: 'var(--muted)',
      marginBottom: 6
    }
  }, "RECENT SESSIONS"), sessions.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '10px 0',
      borderTop: i ? '0.5px solid var(--stroke)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text)'
    }
  }, s.pattern), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, s.date)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Metric, {
    value: s.bpm,
    label: "BPM"
  }), /*#__PURE__*/React.createElement(Metric, {
    value: s.guide,
    label: "GUIDE",
    color: "var(--purple)"
  }), /*#__PURE__*/React.createElement(Metric, {
    value: '±' + s.sigma,
    label: "\u03C3 MS"
  }), /*#__PURE__*/React.createElement(Metric, {
    value: s.tight + '%',
    label: "TIGHT",
    color: "var(--green)"
  }))))));
}
function Metric({
  value,
  label,
  color = 'var(--text)'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      color
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      letterSpacing: '0.5px',
      color: 'var(--dim)'
    }
  }, label));
}
window.HistoryPane = HistoryPane;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pocket-mac/HistoryPane.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pocket-mac/PatternsPane.jsx
try { (() => {
// Patterns pane — library + rhythm editor. Recreated from MacPatternsPane.
const {
  Button,
  Segmented,
  Chip,
  MiniPattern,
  Panel
} = window.PocketDesignSystem_184e86;
function PatternCard({
  p,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      background: 'var(--panel)',
      borderRadius: 10,
      padding: 10,
      border: '0.5px solid ' + (active ? 'rgba(43,212,230,0.5)' : 'var(--stroke)')
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 8
    }
  }, active ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cyan)',
      fontSize: 13
    }
  }, "\u2713") : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), p.best != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--green)'
    }
  }, "\u2605 ", p.best, "%") : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--dim)'
    }
  }, p.bars === 1 ? '1 bar' : '2 bars')), /*#__PURE__*/React.createElement(MiniPattern, {
    onsets: p.onsets,
    bars: p.bars,
    cellHeight: 14
  }));
}
function PatternsPane({
  model,
  setModel
}) {
  const groups = window.POCKET_PATTERNS;
  const editorOnsets = model.pattern.onsets;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 286,
      overflow: 'auto',
      padding: 16,
      borderRight: '0.5px solid var(--stroke)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      color: 'var(--text)'
    }
  }, "Library"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "bordered",
    accent: "var(--muted)",
    size: "sm",
    icon: "+"
  }, "New")), Object.values(groups).map(g => /*#__PURE__*/React.createElement("div", {
    key: g.title,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      margin: '6px 0 8px'
    }
  }, "\u25BE ", g.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, g.patterns.map(p => /*#__PURE__*/React.createElement(PatternCard, {
    key: p.id,
    p: p,
    active: model.pattern.id === p.id,
    onClick: () => setModel({
      pattern: p
    })
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--purple)'
    }
  }, "\u25A6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text)'
    }
  }, "Rhythm editor"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "bordered",
    accent: "var(--muted)",
    size: "sm"
  }, "\u25B6"), /*#__PURE__*/React.createElement(Segmented, {
    options: ['1/8', '1/16'],
    value: model.grid,
    onChange: v => setModel({
      grid: v
    })
  }), /*#__PURE__*/React.createElement(Segmented, {
    options: ['1 bar', '2 bars'],
    value: model.bars,
    onChange: v => setModel({
      bars: v
    })
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "plain",
    accent: "var(--muted)",
    size: "sm"
  }, "\uD83D\uDDD1")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--muted)',
      marginBottom: 12
    }
  }, "Click a cell to place or remove an onset."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginBottom: 14
    }
  }, Array.from({
    length: 8
  }).map((_, i) => {
    const on = editorOnsets.includes(i * 2);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => {
        const step = i * 2;
        const next = on ? editorOnsets.filter(o => o !== step) : [...editorOnsets, step];
        setModel({
          pattern: {
            ...model.pattern,
            id: 'custom',
            name: 'Custom',
            best: undefined,
            onsets: next
          }
        });
      },
      style: {
        flex: 1,
        height: 70,
        borderRadius: 8,
        cursor: 'pointer',
        background: on ? 'linear-gradient(180deg, #c79bff, #9a6bff)' : 'var(--panel-raised)',
        border: '0.5px solid var(--stroke)'
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--purple)'
    }
  }, model.pattern.name), model.pattern.best != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--green)'
    }
  }, "\u2605 ", model.pattern.best, "%") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "bordered",
    accent: "var(--cyan)",
    icon: "\u2193"
  }, "Save as\u2026"))));
}
window.PatternsPane = PatternsPane;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pocket-mac/PatternsPane.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pocket-mac/PracticePane.jsx
try { (() => {
// Practice pane — the hero screen. Recreated from MacPracticePane (ContentView.swift).
const {
  Button,
  Segmented,
  Chip,
  Stat,
  BeatBars,
  MiniPattern,
  Panel
} = window.PocketDesignSystem_184e86;
function SweepLane() {
  // Static decorative sweep lane: gridlines + a couple of graded dots, "now" at right.
  const dots = [{
    x: 18,
    off: -0.3,
    c: 'var(--grade-0)'
  }, {
    x: 34,
    off: 0.5,
    c: 'var(--grade-0)'
  }, {
    x: 52,
    off: -1.4,
    c: 'var(--grade-25)'
  }, {
    x: 70,
    off: 0.8,
    c: 'var(--grade-0)'
  }, {
    x: 86,
    off: 2.1,
    c: 'var(--grade-50)'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 150,
      background: 'rgba(70,217,140,0.04)',
      borderRadius: 8,
      overflow: 'hidden',
      border: '0.5px solid var(--stroke)'
    }
  }, [20, 40, 60, 80].map(x => /*#__PURE__*/React.createElement("div", {
    key: x,
    style: {
      position: 'absolute',
      left: x + '%',
      top: 0,
      bottom: 0,
      width: 1,
      background: 'var(--fill-faint)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: '50%',
      borderTop: '1px dashed rgba(70,217,140,0.4)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: 2,
      background: 'var(--cyan)',
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 10,
      top: 8,
      fontSize: 11,
      color: 'var(--muted)'
    }
  }, "early"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 10,
      bottom: 8,
      fontSize: 11,
      color: 'var(--muted)'
    }
  }, "late"), dots.map((d, i) => {
    const y = 50 + d.off * 14;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: d.x + '%',
        top: '50%',
        height: Math.abs(d.off * 14) + '%',
        width: 1,
        background: d.c,
        opacity: 0.5,
        transform: d.off < 0 ? 'translateY(-100%)' : 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: d.x + '%',
        top: y + '%',
        width: 9,
        height: 9,
        marginLeft: -4,
        marginTop: -4,
        borderRadius: '50%',
        background: d.c,
        boxShadow: '0 0 8px ' + d.c
      }
    }));
  }));
}
function Distribution() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 110,
      borderRadius: 8,
      border: '0.5px solid var(--stroke)',
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 10,
      top: 8,
      fontSize: 11,
      color: 'var(--muted)'
    }
  }, "early"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 10,
      top: 8,
      fontSize: 11,
      color: 'var(--muted)'
    }
  }, "late"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '34%',
      right: '34%',
      top: 16,
      bottom: 26,
      border: '1px solid rgba(70,217,140,0.45)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 12,
      bottom: 22,
      width: 1,
      background: 'rgba(70,217,140,0.6)'
    }
  }), [42, 46, 48, 50, 51, 53, 55, 58].map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      left: x + '%',
      top: 40 + i % 3 * 12 + '%',
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--green)',
      opacity: 0.4
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 6,
      textAlign: 'center',
      fontSize: 11,
      color: 'var(--dim)'
    }
  }, "0"));
}
function Label({
  children,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: '0.5px',
      color: 'var(--muted)'
    }
  }, children), right ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--dim)'
    }
  }, right) : null);
}
function PracticePane({
  model,
  setModel,
  goPatterns
}) {
  const beats = model.playing ? model.beat : -1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '10px 20px',
      background: 'var(--bar)',
      borderBottom: '0.5px solid var(--stroke)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, "Click"), /*#__PURE__*/React.createElement(Segmented, {
    options: ['1/4', '1/8', '1/16'],
    value: model.sub,
    onChange: v => setModel({
      sub: v
    })
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--muted)',
      marginLeft: 6
    }
  }, "In"), /*#__PURE__*/React.createElement(Segmented, {
    options: ['MIDI', 'Audio', 'Both'],
    value: model.input,
    onChange: v => setModel({
      input: v
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    onClick: goPatterns,
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    accent: "var(--purple)",
    star: model.pattern.best
  }, "\u266A ", model.pattern.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(BeatBars, {
    beats: 4,
    active: beats,
    flash: 0.85
  }), /*#__PURE__*/React.createElement(Panel, {
    pad: 18,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: '1px',
      color: 'var(--muted)'
    }
  }, "LAST HIT"), model.lastMs == null ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 50,
      fontWeight: 500,
      color: 'var(--dim)'
    }
  }, "\u2014"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--muted)'
    }
  }, "play a note to begin")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 50,
      fontWeight: 500,
      color: gradeColor(model.lastMs)
    }
  }, (model.lastMs >= 0 ? '+' : '') + model.lastMs, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      color: 'var(--muted)'
    }
  }, " ms")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: gradeColor(model.lastMs)
    }
  }, Math.abs(model.lastMs) <= 15 ? 'in the pocket' : model.lastMs < 0 ? 'early' : 'late'))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "BIAS",
    value: model.lastMs == null ? '—' : (model.bias >= 0 ? '+' : '') + model.bias + ' ms'
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "\u03C3",
    value: model.lastMs == null ? '—' : '±' + model.sigma + ' ms'
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "TIGHT",
    value: model.lastMs == null ? '—' : model.tight + '%',
    color: model.lastMs == null ? 'var(--dim)' : 'var(--green)'
  })), /*#__PURE__*/React.createElement(Panel, {
    pad: 12
  }, /*#__PURE__*/React.createElement(Label, {
    right: "early \u2191 / late \u2193 \xB7 now \u2192"
  }, "SWEEP LANE"), /*#__PURE__*/React.createElement(SweepLane, null)), /*#__PURE__*/React.createElement(Panel, {
    pad: 12
  }, /*#__PURE__*/React.createElement(Label, {
    right: "line = bias \xB7 band = \u03C3"
  }, "TIMING DISTRIBUTION"), /*#__PURE__*/React.createElement(Distribution, null)), /*#__PURE__*/React.createElement(Panel, {
    pad: 14
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, "\u2AF6 Guidance \u2014 fade the help as you lock it in"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Chip, {
    accent: "var(--cyan)"
  }, "AUTO"), /*#__PURE__*/React.createElement(Chip, {
    accent: "var(--purple)"
  }, "Lvl 1 \xB7 Play-along")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "5",
    defaultValue: "0",
    style: {
      width: '100%',
      accentColor: 'var(--cyan)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 10,
      color: 'var(--muted)',
      marginTop: 4
    }
  }, ['Lvl 1', 'Lvl 2', 'Lvl 3', 'Lvl 4', 'Lvl 5', 'Lvl 6'].map(l => /*#__PURE__*/React.createElement("span", {
    key: l
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 20px',
      background: 'var(--bar)',
      borderTop: '0.5px solid var(--stroke)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--muted)'
    }
  }, "TEMPO"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "50",
    max: "160",
    value: model.bpm,
    onChange: e => setModel({
      bpm: +e.target.value
    }),
    style: {
      flex: 1,
      accentColor: 'var(--cyan)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      width: 64,
      textAlign: 'right',
      color: 'var(--text)'
    }
  }, model.bpm, " BPM")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModel({
      playing: !model.playing
    }),
    style: {
      width: 54,
      height: 54,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--green)',
      color: 'var(--on-green)',
      fontSize: 22,
      cursor: 'pointer',
      boxShadow: 'var(--glow-green)'
    }
  }, model.playing ? '❚❚' : '▶'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "plain",
    accent: "var(--muted)",
    onClick: () => setModel({
      lastMs: null
    })
  }, "\u21BB clear"))));
}
window.PracticePane = PracticePane;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pocket-mac/PracticePane.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pocket-mac/data.js
try { (() => {
// Continuous timing grade: |error| ms → green→amber→red (matches Theme.gradeColor).
function gradeColor(ms) {
  const t = Math.min(1, Math.abs(ms) / 50);
  const hue = 130 * (1 - t);
  return 'hsl(' + hue + ', 72%, 62%)';
}
window.gradeColor = gradeColor;

// Pocket — sample data for the UI-kit recreation (mirrors PatternLibrary.swift / SessionLog).
window.POCKET_PATTERNS = {
  foundations: {
    title: 'Foundations',
    patterns: [{
      id: 'downbeat',
      name: 'Downbeat',
      bars: 1,
      onsets: [0]
    }, {
      id: 'beats13',
      name: 'Beats 1 & 3',
      bars: 1,
      onsets: [0, 8]
    }, {
      id: 'quarter',
      name: 'Quarter pulse',
      bars: 1,
      onsets: [0, 4, 8, 12],
      best: 27,
      lvl: 3
    }, {
      id: 'offbeats',
      name: 'Off-beats',
      bars: 1,
      onsets: [2, 6, 10, 14],
      best: 40,
      lvl: 3
    }, {
      id: 'eighths',
      name: 'Eighth notes',
      bars: 1,
      onsets: [0, 2, 4, 6, 8, 10, 12, 14]
    }]
  },
  eighth: {
    title: 'Eighth-note patterns',
    patterns: [{
      id: 'backbeat',
      name: 'Backbeat · 2 & 4',
      bars: 1,
      onsets: [4, 12]
    }, {
      id: 'charleston',
      name: 'Charleston',
      bars: 1,
      onsets: [0, 6]
    }]
  },
  sixteenth: {
    title: '16th-note figures',
    patterns: [{
      id: 'allsixteenths',
      name: 'All sixteenths',
      bars: 1,
      onsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      best: 57,
      lvl: 3
    }, {
      id: 'gallop',
      name: 'Gallop · long-short',
      bars: 1,
      onsets: [0, 3, 4, 7, 8, 11, 12, 15]
    }, {
      id: 'revgallop',
      name: 'Reverse gallop',
      bars: 1,
      onsets: [0, 1, 4, 5, 8, 9, 12, 13]
    }, {
      id: 'syncopa',
      name: 'Syncopa',
      bars: 1,
      onsets: [0, 3, 6, 8, 11, 14]
    }]
  }
};
window.POCKET_SESSIONS = [{
  pattern: '&2 · bar 1',
  date: 'Jun 22 · 2:58 PM',
  bpm: 70,
  guide: 'Lvl 1',
  sigma: 2320,
  tight: 8
}, {
  pattern: '&2 · bar 1',
  date: 'Jun 22 · 2:57 PM',
  bpm: 70,
  guide: 'Lvl 1',
  sigma: 454,
  tight: 24
}, {
  pattern: '&1 · bar 1',
  date: 'Jun 22 · 12:59 PM',
  bpm: 70,
  guide: 'Lvl 1',
  sigma: 222,
  tight: 27
}, {
  pattern: 'All sixteenths',
  date: 'Jun 21 · 6:10 PM',
  bpm: 79,
  guide: 'Lvl 3',
  sigma: 41,
  tight: 57
}, {
  pattern: 'Off-beats',
  date: 'Jun 21 · 5:44 PM',
  bpm: 96,
  guide: 'Lvl 3',
  sigma: 55,
  tight: 40
}, {
  pattern: 'Quarter pulse',
  date: 'Jun 21 · 5:30 PM',
  bpm: 96,
  guide: 'Lvl 3',
  sigma: 60,
  tight: 27
}];
window.POCKET_TREND = [89, 100, 49, 49, 43, 49, 36, 33, 33, 0, 45, 27, 24, 8];
window.POCKET_BESTS = [{
  name: 'All sixteenths',
  lvl: 3,
  tight: 57,
  bpm: 79
}, {
  name: 'Off-beats',
  lvl: 3,
  tight: 40,
  bpm: 96
}, {
  name: 'Quarter pulse',
  lvl: 3,
  tight: 27,
  bpm: 96
}, {
  name: '&2 · bar 1',
  lvl: 1,
  tight: 33,
  bpm: 70
}, {
  name: '&1 · bar 1',
  lvl: 1,
  tight: 27,
  bpm: 70
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pocket-mac/data.js", error: String((e && e.message) || e) }); }

__ds_ns.BeatBars = __ds_scope.BeatBars;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.MiniPattern = __ds_scope.MiniPattern;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.Segmented = __ds_scope.Segmented;

__ds_ns.Stat = __ds_scope.Stat;

})();
