import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';
import { COOKIE_NAME, validCookie } from '../../../lib/auth';

export async function POST(req){const c=await cookies();if(!validCookie(c.get(COOKIE_NAME)?.value))return NextResponse.json({error:'unauthorized'},{status:401});const sb=supabaseAdmin();if(!sb)return NextResponse.json({error:'Supabase não configurado'},{status:500});const form=await req.formData();const file=form.get('file');if(!file)return NextResponse.json({error:'Arquivo ausente'},{status:400});const safe=(file.name||'media').replace(/[^a-zA-Z0-9._-]/g,'-');const path=`${Date.now()}-${safe}`;const bytes=await file.arrayBuffer();const {error}=await sb.storage.from('media').upload(path,bytes,{contentType:file.type||'application/octet-stream',upsert:false});if(error)return NextResponse.json({error:error.message},{status:500});const {data}=sb.storage.from('media').getPublicUrl(path);return NextResponse.json({ok:true,url:data.publicUrl,type:file.type,name:file.name});}
