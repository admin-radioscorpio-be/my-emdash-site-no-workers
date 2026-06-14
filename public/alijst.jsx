// alijst.jsx — A-Lijst: maandelijkse curatorselectie

function ALijst({ setRoute }) {
  const [edId, setEdId] = React.useState(ALIJST.current);
  const editions = ALIJST.editions;
  const idx = Math.max(0, editions.findIndex(e => e.id === edId));
  const ed = editions[idx];
  const newer = editions[idx - 1]; // editions sorted newest-first
  const older = editions[idx + 1];

  const listRef = React.useRef(null);
  const go = (id, scrollToList) => {
    setEdId(id);
    if (scrollToList && listRef.current) {
      const y = listRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const topCovers = ed.covers.slice(0, 3);
  const botCovers = ed.covers.slice(3, 6);
  const tones = ['t-ink', 't-accent', 't-paper'];

  const half = Math.ceil(ed.tracks.length / 2);
  const cols = [ed.tracks.slice(0, half), ed.tracks.slice(half)];

  const Cover = (c, i, base) => {
    const n = base + i;
    const inner = (
      <>
        <div className={"al-cover-art " + tones[(n) % 3]}>
          <div className="tex"/>
          <div className="gnum">{String(n + 1).padStart(2, '0')}</div>
          <span className="tag">Uitgelicht</span>
          <span className="ph">[ Cover ]</span>
        </div>
        <div className="al-cover-cap">
          <div className="who">
            <div className="artist">{c.artist}</div>
            <div className="title">{c.title}</div>
          </div>
          <span className="src">{alSource(c.url)} <Ic.arrow/></span>
        </div>
      </>
    );
    return c.url
      ? <a key={n} className="al-cover" href={c.url} target="_blank" rel="noopener noreferrer">{inner}</a>
      : <div key={n} className="al-cover">{inner}</div>;
  };

  const Track = (t, n) => {
    const inner = (
      <>
        <span className="num">{String(n + 1).padStart(2, '0')}</span>
        <div className="who">
          <div className="artist">{t.artist}</div>
          <div className="title">{t.title}</div>
        </div>
        <span className="src">{alSource(t.url)} <Ic.arrow/></span>
      </>
    );
    return t.url
      ? <a key={n} className="al-track" href={t.url} target="_blank" rel="noopener noreferrer">{inner}</a>
      : <div key={n} className="al-track">{inner}</div>;
  };

  return (
    <>
      {/* MASTHEAD ─────────────────────────────────────────── */}
      <section className="al-mast" data-screen-label="A-Lijst — Masthead">
        <div className="grid"/>
        <div className="inner">
          <div>
            <div className="al-eyebrow">
              <span className="dot pulse"/> Maandelijkse selectie · In hoogste rotatie
            </div>
            <h1>A<span className="dash">–</span>Lijst</h1>
            <p className="al-intro">
              De <b>A-lijst</b> is Radio Scorpio's muzikale selectie van het moment,
              toegediend via onze onnavolgbare nonstoplijst. Deze tracks staan momenteel
              in de hoogste rotatie. Klik op een track voor audio / video / disco.
            </p>
          </div>

          <div className="al-current">
            <div className="mo">{ed.month}</div>
            <div className="yr">{ed.year}</div>
            <div className="stat">
              <span>Editie {ed.editionNo}</span>
              <span>{ed.tracks.length} tracks</span>
            </div>
            <div className="al-step">
              <button onClick={() => older && go(older.id)} disabled={!older}>
                <Ic.arrow style={{transform:'rotate(180deg)'}}/> Ouder
              </button>
              <button onClick={() => newer && go(newer.id)} disabled={!newer}>
                Nieuwer <Ic.arrow/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK EDITION SWITCHER ───────────────────────────── */}
      <div className="shell" style={{padding:0}}>
        <div className="al-editions">
          <span className="al-edchip label">/ Edities</span>
          {editions.map(e => (
            <button key={e.id}
                    className={"al-edchip" + (e.id === ed.id ? ' is-active' : '')}
                    onClick={() => go(e.id)}>
              {e.monthShort} {String(e.year).slice(2)}
            </button>
          ))}
        </div>
      </div>

      <main className="shell" style={{paddingTop: 0}}>

        {/* TOP COVERS ─────────────────────────────────────── */}
        <div className="al-covers" data-screen-label="A-Lijst — Covers boven">
          {topCovers.map((c, i) => Cover(c, i, 0))}
        </div>

        {/* THE LIST ───────────────────────────────────────── */}
        <div ref={listRef}>
          <SectHd num={ed.editionNo}
                   title={<>De lijst<br/><span style={{color:'var(--mute)'}}>{ed.month} {ed.year}</span></>}/>
          <div className="al-list" style={{marginTop:-24}} data-screen-label="A-Lijst — Tracklijst">
            {cols.map((col, ci) => (
              <div className="col" key={ci}>
                {col.map((t, i) => Track(t, ci === 0 ? i : half + i))}
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM COVERS ──────────────────────────────────── */}
        <div className="al-covers" style={{marginTop:0, borderTop:'1px solid var(--rule)'}} data-screen-label="A-Lijst — Covers onder">
          {botCovers.map((c, i) => Cover(c, i, 3))}
        </div>

        {/* ARCHIVE ────────────────────────────────────────── */}
        <div data-screen-label="A-Lijst — Archief">
          <SectHd num="//" title="Archief" />
          <div className="al-arch-grid" style={{marginTop:-24, marginBottom:64}}>
            {editions.map(e => (
              <div key={e.id}
                   className={"al-arch" + (e.id === ed.id ? ' is-active' : '')}
                   onClick={() => go(e.id, true)}>
                <div className="eno">Editie {e.editionNo}</div>
                <div className="al-arch-sw">
                  {e.covers.map((c, i) => (
                    <span key={i} className={['s-ink','s-accent','s-paper'][i % 3]}/>
                  ))}
                </div>
                <div className="mo">{e.month}<br/>{e.year}</div>
                <div className="al-arch-foot">
                  <span>{e.tracks.length} tracks</span>
                  <span className="go">{e.id === ed.id ? 'Nu' : 'Bekijk →'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

window.ALijst = ALijst;
