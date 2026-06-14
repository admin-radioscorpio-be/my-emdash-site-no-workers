// logos.jsx — Logo's: pers & downloads

// One downloadable asset. `href`/`file` present → live download.
// No `file` → not yet uploaded, shown muted with a mail fallback.
function DLRow({ label, ext, file }) {
  const live = !!file;
  const content = (
    <>
      <span className="dl-ext">{ext}</span>
      <span className="dl-label">{label}</span>
      <span className="dl-cta">{live ? 'Download ↓' : 'Op aanvraag →'}</span>
    </>
  );
  return live
    ? <a className="dl-row" href={file} download>{content}</a>
    : <a className="dl-row is-pending" href="mailto:contact@radioscorpio.be?subject=Logo%20aanvraag">{content}</a>;
}

function Logos({ setRoute }) {
  return (
    <>
      <section data-screen-label="Logo's — Header">
        <div className="page-hd">
          <div>
            <div className="crumb">/ Logo's · Pers &amp; downloads</div>
            <h1>Logo's</h1>
          </div>
          <div className="aside">
            // Persmateriaal<br/>
            <b>403 × 103 px</b>
            <span style={{display:'block', marginTop:14, color:'var(--mute)'}}>
              Een ander formaat nodig?<br/>
              <a href="mailto:contact@radioscorpio.be"
                 style={{color:'var(--ink)', textDecoration:'underline', textUnderlineOffset:3}}>
                contact@radioscorpio.be
              </a>
            </span>
          </div>
        </div>
      </section>

      <main className="shell" data-screen-label="Logo's — Content" style={{paddingTop: 0}}>
        <p className="lg-intro">
          Download hier het Scorpio-logo in verschillende formaten. Alle logo's
          zijn 403&nbsp;px bij 103&nbsp;px groot. Heb je een formaat of grootte
          nodig dat niet in deze lijst staat, stuur ons dan een mail.
        </p>

        {/* PREVIEW ──────────────────────────────────────── */}
        <div className="lg-preview">
          <div className="lg-stage">
            <img src="assets/logo.png" alt="Radio Scorpio logo"/>
          </div>
          <div className="lg-stage is-light">
            <img src="assets/logo.png" alt="Radio Scorpio logo op licht"/>
          </div>
        </div>

        {/* DOWNLOADS ────────────────────────────────────── */}
        <div className="lg-downloads">
          <div className="lg-col">
            <div className="lg-col-hd">
              <span className="eyebrow" style={{color:'var(--mute)'}}>// 01</span>
              <h3>Volledig logo</h3>
            </div>
            <div className="dl-list">
              <DLRow label="EPS — hoge kwaliteit (drukwerk)"  ext="EPS"/>
              <DLRow label="PDF — hoge kwaliteit (vector)"     ext="PDF"/>
              <DLRow label="PNG — transparante achtergrond"    ext="PNG" file="assets/logo.png"/>
              <DLRow label="JPEG — webkwaliteit"               ext="JPG" file="assets/radioscorpio-logo.jpg"/>
            </div>
          </div>

          <div className="lg-col">
            <div className="lg-col-hd">
              <span className="eyebrow" style={{color:'var(--mute)'}}>// 02</span>
              <h3>Avatar</h3>
            </div>
            <div className="dl-list">
              <DLRow label="JPEG — webkwaliteit"                ext="JPG"/>
              <DLRow label="PNG — transparante achtergrond"     ext="PNG"/>
            </div>
          </div>
        </div>

        <p className="lg-note">
          <b>Noot:</b> als de bestanden gewoon openen in plaats van te
          downloaden, rechtsklik dan op een link en kies "Opslaan als…".
        </p>
      </main>
    </>
  );
}

window.Logos = Logos;
