// cookie-consent.jsx — GDPR consent: corner tab + expandable card, brutalist style
// Sits ABOVE the fixed player (bottom corner), never the footer bar or a center popup.

const RS_COOKIE_KEY = 'rs_cookie_consent_v1';

function readConsent() {
  try {
    const v = localStorage.getItem(RS_COOKIE_KEY);
    return v ? JSON.parse(v) : null;
  } catch { return null; }
}

// Small cookie glyph
function CookieGlyph(p) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" {...p}>
      <circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="6" cy="6.4" r="0.95" fill="currentColor"/>
      <circle cx="10" cy="7" r="0.95" fill="currentColor"/>
      <circle cx="7.2" cy="10" r="0.95" fill="currentColor"/>
      <circle cx="10.4" cy="10.4" r="0.7" fill="currentColor"/>
    </svg>
  );
}

function CookieSwitch({ on, locked, onChange }) {
  return (
    <button
      type="button"
      className={'cookie-sw' + (on ? ' on' : '') + (locked ? ' locked' : '')}
      aria-pressed={on}
      disabled={locked}
      onClick={() => !locked && onChange(!on)}>
      <span className="knob"/>
    </button>
  );
}

function CookieConsent({ side = 'left' }) {
  const [consent, setConsent] = React.useState(readConsent);
  const [open, setOpen] = React.useState(false);          // card open (when already decided)
  const [settings, setSettings] = React.useState(false);  // category detail expanded
  const [analytics, setAnalytics] = React.useState(() => readConsent()?.analytics ?? false);

  // Allow the Tweaks panel (or a "manage cookies" footer link) to re-open the banner
  React.useEffect(() => {
    const reset = () => { setConsent(null); setOpen(true); setSettings(false); setAnalytics(false); };
    const manage = () => { setOpen(true); setSettings(true); };
    window.addEventListener('rs:cookie-reset', reset);
    window.addEventListener('rs:cookie-manage', manage);
    return () => {
      window.removeEventListener('rs:cookie-reset', reset);
      window.removeEventListener('rs:cookie-manage', manage);
    };
  }, []);

  const save = (obj) => {
    const full = { necessary: true, ...obj, ts: Date.now() };
    try { localStorage.setItem(RS_COOKIE_KEY, JSON.stringify(full)); } catch {}
    setConsent(full);
    setOpen(false);
    setSettings(false);
    // Phase-2 hook: gate Google Analytics on this flag
    // if (full.analytics) loadGoogleAnalytics();
  };

  const firstVisit = !consent;
  const cardOpen = firstVisit || open;

  return (
    <div className={'cookie-wrap ' + side}>
      {/* Collapsed tab — persistent "manage consent" entry point */}
      {!cardOpen && (
        <button className="cookie-tab" onClick={() => { setOpen(true); setAnalytics(consent?.analytics ?? false); }}>
          <span className="gly"><CookieGlyph/></span>
          Cookies
        </button>
      )}

      {/* The card */}
      {cardOpen && (
        <div className="cookie-card" role="dialog" aria-label="Cookievoorkeuren">
          <div className="cookie-card-hd">
            <div className="cookie-eyebrow">/ Privacy</div>
            {!firstVisit && (
              <button className="cookie-x" aria-label="Sluiten" onClick={() => setOpen(false)}>✕</button>
            )}
          </div>
          <h4 className="cookie-title">Cookies op Radio&nbsp;Scorpio</h4>
          <p className="cookie-copy">
            We gebruiken alleen <b>noodzakelijke</b> cookies om de site en de webspeler te
            laten werken. Optionele cookies (statistieken) staan uit tot je ze aanzet.
          </p>

          {settings && (
            <div className="cookie-cats">
              <div className="cookie-cat">
                <div>
                  <h5>Noodzakelijk</h5>
                  <p>Speler, taalkeuze en beveiliging. Altijd actief.</p>
                </div>
                <CookieSwitch on locked onChange={() => {}}/>
              </div>
              <div className="cookie-cat">
                <div>
                  <h5>Statistieken</h5>
                  <p>Anonieme bezoekcijfers (Google&nbsp;Analytics). Later toe te voegen.</p>
                </div>
                <CookieSwitch on={analytics} onChange={setAnalytics}/>
              </div>
            </div>
          )}

          <div className="cookie-actions">
            <button className="cookie-btn primary" onClick={() => save({ analytics: true })}>
              Alles accepteren
            </button>
            <button className="cookie-btn" onClick={() => save({ analytics: false })}>
              Alleen noodzakelijk
            </button>
          </div>
          <button className="cookie-link" onClick={() => settings ? save({ analytics }) : setSettings(true)}>
            {settings ? 'Voorkeuren bewaren' : 'Instellingen →'}
          </button>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CookieConsent });
