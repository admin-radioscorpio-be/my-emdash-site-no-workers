// ondemand.jsx — SCORPIO OD (on-demand archive)

const OD_API           = 'https://public.radioscorpio.be/api/metadata';
const PLAYLIST_API_URL = 'https://public.radioscorpio.be/api/playlist/list';

// ─── Helpers ──────────────────────────────────────────────────────────────

function mixcloudFeed(url) {
  try { return new URL(url).pathname; }
  catch { return url; }
}

function fmtOdDate(ts) {
  return new Date(ts * 1000).toLocaleDateString('nl-BE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    timeZone: 'Europe/Brussels',
  });
}

function parseSongField(song) {
  const stripped = song.replace(/^\d+\.\s+/, '');
  const idx = stripped.indexOf(' - ');
  if (idx === -1) return { artist: stripped, title: '—' };
  return { artist: stripped.slice(0, idx).trim(), title: stripped.slice(idx + 3).trim() };
}

function fmtPlaytime(ts) {
  return new Date(ts.replace(' ', 'T') + 'Z').toLocaleTimeString('nl-BE', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Brussels',
  });
}

// ─── API hooks ────────────────────────────────────────────────────────────

function useODShows() {
  const [shows, setShows]     = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError]     = React.useState(null);

  React.useEffect(() => {
    fetch(`${OD_API}/od/shows?limit=100`)
      .then(r => r.json())
      .then(data => { setShows(data.shows ?? []); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  return { shows, loading, error };
}

function useODSeasons(showid) {
  const [seasons, setSeasons] = React.useState([]);

  React.useEffect(() => {
    if (!showid) return;
    setSeasons([]);
    fetch(`${OD_API}/od/shows/${showid}/seasons`)
      .then(r => r.json())
      .then(data => setSeasons(data.seasons?.map(s => s.season) ?? []))
      .catch(() => {});
  }, [showid]);

  return seasons;
}

function useODEpisodes(showid, season) {
  const [episodes, setEpisodes]       = React.useState([]);
  const [loading, setLoading]         = React.useState(true);
  const [error, setError]             = React.useState(null);
  const [nextCursor, setNextCursor]   = React.useState(null);
  const [loadingMore, setLoadingMore] = React.useState(false);

  React.useEffect(() => {
    if (!showid) return;
    setLoading(true);
    setEpisodes([]);
    setNextCursor(null);

    const params = new URLSearchParams({ limit: '20' });
    if (season && season !== 'Alles') params.set('season', season);

    fetch(`${OD_API}/od/shows/${showid}/episodes?${params}`)
      .then(r => r.json())
      .then(data => {
        setEpisodes(data.episodes ?? []);
        setNextCursor(data.nextCursor ?? null);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [showid, season]);

  function loadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    const params = new URLSearchParams({ limit: '20', cursor: nextCursor });
    if (season && season !== 'Alles') params.set('season', season);

    fetch(`${OD_API}/od/shows/${showid}/episodes?${params}`)
      .then(r => r.json())
      .then(data => {
        setEpisodes(e => [...e, ...(data.episodes ?? [])]);
        setNextCursor(data.nextCursor ?? null);
        setLoadingMore(false);
      })
      .catch(() => setLoadingMore(false));
  }

  return { episodes, loading, error, nextCursor, loadMore, loadingMore };
}

function useODTracklist(episode) {
  const [items, setItems]     = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!episode?.episodeDate) return;
    setLoading(true);
    setItems([]);

    fetch(PLAYLIST_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startlistdate: new Date(episode.episodeDate * 1000).toISOString(),
        filterdate: '', filterhour: '',
      }),
    })
      .then(r => r.json())
      .then(data => { setItems(data.playlistitems ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [episode?.id]);

  return { items, loading };
}

// ─── Flipping wordmark ────────────────────────────────────────────────────
function ODWordmark() {
  const words = ['On Demand', 'OverDose', 'Off the Dial', 'Open Door', 'Ongoing Discovery', 'Odd Discoveries', 'Own Detour', 'Original Drops', 'Offbeat Diamonds', 'Off Doctrine', 'Other Dimension'];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % words.length), 1900);
    return () => clearInterval(t);
  }, []);
  return <span key={i} className="od-flip">{words[i]}</span>;
}

