// home.jsx — Radio Scorpio homepage

function Home({ setRoute, playing, setPlaying, nowPlaying }) {
  const { show, upcoming } = nowPlaying;
  return (
    <>
      {/* HERO ─────────────────────────────────────────────── */}
      <section className="hero" data-screen-label="01 Home — Hero">
        <div className="grid"/>
        <svg className="scorpion" viewBox="0 0 100 80" aria-hidden="true">
          {/* very rough scorpion silhouette */}
          <path d="M20 50 Q25 35 45 38 Q55 35 65 40 Q72 38 75 45 Q70 50 72 55 Q78 50 85 52 Q82 60 75 58 Q72 65 65 62 Q60 70 55 65 Q50 70 45 65 Q35 70 30 60 Q22 60 20 50 Z M75 45 Q85 30 90 18 Q92 12 88 8 Q92 14 90 22 Q86 32 78 42 Z" fill="currentColor"/>
        </svg>
        <div className="inner">
          <div>
            <div className="eyebrow" style={{color:'rgba(244,242,236,0.65)', marginBottom:24}}>
              <span className="dot pulse" style={{background:'var(--accent)', marginRight:8}}/>
              Live op 106.0 FM · Web stream · DAB+
            </div>
            <h1>
              RADIO<br/>SCORPIO <em>106</em>
            </h1>
            <div className="meta">
              <div>
                <b>Sinds 1980</b>
                <span>Vrijwilligersradio Leuven</span>
              </div>
              <div>
                <b>168 uur / week</b>
                <span>Non-stop programma</span>
              </div>
              <div>
                <b>72 vrijwilligers</b>
                <span>Aan de knoppen</span>
              </div>
              <div>
                <b>20+ programma's</b>
                <span>Geen reclame</span>
              </div>
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:16, alignItems:'flex-end'}}>
            <button className="play-cta big" onClick={() => setPlaying(true)}>
              <span className="ico"><Ic.play cls="lg"/></span>
              Luister live
            </button>
            <div className="eyebrow" style={{color:'rgba(244,242,236,0.55)', textAlign:'right'}}>
              192 kbps · MP3<br/>
              ALT: AAC · OGG
            </div>
          </div>
        </div>
      </section>

      {/* ON-AIR STRIP ──────────────────────────────────────── */}
      <section className="onair" data-screen-label="01 Home — On air strip">
        <div className="live-cell">
          <div className="lbl">// Nu op antenne</div>
          <div className="v">
            {show ? `${show.start} — ${show.end}` : '—'}
          </div>
        </div>
        <div>
          <div className="lbl">Programma</div>
          <div className="v">{show?.name ?? '—'}</div>
        </div>
        <div>
          <div className="lbl">{upcoming ? `Straks · ${upcoming.start}` : 'Straks'}</div>
          <div className="v">{upcoming?.name ?? '—'}</div>
        </div>
        <div>
          <div className="lbl">Daarna</div>
          <div className="v" style={{color:'var(--mute)'}}>—</div>
        </div>
      </section>

      {/* MAIN GRID ─────────────────────────────────────────── */}
      <main className="shell" data-screen-label="01 Home — Main">

        {/* FEATURE — sessions ─────────────── */}
        <SectHd num="01" title={<>Scorpio<br/>Sessions</>} more="Alle sessies" onMore={() => setRoute('sessions')}/>
        <div className="feature">
          <div className="vid">
            <div className="grid-overlay"/>
            <button className="play-overlay">
              <Ic.play cls="lg"/>
            </button>
            <div style={{
              position:'absolute', top:14, left:14,
              fontFamily:'JetBrains Mono, monospace', fontSize:11,
              letterSpacing:'0.1em', textTransform:'uppercase',
              color:'rgba(244,242,236,0.6)'
            }}>
              SESSION #047 · 14.05.2026
            </div>
            <div style={{
              position:'absolute', bottom:14, left:14, right:14,
              display:'flex', justifyContent:'space-between',
              fontFamily:'JetBrains Mono, monospace', fontSize:11,
              letterSpacing:'0.1em', textTransform:'uppercase',
              color:'rgba(244,242,236,0.6)'
            }}>
              <span>4 nummers · 28 min</span>
              <span>HD · 1080p</span>
            </div>
          </div>
          <div className="meta">
            <div>
              <span className="tag">Nieuw</span>
              <h3>Brutus — Live in studio 3</h3>
              <p className="desc">
                Het Leuvense trio kwam langs voor een akoestische set en een gesprek
                over hun nieuwe plaat "Unison Life". Vier nummers, één take, geen
                tweede kans.
              </p>
            </div>
            <div style={{display:'flex', gap:14, alignItems:'center', marginTop:24}}>
              <button className="play-cta">
                <span className="ico"><Ic.play/></span>
                Bekijk sessie
              </button>
              <div style={{
                fontFamily:'JetBrains Mono, monospace', fontSize:11,
                letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--mute)'
              }}>
                Volgende session<br/>
                <b style={{color:'var(--ink)', fontWeight:600}}>Meskerem Mees · 28.05</b>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRAMS PREVIEW ───────────────── */}
        <SectHd num="02" title={<>Programma's<br/><span style={{color:'var(--mute)'}}>deze week</span></>} more="Volledige gids" onMore={() => setRoute('programmas')}/>
        <div className="cards-grid">
          {PROGRAMS.slice(0, 6).map((p, i) => (
            <div className="card" key={p.id}>
              <div className="thumb">
                <span className="ph">[ DJ-FOTO {String(i+1).padStart(2,'0')} ]</span>
                {i === 0 && <span className="badge">★ Pick</span>}
                {i === 2 && <span className="badge">Nieuw</span>}
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

        {/* DE BESTE 106 + CULTAFACTS ─────── */}
        <SectHd num="03" title="De Beste 106" more="Volledige lijst"/>
        <div className="grid-2 rule">
          <div style={{padding:'32px 28px', borderRight:'1px solid var(--ink)'}}>
            <div className="eyebrow" style={{color:'var(--mute)', marginBottom:18}}>WEEK 21 · BIJGEWERKT MA 18.05</div>
            <h3 style={{fontSize:54, lineHeight:0.9, marginBottom:8}}>
              Wat Leuven<br/>nu draait.
            </h3>
            <p style={{fontSize:14, color:'var(--mute)', maxWidth:340, marginBottom:24}}>
              Iedere week tellen we de 106 beste platen af, samengesteld door
              luisteraars, DJ's en de redactie. Stem mee.
            </p>
            <button className="play-cta">
              <span className="ico"><Ic.arrow/></span>
              Stem voor week 22
            </button>
          </div>
          <div>
            {[
              ['01', 'Black Country, New Road', 'Forever Howlong', '↑ 03'],
              ['02', 'Mdou Moctar',              'Funeral For Justice', '— 00'],
              ['03', 'Jessica Pratt',            'Here In The Pitch', '↑ 01'],
              ['04', 'Beth Gibbons',             'Lives Outgrown',    '↓ 02'],
              ['05', 'Cindy Lee',                'Diamond Jubilee',   'NEW'],
              ['06', 'Slowdive',                 'Everything Is Alive', '— 00'],
            ].map(([n, a, t, m], i) => (
              <div key={n} style={{
                display:'grid',
                gridTemplateColumns:'48px 1fr 80px',
                padding:'14px 18px',
                borderBottom: i < 5 ? '1px solid var(--ink)' : 0,
                alignItems:'center',
                gap:12,
              }}>
                <span className="mono" style={{fontSize:20, fontWeight:700}}>{n}</span>
                <div>
                  <div style={{fontFamily:'Archivo', fontWeight:800, fontSize:16, textTransform:'uppercase', letterSpacing:'-0.01em'}}>{a}</div>
                  <div style={{fontSize:13, color:'var(--mute)'}}>{t}</div>
                </div>
                <span className="mono" style={{fontSize:11, letterSpacing:'0.06em', textAlign:'right', color: m === 'NEW' ? 'var(--ink)' : 'var(--mute)', fontWeight: m === 'NEW' ? 700 : 400}}>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CULTAFACTS row ────────────────── */}
        <SectHd num="04" title="Cultafacts" more="Alle artikels"/>
        <div className="grid-2 rule" style={{marginBottom: 0}}>
          <div style={{padding:'32px 28px', borderRight:'1px solid var(--ink)'}}>
            <div className="eyebrow" style={{color:'var(--mute)', marginBottom:14}}>17 MEI 2026 · CONCERTREVIEW · 4 MIN</div>
            <h3 style={{fontSize:42, lineHeight:0.92, marginBottom:14}}>
              Het Bos draait door:<br/>noteboom &amp; co
            </h3>
            <p style={{fontSize:14, color:'var(--mute)', marginBottom:24}}>
              Drie avonden, drie zalen, drieduizend bezoekers. Onze redactie
              fietste het festival af en kwam terug met blaren en boekenwijsheid.
            </p>
            <a style={{textDecoration:'underline', textUnderlineOffset:4, fontFamily:'JetBrains Mono', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:600}}>
              Lees verder →
            </a>
          </div>
          <div style={{padding:'32px 28px'}}>
            <div className="eyebrow" style={{color:'var(--mute)', marginBottom:14}}>16 MEI 2026 · AGENDA · 2 MIN</div>
            <h3 style={{fontSize:42, lineHeight:0.92, marginBottom:14}}>
              Wat te doen<br/>deze week
            </h3>
            <p style={{fontSize:14, color:'var(--mute)', marginBottom:24}}>
              Acht concerten, twee expo's, één openluchtcinema en de jaarlijkse
              fanfare-parade. Onze redactie selecteerde.
            </p>
            <a style={{textDecoration:'underline', textUnderlineOffset:4, fontFamily:'JetBrains Mono', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:600}}>
              Lees verder →
            </a>
          </div>
        </div>

        {/* NEWSLETTER + SHOP ───────────────── */}
        <SectHd num="05" title="Steun · Volg" />
        <div className="dual" style={{marginBottom:64}}>
          <div className="accent-bg">
            <div className="eyebrow" style={{marginBottom:8}}>// T-Shirts</div>
            <h3>Trotse<br/>SCORPIO drager?</h3>
            <p style={{color:'var(--ink)'}}>
              Onze nieuwe collectie is binnen. Zwart op zwart, wit op wit,
              gedrukt in Leuven en gesigneerd door je favoriete DJ.
            </p>
            <button className="btn">
              Naar de shop <Ic.arrow/>
            </button>
          </div>
          <div>
            <div className="eyebrow" style={{color:'var(--mute)', marginBottom:8}}>// Nieuwsbrief</div>
            <h3>Wekelijks in je inbox.</h3>
            <p>
              Elke vrijdag een selectie van de mooiste platen, de scherpste
              gesprekken en de gekste sessies van de week.
            </p>
            <input type="email" placeholder="jouw@email.be"/>
            <button className="btn">
              Inschrijven <Ic.arrow/>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

window.Home = Home;
