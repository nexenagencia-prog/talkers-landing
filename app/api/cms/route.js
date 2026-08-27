import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseAdmin, getSupabaseConfigStatus } from '../../../lib/supabase';
import { COOKIE_NAME, validCookie } from '../../../lib/auth';
import { dedupeNav, dedupeSections } from '../../../lib/dedupe';

async function guard(){const c=await cookies();return validCookie(c.get(COOKIE_NAME)?.value)}
export async function GET(){if(!(await guard()))return NextResponse.json({error:'unauthorized'},{status:401});const sb=supabaseAdmin();if(!sb){const c=getSupabaseConfigStatus();return NextResponse.json({error:c.reason||'Supabase não configurado'},{status:503});}const [{data:settings,error:e1},{data:nav,error:e2},{data:sections,error:e3}] = await Promise.all([sb.from('site_settings').select('*').limit(1).maybeSingle(),sb.from('nav_items').select('*').order('sort_order'),sb.from('sections').select('*').order('sort_order')]);if(e1||e2||e3)return NextResponse.json({error:(e1||e2||e3).message},{status:500});return NextResponse.json({settings,nav:dedupeNav(nav||[]),sections:dedupeSections(sections||[])});}
export async function POST(req){if(!(await guard()))return NextResponse.json({error:'unauthorized'},{status:401});const body=await req.json();const sb=supabaseAdmin();if(!sb){const c=getSupabaseConfigStatus();return NextResponse.json({error:c.reason||'Supabase não configurado'},{status:503});}
  try{
    if(body.action==='save_settings'){const row={...body.data,updated_at:new Date().toISOString()}; if(row.id){const {error}=await sb.from('site_settings').update(row).eq('id',row.id);if(error)throw error;} else {const {error}=await sb.from('site_settings').insert(row);if(error)throw error;}}
    if(body.action==='save_nav'){const x=body.data; if(x.id){const {error}=await sb.from('nav_items').update(x).eq('id',x.id);if(error)throw error;} else {const {error}=await sb.from('nav_items').insert(x);if(error)throw error;}}
    if(body.action==='delete_nav'){const {error}=await sb.from('nav_items').delete().eq('id',body.id);if(error)throw error;}
    if(body.action==='save_section'){const x={...body.data,updated_at:new Date().toISOString()}; if(x.id){const {error}=await sb.from('sections').update(x).eq('id',x.id);if(error)throw error;} else {delete x.id;const {error}=await sb.from('sections').insert(x);if(error)throw error;}}
    if(body.action==='delete_section'){const {error}=await sb.from('sections').delete().eq('id',body.id);if(error)throw error;}
    return NextResponse.json({ok:true});
  }catch(e){return NextResponse.json({error:e.message},{status:500})}
}
