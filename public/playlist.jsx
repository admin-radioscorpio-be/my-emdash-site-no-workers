// playlist.jsx — Now playing + history
// insert_ts from the API is UTC; display times are converted to Europe/Brussels

const PLAYLIST_API = 'https://public.radioscorpio.be/api/playlist/list';

function dateStr() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Brussels' }); // "YYYY-MM-DD"
}

function parseInsertTs(ts) {
  return new Date(ts.replace(' ', 'T') + 'Z'); // treat as UTC
}

function fmtTime(ts) {
  return parseInsertTs(ts).toLocaleTimeString('nl-BE', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Brussels',
  });
}

function parseSong(song) {
  const idx = song.indexOf(' - ');
  if (idx === -1) return { artist: song, title: '—' };
  return { artist: song.slice(0, idx).trim(), title: song.slice(idx + 3).trim() };
}

// Convert a selected Brussels hour on a date to the correct UTC ISO string for the API
function brusselsHourToUTC(dateStr, hour) {
  const approx = new Date(`${dateStr}T${String(hour).padStart(2, '0')}:00:00Z`);
  const bh = parseInt(new Intl.DateTimeFormat('en', {
    timeZone: 'Europe/Brussels', hour: 'numeric', hour12: false,
  }).format(approx));
  return new Date(approx.getTime() + (hour - bh) * 3600000).toISOString();
}

function fetchPlaylist(startlistdate) {
  return fetch(PLAYLIST_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ startlistdate, filterdate: '', filterhour: '' }),
  }).then(r => r.json()).then(j => ({
    items:  j.playlistitems ?? [],
    header: j.playlistheader?.[0] ?? null,
  }));
}

function usePlaylist(archiveDate, archiveHour) {
  const [items, setItems]     = React.useState([]);
  const [header, setHeader]   = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError]     = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    setHeader(null);

    const startlistdate = (archiveDate && archiveHour !== '')
      ? brusselsHourToUTC(archiveDate, parseInt(archiveHour))
      : new Date().toISOString();

    fetchPlaylist(startlistdate)
      .then(({ items: all, header: hdr }) => {
        all.sort((a, b) => a.ID - b.ID);
        setItems(all);
        setHeader(hdr);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [archiveDate, archiveHour]);

  return { items, header, loading, error };
}

// ─────────────────────────────────────────────────────────────────────────────

function Playlist({ setRoute, nowPlaying }) {
  const [q, setQ]                     = React.useState('');
  const [archiveDate, setArchiveDate] = React.useState('');
  const [archiveHour, setArchiveHour] = React.useState('');
  const { track }                     = nowPlaying;

  const isArchive = archiveDate && archiveHour !== '';
  const { items, header, loading, error } = usePlaylist(
    isArchive ? archiveDate : '',
    isArchive ? archiveHour : '',
  );

  const nowParsed = track?.title ? parseSong(track.title) : null;

  const visible = items.filter(t => {
    if (!q) return true;
    const { artist, title } = parseSong(t.song);
    const s = q.toLowerCase();
    return artist.toLowerCase().includes(s) || title.toLowerCase().includes(s);
  });

  function clearArchive() { setArchiveDate(''); setArchiveHour(''); }

  const hourLabel = h => String(h).padStart(2, '0') + ':00';

  const showInfo = header
    ? `${header.showname} · ${header.startClock}–${header.endClock}`
    : null;

  return (
    <>
      <section data-screen-label="03 Playlist — Header">
        <div className="page-hd">
          <div>
            <div className="crumb">
              {isArchive
                ? `/ Playlist · archief · ${archiveDate} · ${hourLabel(archiveHour)}`
                : `/ Playlist · live update · ${dateStr()}`}
            </div>
            <h1>
              Wat draaide<br/>
              <span style={{color:'var(--mute)'}}>
                {isArchive
                  ? `op ${archiveDate} · ${hourLabel(archiveHour)}?`
                  : 'er net?'}
              </span>
            </h1>
          </div>
          <div className="aside">
            {isArchive ? '// Archief' : '// Historie'}<br/>
            <b>{loading ? '…' : `${items.length} tracks`}</b>
            <span style={{display:'block', marginTop:14, color:'var(--mute)'}}>
              {showInfo ?? (isArchive ? `${archiveDate} · ${hourLabel(archiveHour)}` : 'Live API · websocket')}
            </span>
          </div>
        </div>
      </section>

      {/* NOW PLAYING — hidden in archive mode */}
      {!isArchive && (
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
      )}

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
            <input
              type="date"
              value={archiveDate}
              max={dateStr()}
              onChange={e => { setArchiveDate(e.target.value); setArchiveHour(''); }}
            />
            <select
              value={archiveHour}
              disabled={!archiveDate}
              onChange={e => setArchiveHour(e.target.value)}
            >
              <option value="">uur</option>
              {Array.from({length: 24}, (_, h) => (
                <option key={h} value={String(h)}>{hourLabel(h)}</option>
              ))}
            </select>
            {isArchive && (
              <button onClick={clearArchive}>× live</button>
            )}
          </div>
        </div>

        {/* Show banner */}
        {header && (
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--rule)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--mute)',
          }}>
            <span style={{color:'var(--ink)', fontWeight:700}}>{header.showname}</span>
            {' · '}{header.datum} · {header.startClock}–{header.endClock}
          </div>
        )}

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
              const isNow = i === visible.length - 1 && !q && !isArchive;
              const defaultArt = 'https://can.radioscorpio.be/2016/03/cd.png';
              const art = t.imageurl && t.imageurl !== defaultArt ? t.imageurl : null;
              return (
                <div key={t.ID} className={"pl-row" + (isNow ? ' now' : '')}>
                  <span className="num">{String(i + 1).padStart(3, '0')}</span>
                  <span className="time">{fmtTime(t.insert_ts)}</span>
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
