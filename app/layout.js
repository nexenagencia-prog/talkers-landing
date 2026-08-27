import './globals.css';
import { supabaseAdmin } from '../lib/supabase';

export const dynamic='force-dynamic';
export async function generateMetadata(){
  try{
    const sb=supabaseAdmin();
    if(!sb) return {title:'Talkers',description:'Curadoria premium de palestrantes'};
    const {data}=await sb.from('site_settings').select('*').limit(1).maybeSingle();
    const t=data?.theme_json||{};
    return {title:t.seo_title||data?.brand_name||'Talkers',description:t.seo_description||data?.footer_text||'Curadoria premium de palestrantes',icons:data?.favicon_url?{icon:data.favicon_url}:undefined};
  }catch{return {title:'Talkers',description:'Curadoria premium de palestrantes'}}
}
export default function RootLayout({children}){return <html lang="pt-BR"><body>{children}</body></html>}
