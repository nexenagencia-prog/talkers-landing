import { supabaseAdmin } from '../lib/supabase';
import SiteHeader from '../components/SiteHeader';
import SectionRenderer from '../components/SectionRenderer';

const fallback = {
  settings:{brand_name:'urbane.studio',header_button_label:'Agendar visita',header_button_href:'#contato',footer_text:'Experiências digitais premium.'},
  nav:[{id:1,label:'Talkers',href:'#top'},{id:2,label:'Casting',href:'/casting'},{id:3,label:'Curadoria',href:'#sobre'},{id:4,label:'Para Empresas',href:'#servicos'},{id:5,label:'Contato',href:'#contato'}],
  sections:[
    {id:1,slug:'top',kind:'hero',sort_order:1,content:{image_url:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90',eyebrow:'Premium • Curadoria • Experiência',title:'Criamos espaços e experiências que constroem valor.',text:'Uma landing page cinematográfica, limpa e inteiramente editável no CMS.',buttons:[{label:'Conheça o projeto',href:'#sobre'},{label:'Falar com a equipe',href:'#contato',style:'alt'}],feature_kicker:'Destaque',feature_title:'Luxury Experience',feature_text:'Conteúdo, imagem e CTA editáveis.'}},
    {id:2,slug:'sobre',kind:'cards',sort_order:2,content:{eyebrow:'Sobre',title:'Curadoria desde o primeiro contato.',text:'Seções amplas, hierarquia clara e visual premium.',buttons:[{label:'Saiba mais',href:'#servicos'}],cards:[{kicker:'01',title:'Curadoria',text:'Cards, imagens e links editáveis.',image_url:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90',button_label:'Explorar'},{kicker:'02',title:'Investimento',text:'CTAs e conteúdo administráveis.',image_url:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90',button_label:'Ver mais'}]}},
    {id:3,slug:'manifesto',kind:'statement',sort_order:3,content:{eyebrow:'Features',title:'Uma estrutura premium feita para impressionar sem poluir.',text:'Tipografia grande, respiro, cards com cantos amplos e contraste elegante.'}},
    {id:4,slug:'servicos',kind:'media',sort_order:4,content:{eyebrow:'Experiência',title:'Vídeo, áudio e mídia controlados pelo CMS.',text:'Envie arquivos para o Supabase Storage e troque tudo sem tocar no código.',image_url:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90',quote_kicker:'Insights',quote_name:'Seu conteúdo',quote_text:'Depoimentos, áudio, vídeo e imagens em um único painel.'}},
    {id:5,slug:'numeros',kind:'stats',sort_order:5,content:{items:[{text:'Experiência construída para crescimento.',value:'12+'},{text:'Blocos e componentes gerenciáveis.',value:'80+'},{text:'Arquivos de mídia suportados.',value:'3K+'}]}},
    {id:6,slug:'produto',kind:'split',sort_order:6,content:{eyebrow:'Design',title:'Seção ampla 1920 × 1080 com conteúdo ajustável.',text:'Imagem, título, subtítulo e botões editáveis.',image_url:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90',buttons:[{label:'Conhecer',href:'#faq'}]}},
    {id:7,slug:'automotivo',kind:'hero',sort_order:7,content:{theme:'dark',image_url:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=90',eyebrow:'Automotive',title:'Experiência exclusiva em movimento.',text:'Você pode transformar essa seção em carros, eventos, imóveis, palestrantes ou qualquer outro tema.',buttons:[{label:'Ver catálogo',href:'#faq'}]}},
    {id:8,slug:'faq',kind:'faq',sort_order:99,content:{eyebrow:'FAQ',title:'Common Questions',items:[{question:'Tudo pode ser editado?',answer:'Sim. Menus, botões, títulos, textos, imagens, áudio, ordem das seções e status de publicação.'},{question:'Posso trocar fotos e áudios?',answer:'Sim. O painel envia arquivos para o Supabase Storage e grava a URL no conteúdo.'},{question:'Funciona na Vercel?',answer:'Sim. O projeto está preparado para Next.js + Vercel e banco/Storage no Supabase.'},{question:'Posso adicionar novas seções?',answer:'Sim. Você pode duplicar, criar, reordenar e ocultar seções pelo CMS.'}]}}
  ]
};

export const dynamic = 'force-dynamic';

async function loadData(){
  const sb = supabaseAdmin();
  if(!sb) return fallback;
  try{
    const [{data:settings},{data:nav},{data:sections}] = await Promise.all([
      sb.from('site_settings').select('*').limit(1).maybeSingle(),
      sb.from('nav_items').select('*').eq('enabled',true).order('sort_order'),
      sb.from('sections').select('*').eq('enabled',true).order('sort_order')
    ]);
    if(!sections?.length) return fallback;
    return {settings:settings||fallback.settings,nav:nav||[],sections};
  }catch{return fallback;}
}

export default async function Page(){const data=await loadData();const t=data.settings?.theme_json||{};return <main className="site" style={{background:t.bg||undefined,color:t.ink||undefined,'--radius':t.radius?`${t.radius}px`:undefined}}><SiteHeader settings={data.settings} nav={data.nav}/>{data.sections.map(s=><SectionRenderer key={s.id} section={s}/>)}<footer id="contato" className="footer">{data.settings?.footer_text||'© 2026'}</footer></main>}
