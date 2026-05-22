// playlist.jsx — Now playing + history

function Playlist({ setRoute }) {
  const [q, setQ] = React.useState('');
  const [range, setRange] = React.useState('1u');

  const visible = TRACKS.filter(t =>
    !q || t.artist.toLowerCase().includes(q.toLowerCase())
       || t.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <section data-screen-label="03 Playlist — Header">
        <div className="page-hd">
          <div>
            <div className="crumb">/ Playlist · live update · 18 mei 2026 · 23:42</div>
            <h1>
              Wat draaide<br/>
              <span style={{color:'var(--mute)'}}>er net?</span>
            </h1>
          </div>
          <div className="aside">
            // Sinds startup<br/>
            <b>847 platen vandaag</b>
            <span style={{display:'block', marginTop:14, color:'var(--mute)'}}>
              Live API · 5 sec refresh
            </span>
          </div>
        </div>
      </section>

      {/* NOW PLAYING ─────────────────── */}
      <div data-screen-label="03 Playlist — Now playing">
        <div className="now-big" style={{maxWidth:1440, margin:'0 auto'}}>
          <div className="cover">
            <span className="ph">[ ALBUM ART ]</span>
          </div>
          <div className="info">
            <div>
              <div className="lbl">
                <span className="dot pulse" style={{background:'var(--ink)', marginRight:8}}/>
                Nu draait · 23:42
              </div>
              <div className="artist">Dry Cleaning</div>
              <div className="title">Hit My Head All Day</div>
            </div>
            <div className="row">
              <span>New Long Leg · 4AD · 2021</span>
              <span style={{display:'flex', gap:18}}>
                <a style={{textDecoration:'underline', textUnderlineOffset:4}}>♥ Bewaar</a>
                <a style={{textDecoration:'underline', textUnderlineOffset:4}}>Bandcamp →</a>
                <a style={{textDecoration:'underline', textUnderlineOffset:4}}>Spotify →</a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="shell" data-screen-label="03 Playlist — History" style={{paddingTop: 0}}>

        {/* Tools ──────────── */}
        <div className="pl-tools" style={{borderTop:'1px solid var(--ink)', marginTop: 0}}>
          <div className="search">
            <Ic.search/>
            <input
              placeholder="Zoek op artiest, titel of album"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>
          <div className="filter-grp">
            {['1u', '6u', '24u', 'week'].map(r => (
              <button key={r}
                      className={range === r ? 'is-active' : ''}
                      onClick={() => setRange(r)}>
                {r}
              </button>
            ))}
          </div>
          <div className="filter-grp">
            <button className="is-active">Recent</button>
            <button>Meest gedraaid</button>
          </div>
        </div>

        {/* TABLE ─────────── */}
        <div>
          <div className="pl-head">
            <span>/ #</span>
            <span>tijd</span>
            <span></span>
            <span>artiest · titel</span>
            <span>album</span>
            <span style={{textAlign:'right'}}>duur</span>
          </div>
          {visible.map((t, i) => (
            <div key={i} className={"pl-row" + (t.now ? ' now' : '')}>
              <span className="num">{String(i+1).padStart(3, '0')}</span>
              <span className="time">{t.time}</span>
              <div className="cover">
                {t.now
                  ? <Ic.play cls="lg"/>
                  : <span>ART</span>}
              </div>
              <div>
                <div className="artist">{t.artist}</div>
                <div className="title">{t.title}</div>
              </div>
              <div style={{fontSize:13}}>
                {t.album}
              </div>
              <span className="dur">{t.dur}</span>
            </div>
          ))}
        </div>

        {/* STATS strip ──────────── */}
        <div style={{
          marginTop: 64, marginBottom: 64,
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
          border:'1px solid var(--ink)',
        }}>
          {[
            ['/ TOP ARTIEST · 7 DAGEN', 'Black Country, New Road', '14× gedraaid'],
            ['/ TOP ALBUM · 7 DAGEN',   'Diamond Jubilee',          'Cindy Lee'],
            ['/ ONTDEKT BIJ SCORPIO',   'Maartje Vandeputte',       '12 nieuwe artiesten'],
          ].map(([lbl, big, sub], i) => (
            <div key={i} style={{
              padding:'32px 28px',
              borderRight: i < 2 ? '1px solid var(--ink)' : 0,
            }}>
              <div className="eyebrow" style={{color:'var(--mute)', marginBottom:16}}>{lbl}</div>
              <div style={{
                fontFamily:'Archivo', fontWeight:900,
                fontSize:36, lineHeight:0.9, letterSpacing:'-0.02em',
                textTransform:'uppercase', marginBottom:8,
              }}>{big}</div>
              <div className="eyebrow" style={{color:'var(--ink)'}}>{sub}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

window.Playlist = Playlist;
