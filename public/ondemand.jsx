// ondemand.jsx — SCORPIO OD (on-demand archive)

// ─── Flipping wordmark: On Demand → OverDose → … (hard cut) ────────────
function ODWordmark() {
  const words = ['On Demand', 'OverDose', 'Off the Dial', 'Open Door', 'Ongoing Discovery', 'Odd Discoveries', 'Own Detour', 'Original Drops', 'Offbeat Diamonds', 'Off Doctrine', 'Other Dimension'];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % words.length), 1900);
    return () => clearInterval(t);
  }, []);
  return <span key={i} className="od-flip">{words[i]}</span>;
}

// ─── Favorites: local storage + shareable link import/export ───────────
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

// ─── Heart button ──────────────────────────────────────────────────────
function FavBtn({ active, onClick, label }) {
  return (
    <button className={'od-fav' + (active ? ' is-on' : '')} onClick={onClick}
            aria-label={active ? 'Verwijder uit favorieten' : 'Bewaar als favoriet'} title={label}>
      <Ic.heart/>
    </button>
  );
}

// ─── Shows list ─────────────────────────────────────────────────────────
function odMonogram(name) {
  const parts = name.split(/[\s/]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
function ODShows({ genre, favOnly, fav, onOpen }) {
  let shows = genre === 'Alles' ? OD_SHOWS : OD_SHOWS.filter(s => s.genre === genre);
  if (favOnly) shows = shows.filter(s => fav.isFav('show', s.id));

  if (!shows.length) {
    return (
      <div className="od-empty">
        <div className="eyebrow" style={{ color: 'var(--mute)', marginBottom: 12 }}>// Leeg</div>
        <p>{favOnly ? 'Nog geen favoriete shows. Tik op het hartje van een show om hem te bewaren.'
                     : 'Geen shows in dit genre.'}</p>
      </div>
    );
  }
  return (
    <div className="od-show-list" style={{ borderTop: '1px solid var(--ink)' }}>
      <div className="od-show-head">
        <span></span><span>show</span><span>genre</span>
        <span>archief</span><span></span><span></span>
      </div>
      {shows.map(s => (
        <div className="od-show-row" key={s.id} onClick={() => onOpen(s)}>
          <div className="od-show-art">{odMonogram(s.name)}</div>
          <div className="od-show-name">
            <div className="t">
              {s.name}
              {s.dormant && <span className="od-dormant">Slaapt</span>}
            </div>
            <div className="s">{s.desc}</div>
          </div>
          <span className="od-show-genre">{s.genre}</span>
          <span className="od-show-meta">{s.episodeCount} afl. · laatst {s.lastAired}</span>
          <FavBtn active={fav.isFav('show', s.id)} label="Bewaar show"
                  onClick={(e) => { e.stopPropagation(); fav.toggle('show', s.id); }}/>
          <span className="od-show-arr">→</span>
        </div>
      ))}
    </div>
  );
}

// ─── Episode list (newest first, infinite scroll) ───────────────────────
function ODEpisodes({ show, fav, onOpen, onBack }) {
  const all = OD_EPISODES[show.id] || [];
  const [season, setSeason] = React.useState('Alles');
  const [limit, setLimit] = React.useState(8);
  const sentinel = React.useRef(null);

  const filtered = season === 'Alles' ? all : all.filter(e => e.season === season);
  React.useEffect(() => { setLimit(8); }, [season, show.id]);

  React.useEffect(() => {
    if (!sentinel.current) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setLimit(l => Math.min(l + 8, filtered.length));
    }, { rootMargin: '300px' });
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, [filtered.length]);

  const visible = filtered.slice(0, limit);

  return (
    <section data-screen-label="OD — Episodes">
      <div className="od-subhead">
        <button className="od-back" onClick={onBack}>← Alle shows</button>
        <div className="od-subhead-main">
          <div className="crumb">/ Scorpio OD · {show.genre}</div>
          <h1 className="od-show-title">{show.name}</h1>
          <div className="od-show-meta">
            {show.genre} · {show.episodeCount} afleveringen · laatst uitgezonden {show.lastAired}
          </div>
        </div>
        <FavBtn active={fav.isFav('show', show.id)} label="Bewaar show"
                onClick={() => fav.toggle('show', show.id)}/>
      </div>

      <div className="od-eptools">
        <span className="od-eptools-lbl">Afleveringen · nieuwste eerst</span>
        <label className="od-select">
          <span>Seizoen</span>
          <select value={season} onChange={e => setSeason(e.target.value)}>
            <option value="Alles">Alle seizoenen</option>
            {show.seasons.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <div className="od-eplist">
        <div className="od-ep-head">
          <span>datum</span><span>seizoen</span><span>#</span>
          <span>aflevering</span><span>duur</span><span></span><span></span>
        </div>
        {visible.map(ep => (
          <div className="od-ep-row" key={ep.id} onClick={() => onOpen(ep)}>
            <span className="od-ep-date">{ep.dateLabel}</span>
            <span className="od-ep-season">{ep.season}</span>
            <span className="od-ep-num">{String(ep.num).padStart(2, '0')}</span>
            <div className="od-ep-title">
              <div className="t">{ep.title}</div>
              <div className="s">{ep.tracks.length} tracks · {ep.plays} plays</div>
            </div>
            <span className="od-ep-dur">{ep.duration}</span>
            <FavBtn active={fav.isFav('episode', ep.id)} label="Bewaar aflevering"
                    onClick={(e) => { e.stopPropagation(); fav.toggle('episode', ep.id); }}/>
            <span className="od-ep-play"><Ic.play/></span>
          </div>
        ))}
        {limit < filtered.length && (
          <div ref={sentinel} className="od-sentinel">
            <span className="eyebrow">Meer laden…</span>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Episode detail + tracklist ──────────────────────────────────────────
function ODDetail({ episode, show, fav, onBack, onPlay, isCurrent }) {
  return (
    <section data-screen-label="OD — Episode detail">
      <div className="od-subhead">
        <button className="od-back" onClick={onBack}>← {show.name}</button>
      </div>

      <div className="now-big od-detail" style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="cover">
          <span className="ph">[ {show.name.toUpperCase()} ]</span>
        </div>
        <div className="info">
          <div>
            <div className="lbl">// Scorpio OD · {show.genre}</div>
            <div className="artist" style={{ fontSize: 'clamp(34px,5.5vw,72px)' }}>{episode.title}</div>
            <div className="title" style={{ marginTop: 12 }}>
              {show.name} #{episode.num} · {episode.season}
            </div>
            <p className="od-detail-desc">{episode.desc}</p>
          </div>
          <div className="row" style={{ flexWrap: 'wrap', gap: 16 }}>
            <span style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <button className="od-detail-link" onClick={() => fav.toggle('episode', episode.id)}>
                {fav.isFav('episode', episode.id) ? '♥ Bewaard' : '♡ Bewaar'}
              </button>
              <a className="od-detail-link" href="#" onClick={e => e.preventDefault()}>Mixcloud →</a>
            </span>
            <span className="od-detail-stat">
              {episode.dateLabel} · {episode.duration} · {episode.plays} plays
            </span>
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
        <div className="pl-head" style={{ borderTop: 0 }}>
          <span>/ #</span><span>tijd</span><span></span>
          <span>artiest · titel</span><span>album</span>
          <span style={{ textAlign: 'right' }}>duur</span>
        </div>
        {episode.tracks.map((t, i) => (
          <div key={i} className="pl-row">
            <span className="num">{String(i + 1).padStart(3, '0')}</span>
            <span className="time">{t.time}</span>
            <div className="cover"><span>ART</span></div>
            <div>
              <div className="artist">{t.artist}</div>
              <div className="title">{t.title}</div>
            </div>
            <div style={{ fontSize: 13 }}>{t.album}</div>
            <span className="dur">{t.dur}</span>
          </div>
        ))}
        <div style={{ height: 64 }}/>
      </main>
    </section>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────
function OnDemand({ setRoute, odNow, setOdNow, setPlaying }) {
  const fav = useODFavorites();
  const [view, setView] = React.useState('shows'); // shows | episodes | detail
  const [genre, setGenre] = React.useState('Alles');
  const [favOnly, setFavOnly] = React.useState(false);
  const [show, setShow] = React.useState(null);
  const [episode, setEpisode] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  const openShow = (s) => { setShow(s); setView('episodes'); window.scrollTo({ top: 0 }); };
  const openEp = (ep) => { setEpisode(ep); setView('detail'); window.scrollTo({ top: 0 }); };
  const play = (ep, s) => { setOdNow({ episode: ep, show: s }); setPlaying(true); };

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
            <b>{OD_SHOWS.length} shows</b>
            <span style={{ display: 'block', marginTop: 14, color: 'var(--mute)' }}>
              Seizoenen {OD_SEASONS[OD_SEASONS.length - 1]} → {OD_SEASONS[0]}
            </span>
          </div>
        </div>

        {view === 'shows' && (
          <div className="chips">
            {GENRES.map(g => (
              <button key={g} className={'chip' + (genre === g ? ' is-active' : '')}
                      onClick={() => setGenre(g)}>{g}</button>
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
          <ODShows genre={genre} favOnly={favOnly} fav={fav} onOpen={openShow}/>
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
                  isCurrent={odNow && odNow.episode.id === episode.id}/>
      )}

      {toast && <div className="od-toast">{toast}</div>}
    </>
  );
}

window.OnDemand = OnDemand;
