import SiteHeader from '../../components/SiteHeader';
import CastingGrid from '../../components/CastingGrid';
import TalkersFooter from '../../components/TalkersFooter';
import { supabaseAdmin } from '../../lib/supabase';
import { TALKERS_SETTINGS, TALKERS_NAV, TALKERS_SECTIONS, ensureTalkersV9 } from '../../lib/talkersDefaults';
import { dedupeNav, dedupeSections } from '../../lib/dedupe';

export const dynamic='force-dynamic';
const fallbackSection=TALKERS_SECTIONS.find(s=>s.slug==='casting');

async function load(){
  const sb=supabaseAdmin();
  if(!sb) return {settings:TALKERS_SETTINGS,nav:TALKERS_NAV,section:fallbackSection};
  try{
    await ensureTalkersV9(sb);
    const [{data:settings},{data:nav},{data:sections}] = await Promise.all([
      sb.from('site_settings').select('*').limit(1).maybeSingle(),
      sb.from('nav_items').select('*').eq('enabled',true).order('sort_order'),
      sb.from('sections').select('*').eq('slug','casting').order('updated_at',{ascending:false})
    ]);
    const cleanNav=dedupeNav(nav||[]).filter(x=>x.enabled!==false);
    const section=dedupeSections(sections||[]).find(x=>x.slug==='casting'&&x.enabled!==false);
    return {settings:settings||TALKERS_SETTINGS,nav:cleanNav.length?cleanNav:TALKERS_NAV,section:section||fallbackSection};
  }catch{return {settings:TALKERS_SETTINGS,nav:TALKERS_NAV,section:fallbackSection};}
}

export default async function CastingPage(){
  const data=await load();
  const c=data.section?.content||fallbackSection.content;
  const speakers=c.speakers||[];
  return <main className="site casting-page talkers-site">
    <SiteHeader settings={data.settings} nav={data.nav}/>
    <section className="casting-hero section-space"><div className="casting-hero-inner">
      <div className="eyebrow">{c.page_eyebrow||'CASTING TALKERS'}</div>
      <h1>{c.page_title||'Não é sobre ter muitos nomes. É sobre ter os nomes certos.'}</h1>
      <div className="casting-intro"><p>{c.page_text}</p><span>{c.page_note}</span></div>
    </div></section>
    <section className="casting-wrap section-space"><CastingGrid speakers={speakers}/></section>
    <section className="casting-end"><div><div className="eyebrow">{c.end_eyebrow}</div><h2>{c.end_title}</h2></div><a className="btn" href={c.end_button_href||'/#contato'}>{c.end_button_label||'Falar com um curador'} <span>↗</span></a></section>
    <TalkersFooter settings={data.settings} nav={data.nav}/>
  </main>
}
