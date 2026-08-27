export const TALKERS_SETTINGS = {
  brand_name:'TALKERS',
  header_button_label:'Fale com a Talkers',
  header_button_href:'#contato',
  footer_text:'Curadoria premium de palestrantes.',
  theme_json:{
    ui_version:10,
    bg:'#f5f5f3',ink:'#0b0b0c',radius:28,
    contact_email:'contato@talkers.com.br',
    contact_phone:'+55 11 99999-9999',
    contact_city:'São Paulo · Brasil',
    whatsapp_url:'#contato',instagram_url:'#',linkedin_url:'#',youtube_url:'#',
    seo_title:'Talkers · Curadoria Premium de Palestrantes',seo_description:'Curadoria premium para empresas, convenções, congressos e experiências que exigem a pessoa certa no palco.',footer_tagline:'CURADORIA PREMIUM DE PALESTRANTES',
    footer_nav_title:'Navegação',footer_company_title:'Para empresas',footer_resources_title:'Recursos',footer_contact_title:'Contato'
  }
};

export const TALKERS_NAV = [
  {label:'Talkers',href:'#sobre',sort_order:1,enabled:true},
  {label:'Casting',href:'/casting',sort_order:2,enabled:true},
  {label:'Empresas',href:'#empresas',sort_order:3,enabled:true},
  {label:'Sobre',href:'#sobre',sort_order:4,enabled:true},
  {label:'Recursos',href:'#recursos',sort_order:5,enabled:true}
];

const speaker = (i,category) => ({
  name:`Palestrante ${String(i).padStart(2,'0')}`,
  category,
  role:'Especialista selecionado pela curadoria Talkers',
  short:'Repertório, presença e impacto para grandes eventos.',
  bio:'Perfil integrante do casting criterioso da Talkers. A indicação considera contexto, audiência, objetivo e aderência ao briefing.',
  image_url:'',tags:['Curadoria','Conteúdo','Palco'],href:'#contato'
});

