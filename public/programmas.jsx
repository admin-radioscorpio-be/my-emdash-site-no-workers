// programmas.jsx — Programs page

const SCHEDULE_API = 'https://public.radioscorpio.be/api/time/schema/list';
const NONSTOP_ID   = 25;
const DAY_ABBR     = { Maandag:'MA', Dinsdag:'DI', Woensdag:'WO', Donderdag:'DO', Vrijdag:'VR', Zaterdag:'ZA', Zondag:'ZO' };
const DAYS         = ['MA','DI','WO','DO','VR','ZA','ZO'];
const MONTHS_NL    = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];

function fmtWeekLabel(details, nav) {
  if (!details.length) return '';
  const d0 = details[0].programmatiecolumn.date;
  const d1 = details[details.length - 1].programmatiecolumn.date;
  const [, d0m] = d0.split('/').map(Number);
  const [d1d, d1m] = d1.split('/').map(Number);
  const d0d = d0.split('/')[0];
  const year = nav.thisweekstart ? new Date(nav.thisweekstart * 1000).getFullYear() : '';
  const month = MONTHS_NL[d1m - 1];
  // ISO week number
  const dt = new Date(nav.thisweekstart * 1000);
  const jan4 = new Date(dt.getFullYear(), 0, 4);
  const weekNum = Math.ceil(((dt - jan4) / 86400000 + jan4.getDay() + 1) / 7);
  return `Week ${weekNum} · ${d0d} — ${d1d} ${month} ${year}`;
}

