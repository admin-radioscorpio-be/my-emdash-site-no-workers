// data.jsx — mock content for Radio Scorpio

const PROGRAMS = [
  { id: 'sessions',   name: 'Scorpio Sessions',   dj: 'Maartje Vandeputte', day: 'MA', time: '20:00–22:00', genre: 'Live & Akoestisch', desc: 'Wekelijkse live opnames met opkomende artiesten in onze studio.' },
  { id: 'beste106',   name: 'De Beste 106',       dj: 'Diederik Vermeesch',  day: 'ZA', time: '13:00–16:00', genre: 'Hitlijst',         desc: 'De wekelijkse aftelling van de beste platen volgens jullie stemmen.' },
  { id: 'nachtdienst',name: 'Nachtdienst',        dj: 'Lotte De Wilde',      day: 'DO', time: '23:00–01:00', genre: 'Ambient / Drone',  desc: 'Trage muziek voor late uurtjes. Headphones aanbevolen.' },
  { id: 'wereldoor',  name: 'Wereldoor',          dj: 'Bram Janssens',       day: 'WO', time: '21:00–23:00', genre: 'World / Global',   desc: 'Veldopnames, ritmes en stemmen van over de hele wereld.' },
  { id: 'razend',     name: 'Razend',             dj: 'Sven De Pauw',        day: 'VR', time: '22:00–00:00', genre: 'Punk / Hardcore',  desc: 'Twee uur woede, vinyl en distortion. Niet voor zwakke nervn.' },
  { id: 'vinyl',      name: 'Vinylkroniek',       dj: 'Joris Mertens',       day: 'ZO', time: '11:00–13:00', genre: 'Crate Digging',    desc: 'Verloren parels uit een leven lang platenkasten doorploegen.' },
  { id: 'cultafacts', name: 'Cultafacts',         dj: 'Anna Vermeiren',      day: 'DI', time: '18:00–19:00', genre: 'Cultuur & Talk',   desc: 'Het culturele weekoverzicht uit Leuven en omstreken.' },
  { id: 'verse-vis',  name: 'Verse Vis',          dj: 'Tim Coenen',          day: 'WO', time: '17:00–19:00', genre: 'Nieuwe Releases',  desc: 'Het beste van de week, gisteren uit de oven van de pers.' },
  { id: 'stille',     name: 'Stille Storm',       dj: 'Esmé Kuypers',        day: 'ZO', time: '22:00–00:00', genre: 'Jazz / Soul',      desc: 'Late-night jazz, soul en alles dat in het schemergebied past.' },
  { id: 'diep',       name: 'Diep',               dj: 'Hendrik Loos',        day: 'VR', time: '00:00–02:00', genre: 'Techno / Dub',     desc: 'Diepe elektronica, zelden gemixt en altijd te lang.' },
  { id: 'kraut',      name: 'Krautrock & Kompanie', dj: 'Walter Geirnaert',  day: 'DO', time: '20:00–22:00', genre: 'Kraut / Psych',    desc: 'Motorische ritmes uit Düsseldorf, Köln en het hoofd van Walter.' },
  { id: 'achteruit',  name: 'Achteruitkijkspiegel',dj: 'Mia Vandenberghe',   day: 'ZA', time: '10:00–12:00', genre: 'Vintage / Retro',  desc: 'Een blik in het muzikale verleden, week per week.' },
];