export const TALKERS_SECTIONS = [
  {slug:'top',kind:'hero',sort_order:1,enabled:true,content:{
    theme:'dark',min_height:860,padding_y:72,
    image_url:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=92',image_position:'center',image_position_mobile:'right center',
    eyebrow:'CURADORIA PREMIUM DE PALESTRANTES',
    title:'Grandes eventos não precisam de mais um palestrante. Precisam da pessoa certa no palco.',
    text:'Selecionamos, posicionamos e conectamos grandes nomes a empresas, convenções e experiências que exigem mais do que presença. Exigem impacto.',
    buttons:[{label:'Conheça nosso Casting',href:'/casting',style:'default'},{label:'Fale com a Talkers',href:'#contato',style:'alt'}],
    feature_kicker:'Talkers Corporate',feature_title:'Curadoria para grandes eventos',feature_text:'Briefing, seleção, alinhamento e palco em uma experiência só.',feature_image_url:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=720&q=90'
  }},
  {slug:'sobre',kind:'cards',sort_order:2,enabled:true,content:{
    theme:'light',min_height:760,padding_y:108,eyebrow:'01 / SOBRE',
    title:'Transformamos propósito em resultado desde o primeiro dia.',
    text:'Há mais de uma década no mercado, criamos pontes entre grandes ideias e grandes plateias. A Talkers é inteligência aplicada à comunicação de impacto.',
    buttons:[{label:'Agendar uma conversa',href:'#contato'}],
    cards:[
      {kicker:'01',title:'Curadoria que faz sentido',text:'Avaliamos repertório, mensagem e entrega para garantir relevância e conexão real.',image_url:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90',button_label:'Nosso Casting',button_href:'/casting'},
      {kicker:'02',title:'Conexões que geram valor',text:'Mais do que indicar nomes, construímos parcerias que fortalecem marcas e pessoas.',image_url:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90',button_label:'Para Empresas',button_href:'#empresas'}
    ]
  }},
  {slug:'empresas',kind:'features',sort_order:3,enabled:true,content:{
    theme:'light',min_height:720,padding_y:105,eyebrow:'POR QUE ESCOLHER A TALKERS',
    title:'Curadoria que você pode confiar. Serviço que você pode contar.',
    milestone_kicker:'Milestone achieved',milestone_value:'100',milestone_label:'Eventos conectados',
    milestone_image_url:'',
    items:[
      {icon:'target',title:'Curadoria criteriosa',text:'Nomes avaliados por aderência ao objetivo e à audiência.'},
      {icon:'spark',title:'Briefing estratégico',text:'Começamos pela mensagem que o evento precisa provocar.'},
      {icon:'phone',title:'Acompanhamento completo',text:'Do primeiro contato até a entrega no palco.'},
      {icon:'people',title:'Rede de especialistas',text:'Vozes relevantes para diferentes mercados e desafios.'}
    ]
  }},
  {slug:'depoimentos',kind:'testimonials',sort_order:4,enabled:true,content:{
    theme:'light',min_height:690,padding_y:96,eyebrow:'DEPOIMENTOS',title:'Confiado por quem não pode errar no palco.',
    items:[
      {rating:'★★★★★',quote:'A Talkers encontrou o nome certo para o nosso contexto e conduziu todo o processo com precisão.',name:'Cliente Talkers',role:'Direção de RH',image_url:''},
      {rating:'★★★★★',quote:'Curadoria impecável, atendimento próximo e uma escolha que realmente conectou com a audiência.',name:'Cliente Talkers',role:'CEO',image_url:'',featured:true},
      {rating:'★★★★★',quote:'Profissionais de altíssimo nível e tranquilidade do início ao fim. Parceria de longo prazo.',name:'Cliente Talkers',role:'Marketing',image_url:''}
    ]
  }},
  {slug:'marca',kind:'brandstrip',sort_order:5,enabled:true,content:{
    theme:'light',min_height:440,padding_y:92,
    words:['We','Curate','→','Impact'],
    title:'As ideias certas, nas vozes certas, nos palcos certos.',
    text:'A Talkers transforma briefing em compatibilidade: conteúdo, contexto e presença trabalhando juntos.',
    button_label:'Sobre a Talkers',button_href:'#sobre',social_label:'Explore nossas redes'
  }},
  {slug:'servicos',kind:'services',sort_order:6,enabled:true,content:{
    theme:'light',min_height:760,padding_y:112,eyebrow:'NOSSAS SOLUÇÕES',title:'Tudo que um grande evento precisa para crescer em relevância e impacto.',
    cards:[
      {kicker:'ESTRATÉGIA',title:'Curadoria de Palestrantes',text:'Posicionamento e seleção conectados ao público certo.',image_url:''},
      {kicker:'CONTEÚDO',title:'Construção de Narrativa',text:'Repertório e mensagem capazes de elevar a conversa.',image_url:''},
      {kicker:'DIREÇÃO',title:'Experiência de Palco',text:'Alinhamento de formato, entrega, momento e audiência.',image_url:''},
      {kicker:'NEGÓCIOS',title:'Talkers for Business',text:'Soluções de curadoria para marcas, convenções e congressos.',image_url:''}
    ]
  }},
  {slug:'resultados',kind:'growth',sort_order:7,enabled:true,content:{
    theme:'dark',min_height:330,padding_y:76,eyebrow:'RESULTADOS',title:'TUDO QUE SUA MARCA PRECISA PARA CRESCER.',text:'Estratégia, curadoria e execução para marcas que querem ir além.',
    items:[{value:'+10',text:'Anos de experiência'},{value:'+250',text:'Projetos realizados'},{value:'+120',text:'Marcas conectadas'}]
  }},
  {slug:'casting',kind:'connection',sort_order:8,enabled:true,content:{
    theme:'light',min_height:900,padding_y:70,eyebrow:'Conexão que transforma',badge:'01',title:'Contrate seu palestrante de qualquer lugar do Brasil.',text:'A Talkers conecta você aos melhores palestrantes do país para transformar seu evento em uma experiência inesquecível.',brief_title:'Do briefing ao palco, a gente faz acontecer.',brief_text:'Entendemos sua necessidade, indicamos os nomes ideais e cuidamos de todo o processo para que você tenha mais conexão, mais impacto e mais resultado.',items:[{label:'Palestrantes em todo o Brasil',value:'50'},{label:'Temas e formatos',value:'3'},{label:'Palestras realizadas',value:'2.500'}]
  }},
  {slug:'recursos',kind:'faq',sort_order:9,enabled:true,content:{
    theme:'light',min_height:660,padding_y:105,eyebrow:'RECURSOS',title:'Perguntas comuns',text:'Informações essenciais para contratar com clareza.',
    items:[
      {question:'Como a Talkers escolhe o palestrante certo para cada evento?',answer:'A escolha começa pelo objetivo, não pelo nome. Entendemos o público, o momento da empresa, o contexto do evento e o resultado que aquela conversa precisa provocar. A partir disso, cruzamos tema, repertório, perfil de palco e capacidade de conexão para indicar nomes que façam sentido de verdade.'},
      {question:'Por que contratar pela Talkers em vez de procurar um palestrante diretamente?',answer:'Porque disponibilidade não é curadoria. Um grande nome pode ser excelente e ainda assim ser a escolha errada para determinado público. A Talkers reduz essa incerteza: transforma o briefing em critérios e os critérios em uma indicação estratégica.'},
      {question:'A Talkers trabalha somente com os palestrantes do próprio casting?',answer:'Nosso casting reúne nomes selecionados sob critérios de repertório, posicionamento e entrega. Mas nossa prioridade é resolver o briefing. Quando o projeto exige outro perfil, podemos avaliar possibilidades além do casting e buscar a solução mais coerente para o evento.'},
      {question:'Vocês atendem eventos em qualquer lugar do Brasil?',answer:'Sim. A Talkers atende empresas, agências, congressos e organizadores em todo o país. A localização faz parte da operação; a curadoria continua sendo feita a partir do objetivo do evento e do perfil da audiência.'},
      {question:'Quanto custa contratar um palestrante?',answer:'Não existe um valor único. Cachê, localização, formato, duração, data, logística e nível de personalização influenciam a contratação. Com um briefing inicial, conseguimos direcionar nomes compatíveis também com a realidade de investimento do projeto.'},
      {question:'Com quanto tempo de antecedência devo procurar a Talkers?',answer:'Quanto antes, maior a liberdade de escolha — especialmente para nomes com agendas disputadas. Mas eventos com prazos mais curtos também podem ser atendidos. Nesse caso, trabalhamos com disponibilidade real e velocidade de decisão para encontrar a melhor alternativa possível.'},
      {question:'A palestra pode ser adaptada para a realidade da nossa empresa?',answer:'Depende do palestrante e do projeto, mas a curadoria considera justamente esse nível de aderência. Quando a personalização é importante, buscamos profissionais capazes de compreender o contexto da organização e aproximar seu repertório da realidade daquela audiência.'},
      {question:'O trabalho da Talkers termina quando o palestrante é contratado?',answer:'Não. A contratação é apenas uma parte do processo. Acompanhamos os alinhamentos necessários entre empresa, organização e palestrante para que aquilo que foi pensado no briefing chegue ao palco com coerência. O objetivo não é simplesmente preencher um horário na programação. É fazer aquela escolha valer o palco.'}
    ]
  }},
  {slug:'contato',kind:'cta',sort_order:10,enabled:true,content:{
    theme:'dark',min_height:390,padding_y:88,eyebrow:'PRONTO PARA TRANSFORMAR SEU PRÓXIMO EVENTO?',title:'Fale com a Talkers e encontre o palestrante ideal para o seu momento.',text:'Uma conversa objetiva para entender contexto, audiência e resultado esperado.',button_label:'Fale com a Talkers',button_href:'#contato',button_icon:'whatsapp'
  }}
];

export async function ensureTalkersV10(sb){
  if(!sb) return;
  const [{data:settings},{data:existingNav},{data:existingSections}] = await Promise.all([
    sb.from('site_settings').select('*').limit(1).maybeSingle(),
    sb.from('nav_items').select('*').order('sort_order'),
    sb.from('sections').select('*').order('sort_order')
  ]);
  if(Number(settings?.theme_json?.ui_version||0)>=10) return;

  // V8 could run concurrently on first production requests and create duplicate rows.
  // V9 does not replace edited content: it only deactivates duplicate records and
  // advances the migration marker so the cleanup is idempotent.
  const sectionGroups=new Map();
  for(const row of existingSections||[]){
    const key=String(row?.slug||'').trim();
    if(!key) continue;
    if(!sectionGroups.has(key)) sectionGroups.set(key,[]);
    sectionGroups.get(key).push(row);
  }
  for(const group of sectionGroups.values()){
    group.sort((a,b)=>{
      const enabledDiff=Number(b.enabled!==false)-Number(a.enabled!==false);
      const ta=Date.parse(a.updated_at||0)||0, tb=Date.parse(b.updated_at||0)||0;
      return enabledDiff || tb-ta || Number(b.id||0)-Number(a.id||0);
    });
    const keep=group[0];
    for(const extra of group.slice(1)) if(extra?.id) await sb.from('sections').update({enabled:false}).eq('id',extra.id);
  }

  const navGroups=new Map();
  for(const row of existingNav||[]){
    const key=`${String(row?.label||'').trim().toLowerCase()}|${String(row?.href||'').trim()}`;
    if(!key || key==='|') continue;
    if(!navGroups.has(key)) navGroups.set(key,[]);
    navGroups.get(key).push(row);
  }
  for(const group of navGroups.values()){
    group.sort((a,b)=>Number(b.enabled!==false)-Number(a.enabled!==false) || Number(b.id||0)-Number(a.id||0));
    const keep=group[0];
    for(const extra of group.slice(1)) if(extra?.id) await sb.from('nav_items').update({enabled:false}).eq('id',extra.id);
  }

  const castingHome=(existingSections||[]).find(x=>x.slug==='casting' && x.enabled!==false);
  const connectionContent=TALKERS_SECTIONS.find(x=>x.slug==='casting')?.content;
  if(castingHome?.id && connectionContent) await sb.from('sections').update({kind:'connection',content:connectionContent,updated_at:new Date().toISOString()}).eq('id',castingHome.id);

  const mergedTheme={...(settings?.theme_json||{}),ui_version:10};
  const row={theme_json:mergedTheme,updated_at:new Date().toISOString()};
  if(settings?.id) await sb.from('site_settings').update(row).eq('id',settings.id);
  else await sb.from('site_settings').insert({...TALKERS_SETTINGS,theme_json:{...TALKERS_SETTINGS.theme_json,ui_version:10},updated_at:new Date().toISOString()});
}
