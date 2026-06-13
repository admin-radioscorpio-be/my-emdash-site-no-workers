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
            <h1>
              RADIO<br/>SCORPIO <em>106<sup style={{fontSize:'0.5em', verticalAlign:'top', lineHeight:1}}> FM</sup></em>
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
          <div style={{display:'flex', flexDirection:'column', gap:16, alignItems:'flex-end', alignSelf:'center'}}>
            <button className="play-cta big" onClick={() => setPlaying(p => !p)}>
              <span className="ico">{playing ? <Ic.pause cls="lg"/> : <Ic.play cls="lg"/>}</span>
              Luister live
            </button>
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

        {/* NEWSLETTER + SHOP ───────────────── */}
        <SectHd num="01" title="Steun · Volg" />
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
