// sessions.jsx — Scorpio Sessions archive

// Each session has a `feed` — the Mixcloud path: /RadioScorpio/<slug>/
const SESSIONS = [
  {
    feed:     '/RadioScorpio/far-away-20250822-s02e08-set/',
    title:    'Far Away',
    episode:  'S02E08',
    date:     '22/08/2025',
    image:    null,
  },
  {
    feed:     '/RadioScorpio/milk-crate-club-20250815-s01e12/',
    title:    'Milk Crate Club',
    episode:  'S01E12',
    date:     '15/08/2025',
    image:    null,
  },
  {
    feed:     '/RadioScorpio/far-away-20250808-s02e07-set/',
    title:    'Far Away',
    episode:  'S02E07',
    date:     '08/08/2025',
    image:    null,
  },
  {
    feed:     '/RadioScorpio/milk-crate-club-20250801-s01e11/',
    title:    'Milk Crate Club',
    episode:  'S01E11',
    date:     '01/08/2025',
    image:    null,
  },
  {
    feed:     '/RadioScorpio/far-away-20250725-s02e06-set/',
    title:    'Far Away',
    episode:  'S02E06',
    date:     '25/07/2025',
    image:    null,
  },
  {
    feed:     '/RadioScorpio/milk-crate-club-20250718-s01e10/',
    title:    'Milk Crate Club',
    episode:  'S01E10',
    date:     '18/07/2025',
    image:    null,
  },
];

function Sessions({ setRoute, playing, setPlaying, setSessionFeed, sessionFeed }) {
  const [activeShow, setActiveShow] = React.useState('');

  const shows = [...new Set(SESSIONS.map(s => s.title))];

  const visible = activeShow
    ? SESSIONS.filter(s => s.title === activeShow)
    : SESSIONS;

  function playSession(s) {
    setSessionFeed({ feed: s.feed, title: s.episode, showName: s.title, image: s.image });
    setPlaying(true);
  }

  function isActive(s) {
    return sessionFeed?.feed === s.feed;
  }

  return (
    <>
      <section data-screen-label="05 Sessions — Header">
        <div className="page-hd">
          <div>
            <div className="crumb">/ Scorpio Sessions · studio 3</div>
            <h1>
              Opnames &<br/>
              <span style={{color:'var(--mute)'}}>terugluisteren</span>
            </h1>
          </div>
          <div className="aside">
            // Studio 3<br/>
            <b>{SESSIONS.length} sessies</b>
            <span style={{display:'block', marginTop:14, color:'var(--mute)'}}>
              Live opnames · Mixcloud
            </span>
          </div>
        </div>
      </section>

      <main className="shell" data-screen-label="05 Sessions — Grid" style={{paddingTop:0}}>

        {/* Filter strip */}
        <div style={{
          display: 'flex', gap: 8, padding: '16px 0',
          borderTop: '1px solid var(--ink)',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={() => setActiveShow('')}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              background: !activeShow ? 'var(--ink)' : 'none',
              color: !activeShow ? 'var(--paper)' : 'var(--ink)',
              border: '1px solid var(--ink)', padding: '5px 12px', cursor: 'pointer',
            }}>
            Alle shows
          </button>
          {shows.map(show => (
            <button key={show}
              onClick={() => setActiveShow(s => s === show ? '' : show)}
              style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                background: activeShow === show ? 'var(--ink)' : 'none',
                color: activeShow === show ? 'var(--paper)' : 'var(--ink)',
                border: '1px solid var(--ink)', padding: '5px 12px', cursor: 'pointer',
              }}>
              {show}
            </button>
          ))}
        </div>

        {/* Sessions grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 1,
          border: '1px solid var(--ink)',
          marginTop: 0,
        }}>
          {visible.map(s => {
            const active = isActive(s);
            return (
              <div key={s.feed} style={{
                padding: '28px 24px',
                borderRight: '1px solid var(--ink)',
                borderBottom: '1px solid var(--ink)',
                background: active ? 'var(--ink)' : 'transparent',
                color: active ? 'var(--paper)' : 'var(--ink)',
                display: 'flex', flexDirection: 'column', gap: 16,
              }}>
                {/* Cover placeholder */}
                <div style={{
                  width: '100%', aspectRatio: '1',
                  background: active ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, letterSpacing: '0.08em', fontFamily: '"JetBrains Mono", monospace',
                  textTransform: 'uppercase', color: active ? 'rgba(255,255,255,0.4)' : 'var(--mute)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  {s.image
                    ? <img src={s.image} alt={s.title}
                           style={{width:'100%',height:'100%',objectFit:'cover',position:'absolute'}}/>
                    : '[ ' + s.title + ' ]'
                  }
                  {active && playing && (
                    <div style={{
                      position: 'absolute', bottom: 12, right: 12,
                      display: 'flex', gap: 3, alignItems: 'flex-end', height: 20,
                    }}>
                      {[0.6, 1, 0.75, 0.9, 0.5].map((h, i) => (
                        <div key={i} style={{
                          width: 3, background: 'var(--accent)',
                          height: `${h * 100}%`,
                          animation: `bar-bounce 0.${6+i}s ease-in-out infinite alternate`,
                        }}/>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: active ? 'rgba(255,255,255,0.55)' : 'var(--mute)',
                    marginBottom: 4,
                  }}>
                    {s.date} · {s.episode}
                  </div>
                  <div style={{
                    fontFamily: 'Archivo', fontWeight: 900,
                    fontSize: 22, lineHeight: 1, letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                  }}>
                    {s.title}
                  </div>
                </div>

                <button
                  onClick={() => active && playing ? setPlaying(false) : active ? setPlaying(true) : playSession(s)}
                  style={{
                    alignSelf: 'flex-start',
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    background: active ? 'var(--accent)' : 'none',
                    color: active ? 'var(--ink)' : active ? 'var(--paper)' : 'var(--ink)',
                    border: active ? '1px solid var(--accent)' : '1px solid currentColor',
                    padding: '7px 14px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                  {active && playing
                    ? <><Ic.pause/> Pauzeer</>
                    : active
                      ? <><Ic.play/> Hervat</>
                      : <><Ic.play/> Luister</>
                  }
                </button>
              </div>
            );
          })}
        </div>

        <div style={{marginTop: 48, marginBottom: 64, color: 'var(--mute)', fontSize: 13,
                     fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.06em'}}>
          // Opnames via Mixcloud · RadioScorpio
        </div>
      </main>
    </>
  );
}

window.Sessions = Sessions;
