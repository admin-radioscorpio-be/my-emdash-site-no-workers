// alijst-data.jsx — A-Lijst editions (mock content; backend will replace)
//
// Shape per edition:
//   { id, month, monthShort, year, editionNo, published, intro,
//     covers: [{ artist, title, url }]  // exactly 6 — first 3 top, last 3 bottom
//     tracks: [{ artist, title, url }]  // editorial order (curator's sequence)
//   }
// ALIJST.current points at the live edition.

const AL_INTRO =
  "De A-lijst is Radio Scorpio's muzikale selectie van het moment, toegediend via onze onnavolgbare nonstoplijst. Deze tracks staan momenteel in de hoogste rotatie. Klik op een track voor audio / video / disco.";

const ALIJST = {
  current: 'mei-2026',
  editions: [
    {
      id: 'mei-2026', month: 'Mei', monthShort: 'MEI', year: 2026,
      editionNo: '05/26', published: '01.05.2026', intro: AL_INTRO,
      covers: [
        { artist: 'Bloodworm',          title: 'Alone in Your Garden', url: 'https://bloodworm1.bandcamp.com/track/alone-in-your-garden-3' },
        { artist: 'Earl Sweatshirt',    title: 'Leadbelly',            url: 'https://mikelikesrap.bandcamp.com/track/leadbelly-feat-mike' },
        { artist: 'My New Band Believe', title: 'Love Story',          url: 'https://mynewbandbelieve.bandcamp.com/track/love-story' },
        { artist: 'Bill Orcutt & Mabe Fratti', title: 'Almost Waking', url: 'https://tinangelrecords.bandcamp.com/track/almost-waking' },
        { artist: 'Shinichi Atobe',      title: 'Blurred',             url: 'https://plasticandsounds.bandcamp.com/track/blurred' },
        { artist: 'We Stood like Kings', title: 'Assassins',           url: 'https://wslk.bandcamp.com/track/assassins' },
      ],
      tracks: [
        { artist: 'Bassvictim',                              title: 'Going Home',              url: 'https://bassvictim.bandcamp.com/track/going-home' },
        { artist: 'Bill Orcutt & Mabe Fratti',               title: 'Almost Waking',           url: 'https://tinangelrecords.bandcamp.com/track/almost-waking' },
        { artist: 'Bloodworm',                               title: 'Alone in Your Garden',    url: 'https://bloodworm1.bandcamp.com/track/alone-in-your-garden-3' },
        { artist: 'Deadtrees',                               title: 'Extinguished City',       url: 'https://deadtreescn.bandcamp.com/track/extinguished-city-2' },
        { artist: 'Diles Que No Me Maten',                   title: 'Hiriku',                  url: 'https://dilesquenomematen.bandcamp.com/track/hiriku-2' },
        { artist: 'Earl Sweatshirt & Surf Gang (feat. MIKE)',title: 'Leadbelly',               url: 'https://mikelikesrap.bandcamp.com/track/leadbelly-feat-mike' },
        { artist: 'FACS',                                    title: 'Parallel Lives',          url: 'https://chimers-12xu.bandcamp.com/track/parallel-lives-facs' },
        { artist: 'Gelli Haha',                              title: 'Klouds Will Carry Me To Sleep', url: 'https://gellihaha.bandcamp.com/track/klouds-will-carry-me-to-sleep' },
        { artist: 'Irreversible Entanglements (feat. Motherboard)', title: 'Keep Going',        url: '' },
        { artist: 'Lintworm',                                title: 'Cherries',                url: 'https://lintworm.bandcamp.com/track/cherries' },
        { artist: 'Mayssa Jallad',                           title: 'Taamir (Bahriyyeh)',      url: 'https://mayssajallad.bandcamp.com/track/taamir-bahriyyeh' },
        { artist: 'My New Band Believe',                     title: 'Love Story',              url: 'https://mynewbandbelieve.bandcamp.com/track/love-story' },
        { artist: 'Object Hours',                            title: 'Manhattan Marble',        url: 'https://objecthours.bandcamp.com/track/manhattan-marble' },
        { artist: 'Powerplant',                              title: 'Bridge of Sacrifice',     url: 'https://ppowerplant.bandcamp.com/track/bridge-of-sacrifice' },
        { artist: 'Pure Wrath',                              title: 'Spectral Insomnia',       url: 'https://purewrath.bandcamp.com/track/spectral-insomnia' },
        { artist: 'Rhododendron',                            title: 'Firmament',               url: 'https://rhododendronpdx.bandcamp.com/track/firmament' },
        { artist: 'Shinichi Atobe',                          title: 'Blurred',                 url: 'https://plasticandsounds.bandcamp.com/track/blurred' },
        { artist: 'Slift',                                   title: 'A Storm of Wings',        url: 'https://slift.bandcamp.com/track/a-storm-of-wings' },
        { artist: 'Station Model Violence',                  title: 'Learn to Hate',           url: 'https://stationmodelviolence.bandcamp.com/track/learn-to-hate' },
        { artist: 'Underscores',                             title: 'Lovefield',               url: 'https://underscores.bandcamp.com/track/lovefield' },
        { artist: 'Upupayama',                               title: 'Mystic Chords of Memory', url: 'https://upupayama.bandcamp.com/track/mystic-chords-of-memory' },
        { artist: 'We Stood like Kings',                     title: 'Assassins',               url: 'https://wslk.bandcamp.com/track/assassins' },
        { artist: 'Wendy Eisenberg',                         title: 'Vanity Paradox',          url: 'https://wendyeisenberg.bandcamp.com/track/vanity-paradox' },
      ],
    },

    {
      id: 'februari-2026', month: 'Februari', monthShort: 'FEB', year: 2026,
      editionNo: '02/26', published: '28.02.2026', intro: AL_INTRO,
      covers: [
        { artist: 'The Smile',      title: 'Wall of Eyes',          url: '' },
        { artist: 'Lankum',         title: 'The New York Trader',   url: '' },
        { artist: 'Ela Minus',      title: 'Broken',                url: '' },
        { artist: 'Nala Sinephro',  title: 'Continuum',             url: '' },
        { artist: 'Yaya Bey',       title: 'Sir Princess Bad Bitch',url: '' },
        { artist: 'Geese',          title: 'Taxes',                 url: '' },
      ],
      tracks: [
        { artist: 'Been Stellar',        title: 'Scream',                 url: '' },
        { artist: 'Caroline',            title: 'Total Euphoria',         url: '' },
        { artist: 'Cucina Povera',       title: 'Vihreä',                 url: '' },
        { artist: 'DEADLETTER',          title: 'Mother',                 url: '' },
        { artist: 'Ela Minus',           title: 'Broken',                 url: '' },
        { artist: 'Fievel Is Glauque',   title: 'Hover',                  url: '' },
        { artist: 'Geese',               title: 'Taxes',                  url: '' },
        { artist: 'Helado Negro',        title: 'Best For You and Me',    url: '' },
        { artist: 'Jaga Jazzist',        title: 'Spiral Era',             url: '' },
        { artist: 'Lankum',              title: 'The New York Trader',    url: '' },
        { artist: 'Mabe Fratti',         title: 'Pantalla Azul',          url: '' },
        { artist: 'Nala Sinephro',       title: 'Continuum',              url: '' },
        { artist: 'Nourished by Time',   title: 'Hand on Me',             url: '' },
        { artist: 'O.',                  title: 'Green Shirt',            url: '' },
        { artist: 'Personal Trainer',    title: 'Round',                  url: '' },
        { artist: 'Saya Gray',           title: 'Shell (Of A Man)',       url: '' },
        { artist: 'The Smile',           title: 'Wall of Eyes',           url: '' },
        { artist: 'Tapir!',              title: 'On a Grassy Knoll',      url: '' },
        { artist: 'Yaya Bey',            title: 'Sir Princess Bad Bitch', url: '' },
        { artist: 'Yard Act',            title: 'We Make Hits',           url: '' },
      ],
    },

    {
      id: 'november-2025', month: 'November', monthShort: 'NOV', year: 2025,
      editionNo: '11/25', published: '29.11.2025', intro: AL_INTRO,
      covers: [
        { artist: 'OKO DJ',        title: 'Je suis la Terre qui absorbe Dieu', url: 'https://www.youtube.com/watch?v=G7MBp46lvv0' },
        { artist: 'Blood Orange',  title: 'Countryside',           url: 'https://www.youtube.com/watch?v=oxJwX_Efk8Q' },
        { artist: 'Home Front',    title: 'Street City Kids',      url: 'https://www.youtube.com/watch?v=BL3DlFqqi2w' },
        { artist: 'Tomorrow Kings',title: 'Canned',                url: 'https://tomorrowkings.bandcamp.com/track/canned' },
        { artist: 'Rosalía',       title: 'La Perla',              url: 'https://www.youtube.com/watch?v=gEHK00H_PxQ' },
        { artist: 'KeiyaA',        title: 'I H8 U',                url: 'https://www.youtube.com/watch?v=alGdn7ML4EE' },
      ],
      tracks: [
        { artist: 'Agriculture',                     title: 'Bodhidharma',                                url: 'https://www.youtube.com/watch?v=hXB4kmwaCD0' },
        { artist: 'Armand Hammer (feat. Pink Siifu)',title: 'Crisis Phone',                               url: 'https://www.youtube.com/watch?v=c1j7XqsrGQY' },
        { artist: 'Assemblage 23',                   title: 'Lunatics',                                   url: 'https://assemblage23.bandcamp.com/track/lunatics' },
        { artist: 'Atol Atol Atol',                  title: 'Przyszłość Skacze Z Miejsca Na Miejsce',     url: 'https://ubac.bandcamp.com/track/przysz-o-skacze-z-miejsca-na-miejsce' },
        { artist: 'Blood Orange',                    title: 'Countryside',                                url: 'https://www.youtube.com/watch?v=oxJwX_Efk8Q' },
        { artist: 'Butch Kassidy',                   title: 'Like Fire',                                  url: 'https://www.youtube.com/watch?v=m8HeeXPkE-A' },
        { artist: 'Carrier',                         title: 'Outer Shell',                                url: 'https://www.youtube.com/watch?v=7z7Uh8LNKyU' },
        { artist: 'Clouds Indoor',                   title: 'Go Sleep',                                   url: 'https://www.youtube.com/watch?v=UWF_v4B8lns' },
        { artist: 'Danny Brown',                     title: 'Starburst',                                  url: 'https://www.youtube.com/watch?v=RA2BB5o0Hp4' },
        { artist: 'DITZ',                            title: 'Don Enzo Magic Carpet Salesman',             url: 'https://ditzband.bandcamp.com/album/don-enzo-magic-carpet-salesman-kalimba-song' },
        { artist: 'Emily Wittbrodt',                 title: 'Wearing Words',                              url: 'https://www.youtube.com/watch?v=yMOMBNFLJUg' },
        { artist: 'Home Front',                      title: 'Street City Kids (In a New Dark Age)',       url: 'https://www.youtube.com/watch?v=BL3DlFqqi2w' },
        { artist: 'KeiyaA',                          title: 'I H8 U',                                     url: 'https://www.youtube.com/watch?v=alGdn7ML4EE' },
        { artist: 'Maryam Saleh',                    title: 'Syrr سِرّ',                                   url: 'https://maryamsaleh.bandcamp.com/album/syrr' },
        { artist: 'Nusantara Beat',                  title: 'Bakar',                                      url: 'https://www.youtube.com/watch?v=L7bZASzPP30' },
        { artist: 'OKO DJ (feat. Onarrivenow)',      title: 'Je suis la Terre qui absorbe Dieu',          url: 'https://www.youtube.com/watch?v=G7MBp46lvv0' },
        { artist: 'Oneohtrix Point Never',           title: 'D.I.S.',                                     url: 'https://www.youtube.com/watch?v=V9L_btQnA64' },
        { artist: 'The Orchestra (For Now)',         title: 'Impatient',                                  url: 'https://www.youtube.com/watch?v=iiOEigFHncI' },
        { artist: 'Robyn',                           title: 'Dopamine',                                   url: 'https://www.youtube.com/watch?v=vitil9qMN6A' },
        { artist: 'Rosalía (con Yahritza y Su Esencia)', title: 'La Perla',                               url: 'https://www.youtube.com/watch?v=gEHK00H_PxQ' },
        { artist: 'Shinichi Atobe',                  title: 'SynthScale',                                 url: 'https://www.youtube.com/watch?v=ipZMKRZsgHI' },
        { artist: 'Sudan Archives',                  title: 'Dead',                                       url: 'https://sudanarchives.bandcamp.com/track/dead' },
        { artist: 'Tomorrow Kings',                  title: 'Canned',                                     url: 'https://tomorrowkings.bandcamp.com/track/canned' },
      ],
    },

    {
      id: 'oktober-2025', month: 'Oktober', monthShort: 'OKT', year: 2025,
      editionNo: '10/25', published: '01.10.2025', intro: AL_INTRO,
      covers: [
        { artist: 'Horsegirl',       title: '2468',            url: '' },
        { artist: 'Shabaka',         title: 'End of Innocence',url: '' },
        { artist: 'Erika de Casier', title: 'Lucky',           url: '' },
        { artist: 'Amaarae',         title: 'Sociopathic Dance Floor', url: '' },
        { artist: 'Nilüfer Yanya',   title: 'Method Actor',    url: '' },
        { artist: 'Loraine James',   title: 'Try For Me',      url: '' },
      ],
      tracks: [
        { artist: 'Amaarae',          title: 'Sociopathic Dance Floor', url: '' },
        { artist: 'Blawan',           title: 'Close the Cycle',         url: '' },
        { artist: 'Carla dal Forno',  title: "Mind You're On",          url: '' },
        { artist: 'Deeper',           title: 'Build a Bridge',          url: '' },
        { artist: 'Dummy',            title: 'Pulse',                   url: '' },
        { artist: 'Erika de Casier',  title: 'Lucky',                   url: '' },
        { artist: 'Floatie',          title: 'Catch a Good Worm',       url: '' },
        { artist: 'Galya Bisengalieva',title: 'Polygon',                url: '' },
        { artist: 'Horsegirl',        title: '2468',                    url: '' },
        { artist: 'Jane Remover',     title: 'Magic I Want U',          url: '' },
        { artist: 'Loraine James',    title: 'Try For Me',              url: '' },
        { artist: 'Mount Eerie',      title: 'Huge Fire',               url: '' },
        { artist: 'Nilüfer Yanya',    title: 'Method Actor',            url: '' },
        { artist: 'Oren Ambarchi',    title: 'Hubris',                  url: '' },
        { artist: 'Quade',            title: 'Invitation',              url: '' },
        { artist: 'Rian Treanor',     title: 'Hypnic Jerks',            url: '' },
        { artist: 'Shabaka',          title: 'End of Innocence',        url: '' },
        { artist: 'Water From Your Eyes', title: 'Structure',           url: '' },
      ],
    },
  ],
};

// Source label from an outbound url.
function alSource(url) {
  if (!url) return 'Beluister';
  if (url.includes('bandcamp')) return 'Bandcamp';
  if (url.includes('youtube') || url.includes('youtu.be')) return 'YouTube';
  if (url.includes('spotify')) return 'Spotify';
  if (url.includes('soundcloud')) return 'SoundCloud';
  return 'Beluister';
}

Object.assign(window, { ALIJST, alSource });