function useSchedule() {
  const [schedule, setSchedule] = React.useState(null);
  const [loading, setLoading]   = React.useState(true);
  const [error, setError]       = React.useState(null);

  React.useEffect(() => {
    fetch(SCHEDULE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    })
      .then(r => r.json())
      .then(json => {
        const details = json?.programmatielijn?.details ?? [];
        const nav     = json?.programmatielijn?.navigatie?.navigatieblok ?? {};

        // Flatten all blocks
        const allBlocks = [];
        details.forEach(col => {
          const c        = col.programmatiecolumn;
          const dayShort = DAY_ABBR[c.day] ?? c.day;
          c.blokken.forEach(blok => {
            const b = blok.programmatieblok;
            allBlocks.push({
              id:        b.id,
              showid:    b.showid,
              name:      b.showName,
              day:       dayShort,
              dayFull:   c.day,
              date:      c.date,
              start:     b.startClockCalc,
              end:       b.endClockCalc,
              time:      `${b.startClockCalc}–${b.endClockCalc}`,
              imageURL:  b.imageURL || '',
              linkURL:   b.linkURL  || '',
              isNonstop: b.showid === NONSTOP_ID,
              genre:     null, // not available yet
            });
          });
        });

        // Rooster lookup: "MA_20:00" → block
        const byDaySlot = {};
        allBlocks.forEach(b => { byDaySlot[`${b.day}_${b.start}`] = b; });

        // Rooster time slots = unique start times of all shows, sorted
        const slotSet = new Set();
        allBlocks.forEach(b => { slotSet.add(b.start); });
        const slots = Array.from(slotSet).sort((a, z) => {
          const [ah, am] = a.split(':').map(Number);
          const [zh, zm] = z.split(':').map(Number);
          return (ah * 60 + am) - (zh * 60 + zm);
        });

        // Grid: unique shows (first occurrence per showid)
        const seenIds = new Set();
        const uniqueShows = [];
        allBlocks.forEach(b => {
          if (!seenIds.has(b.showid)) {
            seenIds.add(b.showid);
            uniqueShows.push(b);
          }
        });

        setSchedule({ allBlocks, byDaySlot, slots, uniqueShows,
                      weekLabel: fmtWeekLabel(details, nav) });
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  return { schedule, loading, error };
}

// ─────────────────────────────────────────────────────────────────────────────

function Programmas({ setRoute, setOdTarget }) {
  const [genre, setGenre] = React.useState('Alles');
  const [view, setView]   = React.useState('lijst');
  const { schedule, loading, error } = useSchedule();

  function goToOD(showid) {
    setOdTarget({ showid });
    setRoute('ondemand');
  }

  if (loading) return (
    <div style={{ padding:'120px 0', textAlign:'center', color:'var(--mute)' }}>
      Programma laden…
    </div>
  );

  if (error) return (
    <div style={{ padding:'120px 0', textAlign:'center', color:'var(--mute)' }}>
      Kon programma niet laden.
    </div>
  );

  const { allBlocks, byDaySlot, slots, uniqueShows, weekLabel } = schedule;

  // Genre filter — genre field is null for now, so only 'Alles' returns results
  const filtered = genre === 'Alles'
    ? uniqueShows
    : uniqueShows.filter(p => p.genre === genre);

  // Lijst: all blocks sorted by day order then time
  const dayOrder = Object.fromEntries(DAYS.map((d, i) => [d, i]));
  const listBlocks = allBlocks
    .sort((a, b) => dayOrder[a.day] - dayOrder[b.day] || a.start.localeCompare(b.start));

  return (
    <>
      <section data-screen-label="02 Programmas — Header">
        <div className="page-hd">
          <div>
            <div className="crumb">/ Programma's · {weekLabel}</div>
            <h1>
              168 uur,<br/>
              <span style={{color:'var(--mute)'}}>20+ stemmen.</span>
            </h1>
          </div>
          <div className="aside">
            // Gids<br/>
            <b>{uniqueShows.length} programma's</b>
            <span style={{display:'block', marginTop:14, color:'var(--mute)'}}>
              Filter, blader, ontdek.
            </span>
          </div>
        </div>

        {/* Filter chips ─────────── */}
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
            {['grid','rooster','lijst'].map(v => (
              <button key={v}
                      className={"chip" + (view === v ? ' is-active' : '')}
                      onClick={() => setView(v)}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="shell" data-screen-label="02 Programmas — Content" style={{paddingTop:0}}>

        {/* Grid view ─────────────────────────────────────── */}
        {view === 'grid' && (
          <div className="cards-grid" style={{borderTop:'1px solid var(--ink)', marginTop:0}}>
            {filtered.map(p => (
              <div className="card" key={p.id}
                   style={{cursor: p.isNonstop ? 'default' : 'pointer'}}
                   onClick={() => !p.isNonstop && goToOD(p.showid)}>
                <div className="thumb">
                  {p.imageURL
                    ? <img src={p.imageURL} alt={p.name}
                           style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                    : <span className="ph">[ {p.name.toUpperCase()} ]</span>
                  }
                </div>
                <div className="body">
                  <div className="title">{p.name}</div>
                </div>
                <div className="foot">
                  <span>{p.day} · {p.time}</span>
                  <span style={{color:'var(--mute)'}}>{p.genre ?? '—'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lijst view ─────────────────────────────────────── */}
        {view === 'lijst' && (
          <div style={{borderTop:'1px solid var(--ink)'}}>
            {listBlocks.map((p, i) => (
              <div key={p.id} className="prog-row"
                   style={{cursor: p.isNonstop ? 'default' : 'pointer'}}
                   onClick={() => !p.isNonstop && goToOD(p.showid)}>
                <span className="day">{p.day}</span>
                <span className="time">{p.time}</span>
                <div>
                  <div className="name">{p.name}</div>
                  <div className="prog-row-dj" style={{marginTop:4, color:'var(--mute)'}}>
                    {p.date}
                  </div>
                </div>
                <span className="gen">{p.genre ?? '—'}</span>
                <span className="arr">→</span>
              </div>
            ))}
          </div>
        )}

        {/* Rooster view ────────────────────────────────────── */}
        {view === 'rooster' && (
          <div className="tg-wrap" style={{borderTop:'1px solid var(--ink)'}}>
            <div className="tg">
              <div className="h">/ tijd</div>
              {DAYS.map(d => <div key={d} className="h day">{d}</div>)}
              {slots.map(slot => (
                <React.Fragment key={slot}>
                  <div className="t">{slot}</div>
                  {DAYS.map(d => {
                    const p = byDaySlot[`${d}_${slot}`];
                    return (
                      <div key={d} className="cell" title={p?.name || ''}
                           style={{cursor: p && !p.isNonstop ? 'pointer' : 'default'}}
                           onClick={() => p && !p.isNonstop && goToOD(p.showid)}>
                        {p
                          ? p.name
                          : <span style={{color:'var(--mute)', fontWeight:400}}>—</span>
                        }
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Spotlight bar ─────────────────────────────────── */}
        <div style={{
          marginTop:64, marginBottom:64,
          border:'1px solid var(--ink)',
          display:'grid', gridTemplateColumns:'1fr 1.4fr',
          background:'var(--ink)', color:'var(--paper)',
        }}>
          <div style={{padding:'48px 40px', borderRight:'1px solid var(--paper)'}}>
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
              ['72',  'vrijwilligers achter de knoppen'],
              ['46',  'jaar onafhankelijke radio'],
              ['168', 'uur uitzending per week'],
              ['0',   'reclameblokken'],
            ].map(([n, t]) => (
              <div key={t}>
                <div style={{fontFamily:'Archivo', fontWeight:900, fontSize:88, lineHeight:0.85, letterSpacing:'-0.05em'}}>{n}</div>
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
