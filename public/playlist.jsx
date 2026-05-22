// playlist.jsx — Now playing + history
// insert_ts values from the API are in Brussels local time (not UTC)

const PLAYLIST_API = 'https://public.radioscorpio.be/api/playlist/list';

function dateStr() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Brussels' }); // "YYYY-MM-DD"
}

function currentBrusselsHour() {
  return parseInt(new Intl.DateTimeFormat('nl-BE', {
    timeZone: 'Europe/Brussels', hour: 'numeric', hour12: false,
  }).format(new Date()));
}

// ts is "YYYY-MM-DD HH:mm:ss" in Brussels local time — extract parts directly
function tsHour(ts)  { return parseInt(ts.slice(11, 13)); }
function tsDate(ts)  { return ts.slice(0, 10); }
function fmtTime(ts) { return ts.slice(11, 16); } // "HH:mm"

function parseSong(song) {
  const idx = song.indexOf(' - ');
  if (idx === -1) return { artist: song, title: '—' };
  return { artist: song.slice(0, idx).trim(), title: song.slice(idx + 3).trim() };
}

function fetchPlaylist(isoDate) {
  return fetch(PLAYLIST_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ startlistdate: isoDate, filterdate: '', filterhour: '' }),
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

    if (archiveDate && archiveHour !== '') {
      fetchPlaylist(archiveDate + 'T12:00:00.000Z')
        .then(({ items: all, header: hdr }) => {
          all.sort((a, b) => a.ID - b.ID);
          const h = parseInt(archiveHour);
          setItems(all.filter(t => tsDate(t.insert_ts) === archiveDate && tsHour(t.insert_ts) === h));
          setHeader(hdr);
          setLoading(false);
        })
        .catch(e => { setError(e.message); setLoading(false); });
    } else {
      const today = dateStr();
      fetchPlaylist(new Date().toISOString())
        .then(({ items: all }) => {
          all.sort((a, b) => a.ID - b.ID);
          const h = currentBrusselsHour();
          setItems(all.filter(t => tsDate(t.insert_ts) === today && tsHour(t.insert_ts) === h));
          setLoading(false);
        })
        .catch(e => { setError(e.message); setLoading(false); });
    }
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

  const showInfo = isArchive && header
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
              {showInfo ?? (isArchive
                ? `${archiveDate} · ${hourLabel(archiveHour)}–${String(archiveHour).padStart(2,'0')}:59`
                : 'Live API · websocket')}
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

        {/* Show banner — archive only */}
        {isArchive && header && (
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
