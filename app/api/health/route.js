import { NextResponse } from 'next/server';
import { getSupabaseConfigStatus, supabaseAdmin } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const config = getSupabaseConfigStatus();
  if (!config.ok) return NextResponse.json({ ok: false, service: 'supabase', error: config.reason }, { status: 503 });
  try {
    const sb = supabaseAdmin();
    const { error } = await sb.from('site_settings').select('id').limit(1);
    if (error) return NextResponse.json({ ok: false, service: 'supabase', error: error.message }, { status: 503 });
    return NextResponse.json({ ok: true, service: 'supabase' });
  } catch (error) {
    return NextResponse.json({ ok: false, service: 'supabase', error: error?.cause?.message || error?.message || 'fetch failed' }, { status: 503 });
  }
}
