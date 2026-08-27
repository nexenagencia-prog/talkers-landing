import { cookies } from 'next/headers';
import { COOKIE_NAME, validCookie } from '../../lib/auth';
import AdminClient from './AdminClient';

export const dynamic='force-dynamic';
export default async function Admin(){const c=await cookies();return <AdminClient authenticated={validCookie(c.get(COOKIE_NAME)?.value)}/>}
