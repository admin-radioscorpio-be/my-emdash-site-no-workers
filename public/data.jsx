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

Object.assign(window, { PROGRAMS, TRACKS, DAYS, SLOTS, GENRES, ON_AIR });
