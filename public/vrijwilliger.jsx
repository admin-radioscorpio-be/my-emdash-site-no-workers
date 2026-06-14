// vrijwilliger.jsx — Word vrijwilliger: doe mee + inschrijfformulier

const VOL_ROLES = [
  'DJ / presentator',
  'Mixen & monteren',
  'Opnemen & produceren',
  'Schrijven / redactie',
  'Techniek',
  'Events & promo',
  'Iets anders',
];

function Vrijwilliger({ setRoute }) {
  const [form, setForm] = React.useState({ name: '', email: '', role: VOL_ROLES[0], msg: '' });
  const [sent, setSent] = React.useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    // Prototype: no backend yet — surface a confirmation state.
    // Hook this to your form handler / email service when live.
    setSent(true);
  };

  return (
    <>
      <section data-screen-label="Vrijwilliger — Header">
        <div className="page-hd">
          <div>
            <div className="crumb">/ Word vrijwilliger · Doe mee</div>
            <h1>Word DJ<br/>bij Scorpio</h1>
          </div>
          <div className="aside">
            // Doorlopende oproep<br/>
            <b>Geen ervaring nodig</b>
            <span style={{display:'block', marginTop:14, color:'var(--mute)'}}>
              Alleen goesting.
            </span>
          </div>
        </div>
      </section>

      <main className="shell" data-screen-label="Vrijwilliger — Content" style={{paddingTop: 0}}>
        <p className="vr-intro">
          We zoeken doorlopend nieuwe stemmen voor onze antenne. Niet de juiste
          stem? Mixen, monteren, opnemen, schrijven — er is altijd plek. Onze
          werking draait <b>uitsluitend</b> op gemotiveerde, creatieve
          vrijwilligers.
        </p>

        {/* Stats ─────────────────────────────────────────── */}
        <div className="vr-stats">
          {[
            ['72', 'vrijwilligers achter de knoppen'],
            ['46', 'jaar onafhankelijke radio'],
            ['168', 'uur uitzending per week'],
            ['0', 'reclameblokken'],
          ].map(([n, t]) => (
            <div className="vr-stat" key={t}>
              <div className="vr-stat-n">{n}</div>
              <div className="eyebrow" style={{color:'var(--mute)', marginTop:8}}>{t}</div>
            </div>
          ))}
        </div>

        {/* Roles + form ──────────────────────────────────── */}
        <div className="vr-apply">
          <div className="vr-roles">
            <div className="eyebrow" style={{color:'var(--mute)', marginBottom:18}}>// Wat kan je doen</div>
            <ul>
              {VOL_ROLES.slice(0, 6).map(r => (
                <li key={r}><span className="vr-bullet">→</span>{r}</li>
              ))}
            </ul>
            <p className="vr-roles-note">
              Twijfel je waar je past? Schrijf je gewoon in — we vinden samen een plek.
            </p>
          </div>

          <div className="vr-form-wrap">
            {sent ? (
              <div className="vr-sent">
                <div className="vr-sent-mark">✓</div>
                <h3>Bedankt, {form.name.split(' ')[0] || 'collega'}!</h3>
                <p>
                  We hebben je inschrijving voor <b>{form.role}</b> ontvangen.
                  De programmatieraad neemt zo snel mogelijk contact op via{' '}
                  <b>{form.email || 'je e-mail'}</b>.
                </p>
                <button className="play-cta" onClick={() => { setSent(false); setForm({ name:'', email:'', role: VOL_ROLES[0], msg:'' }); }}>
                  <span className="ico"><Ic.arrow/></span>
                  Nog iemand inschrijven
                </button>
              </div>
            ) : (
              <form className="vr-form" onSubmit={submit}>
                <div className="eyebrow" style={{color:'var(--accent)', marginBottom:18}}>// Schrijf je in</div>
                <label className="vr-field">
                  <span>Naam</span>
                  <input type="text" required value={form.name} onChange={set('name')} placeholder="Voor- en achternaam"/>
                </label>
                <label className="vr-field">
                  <span>E-mail</span>
                  <input type="email" required value={form.email} onChange={set('email')} placeholder="jouw@email.be"/>
                </label>
                <label className="vr-field">
                  <span>Interesse</span>
                  <select value={form.role} onChange={set('role')}>
                    {VOL_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </label>
                <label className="vr-field">
                  <span>Bericht</span>
                  <textarea rows="4" value={form.msg} onChange={set('msg')} placeholder="Vertel kort iets over jezelf (optioneel)"/>
                </label>
                <button type="submit" className="vr-submit">
                  Verstuur inschrijving <Ic.arrow/>
                </button>
                <p className="vr-form-foot">
                  Liever mailen? <a href="mailto:programmatieraad@radioscorpio.be">programmatieraad@radioscorpio.be</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

window.Vrijwilliger = Vrijwilliger;
