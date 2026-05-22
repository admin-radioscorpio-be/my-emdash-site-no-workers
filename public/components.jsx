// components.jsx — shared bits

// ─── Icons (inline svg) ────────────────────────────────────────────────
const Ic = {
  play:   (p) => <svg viewBox="0 0 16 16" className={"ic-svg "+(p.cls||"")} {...p}><path d="M3 2 L13 8 L3 14 Z" fill="currentColor"/></svg>,
  pause:  (p) => <svg viewBox="0 0 16 16" className={"ic-svg "+(p.cls||"")} {...p}><rect x="3" y="2" width="3.5" height="12" fill="currentColor"/><rect x="9.5" y="2" width="3.5" height="12" fill="currentColor"/></svg>,
  skip:   (p) => <svg viewBox="0 0 16 16" className={"ic-svg "+(p.cls||"")} {...p}><path d="M2 2 L10 8 L2 14 Z" fill="currentColor"/><rect x="11" y="2" width="2" height="12" fill="currentColor"/></svg>,
  search: (p) => <svg viewBox="0 0 16 16" className={"ic-svg "+(p.cls||"")} {...p}><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M11 11 L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  user:   (p) => <svg viewBox="0 0 16 16" className={"ic-svg "+(p.cls||"")} {...p}><circle cx="8" cy="5" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M2 15 C2 11 5 9 8 9 C11 9 14 11 14 15" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  vol:    (p) => <svg viewBox="0 0 16 16" className={"ic-svg "+(p.cls||"")} {...p}><path d="M2 6 L2 10 L5 10 L9 13 L9 3 L5 6 Z" fill="currentColor"/><path d="M11 5 C12.5 6.5 12.5 9.5 11 11" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/></svg>,
  arrow:  (p) => <svg viewBox="0 0 16 16" className={"ic-svg "+(p.cls||"")} {...p}><path d="M2 8 L13 8 M9 4 L13 8 L9 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  share:  (p) => <svg viewBox="0 0 16 16" className={"ic-svg "+(p.cls||"")} {...p}><circle cx="4" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="3" r="2" fill="none" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="13" r="2" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M5.7 7 L10.3 4 M5.7 9 L10.3 12" stroke="currentColor" strokeWidth="1.4"/></svg>,
  heart:  (p) => <svg viewBox="0 0 16 16" className={"ic-svg "+(p.cls||"")} {...p}><path d="M8 14 C8 14 1 9.5 1 5 C1 2.5 3 1 5 1 C6.5 1 8 2 8 4 C8 2 9.5 1 11 1 C13 1 15 2.5 15 5 C15 9.5 8 14 8 14 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
};

