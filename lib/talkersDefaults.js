export const TALKERS_SETTINGS = {
  brand_name:'TALKERS',
  header_button_label:'Fale com a Talkers',
  header_button_href:'#contato',
  footer_text:'Curadoria premium de palestrantes.',
  theme_json:{
    ui_version:8,
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
    image_url:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=92',image_position:'center',
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
  {slug:'casting',kind:'casting',sort_order:8,enabled:true,content:{
    theme:'light',min_height:980,padding_y:118,eyebrow:'NOSSO CASTING',title:'Talentos que inspiram.',text:'14 palestrantes. Diferentes histórias, a mesma capacidade de transformar ideias em impacto.',button_label:'Ver todos os palestrantes',button_href:'/casting',page_eyebrow:'CASTING TALKERS · 14 VOZES SELECIONADAS',page_title:'Não é sobre ter muitos nomes. É sobre ter os nomes certos.',page_text:'Um casting criterioso para empresas, convenções, congressos e experiências que não podem tratar o palco como detalhe.',page_note:'Toque em um perfil para explorar.',end_eyebrow:'CURADORIA ANTES DA INDICAÇÃO',end_title:'Você traz o briefing. A Talkers encontra a voz.',end_button_label:'Falar com um curador',end_button_href:'/#contato',
    speakers:[speaker(1,'Liderança'),speaker(2,'Negócios'),speaker(3,'Inovação'),speaker(4,'Cultura'),speaker(5,'Liderança'),speaker(6,'Negócios'),speaker(7,'Vendas'),speaker(8,'Comportamento'),speaker(9,'Finanças'),speaker(10,'Governança'),speaker(11,'Criatividade'),speaker(12,'Economia'),speaker(13,'Desenvolvimento'),speaker(14,'Transformação')]
  }},
  {slug:'recursos',kind:'faq',sort_order:9,enabled:true,content:{
    theme:'light',min_height:660,padding_y:105,eyebrow:'RECURSOS',title:'Perguntas comuns',text:'Informações essenciais para contratar com clareza.',
    items:[
      {question:'Como funciona a curadoria?',answer:'Você traz o briefing e a Talkers cruza objetivo, audiência, momento e território de conteúdo para recomendar os nomes com maior aderência.'},
      {question:'A Talkers atende eventos corporativos?',answer:'Sim. Convenções, congressos, encontros de liderança, experiências de marca e eventos proprietários.'},
      {question:'Posso solicitar um palestrante específico?',answer:'Sim. A Talkers avalia disponibilidade, formato e aderência e conduz o alinhamento necessário.'}
    ]
  }},
  {slug:'contato',kind:'cta',sort_order:10,enabled:true,content:{
    theme:'dark',min_height:390,padding_y:88,eyebrow:'PRONTO PARA TRANSFORMAR SEU PRÓXIMO EVENTO?',title:'Fale com a Talkers e encontre o palestrante ideal para o seu momento.',text:'Uma conversa objetiva para entender contexto, audiência e resultado esperado.',button_label:'Fale com a Talkers',button_href:'#contato',button_icon:'whatsapp'
  }}
];

export async function ensureTalkersV8(sb){
  if(!sb) return;
  const [{data:settings},{data:existingNav},{data:existingSections}] = await Promise.all([
    sb.from('site_settings').select('*').limit(1).maybeSingle(),
    sb.from('nav_items').select('*').order('sort_order'),
    sb.from('sections').select('*').order('sort_order')
  ]);
  if(Number(settings?.theme_json?.ui_version||0)>=8) return;

  const navRows=existingNav||[];
  for(let i=0;i<TALKERS_NAV.length;i++){
    const desired=TALKERS_NAV[i];
    const current=navRows[i];
    if(current?.id) await sb.from('nav_items').update(desired).eq('id',current.id);
    else await sb.from('nav_items').insert(desired);
  }
  for(const extra of navRows.slice(TALKERS_NAV.length)) if(extra?.id) await sb.from('nav_items').update({enabled:false}).eq('id',extra.id);

  const sections=existingSections||[];
  for(const desired of TALKERS_SECTIONS){
    const current=sections.find(s=>s.slug===desired.slug);
    const row={...desired,updated_at:new Date().toISOString()};
    if(current?.id) await sb.from('sections').update(row).eq('id',current.id);
    else await sb.from('sections').insert(row);
  }
  const obsolete=new Set(['manifesto','numeros','produto','automotivo','faq']);
  for(const old of sections) if(obsolete.has(old.slug)&&old?.id) await sb.from('sections').update({enabled:false,updated_at:new Date().toISOString()}).eq('id',old.id);

  const mergedTheme={...(settings?.theme_json||{}),...TALKERS_SETTINGS.theme_json,ui_version:8};
  const settingsRow={
    brand_name:settings?.brand_name && !['urbane.studio','BRAND'].includes(settings.brand_name) ? settings.brand_name : TALKERS_SETTINGS.brand_name,
    logo_url:settings?.logo_url||null,
    favicon_url:settings?.favicon_url||null,
    header_button_label:TALKERS_SETTINGS.header_button_label,
    header_button_href:TALKERS_SETTINGS.header_button_href,
    footer_text:TALKERS_SETTINGS.footer_text,
    theme_json:mergedTheme,
    updated_at:new Date().toISOString()
  };
  if(settings?.id) await sb.from('site_settings').update(settingsRow).eq('id',settings.id);
  else await sb.from('site_settings').insert(settingsRow);
}
