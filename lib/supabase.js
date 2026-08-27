import { createClient } from '@supabase/supabase-js';

const RETRYABLE = new Set([408, 425, 429, 500, 502, 503, 504]);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizeUrl(raw) {
  if (!raw) return '';
  let value = String(raw).trim().replace(/\/+$/, '');
  if (value && !/^https?:\/\//i.test(value)) value = `https://${value}`;
  return value;
}

async function resilientFetch(input, init = {}) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(input, { ...init, signal: init.signal || controller.signal });
      clearTimeout(timer);
      if (!RETRYABLE.has(response.status) || attempt === 2) return response;
      await sleep(350 * (attempt + 1));
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
      if (attempt === 2) throw error;
      await sleep(350 * (attempt + 1));
    }
  }
  throw lastError || new Error('Falha de conexão com o Supabase');
}

export function getSupabaseConfigStatus() {
  const url = normalizeUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL);
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url) return { ok: false, reason: 'NEXT_PUBLIC_SUPABASE_URL não está configurada na Vercel.' };
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith('.supabase.co')) {
      return { ok: false, reason: 'A URL do Supabase configurada na Vercel é inválida.' };
    }
  } catch {
    return { ok: false, reason: 'A URL do Supabase configurada na Vercel é inválida.' };
  }
  if (!key) return { ok: false, reason: 'SUPABASE_SERVICE_ROLE_KEY ou SUPABASE_SECRET_KEY não está configurada na Vercel.' };
  return { ok: true, url, key };
}

export function supabaseAdmin() {
  const config = getSupabaseConfigStatus();
  if (!config.ok) return null;
  return createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: resilientFetch }
  });
}