const TRACKS = [
  { time: '23:42', artist: 'Dry Cleaning',     title: 'Hit My Head All Day',           album: 'New Long Leg',         dur: '3:47', now: true },
  { time: '23:38', artist: 'Slowdive',         title: 'Kisses',                        album: 'Everything Is Alive',  dur: '4:12' },
  { time: '23:33', artist: 'Black Country, New Road', title: 'Turbines/Pigs',         album: 'Forever Howlong',      dur: '5:08' },
  { time: '23:29', artist: 'Mdou Moctar',      title: 'Funeral For Justice',           album: 'Funeral For Justice',  dur: '3:54' },
  { time: '23:24', artist: 'Beth Gibbons',     title: 'Floating On A Moment',          album: 'Lives Outgrown',       dur: '4:31' },
  { time: '23:20', artist: 'Jessica Pratt',    title: 'Life Is',                       album: 'Here In The Pitch',    dur: '3:18' },
  { time: '23:16', artist: 'Nilüfer Yanya',    title: 'Like I Say (I runaway)',        album: 'My Method Actor',      dur: '3:42' },
  { time: '23:12', artist: 'Squid',            title: 'Crispy Skin',                   album: "O Monolith",           dur: '5:01' },
  { time: '23:08', artist: 'Kim Gordon',       title: 'Bye Bye',                       album: 'The Collective',       dur: '3:24' },
  { time: '23:04', artist: 'Mount Kimbie',     title: 'Empty And Silent',              album: 'The Sunset Violent',   dur: '4:55' },
  { time: '23:00', artist: 'Big|Brave',        title: 'I Felt A Funeral',              album: 'A Chaos Of Flowers',   dur: '6:22' },
  { time: '22:55', artist: 'Tirzah',           title: 'Promises',                      album: 'trip9love…???',        dur: '3:13' },
  { time: '22:51', artist: 'cktrl',            title: 'Robyn',                         album: 'Robyn',                dur: '4:08' },
  { time: '22:47', artist: 'King Krule',       title: 'Pillars Of Salt',               album: 'Space Heavy',          dur: '4:19' },
  { time: '22:43', artist: 'Cindy Lee',        title: 'Diamond Jubilee',               album: 'Diamond Jubilee',      dur: '5:44' },
  { time: '22:39', artist: 'Wu-Lu',            title: 'South',                         album: 'Loggerhead',           dur: '3:51' },
];

const DAYS = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'];
const SLOTS = ['07:00', '10:00', '13:00', '16:00', '19:00', '22:00'];

// genre filter chips
const GENRES = ['Alles', 'Live & Akoestisch', 'Hitlijst', 'Punk / Hardcore', 'World / Global', 'Jazz / Soul', 'Techno / Dub', 'Kraut / Psych', 'Cultuur & Talk', 'Vintage / Retro'];

const ON_AIR = {
  current: { name: 'Non-stop',         time: '23:00–00:00', dj: '—',          desc: 'Automatische selectie' },
  next:    { name: 'Vinylkroniek',     time: '00:00–02:00', dj: 'Joris Mertens', desc: 'Crate digging — nachteditie' },
  later:   { name: 'Verse Vis',        time: '07:00–09:00', dj: 'Tim Coenen',    desc: 'Ochtendprogramma' },
};

// ─── SCORPIO OD — on-demand archive ───────────────────────────────────
// University-calendar seasons: Oct YY → Sep ZZ. Newest first.
const OD_SEASONS = ['25–26', '24–25', '23–24', '22–23'];