// ─── Favorites ────────────────────────────────────────────────────────────
const OD_FAV_KEY = 'scorpio_od_favs_v1';
function decodeFavParam(p) {
  try { return JSON.parse(decodeURIComponent(escape(atob(p)))); } catch (e) { return null; }
}
function useODFavorites() {
  const [favs, setFavs] = React.useState(() => {
    let base = { shows: [], episodes: [] };
    try {
      const param = new URL(window.location.href).searchParams.get('od_favs');
      const imported = param && decodeFavParam(param);
      const stored = localStorage.getItem(OD_FAV_KEY);
      const local = stored ? JSON.parse(stored) : null;
      if (imported) base = {
        shows: [...new Set([...(local?.shows || []), ...(imported.shows || [])])],
        episodes: [...new Set([...(local?.episodes || []), ...(imported.episodes || [])])],
      };
      else if (local) base = { shows: local.shows || [], episodes: local.episodes || [] };
    } catch (e) {}
    return base;
  });
  React.useEffect(() => {
    try { localStorage.setItem(OD_FAV_KEY, JSON.stringify(favs)); } catch (e) {}
  }, [favs]);
  const toggle = (type, id) => setFavs(f => {
    const k = type === 'show' ? 'shows' : 'episodes';
    const has = f[k].includes(id);
    return { ...f, [k]: has ? f[k].filter(x => x !== id) : [...f[k], id] };
  });
  const isFav = (type, id) => (type === 'show' ? favs.shows : favs.episodes).includes(id);
  const count = favs.shows.length + favs.episodes.length;
  const shareLink = () => {
    const enc = btoa(unescape(encodeURIComponent(JSON.stringify(favs))));
    return `${location.origin}${location.pathname}?od_favs=${enc}`;
  };
  return { favs, toggle, isFav, count, shareLink };
}

// ─── Heart button ─────────────────────────────────────────────────────────
function FavBtn({ active, onClick, label }) {
  return (
    <button className={'od-fav' + (active ? ' is-on' : '')} onClick={onClick}
            aria-label={active ? 'Verwijder uit favorieten' : 'Bewaar als favoriet'} title={label}>
      <Ic.heart/>
    </button>
  );
}

