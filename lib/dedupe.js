function timestamp(value) {
  const t = value ? Date.parse(value) : 0;
  return Number.isFinite(t) ? t : 0;
}

function newer(a, b) {
  const ea = a?.enabled !== false ? 1 : 0;
  const eb = b?.enabled !== false ? 1 : 0;
  if (ea !== eb) return ea > eb;
  const ta = timestamp(a?.updated_at);
  const tb = timestamp(b?.updated_at);
  if (ta !== tb) return ta > tb;
  return Number(a?.id || 0) > Number(b?.id || 0);
}

export function dedupeSections(rows = []) {
  const bySlug = new Map();
  for (const row of rows || []) {
    const key = String(row?.slug || '').trim();
    if (!key) continue;
    const current = bySlug.get(key);
    if (!current || newer(row, current)) bySlug.set(key, row);
  }
  return [...bySlug.values()].sort((a, b) => {
    const order = Number(a?.sort_order || 0) - Number(b?.sort_order || 0);
    return order || Number(a?.id || 0) - Number(b?.id || 0);
  });
}

export function dedupeNav(rows = []) {
  const seen = new Map();
  for (const row of rows || []) {
    const key = `${String(row?.label || '').trim().toLowerCase()}|${String(row?.href || '').trim()}`;
    if (!key || key === '|') continue;
    const current = seen.get(key);
    if (!current || newer(row, current)) seen.set(key, row);
  }
  return [...seen.values()].sort((a, b) => {
    const order = Number(a?.sort_order || 0) - Number(b?.sort_order || 0);
    return order || Number(a?.id || 0) - Number(b?.id || 0);
  });
}
