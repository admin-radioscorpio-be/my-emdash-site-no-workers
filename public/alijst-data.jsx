// alijst-data.jsx — helpers for A-Lijst; data is fetched from the API at runtime

const AL_MONTHS       = ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'];
const AL_MONTHS_SHORT = ['JAN','FEB','MRT','APR','MEI','JUN','JUL','AUG','SEP','OKT','NOV','DEC'];

function alMonthName(yyyymm)  { return AL_MONTHS[parseInt(yyyymm.split('-')[1], 10) - 1] || yyyymm; }
function alMonthShort(yyyymm) { return AL_MONTHS_SHORT[parseInt(yyyymm.split('-')[1], 10) - 1] || yyyymm; }
function alEditionNo(yyyymm)  { const [y, m] = yyyymm.split('-'); return `${m}/${y.slice(2)}`; }
function alYear(yyyymm)       { return parseInt(yyyymm.split('-')[0], 10); }

function alSource(url) {
  if (!url) return 'Beluister';
  if (url.includes('bandcamp')) return 'Bandcamp';
  if (url.includes('youtube') || url.includes('youtu.be')) return 'YouTube';
  if (url.includes('spotify')) return 'Spotify';
  if (url.includes('soundcloud')) return 'SoundCloud';
  return 'Beluister';
}

Object.assign(window, { alMonthName, alMonthShort, alEditionNo, alYear, alSource });