// ─── Top nav ──────────────────────────────────────────────────────────
function TopNav({ route, setRoute }) {
  const items = [
    ['home', 'Home'],
    ['programmas', "Programma's"],
    ['playlist', 'Playlist'],
    ['sessions', 'Sessions'],
    ['cultafacts', 'Cultafacts'],
    ['shop', 'Shop'],
  ];
  return (
    <header className="topnav">
      <div className="inner">
        <a className="brand" onClick={() => setRoute('home')} style={{cursor:'pointer'}}>
          <img src="assets/logo.png" alt="Radio Scorpio 106 FM"/>
        </a>
        <nav>
          {items.map(([k, lbl]) => (
            <a key={k}
               className={route === k ? 'is-active' : ''}
               onClick={() => setRoute(k)}
               style={{cursor:'pointer'}}>{lbl}</a>
          ))}
        </nav>
        <div className="util">
          <button className="ic" aria-label="Zoeken"><Ic.search/></button>
          <a href="/_emdash/api/auth/oauth/google" className="ic" aria-label="Inloggen"><Ic.user/></a>
        </div>
      </div>
    </header>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────
function Ticker() {
  const items = [
    'NU OP ANTENNE — Dry Cleaning — Hit My Head All Day',
    'STRAKS 00:00 — Vinylkroniek met Joris Mertens',
    '106 FM — STREAM 192KBPS',
    'SCORPIO SESSIONS // NIEUWE OPNAME ONLINE',
    'CULTAFACTS // De agenda van deze week',
    'DE BESTE 106 — STEM NU VOOR JE FAVORIET',
    'NU OP ANTENNE — Dry Cleaning — Hit My Head All Day',
    'STRAKS 00:00 — Vinylkroniek met Joris Mertens',
    '106 FM — STREAM 192KBPS',
    'SCORPIO SESSIONS // NIEUWE OPNAME ONLINE',
    'CULTAFACTS // De agenda van deze week',
    'DE BESTE 106 — STEM NU VOOR JE FAVORIET',
  ];
  return (
    <div className="ticker">
      <div className="track">
        {items.map((t, i) => (
          <span key={i}>{t}<span className="sep">✦</span></span>
        ))}
      </div>
    </div>
  );
}

// ─── Persistent bottom player ─────────────────────────────────────────
function Player({ playing, setPlaying, accent }) {
  const [vol, setVol] = React.useState(70);
  const [bars] = React.useState(() =>
    Array.from({length: 64}, () => 0.2 + Math.random() * 0.8)
  );
  const [progress, setProgress] = React.useState(0.42);

  React.useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress(p => (p + 0.0008) % 1), 80);
    return () => clearInterval(t);
  }, [playing]);

  const activeBar = Math.floor(progress * bars.length);

  return (
    <footer className="player">
      <div className="left">
        <button className="play" onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pauze' : 'Speel'}>
          {playing ? <Ic.pause cls="lg"/> : <Ic.play cls="lg"/>}
        </button>
        <div>
          <div className="live"><span className="dot pulse"/> Live · 106 FM</div>
          <div className="track">Dry Cleaning — Hit My Head All Day</div>
          <div className="show">Nu: Non-stop · 23:00–00:00</div>
        </div>
      </div>
      <div className="center">
        <div className="wave" aria-hidden="true">
          {bars.map((h, i) => (
            <div key={i} className={"bar" + (i <= activeBar && playing ? " on" : "")}
                 style={{ height: `${h * 100}%`,
                          background: i <= activeBar && playing ? accent : undefined }}/>
          ))}
        </div>
      </div>
      <div className="right">
        <div className="nextup">
          Straks <b>00:00 Vinylkroniek</b>
        </div>
        <div className="vol">
          <Ic.vol/>
          <input type="range" min="0" max="100" value={vol} onChange={e => setVol(+e.target.value)} />
        </div>
        <button className="ic" aria-label="Delen"><Ic.share/></button>
      </div>
    </footer>
  );
}

// ─── Section header ───────────────────────────────────────────────────
function SectHd({ num, title, more, onMore }) {
  return (
    <div className="sect-hd">
      <div className="num">/ {num}</div>
      <h2>{title}</h2>
      {more && <a className="more" onClick={onMore} style={{cursor:'pointer'}}>{more} →</a>}
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <div className="foot">
      <div className="inner">
        <div className="grid">
          <div className="brand-cell">
            <img src="assets/logo.png" alt="Radio Scorpio"/>
            <p>Onafhankelijk gemeenschapsradio sinds 1980. Vrijwilligersradio uit Leuven, 24 uur per dag, 7 dagen per week.</p>
          </div>
          <div>
            <h4>Luister</h4>
            <ul>
              <li><a>106 FM</a></li>
              <li><a>Web stream</a></li>
              <li><a>Apple / Android app</a></li>
              <li><a>DAB+</a></li>
            </ul>
          </div>
          <div>
            <h4>Ontdek</h4>
            <ul>
              <li><a>Programma's</a></li>
              <li><a>Playlist</a></li>
              <li><a>Sessions</a></li>
              <li><a>Cultafacts</a></li>
            </ul>
          </div>
          <div>
            <h4>Over</h4>
            <ul>
              <li><a>Wie zijn we</a></li>
              <li><a>Word vrijwilliger</a></li>
              <li><a>Studio</a></li>
              <li><a>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Volg</h4>
            <ul>
              <li><a>Instagram</a></li>
              <li><a>Facebook</a></li>
              <li><a>Mixcloud</a></li>
              <li><a>YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="bot">
          <span>© 1980—2026 Radio Scorpio VZW · Leuven</span>
          <span>Privacy · Cookies · Colofon</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Ic, TopNav, Ticker, Player, SectHd, Footer });
