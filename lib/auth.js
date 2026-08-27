import crypto from 'crypto';

export const COOKIE_NAME = 'cms_auth';
export function tokenForPassword() {
  const password = process.env.ADMIN_PASSWORD || '';
  return crypto.createHash('sha256').update(`landing-cms:${password}`).digest('hex');
}
export function validCookie(value) {
  return Boolean(value && value === tokenForPassword());
}
