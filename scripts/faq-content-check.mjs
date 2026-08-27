import fs from 'node:fs';
const s=fs.readFileSync('lib/talkersDefaults.js','utf8');
const required=[
'Como a Talkers escolhe o palestrante certo para cada evento?',
'Por que contratar pela Talkers em vez de procurar um palestrante diretamente?',
'A Talkers trabalha somente com os palestrantes do próprio casting?',
'Vocês atendem eventos em qualquer lugar do Brasil?',
'Quanto custa contratar um palestrante?',
'Com quanto tempo de antecedência devo procurar a Talkers?',
'A palestra pode ser adaptada para a realidade da nossa empresa?',
'O trabalho da Talkers termina quando o palestrante é contratado?'
];
const missing=required.filter(q=>!s.includes(q));
if(missing.length){console.error('FAQ missing:',missing);process.exit(1)}
console.log('All 8 approved FAQ questions are present.');
