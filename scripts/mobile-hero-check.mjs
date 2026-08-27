import fs from 'node:fs';
const renderer=fs.readFileSync('components/SectionRenderer.js','utf8');
const admin=fs.readFileSync('app/admin/AdminClient.js','utf8');
const css=fs.readFileSync('app/globals.css','utf8');
const checks=[
  [renderer,'--hero-mobile-position','hero exposes mobile focal point'],
  [admin,'image_position_mobile','CMS can edit mobile hero position'],
  [css,'var(--hero-mobile-position','mobile CSS uses mobile focal point']
];
let failed=false;
for(const [hay,needle,label] of checks){if(!hay.includes(needle)){console.error(`MISSING: ${label}`);failed=true;}}
if(failed) process.exit(1);
console.log('Mobile hero focal-point checks passed');
