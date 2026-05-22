// playlist.jsx — Now playing + history

const PLAYLIST_API = 'https://public.radioscorpio.be/api/playlist/list';

const RANGE_DAYS = { '1u': 1, '6u': 1, '24u': 2, 'week': 7 };

function dateStr(daysAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function fmtTime(unixTs) {
  return new Date(unixTs * 1000).toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' });
}

function parseSong(song) {
  const idx = song.indexOf(' - ');
  if (idx === -1) return { artist: song, title: '—' };
  return { artist: song.slice(0, idx).trim(), title: song.slice(idx + 3).trim() };
}

function fetchDay(date) {
  return fetch(PLAYLIST_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ startlistdate: date }),
  }).then(r => r.json()).then(j => j.playlistitems ?? []);
}

function usePlaylist(range) {
  const [items, setItems]     = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError]     = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);

    const days = RANGE_DAYS[range] ?? 1;
    const dates = Array.from({ length: days }, (_, i) => dateStr(i));

    Promise.all(dates.map(fetchDay))
      .then(results => {
        const all = results.flat();
        all.sort((a, b) => b.ID - a.ID);
        setItems(all);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [range]);

  return { items, loading, error };
}

// ─────────────────────────────────────────────────────────────────────────────

function Playlist({ setRoute, nowPlaying }) {
  const [q, setQ]         = React.useState('');
  const [range, setRange] = React.useState('1u');
  const { track }         = nowPlaying;
  const { items, loading, error } = usePlaylist(range);

  const nowParsed = track?.title ? parseSong(track.title) : null;

  const visible = items.filter(t => {
    if (!q) return true;
    const { artist, title } = parseSong(t.song);
    const s = q.toLowerCase();
    return artist.toLowerCase().includes(s) || title.toLowerCase().includes(s);
  });

  return (
    <>
      <section data-screen-label="03 Playlist — Header">
        <div className="page-hd">
          <div>
            <div className="crumb">/ Playlist · live update · {dateStr()}</div>
            <h1>
              Wat draaide<br/>
              <span style={{color:'var(--mute)'}}>er net?</span>
            </h1>
          </div>
          <div className="aside">
            // Historie<br/>
            <b>{loading ? '…' : `${items.length} tracks`}</b>
            <span style={{display:'block', marginTop:14, color:'var(--mute)'}}>
              Live API · websocket
            </span>
          </div>
        </div>
      </section>

      {/* NOW PLAYING ─────────────────── */}
      <div data-screen-label="03 Playlist — Now playing">
        <div className="now-big" style={{maxWidth:1440, margin:'0 auto'}}>
          <div className="cover">
            {track?.image
              ? <img src={track.image} alt={track.title}
                     style={{width:'100%', height:'100%', objectFit:'cover'}}/>
              : <span className="ph">[ ALBUM ART ]</span>
            }
          </div>
          <div className="info">
            <div>
              <div className="lbl">
                <span className="dot pulse" style={{background:'var(--ink)', marginRight:8}}/>
                Nu draait
              </div>
              <div className="artist">{nowParsed?.artist ?? '—'}</div>
              <div className="title">{nowParsed?.title  ?? '—'}</div>
            </div>
            <div className="row">
              <span style={{color:'var(--mute)'}}>Radio Scorpio 106 FM</span>
            </div>
          </div>
        </div>
      </div>

      <main className="shell" data-screen-label="03 Playlist — History" style={{paddingTop:0}}>

        {/* Tools ──────────── */}
        <div className="pl-tools" style={{borderTop:'1px solid var(--ink)', marginTop:0}}>
          <div className="search">
            <Ic.search/>
            <input
              placeholder="Zoek op artiest of titel"
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
        </div>

        {/* TABLE ─────────── */}
        {loading && (
          <div style={{padding:'48px 0', textAlign:'center', color:'var(--mute)'}}>
            Laden…
          </div>
        )}
        {error && (
          <div style={{padding:'48px 0', textAlign:'center', color:'var(--mute)'}}>
            Kon playlist niet laden.
          </div>
        )}
        {!loading && !error && (
          <div>
            <div className="pl-head">
              <span>/ #</span>
              <span>tijd</span>
              <span></span>
              <span>artiest · titel</span>
            </div>
            {visible.map((t, i) => {
              const { artist, title } = parseSong(t.song);
              const isNow = i === 0 && !q;
              const defaultArt = 'https://can.radioscorpio.be/2016/03/cd.png';
              const art = t.imageurl && t.imageurl !== defaultArt ? t.imageurl : null;
              return (
                <div key={t.ID} className={"pl-row" + (isNow ? ' now' : '')}>
                  <span className="num">{String(i + 1).padStart(3, '0')}</span>
                  <span className="time">{fmtTime(t.startTime)}</span>
                  <div className="cover">
                    {art
                      ? <img src={art} alt={artist}
                             style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                      : isNow ? <Ic.play cls="lg"/> : <span style={{color:'var(--mute)', fontSize:10}}>—</span>
                    }
                  </div>
                  <div>
                    <div className="artist">{artist}</div>
                    <div className="title">{title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STATS strip ──────────── */}
        <div style={{
          marginTop:64, marginBottom:64,
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