// Track pool used to fabricate per-episode tracklists.
const OD_POOL = [
  ['Dry Cleaning',            'Hit My Head All Day',     'New Long Leg',          '3:47'],
  ['Slowdive',                'Kisses',                  'Everything Is Alive',   '4:12'],
  ['Black Country, New Road', 'Turbines/Pigs',           'Forever Howlong',       '5:08'],
  ['Mdou Moctar',             'Funeral For Justice',     'Funeral For Justice',   '3:54'],
  ['Beth Gibbons',            'Floating On A Moment',    'Lives Outgrown',        '4:31'],
  ['Jessica Pratt',           'Life Is',                 'Here In The Pitch',     '3:18'],
  ['Nilüfer Yanya',           'Like I Say (I runaway)',  'My Method Actor',       '3:42'],
  ['Squid',                   'Crispy Skin',             'O Monolith',            '5:01'],
  ['Kim Gordon',              'Bye Bye',                 'The Collective',        '3:24'],
  ['Mount Kimbie',            'Empty And Silent',        'The Sunset Violent',    '4:55'],
  ['Big|Brave',               'I Felt A Funeral',        'A Chaos Of Flowers',    '6:22'],
  ['Tirzah',                  'Promises',                'trip9love…???',         '3:13'],
  ['cktrl',                   'Robyn',                   'Robyn',                 '4:08'],
  ['King Krule',              'Pillars Of Salt',         'Space Heavy',           '4:19'],
  ['Cindy Lee',               'Diamond Jubilee',         'Diamond Jubilee',       '5:44'],
  ['Wu-Lu',                   'South',                   'Loggerhead',            '3:51'],
  ['Caroline Polachek',       'Welcome To My Island',    'Desire, I Want To…',    '3:59'],
  ['Yves Tumor',              'Lovely Sewer',            'Praise A Lord…',        '3:31'],
  ['Sault',                   'Wildfires',               'Untitled (Black Is)',   '3:17'],
  ['Floating Points',         'Birth4000',               'Cascade',               '5:36'],
  ['Aphex Twin',              'Avril 14th',              'Drukqs',                '2:04'],
  ['Tom Misch',               'Movie',                   'Geography',             '4:46'],
  ['Khruangbin',              'Maria También',           'Con Todo El Mundo',     '3:52'],
  ['Sons Of Kemet',           'My Queen Is Ada Eastman', 'Your Queen Is A Reptile','5:55'],
  ['Charlotte Adigéry',       'Esperanto',               'Topical Dancer',        '3:38'],
  ['Stromae',                 'Fils De Joie',            'Multitude',             '3:41'],
  ['Meskerem Mees',           'Joe',                     'Julius',                '3:22'],
  ['Brutus',                  'Liar',                    'Unison Life',           '4:27'],
];

// Per-show archive config keyed to existing PROGRAMS. `weeksAgo` = how long
// since the last episode (large = dormant), `count` = episodes in archive.
const OD_SHOW_CFG = {
  sessions:   { count: 47, weeksAgo: 1,  themes: ['Live in studio 3', 'Akoestische set', 'Eén take, geen vangnet', 'Onuitgebrachte demo’s', 'Met strijkkwartet'] },
  beste106:   { count: 38, weeksAgo: 1,  themes: ['De aftelling', 'Top 10 van het jaar', 'Luisteraarsklassiekers', 'Nieuwkomers', 'Heruitgaven'] },
  nachtdienst:{ count: 52, weeksAgo: 2,  themes: ['Trage muziek voor late uurtjes', 'Drone & ruis', 'Slaapmodus', 'Voor de nachtraven', 'Ambient lang'] },
  wereldoor:  { count: 41, weeksAgo: 2,  themes: ['Veldopnames uit de Sahel', 'Ritmes van de Balkan', 'Stemmen uit Lissabon', 'Polyfonie', 'Percussie-special'] },
  razend:     { count: 33, weeksAgo: 1,  themes: ['Twee uur distortion', 'Hardcore-blok', 'Vinyl-only woede', 'Demo-tape special', 'Live in de kelder'] },
  vinyl:      { count: 60, weeksAgo: 1,  themes: ['Verloren parels', 'Crate digging-editie', 'Tweedehands schatten', 'Eén platenkast', 'B-kanten'] },
  cultafacts: { count: 44, weeksAgo: 3,  themes: ['Weekoverzicht Leuven', 'Festivalnabeschouwing', 'Boekenrubriek', 'Filmgesprek', 'Agenda special'] },
  'verse-vis':{ count: 36, weeksAgo: 1,  themes: ['Vers van de pers', 'Releasedag-special', 'Vijf nieuwe namen', 'Demo-oogst', 'Wat blijft hangen'] },
  stille:     { count: 29, weeksAgo: 2,  themes: ['Late-night jazz', 'Soul in het schemergebied', 'Spiritual jazz', 'Voor de stille uurtjes', 'Pianotrio’s'] },
  diep:       { count: 31, weeksAgo: 1,  themes: ['Diepe elektronica', 'Dub-techno', 'Te lang gemixt', 'Veld & machine', 'Niet voor de dansvloer'] },
  kraut:      { count: 22, weeksAgo: 38, themes: ['Motorik', 'Düsseldorf-school', 'Kosmische editie', 'Lange ritten', 'Synth & herhaling'] },
  achteruit:  { count: 18, weeksAgo: 64, themes: ['Een blik terug', 'Week per week', 'Nostalgie-editie', 'Het muzikale verleden', 'Toen & nu'] },
};

