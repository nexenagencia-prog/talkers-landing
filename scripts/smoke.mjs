import fs from 'node:fs';
const read = p => fs.readFileSync(p,'utf8');
const renderer = read('components/SectionRenderer.js');
const admin = read('app/admin/AdminClient.js');
const defaults = fs.existsSync('lib/talkersDefaults.js') ? read('lib/talkersDefaults.js') : '';
const page = read('app/page.js');
const casting = read('app/casting/page.js');
const css = read('app/globals.css');
const must = [
  [renderer,"kind === 'features'",'features renderer'],
  [renderer,"kind === 'testimonials'",'testimonials renderer'],
  [renderer,"kind === 'brandstrip'",'brand strip renderer'],
  [renderer,"kind === 'services'",'services renderer'],
  [renderer,"kind === 'growth'",'growth renderer'],
  [renderer,"kind === 'casting'",'casting renderer'],
  [renderer,"kind === 'cta'",'cta renderer'],
  [admin,"contact_email",'contact CMS field'],
  [admin,"SpeakersEditor",'speaker CMS editor'],
  [admin,"TestimonialsEditor",'testimonial CMS editor'],
  [defaults,'ui_version:8','one-time UI migration marker'],
  [defaults,"slug:'casting'",'shared casting section'],
  [page,'ensureTalkersV8','homepage migration call'],
  [casting,'ensureTalkersV8','casting migration call'],
  [css,'.talkers-hero','premium hero styles'],
  [css,'.section-space','spacious section rhythm'],
  [css,'.talkers-footer','editable footer styles']
];
let failed=false;
for (const [hay,needle,label] of must) {
  if(!hay.includes(needle)){console.error(`MISSING: ${label} -> ${needle}`);failed=true;}
}
if(failed) process.exit(1);
console.log('Talkers V8 smoke checks passed');
