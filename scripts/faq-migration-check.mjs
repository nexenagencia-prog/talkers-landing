import fs from 'node:fs';
const defaults=fs.readFileSync(new URL('../lib/talkersDefaults.js', import.meta.url),'utf8');
const page=fs.readFileSync(new URL('../app/page.js', import.meta.url),'utf8');
const casting=fs.readFileSync(new URL('../app/casting/page.js', import.meta.url),'utf8');
const required=[
  'ensureTalkersV11',
  "slug==='recursos'",
  "kind:'faq'",
  'ui_version:11',
  'Como a Talkers escolhe o palestrante certo para cada evento?',
  'O trabalho da Talkers termina quando o palestrante é contratado?'
];
for(const x of required) if(!defaults.includes(x)) throw new Error(`Migração FAQ ausente: ${x}`);
if(!page.includes('ensureTalkersV11')) throw new Error('Home não executa a migração V11');
if(!casting.includes('ensureTalkersV11')) throw new Error('Casting não executa a migração V11');
console.log('FAQ migration check: OK');
