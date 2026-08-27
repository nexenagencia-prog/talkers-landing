import SiteHeader from '../../components/SiteHeader';
import CastingGrid from '../../components/CastingGrid';
import { supabaseAdmin } from '../../lib/supabase';

export const dynamic='force-dynamic';

const fallbackSpeakers = Array.from({length:14},(_,i)=>({
  id:i+1,
  name:`Palestrante ${String(i+1).padStart(2,'0')}`,
  category:['Liderança','Negócios','Inovação','Cultura'][i%4],
  role:'Especialista selecionado pela curadoria Talkers',
  short:'Repertório, presença e impacto para grandes eventos.',
  bio:'Perfil integrante do casting criterioso da Talkers. A curadoria considera contexto, audiência, objetivo e aderência antes de cada recomendação.',
  tags:['Curadoria','Conteúdo','Palco']
}));

async function load(){
  const sb=supabaseAdmin();
  if(!sb) return {settings:{brand_name:'TALKERS',header_button_label:'Falar com a Talkers',header_button_href:'/#contato'},nav:[],speakers:fallbackSpeakers};
  try{
    const [{data:settings},{data:nav},{data:section}] = await Promise.all([
      sb.from('site_settings').select('*').limit(1).maybeSingle(),
      sb.from('nav_items').select('*').eq('enabled',true).order('sort_order'),
      sb.from('sections').select('*').eq('slug','casting').maybeSingle()
    ]);
    const raw=section?.content?.speakers||section?.content?.cards||[];
    const speakers=raw.length?raw.map((x,i)=>({id:x.id||i+1,name:x.name||x.title||`Palestrante ${i+1}`,category:x.category||x.kicker,role:x.role||x.subtitle||x.text,short:x.short||x.text,image_url:x.image_url,bio:x.bio||x.description||x.text,tags:x.tags||[],href:x.href||x.button_href})):fallbackSpeakers;
    return {settings:settings||{brand_name:'TALKERS'},nav:nav||[],speakers};
  }catch{return {settings:{brand_name:'TALKERS',header_button_label:'Falar com a Talkers',header_button_href:'/#contato'},nav:[],speakers:fallbackSpeakers};}
}

export default async function CastingPage(){
  const data=await load();
  return <main className="site casting-page">
    <SiteHeader settings={data.settings} nav={data.nav}/>
    <section className="casting-hero">
      <div className="casting-hero-inner">
        <div className="eyebrow">Casting Talkers · 14 vozes selecionadas</div>
        <h1>Não é sobre ter muitos nomes.<br/><span>É sobre ter os nomes certos.</span></h1>
        <div className="casting-intro"><p>Um casting criterioso para empresas, convenções, congressos e experiências que não podem tratar o palco como detalhe.</p><span>Toque em um perfil para explorar.</span></div>
      </div>
    </section>
    <section className="casting-wrap"><CastingGrid speakers={data.speakers}/></section>
    <section className="casting-end"><div><div className="eyebrow">Curadoria antes da indicação</div><h2>Você traz o briefing.<br/>A Talkers encontra a voz.</h2></div><a className="btn" href="/#contato">Falar com um curador <span>↗</span></a></section>
    <footer id="contato" className="footer">{data.settings?.footer_text||'Talkers · Curadoria premium de palestrantes.'}</footer>
  </main>
}
