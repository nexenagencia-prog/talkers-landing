import { cookies } from 'next/headers';
import { COOKIE_NAME, validCookie } from '../../lib/auth';
import { supabaseAdmin, getSupabaseConfigStatus } from '../../lib/supabase';
import AdminClient from './AdminClient';
import { ensureTalkersV9 } from '../../lib/talkersDefaults';
import { dedupeNav, dedupeSections } from '../../lib/dedupe';

export const dynamic='force-dynamic';

async function loadCmsData(){
  const config=getSupabaseConfigStatus();
  const sb=supabaseAdmin();
  if(!sb) return {data:null,error:config.reason||'Supabase não configurado'};
  try{
    await ensureTalkersV9(sb);
    const [{data:settings,error:e1},{data:nav,error:e2},{data:sections,error:e3}] = await Promise.all([
      sb.from('site_settings').select('*').limit(1).maybeSingle(),
      sb.from('nav_items').select('*').order('sort_order'),
      sb.from('sections').select('*').order('sort_order')
    ]);
    const error=e1||e2||e3;
    if(error) return {data:null,error:error.message};
    return {data:{settings,nav:dedupeNav(nav||[]),sections:dedupeSections(sections||[])},error:null};
  }catch(e){
    const detail=e?.cause?.message||e?.message||'Erro ao carregar o CMS';
    return {data:null,error:`Não foi possível conectar ao Supabase. ${detail}`};
  }
}

export default async function Admin(){
  const c=await cookies();
  const authenticated=validCookie(c.get(COOKIE_NAME)?.value);
  if(!authenticated) return <AdminClient authenticated={false} initialData={null} initialError={null}/>;
  const {data,error}=await loadCmsData();
  return <AdminClient authenticated={true} initialData={data} initialError={error}/>;
}
