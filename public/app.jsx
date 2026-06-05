// app.jsx — root

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#e6ff00",
  "paper": "#f4f2ec",
  "density": "regular",
  "showGrid": false,
  "displayWeight": 900
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState('home');
  const [playing, setPlaying] = React.useState(false);
  const [sessionFeed, setSessionFeed] = React.useState(null); // null = live stream, set = Mixcloud session
  const [odNow, setOdNow] = React.useState(null); // {episode, show} when an OD episode is loaded
  const nowPlaying = useNowPlaying();

  // expose tokens via CSS vars
  const style = {
    '--accent': t.accent,
    '--paper': t.paper,
  };

  // scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route]);

  const Page = { home: Home, programmas: Programmas, playlist: Playlist, ondemand: OnDemand }[route];

  return (
    <div style={style}>
      <TopNav route={route} setRoute={setRoute}/>
      <Ticker/>

      {Page
        ? <Page setRoute={setRoute} playing={playing} setPlaying={setPlaying} nowPlaying={nowPlaying}
                sessionFeed={sessionFeed} setSessionFeed={setSessionFeed}
                odNow={odNow} setOdNow={setOdNow}/>
        : <Stub route={route} setRoute={setRoute}/>}

      <Footer/>

      <Player playing={playing} setPlaying={setPlaying} accent={t.accent} nowPlaying={nowPlaying}
              sessionFeed={sessionFeed} setSessionFeed={setSessionFeed}
              odNow={odNow} onClearOd={() => setOdNow(null)}/>

      <TweaksPanel title="TWEAKS">
        <TweakSection label="Accent kleur"/>
        <TweakColor label="Accent" value={t.accent}
                    options={['#e6ff00', '#ff3b30', '#00d27a', '#ff6b00', '#3a86ff', '#ffffff']}
                    onChange={v => setTweak('accent', v)}/>
        <TweakSection label="Papier"/>
        <TweakColor label="Achtergrond" value={t.paper}
                    options={['#f4f2ec', '#ffffff', '#e8e6e0', '#f0ede4']}
                    onChange={v => setTweak('paper', v)}/>
      </TweaksPanel>
    </div>
  );
}

function Stub({ route, setRoute }) {
  const labels = {
    sessions:   ['Scorpio Sessions',   'Live opnames uit studio 3 — komen binnenkort.'],
    cultafacts: ['Cultafacts',         'Artikelarchief & agenda — komen binnenkort.'],
    shop:       ['Shop',               'T-shirts, totebags, broadcast-archief op vinyl.'],
  };
  const [title, sub] = labels[route] || ['—', '—'];
  return (
    <section className="shell" style={{padding:'120px 24px 80px', minHeight:'60vh'}}>
      <div className="eyebrow" style={{color:'var(--mute)'}}>/ {route}</div>
      <h1 className="huge" style={{marginTop:14, marginBottom:24}}>{title}</h1>
      <p style={{fontSize:18, color:'var(--mute)', maxWidth:520, marginBottom:32}}>{sub}</p>
      <button className="play-cta" onClick={() => setRoute('home')}>
        <span className="ico"><Ic.arrow/></span>
        Terug naar home
      </button>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
