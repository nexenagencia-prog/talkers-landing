import crypto from 'crypto';

export const COOKIE_NAME = 'cms_auth';

// Recovery access is only used when ADMIN_PASSWORD is not configured in Vercel.
// The raw recovery password is never shipped to the browser or stored here.
const RECOVERY_PASSWORD_SHA256 = '09cc02289659dcf7f632113f3856806e51d6552e4e6ecf7776117649220a9646';

export function sha256(value = '') {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

export function configuredPasswordHash() {
  const envPassword = process.env.ADMIN_PASSWORD;
  return envPassword ? sha256(envPassword) : RECOVERY_PASSWORD_SHA256;
}

export function isValidPassword(password) {
  const candidate = Buffer.from(sha256(password), 'hex');
  const expected = Buffer.from(configuredPasswordHash(), 'hex');
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
}

export function tokenForPassword() {
  return crypto.createHash('sha256').update(`talkers-cms-session:${configuredPasswordHash()}`).digest('hex');
}

export function validCookie(value) {
  if (!value) return false;
  const candidate = Buffer.from(String(value));
  const expected = Buffer.from(tokenForPassword());
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
}

export function authMode() {
  return process.env.ADMIN_PASSWORD ? 'vercel-env' : 'recovery';
}