// ─── Shows list ───────────────────────────────────────────────────────────
function odMonogram(name) {
  const parts = name.split(/[\s/]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function ODShows({ shows, loading, error, tag, favOnly, fav, onOpen }) {
  let filtered = shows;
  if (tag && tag !== 'Alles') filtered = filtered.filter(s => s.tags?.includes(tag));
  if (favOnly) filtered = filtered.filter(s => fav.isFav('show', s.showid));

  if (loading) return (
    <div className="od-empty">
      <div className="eyebrow" style={{ color: 'var(--mute)', marginBottom: 12 }}>// Laden</div>
      <p>Shows ophalen…</p>
    </div>
  );
  if (error) return (
    <div className="od-empty">
      <div className="eyebrow" style={{ color: 'var(--mute)', marginBottom: 12 }}>// Fout</div>
      <p>Kon shows niet laden.</p>
    </div>
  );
  if (!filtered.length) return (
    <div className="od-empty">
      <div className="eyebrow" style={{ color: 'var(--mute)', marginBottom: 12 }}>// Leeg</div>
      <p>{favOnly ? 'Nog geen favoriete shows. Tik op het hartje van een show om hem te bewaren.'
                  : 'Geen shows gevonden.'}</p>
    </div>
  );

  return (
    <div className="od-show-list" style={{ borderTop: '1px solid var(--ink)' }}>
      <div className="od-show-head">
        <span></span><span>show</span><span>genre</span>
        <span>archief</span><span></span><span></span>
      </div>
      {filtered.map(s => (
        <div className="od-show-row" key={s.showid} onClick={() => onOpen(s)}>
          <div className="od-show-art">{odMonogram(s.showName)}</div>
          <div className="od-show-name">
            <div className="t">
              {s.showName}
              {!s.isActive && <span className="od-dormant">Inactief</span>}
            </div>
            <div className="s">{s.description ?? ''}</div>
          </div>
          <span className="od-show-genre">{s.tags?.[0] ?? '—'}</span>
          <span className="od-show-meta">
            {s.episodeCount} afl.{s.lastEpisodeDate ? ` · ${fmtOdDate(s.lastEpisodeDate)}` : ''}
          </span>
          <FavBtn active={fav.isFav('show', s.showid)} label="Bewaar show"
                  onClick={(e) => { e.stopPropagation(); fav.toggle('show', s.showid); }}/>
          <span className="od-show-arr">→</span>
        </div>
      ))}
    </div>
  );
}

// ─── Episode list ─────────────────────────────────────────────────────────
function ODEpisodes({ show, fav, onOpen, onBack }) {
  const [season, setSeason]   = React.useState('Alles');
  const seasons               = useODSeasons(show.showid);
  const { episodes, loading, error, nextCursor, loadMore, loadingMore } = useODEpisodes(show.showid, season);
  const sentinel              = React.useRef(null);
  const loadMoreRef           = React.useRef(loadMore);

  React.useEffect(() => { loadMoreRef.current = loadMore; });
  React.useEffect(() => { setSeason('Alles'); }, [show.showid]);

  React.useEffect(() => {
    if (!sentinel.current || !nextCursor) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMoreRef.current();
    }, { rootMargin: '300px' });
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, [nextCursor]);

  return (
    <section data-screen-label="OD — Episodes">
      <div className="od-subhead">
        <button className="od-back" onClick={onBack}>← Alle shows</button>
        <div className="od-subhead-main">
          <div className="crumb">/ Scorpio OD</div>
          <h1 className="od-show-title">{show.showName}</h1>
          <div className="od-show-meta">
            {show.episodeCount} afleveringen
            {show.lastEpisodeDate ? ` · laatste: ${fmtOdDate(show.lastEpisodeDate)}` : ''}
          </div>
        </div>
        <FavBtn active={fav.isFav('show', show.showid)} label="Bewaar show"
                onClick={() => fav.toggle('show', show.showid)}/>
      </div>

      <div className="od-eptools">
        <span className="od-eptools-lbl">Afleveringen · nieuwste eerst</span>
        <label className="od-select">
          <span>Seizoen</span>
          <select value={season} onChange={e => setSeason(e.target.value)}>
            <option value="Alles">Alle seizoenen</option>
            {seasons.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>

      {loading && (
        <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--mute)' }}>Laden…</div>
      )}
      {error && (
        <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--mute)' }}>
          Kon afleveringen niet laden.
        </div>
      )}

      {!loading && !error && (
        <div className="od-eplist">
          <div className="od-ep-head">
            <span>datum</span><span>seizoen</span><span>#</span>
            <span>aflevering</span><span></span><span></span>
          </div>
          {episodes.map((ep, i) => (
            <div className="od-ep-row" key={ep.id} onClick={() => onOpen(ep)}>
              <span className="od-ep-date">{fmtOdDate(ep.episodeDate)}</span>
              <span className="od-ep-season">{ep.season}</span>
              <span className="od-ep-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="od-ep-title">
                <div className="t">{ep.title}</div>
                <div className="s">{ep.description ?? ''}</div>
              </div>
              <FavBtn active={fav.isFav('episode', ep.id)} label="Bewaar aflevering"
                      onClick={(e) => { e.stopPropagation(); fav.toggle('episode', ep.id); }}/>
              <span className="od-ep-play"><Ic.play/></span>
            </div>
          ))}
          {nextCursor && (
            <div ref={sentinel} className="od-sentinel">
              {loadingMore && <span className="eyebrow">Meer laden…</span>}
            </div>
          )}
          {!nextCursor && episodes.length === 0 && (
            <div style={{ padding: '32px 0', color: 'var(--mute)' }}>Geen afleveringen gevonden.</div>
          )}
        </div>
      )}
    </section>
  );
}

