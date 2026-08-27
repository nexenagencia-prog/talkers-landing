import { NextResponse } from 'next/server';
import { COOKIE_NAME, tokenForPassword } from '../../../lib/auth';

export async function POST(req){
  const {password} = await req.json();
  if(!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ok:false,error:'Senha inválida'},{status:401});
  const res = NextResponse.json({ok:true});
  res.cookies.set(COOKIE_NAME, tokenForPassword(), {httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*24*30});
  return res;
}
