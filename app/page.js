import KineticTalkers from '../components/KineticTalkers';
import {supabaseAdmin} from '../lib/supabase';
export const dynamic='force-dynamic';
export default async function Page(){
 let logo=''; try{const sb=supabaseAdmin();if(sb){const {data}=await sb.from('site_settings').select('logo_url').limit(1).maybeSingle();logo=data?.logo_url||'';}}catch{}
 return <KineticTalkers logo={logo}/>;
}
