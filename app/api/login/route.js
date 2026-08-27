import { NextResponse } from 'next/server';
import { COOKIE_NAME, tokenForPassword, isValidPassword, authMode } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req){
  try {
    const body = await req.json().catch(() => ({}));
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!password || !isValidPassword(password)) {
      return NextResponse.json({ok:false,error:'Senha inválida'},{status:401});
    }

    const res = NextResponse.json({ok:true,mode:authMode()});
    res.cookies.set(COOKIE_NAME, tokenForPassword(), {
      httpOnly:true,
      sameSite:'lax',
      secure:process.env.NODE_ENV==='production',
      path:'/',
      maxAge:60*60*24*30
    });
    return res;
  } catch (error) {
    return NextResponse.json({ok:false,error:'Falha ao autenticar'},{status:500});
  }
}
