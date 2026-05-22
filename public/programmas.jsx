// programmas.jsx — Programs page

function Programmas({ setRoute }) {
  const [genre, setGenre] = React.useState('Alles');
  const [view, setView] = React.useState('grid'); // 'grid' | 'rooster' | 'lijst'
  const filtered = genre === 'Alles' ? PROGRAMS : PROGRAMS.filter(p => p.genre === genre);

  // build week-grid (slot x day)
  const gridMap = {};
  // distribute programs over days/slots roughly by their stored day/time
  PROGRAMS.forEach(p => {
    const slot = p.time.split('–')[0].slice(0, 2);
    const sIdx = SLOTS.findIndex(s => s.startsWith(slot[0] === '0' ? slot : slot));
    const slotKey = SLOTS.reduce((acc, s) => {
      if (parseInt(p.time) >= parseInt(s)) return s;
      return acc;
    }, SLOTS[0]);
    gridMap[`${p.day}_${slotKey}`] = p;
  });

  return (
    <>
      <section data-screen-label="02 Programmas — Header">
        <div className="page-hd">
          <div>
            <div className="crumb">/ Programma's · Week 21 · 18 — 24 mei 2026</div>
            <h1>
              168 uur,<br/>
              <span style={{color:'var(--mute)'}}>20+ stemmen.</span>
            </h1>
          </div>
          <div className="aside">
            // Gids<br/>
            <b>{PROGRAMS.length} programma's</b>
            <span style={{display:'block', marginTop:14, color:'var(--mute)'}}>
              Filter, blader, ontdek.
            </span>
          </div>
        </div>

        {/* Filter chips ──────────── */}
        <div className="chips">
          {GENRES.map(g => (
            <button key={g}
                    className={"chip" + (genre === g ? ' is-active' : '')}
                    onClick={() => setGenre(g)}>
              {g}
            </button>
          ))}
          <span style={{flex:1}}/>
          <div style={{display:'flex'}}>
            {['grid', 'rooster', 'lijst'].map(v => (
              <button key={v}
                      className={"chip" + (view === v ? ' is-active' : '')}
                      onClick={() => setView(v)}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="shell" data-screen-label="02 Programmas — Content" style={{paddingTop: 0}}>

        {view === 'grid' && (
          <div className="cards-grid" style={{borderTop:'1px solid var(--ink)', marginTop: 0}}>
            {filtered.map((p, i) => (
              <div className="card" key={p.id}>
                <div className="thumb">
                  <span className="ph">[ {p.name.toUpperCase()} ]</span>
                  {p.id === 'sessions' && <span className="badge">Pick</span>}
                  {p.id === 'razend' && <span className="badge">Heet</span>}
                </div>
                <div className="body">
                  <div className="dj">{p.dj}</div>
                  <div className="title">{p.name}</div>
                  <div className="desc">{p.desc}</div>
                </div>
                <div className="foot">
                  <span>{p.day} · {p.time}</span>
                  <span style={{color:'var(--mute)'}}>{p.genre}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'lijst' && (
          <div style={{borderTop:'1px solid var(--ink)'}}>
            {filtered.map((p, i) => (
              <div key={p.id} className={"prog-row" + (i === 4 ? ' is-live' : '')}>
                <span className="day">{p.day}</span>
                <span className="time">{p.time}</span>
                <div>
                  <div className="name">{p.name}</div>
                  <div className="prog-row-dj" style={{marginTop:4}}>{p.dj}</div>
                </div>
                <span className="gen">{p.genre}</span>
                <span className="arr">→</span>
              </div>
            ))}
          </div>
        )}

        {view === 'rooster' && (
          <div className="tg-wrap" style={{borderTop:'1px solid var(--ink)'}}>
            <div className="tg">
              <div className="h">/ tijd</div>
              {DAYS.map(d => <div key={d} className="h day">{d}</div>)}
              {SLOTS.map((slot, si) => (
                <React.Fragment key={slot}>
                  <div className="t">{slot}</div>
                  {DAYS.map(d => {
                    const key = `${d}_${slot}`;
                    const p = gridMap[key];
                    const isLive = d === 'WO' && slot === '22:00'; // arbitrary
                    return (
                      <div key={d}
                           className={"cell" + (isLive ? ' live' : '')}
                           title={p?.dj || ''}>
                        {p ? (
                          <>
                            {p.name}
                            <span className="dj">{p.dj}</span>
                          </>
                        ) : (
                          <span style={{color:'var(--mute)', fontWeight:400}}>Non-stop</span>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Spotlight bar ──────────── */}
        <div style={{
          marginTop: 64, marginBottom: 64,
          border: '1px solid var(--ink)',
          display: 'grid', gridTemplateColumns: '1fr 1.4fr',
          background: 'var(--ink)', color: 'var(--paper)',
        }}>
          <div style={{padding:'48px 40px', borderRight: '1px solid var(--paper)'}}>
            <div className="eyebrow" style={{color:'var(--accent)', marginBottom:14}}>// In de schijnwerper</div>
            <h3 style={{fontSize:54, lineHeight:0.9, marginBottom:18}}>
              Word DJ<br/>bij Scorpio.
            </h3>
            <p style={{fontSize:14, color:'rgba(244,242,236,0.65)', maxWidth:340, marginBottom:24}}>
              We zoeken doorlopend nieuwe stemmen voor onze antenne. Niet de juiste
              stem? Mixen, monteren, opnemen, schrijven — er is altijd plek.
            </p>
            <button className="play-cta" style={{borderColor:'var(--accent)'}}>
              <span className="ico"><Ic.arrow/></span>
              Schrijf je in
            </button>
          </div>
          <div style={{padding:'48px 40px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, alignContent:'center'}}>
            {[
              ['72', 'vrijwilligers achter de knoppen'],
              ['46', 'jaar onafhankelijke radio'],
              ['168', 'uur uitzending per week'],
              ['0', 'reclameblokken'],
            ].map(([n, t]) => (
              <div key={t}>
                <div style={{
                  fontFamily:'Archivo', fontWeight:900,
                  fontSize:88, lineHeight:0.85, letterSpacing:'-0.05em'
                }}>{n}</div>
                <div className="eyebrow" style={{color:'rgba(244,242,236,0.6)', marginTop:8}}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

window.Programmas = Programmas;
