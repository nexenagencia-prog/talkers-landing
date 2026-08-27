import { supabaseAdmin } from '../lib/supabase';
import SiteHeader from '../components/SiteHeader';
import SectionRenderer from '../components/SectionRenderer';
import TalkersFooter from '../components/TalkersFooter';
import { TALKERS_SETTINGS, TALKERS_NAV, TALKERS_SECTIONS, ensureTalkersV11 } from '../lib/talkersDefaults';
import { dedupeNav, dedupeSections } from '../lib/dedupe';

const fallback={settings:TALKERS_SETTINGS,nav:TALKERS_NAV,sections:TALKERS_SECTIONS};
export const dynamic='force-dynamic';

async function loadData(){
  const sb=supabaseAdmin();
  if(!sb) return fallback;
  try{
    await ensureTalkersV11(sb);
    const [{data:settings},{data:nav},{data:sections}] = await Promise.all([
      sb.from('site_settings').select('*').limit(1).maybeSingle(),
      sb.from('nav_items').select('*').eq('enabled',true).order('sort_order'),
      sb.from('sections').select('*').eq('enabled',true).order('sort_order')
    ]);
    const cleanNav=dedupeNav(nav||[]).filter(x=>x.enabled!==false);
    const cleanSections=dedupeSections(sections||[]).filter(x=>x.enabled!==false);
    return {settings:settings||fallback.settings,nav:cleanNav.length?cleanNav:fallback.nav,sections:cleanSections.length?cleanSections:fallback.sections};
  }catch{return fallback;}
}

export default async function Page(){
  const data=await loadData();
  const t=data.settings?.theme_json||{};
  return <main className="site talkers-site" style={{background:t.bg||undefined,color:t.ink||undefined,'--radius':t.radius?`${t.radius}px`:undefined}}>
    <SiteHeader settings={data.settings} nav={data.nav}/>
    {data.sections.map(s=><SectionRenderer key={s.id||s.slug} section={s} settings={data.settings}/>)}
    <TalkersFooter settings={data.settings} nav={data.nav}/>
  </main>
}