function odSeasonOf(date) {
  const y = date.getFullYear(), m = date.getMonth(); // 0-indexed
  const start = m >= 9 ? y : y - 1; // season starts in October
  return `${String(start).slice(2)}–${String(start + 1).slice(2)}`;
}
function odPad(n) { return String(n).padStart(2, '0'); }
function odAddMin(hhmm, addMin) {
  let [h, m] = hhmm.split(':').map(Number);
  let total = (h * 60 + m + addMin) % (24 * 60);
  return `${odPad(Math.floor(total / 60))}:${odPad(total % 60)}`;
}
function odDurToMin(d) { const [m, s] = d.split(':').map(Number); return m + s / 60; }
function odToMin(hhmm) { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; }
function odDurLabel(min) {
  if (min < 60) return `${min} min`;
  return `${Math.floor(min / 60)}u${odPad(min % 60)}`;
}

// Build all OD shows + episodes deterministically (stable across reloads).
const NOW_REF = new Date('2026-06-05T12:00:00');
const OD_SHOWS = [];
const OD_EPISODES = {}; // showId -> [episodes], newest first

PROGRAMS.forEach((p) => {
  const cfg = OD_SHOW_CFG[p.id];
  if (!cfg) return;
  const startTime = p.time.split('–')[0];
  const endTime = p.time.split('–')[1];
  let slotMin = (odToMin(endTime) - odToMin(startTime) + 1440) % 1440;
  if (slotMin === 0) slotMin = 120;
  const eps = [];
  for (let i = 0; i < cfg.count; i++) {
    const d = new Date(NOW_REF);
    d.setDate(d.getDate() - (cfg.weeksAgo + i) * 7);
    const num = cfg.count - i;
    const len = 7 + ((p.id.length + i) % 4);
    const tracks = [];
    let cursor = 0;
    for (let k = 0; k < len; k++) {
      const t = OD_POOL[(i * 3 + k * 5 + p.name.length) % OD_POOL.length];
      tracks.push({
        time: odAddMin(startTime, Math.round(cursor)),
        artist: t[0], title: t[1], album: t[2], dur: t[3],
      });
      cursor += odDurToMin(t[3]) + 0.4;
    }
    const durMin = slotMin - (num % 4);
    eps.push({
      id: `${p.id}-e${num}`,
      showId: p.id,
      num,
      title: cfg.themes[i % cfg.themes.length],
      date: `${d.getFullYear()}-${odPad(d.getMonth() + 1)}-${odPad(d.getDate())}`,
      dateLabel: `${odPad(d.getDate())}.${odPad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)}`,
      season: odSeasonOf(d),
      duration: odDurLabel(durMin),
      durationMin: durMin,
      desc: `${p.name} #${num} — ${cfg.themes[i % cfg.themes.length].toLowerCase()}. Opgenomen op ${odPad(d.getDate())}.${odPad(d.getMonth() + 1)} in studio.`,
      plays: 120 + ((i * 137 + p.name.length * 31) % 2400),
      tracks,
    });
  }
  OD_EPISODES[p.id] = eps;
  const last = eps[0];
  const seasonsCovered = OD_SEASONS.filter(s => eps.some(e => e.season === s));
  OD_SHOWS.push({
    id: p.id,
    name: p.name,
    dj: p.dj,
    genre: p.genre,
    desc: p.desc,
    episodeCount: eps.length,
    lastAired: last.dateLabel,
    lastAiredDate: last.date,
    seasons: seasonsCovered,
    dormant: cfg.weeksAgo > 26,
  });
});

Object.assign(window, { PROGRAMS, TRACKS, DAYS, SLOTS, GENRES, ON_AIR, OD_SEASONS, OD_SHOWS, OD_EPISODES });