// ─── Episode detail + tracklist ───────────────────────────────────────────
function ODDetail({ episode, show, fav, onBack, onPlay, isCurrent }) {
  const { items, loading: trackLoading } = useODTracklist(episode);
  const defaultArt = 'https://can.radioscorpio.be/2016/03/cd.png';

  return (
    <section data-screen-label="OD — Episode detail">
      <div className="od-subhead">
        <button className="od-back" onClick={onBack}>← {show.showName}</button>
      </div>

      <div className="now-big od-detail" style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="cover">
          {episode.imageURL
            ? <img src={episode.imageURL} alt={episode.title}
                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            : <span className="ph">[ {show.showName.toUpperCase()} ]</span>
          }
        </div>
        <div className="info">
          <div>
            <div className="lbl">// Scorpio OD · {episode.season}</div>
            <div className="artist" style={{ fontSize: 'clamp(34px,5.5vw,72px)' }}>{episode.title}</div>
            <div className="title" style={{ marginTop: 12 }}>
              {show.showName} · {fmtOdDate(episode.episodeDate)}
            </div>
            {episode.description && <p className="od-detail-desc">{episode.description}</p>}
          </div>
          <div className="row" style={{ flexWrap: 'wrap', gap: 16 }}>
            <span style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <button className="od-detail-link" onClick={() => fav.toggle('episode', episode.id)}>
                {fav.isFav('episode', episode.id) ? '♥ Bewaard' : '♡ Bewaar'}
              </button>
              {episode.mixcloudURL && (
                <a className="od-detail-link" href={episode.mixcloudURL}
                   target="_blank" rel="noopener noreferrer">Mixcloud →</a>
              )}
            </span>
            <span className="od-detail-stat">{fmtOdDate(episode.episodeDate)}</span>
          </div>
        </div>
        <div className="od-detail-action">
          <button className="od-detail-bigplay" onClick={() => onPlay(episode, show)}>
            <span className="ico">{isCurrent ? <Ic.pause/> : <Ic.play/>}</span>
            <span className="lbl">{isCurrent ? 'Speelt nu' : 'Speel aflevering'}</span>
          </button>
        </div>
      </div>

      <main className="shell" style={{ paddingTop: 0 }}>
        {trackLoading && (
          <div style={{ padding: '32px 0', color: 'var(--mute)' }}>Playlist laden…</div>
        )}
        {!trackLoading && items.length > 0 && (
          <>
            <div className="pl-head" style={{ borderTop: 0 }}>
              <span>/ #</span><span>tijd</span><span></span><span>artiest · titel</span>
            </div>
            {items.map((t, i) => {
              const { artist, title } = parseSongField(t.song);
              const art = t.imageurl && t.imageurl !== defaultArt ? t.imageurl : null;
              return (
                <div key={t.ID} className="pl-row">
                  <span className="num">{String(i + 1).padStart(3, '0')}</span>
                  <span className="time">{fmtPlaytime(t.time)}</span>
                  <div className="cover">
                    {art
                      ? <img src={art} alt={artist}
                             style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                      : <span style={{ color: 'var(--mute)', fontSize: 10 }}>—</span>
                    }
                  </div>
                  <div>
                    <div className="artist">{artist}</div>
                    <div className="title">{title}</div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        {!trackLoading && items.length === 0 && (
          <div style={{ padding: '32px 0', color: 'var(--mute)' }}>
            Geen playlist beschikbaar voor deze aflevering.
          </div>
        )}
        <div style={{ height: 64 }}/>
      </main>
    </section>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────
function OnDemand({ setRoute, sessionFeed, setSessionFeed, setPlaying }) {
  const fav                           = useODFavorites();
  const [view, setView]               = React.useState('shows');
  const [tag, setTag]                 = React.useState('Alles');
  const [favOnly, setFavOnly]         = React.useState(false);
  const [show, setShow]               = React.useState(null);
  const [episode, setEpisode]         = React.useState(null);
  const [toast, setToast]             = React.useState(null);
  const { shows, loading, error }     = useODShows();

  // Collect all unique tags from loaded shows for the filter chips
  const allTags = React.useMemo(() => {
    const tags = new Set(shows.flatMap(s => s.tags ?? []).filter(Boolean));
    return ['Alles', ...[...tags].sort()];
  }, [shows]);

  const openShow = (s) => { setShow(s); setView('episodes'); window.scrollTo({ top: 0 }); };
  const openEp   = (ep) => { setEpisode(ep); setView('detail'); window.scrollTo({ top: 0 }); };

  const play = (ep, s) => {
    setSessionFeed({
      feed:     mixcloudFeed(ep.mixcloudURL),
      title:    ep.title,
      showName: s.showName,
      image:    ep.imageURL ?? null,
    });
  };

  const doShare = async () => {
    const link = fav.shareLink();
    try {
      await navigator.clipboard.writeText(link);
      setToast('Link naar je favorieten gekopieerd — plak hem op een ander toestel.');
    } catch (e) {
      setToast(link);
    }
    setTimeout(() => setToast(null), 4200);
  };

  return (
    <>
      <section data-screen-label="OD — Header">
        <div className="page-hd od-hero">
          <div>
            <div className="crumb">/ Scorpio OD · herbeluister het archief</div>
            <h1 className="od-h1">
              Scorpio <span className="od-od">OD</span>
            </h1>
            <div className="od-expand">→&nbsp;<ODWordmark/></div>
          </div>
          <div className="aside">
            // Archief<br/>
            <b>{loading ? '…' : `${shows.length} shows`}</b>
            <span style={{ display: 'block', marginTop: 14, color: 'var(--mute)' }}>
              Live opname archief
            </span>
          </div>
        </div>

        {view === 'shows' && (
          <div className="chips">
            {allTags.map(g => (
              <button key={g} className={'chip' + (tag === g ? ' is-active' : '')}
                      onClick={() => setTag(g)}>{g}</button>
            ))}
            <span style={{ flex: 1 }}/>
            <button className={'chip' + (favOnly ? ' is-active' : '')}
                    onClick={() => setFavOnly(v => !v)}>
              ♥ Favorieten {fav.count ? `(${fav.count})` : ''}
            </button>
            <button className="chip" onClick={doShare}>Deel ↗</button>
          </div>
        )}
      </section>

      <main className="shell" style={{ paddingTop: 0 }}>
        {view === 'shows' && (
          <ODShows shows={shows} loading={loading} error={error}
                   tag={tag} favOnly={favOnly} fav={fav} onOpen={openShow}/>
        )}
      </main>

      {view === 'episodes' && show && (
        <main className="shell" style={{ paddingTop: 0 }}>
          <ODEpisodes show={show} fav={fav} onOpen={openEp} onBack={() => setView('shows')}/>
        </main>
      )}

      {view === 'detail' && episode && show && (
        <ODDetail episode={episode} show={show} fav={fav}
                  onBack={() => setView('episodes')} onPlay={play}
                  isCurrent={!!episode.mixcloudURL && sessionFeed?.feed === mixcloudFeed(episode.mixcloudURL)}/>
      )}

      {toast && <div className="od-toast">{toast}</div>}
    </>
  );
}

window.OnDemand = OnDemand;
